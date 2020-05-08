const speedAvgData = [
  { speedKey: 't0', speedAvg: 0, date: '05/05 12:00' },
  { speedKey: 't0', speedAvg: 1064, date: '05/05 13:00' },
  { speedKey: 't2', speedAvg: 1987, date: '05/05 13:00' },
  { speedKey: 't3', speedAvg: 588, date: '05/05 13:00' },
  { speedKey: 't0', speedAvg: 1178, date: '05/05 14:00' },
  { speedKey: 't2', speedAvg: 865, date: '05/05 14:00' },
  { speedKey: 't3', speedAvg: 766, date: '05/05 14:00' },
  { speedKey: 't0', speedAvg: 840, date: '05/05 15:00' },
  { speedKey: 't2', speedAvg: 943, date: '05/05 15:00' },
  { speedKey: 't3', speedAvg: 1266, date: '05/05 15:00' },
  { speedKey: 't0', speedAvg: 889, date: '05/05 16:00' },
  { speedKey: 't2', speedAvg: 411, date: '05/05 16:00' },
  { speedKey: 't3', speedAvg: 1210, date: '05/05 16:00' },
  { speedKey: 't0', speedAvg: 906, date: '05/05 17:00' },
  { speedKey: 't2', speedAvg: 1464, date: '05/05 17:00' },
  { speedKey: 't0', speedAvg: 983, date: '05/05 18:00' },
  { speedKey: 't2', speedAvg: 1253, date: '05/05 18:00' },
  { speedKey: 't3', speedAvg: 763, date: '05/05 18:00' },
  { speedKey: 't0', speedAvg: 961, date: '05/05 19:00' },
  { speedKey: 't2', speedAvg: 942, date: '05/05 19:00' },
  { speedKey: 't3', speedAvg: 726, date: '05/05 19:00' },
  { speedKey: 't0', speedAvg: 861, date: '05/05 20:00' },
  { speedKey: 't2', speedAvg: 917, date: '05/05 20:00' },
  { speedKey: 't3', speedAvg: 0, date: '05/05 20:00' },
  { speedKey: 't0', speedAvg: 0, date: '05/05 21:00' },
  { speedKey: 't2', speedAvg: 565, date: '05/05 21:00' },
  { speedKey: 't3', speedAvg: 0, date: '05/05 21:00' },
  { speedKey: 't2', speedAvg: 1965, date: '05/05 22:00' },
  { speedKey: 't3', speedAvg: 1205, date: '05/05 22:00' },
  { speedKey: 't4', speedAvg: 1205, date: '05/05 22:00' }
];

export const getSpeedAvgData_ = () => {
  return JSON.parse(JSON.stringify(speedAvgData));
}

export const ticks_ = [
  '05/05 11:00','05/05 12:00','05/05 13:00','05/05 14:00',
  '05/05 15:00','05/05 16:00','05/05 17:00','05/05 18:00',
  '05/05 19:00','05/05 20:00','05/05 21:00','05/05 22:00'
];
