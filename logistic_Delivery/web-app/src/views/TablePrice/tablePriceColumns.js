import React from 'react';

export default [
  {
    title: 'Mã giá',
  },
  {
    title: 'Giá < 15kg',
  },
  {
    title: 'giá từ 15k - 50kg',
    children: [
      {
        title: 'Theo kg',
        align: 'center',
      },
      {
        title: 'Theo cm3',
        align: 'center',
      },
    ],
  },
  {
    title: 'giá từ trên 50kg',
    children: [
      {
        title: 'Theo kg',
        align: 'center',
      },
      {
        title: 'Theo cm3',
        align: 'center',
      },
    ],
  },
];
