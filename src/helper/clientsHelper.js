import React from 'react';

export const getStatusTag = status => {
  const getStyle = () => {
    switch (status) {
      case 'Onay Bekliyor':
        return 'color-navy-600 bg-navy-100';
      case 'Onaylandı':
        return 'color-green-600 bg-green-100';
      case 'Tedavisi Başladı':
        return 'color-orange-600 bg-orange-100';
      case 'Tedavisi Bitti':
        return 'color-navy-600 bg-tedavi-bitti ';
      case 'İptal Edildi':
        return 'color-red-600 bg-red-200 ';
      default:
        return 'color-green-600 bg-green-100';
    }
  };

  return (
    <span className={`${getStyle()} radius-lg px-5 py-2 font-semibold text-uppercase text-sm`}>
      {status ? status : 'Onaylandı'}
    </span>
  );
};
