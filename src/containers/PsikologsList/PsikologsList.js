import React, {
  useState, useRef, useCallback, useEffect
} from 'react';
import { useHistory } from 'react-router-dom';

import { useFetch } from '../../hooks';

import PsikologCard from '../../components/PsikologList/PsikologCard';
import Filters from '../../components/PsikologList/Filters';
import LoadingDots from '../../components/shared/LoadingDots';

const PsikologsList = () => {
  const [offset, setOffset] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [, updateState] = useState();

  const updatePage = useCallback(() => updateState({}), []);

  const history = useHistory();
  const { search } = history.location;

  const filters = {
    uzmanlikAlani: new URLSearchParams(search).get('uzmanlikAlani') || null,
    unvani: new URLSearchParams(search).get('unvani') || null,
    isim: new URLSearchParams(search).get('isim') || null
  };

  const {
    isLoading,
    psikologs,
    hasMore,
    fetchData
  } = useFetch(offset);

  const observer = useRef();

  const lastPsikologElementRef = useCallback(node => {
    if (isLoading) {
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    // eslint-disable-next-line no-undef
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + 10);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (offset !== 0) {
      fetchData(true, filters);
    }
  }, [offset]);

  return (
    <div className='mx-auto max-w-xxl w-full'>
      <Filters
        filters={filters} updateList={updatePage} fetchData={fetchData}
        setOffset={setOffset} setIsPageLoading={setIsPageLoading}
      />
      {
        isPageLoading ? (
          <div className='h-64 pt-10'>
            <div className='flex justify-center'>
              <LoadingDots />
            </div>
          </div>
        ) : (
          psikologs?.map((item, index) => { 
            if (psikologs.length === index + 1) {
              return (
                <PsikologCard
                  data={item}
                  innerRef={lastPsikologElementRef}
                  key={item.id}
                />
              );
            }
            return (
              <PsikologCard
                data={item} key={item.id}
              />
            );
          })
        )
      }
      {(psikologs?.length === 0 && !isLoading && !isPageLoading) && (
        <p>Herhangi bir veri bulunamadı.</p>
      )}
      {isLoading && (
        <div className='pt-10'>
          <div className='flex justify-center'>
            <LoadingDots />
          </div>
        </div>
      )}
    </div>
  );
};

export default PsikologsList;
