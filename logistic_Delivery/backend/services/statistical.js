const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const order = logisticDB.order;
const user = logisticDB.user;
const shipping_partner = logisticDB.shipping_partner;
const Op = Sequelize.Op;
const utils = require("../utils/filtertime");
const _ = require("lodash");
var axios = require("axios");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
const { reject, result, countBy } = require("lodash");
const { userInfo } = require("os");
const {filter} = require("../utils/filtertime")
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.getTotalCharge = async (req, res, next) => {
    try {
        if(req.user.role == 'admin'){
            //count order
            var dataOrder = await order.findAll({});

            if (req.query.today != null) {
                dataOrder = _.filter(dataOrder, (o) => {
                  if (
                    moment(o.created_at).format("YYYY/MM/DD").toString() ===
                    moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                  )
                    return o;
                });
            }
            if (req.query.yesterday != null) {
            dataOrder = _.filter(dataOrder, (o) => {
                if (
                moment(o.created_at).format("YYYY-MM-DD").toString() ===
                moment()
                    .subtract(1, "days")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("YYYY-MM-DD")
                    .toString()
                )
                return o;
            });
            }
            if (req.query.this_week != undefined) {
            dataOrder = _.filter(dataOrder, (o) => {
                if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
                if (
                    moment(o.created_at).unix() >=
                    moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(1, "days")
                    .day(1)
                    .hour(0)
                    .minute(0)
                    .unix()
                )
                    return o;
                } else {
                if (
                    moment(o.created_at).unix() >=
                    moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
                )
                    return o;
                }
            });
            }
            if (req.query.last_week != undefined) {
            dataOrder = _.filter(dataOrder, (o) => {
                if (
                moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
                    moment(o.created_at).unix() &&
                moment(o.created_at).unix() >=
                    moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(7, "day")
                    .day(1)
                    .hour(0)
                    .minute(0)
                    .unix()
                )
                return o;
            });
            }
            if (req.query.this_month != null) {
            var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
            dataOrder = _.filter(dataOrder, (o) => {
                if (moment(o.created_at).format("MM") == month) return o;
            });
            }
            if (req.query.last_month != null) {
            var month = moment()
                .subtract(1, "months")
                .tz("Asia/Ho_Chi_Minh")
                .format("MM");
            dataOrder = _.filter(dataOrder, (o) => {
                if (moment(o.created_at).format("MM") == month) return o;
            });
            }
            if (req.query.this_year != null) {
            var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
            dataOrder = _.filter(dataOrder, (o) => {
                if (moment(o.created_at).format("YYYY") == year) return o;
            });
            }
            if (req.query.last_year != null) {
            var year = moment()
                .tz("Asia/Ho_Chi_Minh")
                .subtract(1, "year")
                .format("YYYY");
            dataOrder = _.filter(dataOrder, (o) => {
                if (moment(o.created_at).format("YYYY") == year) return o;
            });
            }
            if (req.query.startDate != undefined && req.query.endDate != undefined) {
            var endDate = moment(req.query.endDate).add(1, "day");
            dataOrder = _.filter(dataOrder, (o) => {
                if (
                moment(o.created_at).unix() <= endDate.unix() &&
                moment(o.created_at).unix() >= moment(req.query.startDate).unix()
                ) {
                return o;
                }
            });
            }

            var countOrder = dataOrder.length;

            //Tổng cước đã thanh toán
            var totalChecked = await order.findAll({
                where: {
                    status_check: 'Checked'
                }
            })
            if (req.query.today != null) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                        moment(o.created_at).format("YYYY/MM/DD").toString() ===
                        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                    )
                    return o;
                });
            }
            if (req.query.yesterday != null) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                    moment(o.created_at).format("YYYY-MM-DD").toString() ===
                    moment()
                        .subtract(1, "days")
                        .tz("Asia/Ho_Chi_Minh")
                        .format("YYYY-MM-DD")
                        .toString()
                    )
                    return o;
                });
            }
            if (req.query.this_week != undefined) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
                    if (
                        moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(1, "days")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                        return o;
                    } else {
                    if (
                        moment(o.created_at).unix() >=
                        moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
                    )
                        return o;
                    }
                });
            }
            if (req.query.last_week != undefined) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                    moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
                        moment(o.created_at).unix() &&
                    moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(7, "day")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                    return o;
                });
            }
            if (req.query.this_month != null) {
                var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.last_month != null) {
                var month = moment()
                    .subtract(1, "months")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("MM");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.this_year != null) {
                var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.last_year != null) {
                var year = moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(1, "year")
                    .format("YYYY");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.startDate != undefined && req.query.endDate != undefined) {
                var endDate = moment(req.query.endDate).add(1, "day");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                        moment(o.created_at).unix() <= endDate.unix() &&
                        moment(o.created_at).unix() >= moment(req.query.startDate).unix()
                    ) {
                    return o;
                    }
                });
            }
            
            totalChecked = _.sumBy(totalChecked, (o) => {
                return (o.sub_fee + o.unit_price) * o.volume + o.other_cost
            })
            
            //Tổng cước chưa thanh toán
            var totalChecking = await order.findAll({
                where: {
                    status_check: 'Checking'
                }
            })
            if (req.query.today != null) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                        moment(o.created_at).format("YYYY/MM/DD").toString() ===
                        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                    )
                    return o;
                });
            }
            if (req.query.yesterday != null) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                    moment(o.created_at).format("YYYY-MM-DD").toString() ===
                    moment()
                        .subtract(1, "days")
                        .tz("Asia/Ho_Chi_Minh")
                        .format("YYYY-MM-DD")
                        .toString()
                    )
                    return o;
                });
            }
            if (req.query.this_week != undefined) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
                    if (
                        moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(1, "days")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                        return o;
                    } else {
                    if (
                        moment(o.created_at).unix() >=
                        moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
                    )
                        return o;
                    }
                });
            }
            if (req.query.last_week != undefined) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                    moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
                        moment(o.created_at).unix() &&
                    moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(7, "day")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                    return o;
                });
            }
            if (req.query.this_month != null) {
                var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.last_month != null) {
                var month = moment()
                    .subtract(1, "months")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("MM");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.this_year != null) {
                var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.last_year != null) {
                var year = moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(1, "year")
                    .format("YYYY");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.startDate != undefined && req.query.endDate != undefined) {
                var endDate = moment(req.query.endDate).add(1, "day");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                        moment(o.created_at).unix() <= endDate.unix() &&
                        moment(o.created_at).unix() >= moment(req.query.startDate).unix()
                    ) {
                    return o;
                    }
                });
            }

            totalChecking = _.sumBy(totalChecking, (o) => {
                return (o.sub_fee + o.unit_price) * o.volume + o.other_cost
            })

            //Tổng tổng công nợ khách hàng
            var totalDebitCus = await user.findAll({});
            totalDebitCus = _.sumBy(totalDebitCus, (o) => {
                return o.sum_debit;
            })

            //Tổng tổng công nợ nhà vận chuyển
            var totalDebitShipping = await shipping_partner.findAll({});
            console.log(totalDebitShipping);
            totalDebitShipping = _.sumBy(totalDebitShipping, (o) => {
                return o.debit;
            })
            
            //=====================================================================================================
            var dataOrder = await order.findAll({});
            let todayOrder = [];
            todayOrder = _.filter(dataOrder, (o) => {
                if (
                moment(o.created_at).format("YYYY/MM/DD").toString() ===
                moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                )
                return o;
            });
            let _today = {};
            for(let i = 0; i <= 16; i++){
                _today[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
            }
            todayOrder.map((order) => {
                let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
                if(_today[time] != undefined)
                _today[time] += 1
            })
            let today = {name: "Đơn hàng hôm nay", data: _today};
            let yesterdayOrder = [];
            yesterdayOrder = _.filter(dataOrder, (o) => {
                if (
                moment(o.created_at).format("YYYY-MM-DD").toString() ===
                moment()
                    .subtract(1, "days")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("YYYY-MM-DD")
                    .toString()
                )
                return o;
            });
            let _yesterday = {};
            for(let i = 0; i <= 16; i++){
                _yesterday[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
            }
            yesterdayOrder.map((order) => {
                let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
                if(_yesterday[time] != undefined)
                _yesterday[time] += 1
            })
            let yesterday = {name: "Đơn hàng hôm qua", data: _yesterday};
            let data = [];
            data.push(today);
            data.push(yesterday);

            res.send({
                success: true,
                countOrder: countOrder,
                totalChecked: totalChecked,
                totalChecking: totalChecking,
                totalDebitCus: totalDebitCus,
                totalDebitShipping: totalDebitShipping,
                data
            })
        }
//===============================================================================//
        if(req.user.role == 'customer'){
            //count order
            var countOrder = await order.count({
                where: {
                    user_id: req.user.user_id
                },
            });
            //Tổng cước đã thanh toán
            var totalChecked = await order.findAll({
                where: {
                    status_check: 'Checked',
                    user_id: req.user.user_id
                }
            })
            if (req.query.today != null) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                        moment(o.created_at).format("YYYY/MM/DD").toString() ===
                        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                    )
                    return o;
                });
            }
            if (req.query.yesterday != null) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                    moment(o.created_at).format("YYYY-MM-DD").toString() ===
                    moment()
                        .subtract(1, "days")
                        .tz("Asia/Ho_Chi_Minh")
                        .format("YYYY-MM-DD")
                        .toString()
                    )
                    return o;
                });
            }
            if (req.query.this_week != undefined) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
                    if (
                        moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(1, "days")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                        return o;
                    } else {
                    if (
                        moment(o.created_at).unix() >=
                        moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
                    )
                        return o;
                    }
                });
            }
            if (req.query.last_week != undefined) {
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                    moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
                        moment(o.created_at).unix() &&
                    moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(7, "day")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                    return o;
                });
            }
            if (req.query.this_month != null) {
                var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.last_month != null) {
                var month = moment()
                    .subtract(1, "months")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("MM");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.this_year != null) {
                var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.last_year != null) {
                var year = moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(1, "year")
                    .format("YYYY");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.startDate != undefined && req.query.endDate != undefined) {
                var endDate = moment(req.query.endDate).add(1, "day");
                totalChecked = _.filter(totalChecked, (o) => {
                    if (
                        moment(o.created_at).unix() <= endDate.unix() &&
                        moment(o.created_at).unix() >= moment(req.query.startDate).unix()
                    ) {
                    return o;
                    }
                });
            }
            totalChecked = _.sumBy(totalChecked, (o) => {
                return (o.surcharge + o.unit_price) * o.weight + o.other_cost
            })
            
            //Tổng cước chưa thanh toán
            var totalChecking = await order.findAll({
                where: {
                    status_check: 'Checking',
                    user_id: req.user.user_id
                }
            })
            if (req.query.today != null) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                        moment(o.created_at).format("YYYY/MM/DD").toString() ===
                        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                    )
                    return o;
                });
            }
            if (req.query.yesterday != null) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                    moment(o.created_at).format("YYYY-MM-DD").toString() ===
                    moment()
                        .subtract(1, "days")
                        .tz("Asia/Ho_Chi_Minh")
                        .format("YYYY-MM-DD")
                        .toString()
                    )
                    return o;
                });
            }
            if (req.query.this_week != undefined) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
                    if (
                        moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(1, "days")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                        return o;
                    } else {
                    if (
                        moment(o.created_at).unix() >=
                        moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
                    )
                        return o;
                    }
                });
            }
            if (req.query.last_week != undefined) {
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                    moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
                        moment(o.created_at).unix() &&
                    moment(o.created_at).unix() >=
                        moment()
                        .tz("Asia/Ho_Chi_Minh")
                        .subtract(7, "day")
                        .day(1)
                        .hour(0)
                        .minute(0)
                        .unix()
                    )
                    return o;
                });
            }
            if (req.query.this_month != null) {
                var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.last_month != null) {
                var month = moment()
                    .subtract(1, "months")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("MM");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("MM") == month) return o;
                });
            }
            if (req.query.this_year != null) {
                var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.last_year != null) {
                var year = moment()
                    .tz("Asia/Ho_Chi_Minh")
                    .subtract(1, "year")
                    .format("YYYY");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (moment(o.created_at).format("YYYY") == year) return o;
                });
            }
            if (req.query.startDate != undefined && req.query.endDate != undefined) {
                var endDate = moment(req.query.endDate).add(1, "day");
                totalChecking = _.filter(totalChecking, (o) => {
                    if (
                        moment(o.created_at).unix() <= endDate.unix() &&
                        moment(o.created_at).unix() >= moment(req.query.startDate).unix()
                    ) {
                    return o;
                    }
                });
            }
            totalChecking = _.sumBy(totalChecking, (o) => {
                return (o.surcharge + o.unit_price) * o.weight + o.other_cost
            })

            //===========================================
            var dataOrder = await order.findAll({
                where: {
                    user_id: req.user.user_id
                }
            });
            let todayOrder = [];
            todayOrder = _.filter(dataOrder, (o) => {
                if (
                    moment(o.created_at).format("YYYY/MM/DD").toString() ===
                    moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
                )
                return o;
            });
            let _today = {};
            for(let i = 0; i <= 16; i++){
                _today[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
            }
            todayOrder.map((order) => {
                let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
                if(_today[time] != undefined)
                _today[time] += 1
            })
            let today = {name: "Đơn hàng hôm nay", data: _today};
            let yesterdayOrder = [];
            yesterdayOrder = _.filter(dataOrder, (o) => {
                if (
                moment(o.created_at).format("YYYY-MM-DD").toString() ===
                moment()
                    .subtract(1, "days")
                    .tz("Asia/Ho_Chi_Minh")
                    .format("YYYY-MM-DD")
                    .toString()
                )
                return o;
            });
            let _yesterday = {};
            for(let i = 0; i <= 16; i++){
                _yesterday[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
            }
            yesterdayOrder.map((order) => {
                let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
                if(_yesterday[time] != undefined)
                _yesterday[time] += 1
            })
            let yesterday = {name: "Đơn hàng hôm qua", data: _yesterday};
            let data = [];
            data.push(today);
            data.push(yesterday);

            res.send({
                success: true,
                countOrder: countOrder,
                totalChecked: totalChecked,
                totalChecking: totalChecking,
                data
            })
        }
    
    }
    catch (err) {
      res.send({ success: false, mess: "Error: " + err })
    }
};

module.exports.countOrder = async (req, res, next) => {
    var dataOrder = await order.findAll({
        where: {
            user_id: req.user.user_id
        }
    });
    let todayOrder = [];
    todayOrder = _.filter(dataOrder, (o) => {
        if (
        moment(o.created_at).format("YYYY/MM/DD").toString() ===
        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
        )
        return o;
    });
    let _today = {};
    for(let i = 0; i <= 16; i++){
        _today[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
    }
    todayOrder.map((order) => {
        let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
        if(_today[time] != undefined)
        _today[time] += 1
    })
    let today = {name: "Đơn hàng hôm nay", data: _today};
    let yesterdayOrder = [];
    yesterdayOrder = _.filter(dataOrder, (o) => {
        if (
        moment(o.created_at).format("YYYY-MM-DD").toString() ===
        moment()
            .subtract(1, "days")
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD")
            .toString()
        )
        return o;
    });
    let _yesterday = {};
    for(let i = 0; i <= 16; i++){
        _yesterday[moment("07", "HH").add(i, "hours").format("HH:00")] = 0
    }
    yesterdayOrder.map((order) => {
        let time = moment(order.created_at).subtract(7, "hours").format("HH:00")
        if(_yesterday[time] != undefined)
        _yesterday[time] += 1
    })
    let yesterday = {name: "Đơn hàng hôm qua", data: _yesterday};
    let data = [];
    data.push(today);
    data.push(yesterday);
    res.send({ success: true, data })
}

module.exports.orderLookup = async (req, res, next) => {
    try {
        var dataOrder = await order.findAll({});
        if (req.query.code_bill != undefined) {
            dataOrder = _.filter(dataOrder, (o) => {
              if (o.code_bill == undefined) o.code_bill = "";
              if (
                new String(o.code_bill.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                  .toLocaleLowerCase()
                  .includes(
                    req.query.code_bill
                      .toLocaleLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  )
              )
                return o;
            });
        }
        res.send({ success: true, data: dataOrder })
    }
    catch (err) {
        res.send({ success: false, mess: "Error: " + err })
    }
}