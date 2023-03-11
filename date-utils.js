const dayjs = require('dayjs');
const weekOfYear = require('dayjs/plugin/weekOfYear');

dayjs.extend(weekOfYear);

exports.getTodayStr = () => {
    var today = new Date();
    var todayOptions = {weekday: "long", day: "numeric", month: "long", year: "numeric"};
    var currentWeekNumber = dayjs().week();

    return `Week ${currentWeekNumber}: ${today.toLocaleString("default", todayOptions)}`;
}