module.exports.initialDataCreateOrder = [
    "order_status",
    "user_id",
    "customer_name",
    "code_bill",
    "total_quantity_package",
    "waybill_number",
    "description",
    "payment_help",
    "other_cost",
    "surcharge",
    "weight",
    "mass",
    "unit_price",
    "status_check",
    "shipping_partner_id"
];

module.exports.descriptorCreateOrder = {
    order_status: {
        type: 'string',
        enum: ['CameBack', 'Delivery', 'StackCar'],
        required: true
    },

    bill_number: {
        type: 'string',
        required: true
    },
    amount_package: {
        type: 'number',
        required: true
    },
    waybill_number: {
        type: 'string',
        required: true
    },
    user_id: {
        type: 'number',
        required: true
    },
    customer_name: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    payment_help: {
        type: 'double',
        required: true
    },
    other_cost: {
        type: 'double',
        required: true
    },
    surcharge: {
        type: 'double',
        required: true
    },
    weight: {
        type: 'float',
        required: true
    },
    mass: {
        type: 'float',
        required: true
    },
    unit_price: {
        type: 'double',
        required: true
    },
    status_check: {
        type: 'string',
        enum: ['Checked', 'Checking'],
        required: true
    },
    shipping_partner_id: {
        type: 'number',
        required: true
    },
}