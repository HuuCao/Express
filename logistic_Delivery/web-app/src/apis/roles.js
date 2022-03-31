import { get } from 'utils/Fetch';

export const getRoles = (role) => get('/users/getallrole');
//{
//   return {
//     data: [
//       {
//         id: 1,
//         name: 'Admin',
//       },
//       {
//         id: 2,
//         name: 'Sub Admin',
//       },
//       {
//         id: 5,
//         name: 'Warehouse Manager',
//       },
//       {
//         id: 4,
//         name: 'Accountant',
//       },
//       {
//         id: 3,
//         name: 'Client',
//       },

//       // {
//       //   id: 6,
//       //   name: 'Shipper',
//       // },
//     ],
//   };
// };
