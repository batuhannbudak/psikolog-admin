import React, { useEffect, useState } from 'react';

import { func, object, string } from 'prop-types';

import ExpertiseAreas from './ExpertiseAreas';

const PsikologCard = ({ data, innerRef }) => {
  const [imgUrl, setImgUrl] = useState('https://cdn.jotfor.ms/assets/img/v4/avatar/enterprise-default-avatar.png');

  const handleAssignClick = () => {
    window.open(data.appointmentForm, '_blank');
  };

  const handleArangeClick = () => {
    window.open(data.collaboratorLink, '_blank');
  }

  useEffect(() => {
    const imgArr = data.fotograf;
    if (imgArr && imgArr[0]) {
      if (!imgArr[0].includes('Array')) {
        setImgUrl(imgArr[0]);
      }
    }
  }, []);

  return (
    <div className="max-w-lg shadow-sm radius mx-auto my-4" ref={innerRef}>
      <div className="p-10 flex flex-row">

        <img
          src={imgUrl}
          className='w-32 h-32 radius-full border-2 border-blue-400'
          alt='avatar'
        />

        
        <div className='pl-10' style={{ maxWidth: '600px' }}>
          <div>
            <p className='font-bold text-xl'>
              {data.isim.first}
              &nbsp;
              {data.isim.last}
            </p>
            <p className='color-gray-500 text-lg'>{data.unvani || ''}</p>
          </div>
          {data.uzmanlikAlani && (
            <>
              <p className='font-semibold text-lg pt-5'>Uzmanlık Alanları</p>
              <ExpertiseAreas areas={data.uzmanlikAlani} />
            </>
          )}
          <div className='flex flex-row gap-8 pt-5'>
            {data.telefonNumarasi && (
              <p>
                <span className='font-semibold'>Telefon Numarası:</span>
                &nbsp;
                {data.telefonNumarasi.full}
              </p>
            )}
            {data.eposta && (
              <p>
                <span className='font-semibold'>Email:</span>
                &nbsp;
                <a
                  className='hover:underline'
                  href={`mailto: ${data.eposta}`}
                  target='_blank' rel="noreferrer"
                >
                  {data.eposta}
                </a>
              </p>
            )}
          </div>
        </div>
        <div className='grow-1' />
        <div className='flex flex-col'>
          <button
            type='button'
            className='px-4 py-2 bg-tables-dark hover:bg-tables-default font-bold color-white radius duration-300'
            onClick={handleAssignClick}
          >
            Danışan Ata
          </button>
          {data.collaboratorLink && (
            <button
              type='button'
              className='mt-4 px-4 py-2 bg-orange-400 hover:bg-orange-600 font-bold color-white radius duration-300'
              onClick={handleArangeClick}
            >
              Müsaitliğini Düzenle
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PsikologCard.propTypes = {
  innerRef: func,
  data: object.isRequired
};

PsikologCard.defaultProps = {
  innerRef: null
};

export default PsikologCard;
