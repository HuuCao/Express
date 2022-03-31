import { RECIPE } from 'consts';
import moment from 'moment';
export const decodeJWT = (_token) => {
  if (typeof _token !== 'string') {
    return false;
  }
  const _splitToken = _token.split('.');
  if (_splitToken.length !== 3) {
    return false;
  }
  try {
    const payload = JSON.parse(atob(_splitToken[1]));
    if (payload.role === 'client') {
      if (!payload.permissions) {
        payload.permissions = [];
      }
      payload.permissions = [
        ...payload.permissions,
        'SHOW_SHIPMENT',
        'CREATE_SHIPMENT',
      ];
    }
    return payload;
  } catch (error) {
    return null;
  }
};

export const composeAsync = (...fns) =>
  fns.reduce((f, g) => async (_params) => {
    const execute = g(_params);
    if (execute instanceof Promise) {
      const result = await execute;
      return f(result);
    }
    return f(execute);
  });

export const handleDataRole =
  (role) =>
  ({ data }) => {
    if (role === 'admin') {
      data = data.data.filter((record) => record.id > 1);
    } else if (role === 'subAdmin') {
      data = data.data.filter((record) => record.id > 2);
    } else data = [];

    return {
      status: 200,
      data: {
        data: [2, 5, 4, 3].map((e) => {
          return data.find((r) => r.id === e);
        }),
        totalRecord: data.length,
      },
    };
  };

export const convertDataCompany = (data) => {
  data['username'] = localStorage.getItem('username');
  data['companyName'] = data.name || data.viName;
  const displayField = {
    username: 'Username',
    customerId: 'Customer ID',
    name: 'Company EN name',
    jaName: 'Company JP name',
    romanji: 'Company JP name (Romanji)',
    address: 'Registered address',
    tel: 'Work phone',
    taxCode: 'Corporate Number (Tax ID / Hojin Bango)',
    expCode: 'Japan Shippers & Consignees Standard Code',
    pic: 'PIC',
    cellPhone: 'Cell phone',
  };

  let dataCompany = Object.keys(displayField).map((value, index) => {
    return {
      key: index + 1,
      information: displayField[value],
      value: data && data[value],
    };
  });
  return dataCompany;
};
export const convertDataUser = (data) => {
  const displayField = {
    username: 'Username',
    name: 'CS Name',
    position: 'Position',
    email: 'Email',
    tel: 'Work Phone',
  };

  let dataCompany = Object.keys(displayField).map((value, index) => {
    return {
      key: index + 1,
      information: displayField[value],
      value: data && data[value],
    };
  });
  return dataCompany;
};
export const convertDataPackageList = (data) => {
  let dataCompany =
    data &&
    data.map((value, index) => {
      return {
        key: index + 1,
        id: value.id,
        invoiceNo: value.invoiceNo,
        shippingFrom: value.shippingFrom,
        shippingTo: value.shippingTo,
        state: value.state,
        cs: value.cs,
        shippingDate: value.shippingDate,
      };
    });

  return dataCompany;
};
export const convertDataItem = (listItem) => {
  let dataItem = listItem.data.map((value, index) => {
    return {
      key: index + 1,
      id: index + 1,
      countryCode: value.countryCode,
      createdAt: value.createdAt,
      description: value.description,
      jaName: value.jaName,
      janCode: value.janCode,
      locker: value.locker,
      name: value.name,
      price: value.price,
      unit: value.unit,
      viName: value.viName,
    };
  });

  return dataItem;
};

export const debound = (fn, time = 1000) => {
  let timeout;
  return (...params) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...params);
    }, time);
  };
};

export const calculateWarningWeightperVolume = ({
  gross,
  height,
  width,
  length,
}) => {
  if (!Number(gross) || !Number(height) || !Number(width) || !Number(length)) {
    return true;
  }
  const score =
    (1000000 * Number(gross)) /
    (Number(height) * Number(width) * Number(length));

  return 100 > score || score > 300;
};

export const updateCostPackage = (pkg, recipeId) => {
  if (recipeId == RECIPE.KG) return pkg.net * pkg.height;
  if (recipeId == RECIPE.KG_VOLUME) return pkg.net * pkg.volume * pkg.height;
  return -1;
};

export function formatNumber(num, dot = ',') {
  return num
    ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${dot}`)
    : 0;
}

export const getTimeRange = (value) => {
  switch (value) {
    case 'to_day':
      return {
        from_date: moment().format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
      };
    case 'yesterday':
      return {
        from_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        to_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      };
    case 'this_week':
      return {
        from_date: moment().startOf('week').format('YYYY-MM-DD'),
        to_date: moment().endOf('week').format('YYYY-MM-DD'),
      };
    case 'last_week':
      return {
        from_date: moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .format('YYYY-MM-DD'),
        to_date: moment()
          .subtract(1, 'weeks')
          .endOf('week')
          .format('YYYY-MM-DD'),
      };
    case 'this_month':
      return {
        from_date: moment().startOf('month').format('YYYY-MM-DD'),
        to_date: moment().format('YYYY-MM-DD'),
      };
    case 'last_month':
      return {
        from_date: moment()
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYY-MM-DD'),
        to_date: moment()
          .subtract(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD'),
      };
    case 'this_year':
      return {
        from_date: moment().startOf('years').format('YYYY-MM-DD'),
        to_date: moment().endOf('years').format('YYYY-MM-DD'),
      };
    case 'last_year':
      return {
        from_date: moment()
          .subtract(1, 'year')
          .startOf('year')
          .format('YYYY-MM-DD'),
        to_date: moment()
          .subtract(1, 'year')
          .endOf('year')
          .format('YYYY-MM-DD'),
      };
    default:
      return {
        from_date: '',
        to_date: '',
      };
  }
};

export function removeNull(a) {
  return Object.keys(a)
    .filter((key) => a[key] !== '' && a[key] !== undefined)
    .reduce((res, key) => ((res[key] = a[key]), res), {});
}
