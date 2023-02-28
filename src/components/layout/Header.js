import React from 'react';
import { useHistory } from 'react-router-dom';

import AuthenticationService from '../../services/layers/AuthenticationService';
import { IconLogout } from '../../assets/icons';

const Header = () => {
  const history = useHistory();

  const handleLogoutClick = async () => {
    try {
      const res = await AuthenticationService.logout();
    } catch (error) {
      console.log(error);
    } finally {
      window.location.href = '/demos/psikolog-admin/build/';
    }
  };

  return (
    <div className='h-16 bg-navy-700 flex items-center justify-center w-full min-h-16 text-center'>
      <span className='font-bold color-white m-auto'>APDEP - Afet Psikososyal Destek Platformu</span>
      <button
        type='button'
        className='color-white items-center justify-center flex pr-4 hover:color-orange-500 duration-500'
        onClick={handleLogoutClick}
      >
        <span className='font-semibold pr-4'>Çıkış yap</span>
        <IconLogout />
      </button>
    </div>
  );
};

export default Header;
