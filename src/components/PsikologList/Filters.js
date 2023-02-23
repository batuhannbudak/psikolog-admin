import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import debounce from 'lodash/debounce';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { func, object } from 'prop-types';

const tempUzmanlik = [
  { value: 'Adli Psikoloji', label: 'Adli Psikoloji' },
  { value: 'Anksiyete (Kaygı) Bozuklukları', label: 'Anksiyete (Kaygı) Bozuklukları' },
  { value: 'Bipolar Bozukluk', label: 'Bipolar Bozukluk' },
  { value: 'Çocuk ve Ergen Terapisi', label: 'Çocuk ve Ergen Terapisi' },
  { value: 'İletişim Problemleri', label: 'İletişim Problemleri' },
  { value: 'Öfke Kontrol Problemleri', label: 'Öfke Kontrol Problemleri' },
  { value: 'TSSB (Travma-Stres)', label: 'TSSB (Travma-Stres)' },
  { value: 'Yas Danışmanlığı', label: 'Yas Danışmanlığı' },
  { value: 'Aile Terapisi', label: 'Aile Terapisi' },
  { value: 'Bağımlılık', label: 'Bağımlılık' },
  { value: 'Bireysel / Yetişkin Terapisi', label: 'Bireysel / Yetişkin Terapisi' },
  { value: 'Depresyon', label: 'Depresyon' },
  { value: 'Kişilik Bozukluklar', label: 'Kişilik Bozukluklar' },
  { value: 'Panik Bozukluk', label: 'Panik Bozukluk' },
  { value: 'Uyku Bozuklukları', label: 'Uyku Bozuklukları' }
];

const tempUnvani = [
  { value: '', label: ' ' },
  { value: 'Aile Danışmanı', label: 'Aile Danışmanı' },
  { value: 'Psikolog', label: 'Psikolog' },
  { value: 'Psikiyatrist', label: 'Psikiyatrist' },
  { value: 'Uzman Nöropsikolog', label: 'Uzman Nöropsikolog' },
  { value: 'Uzman Psikolog Danışman', label: 'Uzman Psikolog Danışman' },
  { value: 'Çocuk ve Ergen Psikoloğu', label: 'Çocuk ve Ergen Psikoloğu' },
  { value: 'Psikolog Danışman', label: 'Psikolog Danışman' },
  { value: 'Klinik Psikolog', label: 'Klinik Psikolog' },
  { value: 'Uzman Psikolog', label: 'Uzman Psikolog' }
];

const Filters = ({
  filters, updateList, fetchData, setOffset
}) => {
  const animatedComponents = makeAnimated();
  const history = useHistory();

  const [searchWord, setSearchWord] = useState(filters.isim || '');

  const getLabel = (options, key) => {
    let label = '';

    options.forEach(item => {
      if (item.value === key) {
        label = item.label;
      }
    });

    return label;
  };

  const getValue = key => {
    const value = [];

    let options = [];
    if (key === 'unvani') {
      options = tempUnvani;
    } else {
      options = tempUzmanlik;
    }
    if (filters[key]) {
      const values = filters[key].split(',');

      values.forEach(item => {
        value.push({
          value: item,
          label: getLabel(options, item)
        });
      });
    }

    return value;
  };

  const setFilter = (values, element) => {
    const searchParams = new URLSearchParams(history.location.search);

    let urlValue = '';
    if (Array.isArray(values)) {
      values.forEach(item => {
        urlValue += urlValue ? `,${item.value}` : `${item.value}`;
      });
    } else {
      urlValue = values.value;
    }

    if (urlValue) {
      searchParams.set(element?.name, urlValue);
    } else {
      searchParams.delete(element?.name);
    }

    history.push({
      pathname: '',
      search: searchParams?.toString()
    });

    const params = {
      uzmanlikAlani: searchParams.get('uzmanlikAlani') || null,
      unvani: searchParams.get('unvani') || null,
      isim: searchParams.get('isim') || null
    };

    setOffset(0);
    updateList();
    fetchData(false, params);
  };

  const handleSearch = searchKeyword => {
    const searchParams = new URLSearchParams(history.location.search);

    if (searchKeyword) {
      searchParams.set('isim', searchKeyword);
    } else {
      searchParams.delete('isim');
    }

    history.push({
      pathname: '',
      search: searchParams?.toString()
    });

    const params = {
      uzmanlikAlani: searchParams.get('uzmanlikAlani') || null,
      unvani: searchParams.get('unvani') || null,
      isim: searchParams.get('isim') || null
    };

    setOffset(0);
    updateList();
    fetchData(false, params);
  };

  const delayedSearch = useCallback(debounce(() => handleSearch(searchWord), 500), [searchWord]);

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [searchWord, delayedSearch]);

  return (
    <div className='flex flex-row gap-4 max-w-lg pb-8 mx-auto'>
      <div className='w-full'>
        <span className='block pb-2 font-semibold'>Psikolog Adı</span>
        <input
          className='p-2 radius border border-gray-100 color-gray-700 w-full'
          type="text"
          value={searchWord}
          onChange={event => { setSearchWord(event.target.value); }}
          placeholder='İsime göre ara'
        />
      </div>
      <div className='w-full'>
        <span className='block pb-2 font-semibold'>Uzmanlık Alanı</span>
        <Select
          value={getValue('uzmanlikAlani')}
          closeMenuOnSelect={false}
          options={tempUzmanlik}
          components={animatedComponents}
          name="uzmanlikAlani"
          placeholder="Seçiniz"
          onChange={setFilter}
          isMulti
        />
      </div>
      <div className='w-full'>
        <span className='block pb-2 font-semibold'>Ünvan</span>
        <Select
          value={getValue('unvani')}
          options={tempUnvani}
          onChange={setFilter}
          name="unvani"
          placeholder="Seçiniz"
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  updateList: func,
  filters: object,
  fetchData: func,
  setOffset: func
};

Filters.defaultProps = {
  updateList: () => { },
  filters: {},
  fetchData: () => { },
  setOffset: () => { }
};

export default Filters;
