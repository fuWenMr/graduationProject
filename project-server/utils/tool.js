function getTimseTicks(
  dateEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12,
  resDateFormat,
  dbDateFormat
) {
  dbDateFormat = dbDateFormat || "yyyy-MM-dd HH:00:00";
  resDateFormat = resDateFormat || "MM/dd HH:00";
  const dateStart = new Date(dateEnd).addHours(-timeStep * steps);
  let date = new Date(dateStart);
  let dbDateTicks = [dateStart.toString(dbDateFormat)];
  let resDateTicks = [dateStart.toString(resDateFormat)];

  for (let i = 1; i <= steps; i++) {
    date.addHours(timeStep);
    dbDateTicks.push(date.toString(dbDateFormat));
    resDateTicks.push(date.toString(resDateFormat));
  }

  resDateTicks.pop();

  return {
    dbDateTicks,
    resDateTicks,
  };
}

module.exports = {
  getTimseTicks,
};
