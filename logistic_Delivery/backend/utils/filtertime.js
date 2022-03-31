const _ = require("lodash");
const moment = require("moment-timezone");

function getWeekDates(today) {
  let now = new Date(today);
  let dayOfWeek = now.getDay(); //0-6
  dayOfWeek++;
  let numDay = now.getDate();

  let start = new Date(now); //copy
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  let end = new Date(now); //copy
  end.setDate(numDay + (7 - dayOfWeek));

  end.setHours(0, 0, 0, 0);

  return [start, end];
}

module.exports.filter = (responsive, params, timezone) => {

  if (params.custom_date != undefined) {
    responsive = _.filter(responsive, (o) => {
      if (
        new Date(params.custom_date).getFullYear() ==
          new Date(o.time_created).getFullYear() &&
        new Date(params.custom_date).getMonth() ==
          new Date(o.time_created).getMonth() &&
        new Date(params.custom_date).getDate() ==
          new Date(o.time_created).getDate()
      )
        return o;
    });
  }
  if (params.today != undefined) {
    responsive = _.filter(responsive, (o) => {
      if (
        moment(o.created_at).format("YYYY/MM/DD").toString() ===
        moment().tz(timezone).format("YYYY/MM/DD").toString()
      )
        return o;
    });
  }
  if (params.yesterday != undefined) {
    responsive = _.filter(responsive, (o) => {
      if (
        moment(o.time_created).format("YYYY/MM/DD").toString() ===
        moment()
          .subtract(1, "days")
          .tz(timezone)
          .format("YYYY/MM/DD")
          .toString()
      )
        return o;
    });
  }
  if (params.this_week != undefined) {
    var today = moment().tz(timezone).format("yyyy/MM/DD");
    let [startW, endW] = getWeekDates(today);
    responsive = _.filter(responsive, (o) => {
      if (
        moment(o.time_created).unix() >=
          moment(startW).tz(timezone).unix() &&
        moment(endW).tz(timezone).unix() >=
          moment(o.time_created).tz(timezone).unix()
      )
        return o;
    });
  }
  if (params.last_week != undefined) {
    var today = moment()
      .subtract(7, "days")
      .tz(timezone)
      .format("yyyy/MM/DD");

    let [startW, endW] = getWeekDates(today);
    responsive = _.filter(responsive, (o) => {
      if (
        moment(o.time_created).unix() >= moment(startW).unix() &&
        moment(endW).unix() >= moment(o.time_created).unix()
      )
        return o;
    });
  }
  if (params.this_month != undefined) {
    var month = moment().tz(timezone).format("MM");
    responsive = _.filter(responsive, (o) => {
      if (moment(o.time_created).format("MM") == month) return o;
    });
  }
  if (params.last_month != undefined) {
    var month = moment()
      .subtract(1, "months")
      .tz(timezone)
      .format("MM");
    responsive = _.filter(responsive, (o) => {
      if (moment(o.time_created).format("MM") == month) return o;
    });
  }
  if (params.this_year != undefined) {
    var year = moment().tz(timezone).format("yyyy");
    responsive = _.filter(responsive, (o) => {
      if (moment(o.time_created).format("yyyy") == year) return o;
    });
  }
  if (params.last_year != undefined) {
    var year = moment()
      .tz(timezone)
      .subtract(1, "year")
      .format("yyyy");
    responsive = _.filter(responsive, (o) => {
      if (moment(o.time_created).format("yyyy") == year) return o;
    });
  }
  if (params.startDate != undefined && params.endDate != undefined) {
    var endDate = moment(params.endDate).add(1, "day");
    responsive = _.filter(responsive, (o) => {
      if (
        moment(o.created_at).unix() <= endDate.unix() &&
        moment(o.created_at).unix() >= moment(params.startDate).unix()
      )
        return o;
    });
  }
  return responsive;
};


