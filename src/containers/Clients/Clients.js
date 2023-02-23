import React, { useEffect, useState } from 'react';

import { IconMedicalFilledMid, IconUserFilled, IconUserCheckFilledMid } from '../../assets/icons';
import MetricItem from '../../components/shared/MetricItem';
import ClientRow from '../../components/Clients/ClientRow';

import ClientService from '../../services/layers/ClientService';
import DashboardService from '../../services/layers/DashboardService';

import LoadingDots from '../../components/shared/LoadingDots';
import { TEMP_CLIENTS } from '../../constants/tempDatas';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const fetchStats = async () => {
    try {
      const res = await DashboardService.getStatistics();

      setStats(res.data[0]);
      setIsStatsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await ClientService.getClientList();

      setClients(res.data[0]);
    } catch (err) {
      console.log(err);
      setClients(TEMP_CLIENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);
  return (
    <>
      <div className='flex flex-row gap-4'>
        <MetricItem
          Icon={IconUserFilled}
          theme="yellow"
          className="fade-up w-1/4"
          subtitle="Toplam Danışan"
          isLoading={isStatsLoading}
          title={stats.toplam_danisan}
        />
        <MetricItem
          Icon={IconUserCheckFilledMid}
          theme="gray"
          className="fade-up w-1/4"
          subtitle="Tedavisi Başlayan"
          isLoading={isStatsLoading}
          title={stats.tedavi_baslayan}
        />
        <MetricItem
          Icon={IconMedicalFilledMid}
          theme="navy"
          className="fade-up w-1/4"
          subtitle="Tedavi Bekleyen"
          isLoading={isStatsLoading}
          title={stats.tedavi_bekleyen}
        />
        <MetricItem
          Icon={IconMedicalFilledMid}
          theme="green"
          className="fade-up w-1/4"
          subtitle="Tedavisi Tamamlanan"
          isLoading={isStatsLoading}
          title={stats.tedavi_tamamlanan}
        />
      </div>
      <div className='pt-14'>
        <div className='radius-md bg-navy-500 px-12 py-4 justify-between flex color-white mb-2'>
          <span className='w-1/4'>İsim</span>
          <span className='w-1/4'>Yaş</span>
          <span className='w-1/4'>Cinsiyet</span>
          <span className='w-1/4'>Durum</span>
        </div>
        {isLoading && (
          <div className='h-64 pt-10'>
            <div className='flex justify-center'>
              <LoadingDots />
            </div>
          </div>
        )}
        <div className='radius'>
          {clients.map((item, index) => {
            let isFirst = false;
            let isLast = false;

            if (index === 0) {
              isFirst = true;
            }

            if (index === clients.length - 1) {
              isLast = true;
            }

            return (
              <ClientRow
                key={item.id}
                data={item}
                index={index}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Clients;
