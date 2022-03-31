export const orderConvertFields = (data, reverse = false) => {
  const template = {
    date_sign: 'THỜI GIAN KÝ NHẬN',
    code_bill: ' MÃ BILL',
    // order_status: 'Trạng thái đơn hàng',
    customer_code: 'MÃ KHÁCH HÀNG',
    total_quantity_package: 'SL KIỆN',
    tracking_number: 'SỐ VẬN ĐƠN',
    description: 'MÔ TẢ SẢN PHẨM',
    cod: 'THANH TOÁN HỘ',
    bag: 'ĐÓNG GỖ/ĐÓNG TẢI',
    fee_package: 'PHÍ NÂNG HÀNG',
    sub_fee: 'PHỤ PHÍ',
    volume: 'TRỌNG LƯỢNG',
    mass: 'KHỐI LƯỢNG',
    origin_cost: 'GIÁ VỐN',
    // shipping_partner_id: 'Mã đối tác vận chuyển',
  };
  if (reverse) {
    return Object.keys(template).reduce(
      (a, b) => ((a[template[b]] = data[b]), a),
      {}
    );
  }
  return Object.keys(template).reduce(
    (a, b) => ((a[b] = data[template[b]]), a),
    {}
  );
};
