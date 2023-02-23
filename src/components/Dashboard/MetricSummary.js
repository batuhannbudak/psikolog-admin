import React from 'react';

import { CircularProgressbar, MetricBadge } from '../shared';

import LoadingDots from '../shared/LoadingDots';

import {
  IconClock,
  IconMedicalFilled,
  IconClockCheckBrokenFilled,
  IconUserCheckFilled,
  FirstLeftArrowIcon,
  SecondLeftArrowIcon,
  FirstRightArrowIcon,
  SecondRightArrowIcon
} from '../../assets/icons';

const MetricSummary = ({ stats, isLoading }) => {
  
  return (
    <div className='w-full radius-xl mb-8 flex flex-col gap-8'>
      <div className='relative min-h-sm flex flex-col justify-center items-center min-w-md bg-navy-25 radius-lg fade-up'>
        {isLoading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <LoadingDots size="large" />
          </div>
        ) : 
          (
            <div className='flex flex-col items-center chart-wrapper'>
              <div className='flex flex-row chart-container bg-white radius-lg p-8 mt-4 gap-8 z-2 scale-130'>
                <div className='flex flex-col gap-2 items-center'>
                  <span className='color-navy-400'>Tedavisi Yapılan Danışan</span>
                  <CircularProgressbar
                    value={parseInt(((100 * stats.tedavi_tamamlanan) / stats.toplam_danisan), 10)}
                    shape='circular'
                    fontSize='20px'
                    size='w-16'
                    primaryColor='#0A1551'
                    secondaryColor='#DBDFF1'
                  />
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <span className='color-navy-400 font-normal text-md line-height-xl'>Toplam Danışan</span>
                  <h2 className='color-navy-700 font-bold text-2xl line-height-3xl'>{stats.toplam_danisan}</h2>
                </div>
              </div>
              <div className='flex z-1 -mt-2 scale-130'>
                <FirstLeftArrowIcon />
                <SecondLeftArrowIcon />
                <div className='ml-8' />
                <SecondRightArrowIcon />
                <FirstRightArrowIcon />
              </div>
              <div className='flex flex-row justify-evenly items-center gap-8 mx-auto -mt-4 z-2 scale-130'>
                <MetricBadge
                  Icon={IconMedicalFilled}
                  value={stats.tedavi_tamamlanan}
                  subtitle='Tamamlanan'
                  additionalClasses='bg-blue-400'
                />
                <MetricBadge
                  Icon={IconClockCheckBrokenFilled}
                  value={stats.tedavi_bekleyen}
                  subtitle='Tedavi Bekleyen'
                  additionalClasses='bg-navy-300'
                />
                <MetricBadge
                  Icon={IconUserCheckFilled}
                  value={stats.tedavi_baslayan}
                  subtitle='Tedavisi Başlayan'
                  additionalClasses='bg-green-400'
                />
                <MetricBadge
                  Icon={IconClock}
                  value={stats.tedavi_iptal}
                  subtitle='Tedavi İptal Olan'
                  additionalClasses='bg-red-400'
                />
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MetricSummary;
