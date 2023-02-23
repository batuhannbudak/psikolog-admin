import React from 'react';

import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const { pathname } = location;

  const getHeaderText = () => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/psikologs':
        return 'Psikologlar';
      case '/clients':
        return 'Danışanlar';
      case '/appointments':
        return 'Randevular';
      case '/create-appointment':
        return 'Randevu Oluştur';
      case '/statistics':
        return 'İstatistikler';
      default:
        return 'Gönüllü Psikolog'; // TODO:
    }
  };

  const getSubHeaderText = () => {
    switch (pathname) {
      case '/':
        return 'Genel durum ve istatistikler';
      case '/psikologs':
        return 'Sistemde kayıtlı gönüllü psikologlar';
      case '/clients':
        return 'Başvuru yapan danışanlar';
      case '/appointments':
        return 'Sistemde oluşturulan randevular';
      case '/create-appointment':
        return 'Randevu Oluştur sub';
      case '/statistics':
        return 'İstatistikler sub';
      default:
        return 'Gönüllü Psikolog'; // TODO:
    }
  };

  return (
    <>
      <div className='flex items-center my-8'>
        <div className='flex flex-col'>
          <h1 className='color-navy-700 text-4xl'>
            {getHeaderText()}
          </h1>
          <p className='color-navy-300 text-15 mt-1'>{getSubHeaderText()}</p>
        </div>
      </div>
      <div className='mb-10'>
        <nav className="flex gap-4 border-b border-b-navy-50 text-sm color-navy-400 flex-wrap">
          <Link
            className={`h-10 px-1 border-b-2 border-navy-70 shrink-0 duration-300 border-transparent hover:border-navy-700 hover:color-navy-700
            ${pathname === '/' && 'border-navy-700 color-navy-700'}`}
            to='/'
          >
            Dashboard
          </Link>
          <Link
            className={`h-10 px-1 border-b-2 border-navy-70 shrink-0 duration-300 border-transparent hover:border-navy-700 hover:color-navy-700
            ${pathname === '/psikologs' && 'border-navy-700 color-navy-700'}`}
            to='/psikologs'
          >
            Psikologlar
          </Link>
          <Link
            className={`h-10 px-1 border-b-2 border-navy-70 shrink-0 duration-300 border-transparent hover:border-navy-700 hover:color-navy-700
            ${pathname === '/clients' && 'border-navy-700 color-navy-700'}`}
            to='/clients'
          >
            Danışanlar
          </Link>
          <Link
            className={`h-10 px-1 border-b-2 border-navy-70 shrink-0 duration-300 border-transparent hover:border-navy-700 hover:color-navy-700
            ${pathname === '/appointments' && 'border-navy-700 color-navy-700'}`}
            to='/appointments'
          >
            Randevular
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
