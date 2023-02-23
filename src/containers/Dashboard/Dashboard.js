import React, { useEffect, useState } from 'react';

import { IconUserFilled, IconCalendarCheckFilled, IconUsersEllipsisFilled } from '../../assets/icons';
import MetricItem from '../../components/shared/MetricItem';
import MetricSummary from '../../components/Dashboard/MetricSummary';
import axios from 'axios';
import DashboardService from '../../services/layers/DashboardService';
import { BASE_URL } from '../../constants/apiUrls';
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});

  const getStatistics = async () => {
    try {
      const res = await DashboardService.getStatistics();

      setStats(res.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <>
      <MetricSummary stats={stats} isLoading={isLoading} />
      <div className='flex flex-row gap-4'>
        <MetricItem
          Icon={IconUserFilled}
          theme="green"
          className="fade-up w-1/4"
          subtitle="Toplam Psikolog"
          isLoading={isLoading}
          title={stats.toplam_psikolog}
        />
        <MetricItem
          Icon={IconUsersEllipsisFilled}
          theme="orange"
          className="fade-up delay-1 w-1/2"
          subtitle="Toplam Danışan"
          isLoading={isLoading}
          isMetricsLoading={false}
          title={stats.toplam_danisan}
          needsPadding={true}
          metrics={{
            tedavisiTamamlanan: stats.tedavi_tamamlanan,
            tedaviBaslayan: stats.tedavi_baslayan,
            tedaviBekleyen: stats.tedavi_bekleyen,
            tedaviIptal: stats.tedavi_iptal
          }}
        />
        <MetricItem
          Icon={IconCalendarCheckFilled}
          theme="navy"
          className="fade-up w-1/4"
          subtitle="Günlük Tamamlanan Randevu"
          isLoading={isLoading}
          title='2'
        />
      </div>
    </>
  );
};

export default Dashboard;
