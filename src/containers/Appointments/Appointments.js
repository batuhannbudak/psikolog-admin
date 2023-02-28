/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AppointmentCard from '../../components/Appointments/AppointmentCard';
import LoadingDots from '../../components/shared/LoadingDots';
import AppointmentService from '../../services/layers/AppointmentService';
import { IconMagnifyingGlass } from '../../assets/icons';

const Appointments = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const parseAppointments = (data) => {
    let tempAppointments = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (item) {
        if (item.appointments) {
          console.log('here ---> ');
          console.log(item.appointments);
          for (let j = 0; j < item.appointments.length; j++) {

            const appointmentObj = {
              therapistName: item.therapist_name,
              clientName: item.appointments[j].client_name,
              date: item.appointments[j].appointment
            };
            console.log(appointmentObj);
            tempAppointments.push(appointmentObj);
          }
        }
      }
      
      setAppointments(tempAppointments);
      }
    }

  const fetchAppointments = async (params = {}) => {
    setAppointments([]);
    setIsLoading(true);
    try {
      const res = await AppointmentService.getAppointments(params);

      parseAppointments(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const handleSearchClick = () => {
    if (isLoading) return;

    const params = {
      startDate: startDate,
      endDate: endDate
    };
    
    fetchAppointments(params);
    
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <div className='flex flex-row'>
        <div>
          <span className='block pb-2 font-semibold'>Tarih Aralığı</span>
          <div className='date-picker-wrapper'>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              selectsRange
            />
          </div>
        </div>
        <div className='flex flex-col mb-4 pl-5'>
          <div className='grow-1'/>
          <button
            type="button"
            onClick={handleSearchClick}
            className='hover:bg-navy-500 flex radius items-center justify-center h-9 pl-2 pr-4 color-white bg-navy-700 duration-300'
          >
            <IconMagnifyingGlass />
            <span className='pl-2'>Ara</span>
          </button>
        </div>
      </div>
      
     
      <div className='radius-md bg-navy-500 px-12 py-4 justify-between flex color-white mb-2'>
        <span className='w-1/4'>Psikolog İsmi</span>
        <span className='w-1/4'>Danışan İsmi</span>
        <span className='w-1/4'>Tarih</span>
        <span className='w-1/4'>Saat</span>
      </div>
      {isLoading && (
        <div className='h-64 pt-10'>
          <div className='flex justify-center'>
            <LoadingDots />
          </div>
        </div>
      )}
      {
        appointments.map((item, index) => {
          let isFirst = false;
          let isLast = false;

          if (index === 0) {
            isFirst = true;
          }

          if (index === appointments.length - 1) {
            isLast = true;
          }

          return (
            <AppointmentCard
              data={item}
              key={index}
              index={index}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        })
      }
      {(appointments?.length === 0 && !isLoading) && (
        <p>Herhangi bir veri bulunamadı.</p>
      )}
    </>
  );
};

export default Appointments;
