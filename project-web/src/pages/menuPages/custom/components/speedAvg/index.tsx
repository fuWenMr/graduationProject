import React from 'react';
import { Card } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from "@antv/data-set";

import { chartDataFold } from '~/utils';

type IProps = {
  data: Array<any>,
  ticks: Array<string>,
}
const cols = {
  date: {
    alias: '时间段'
  },
  speedAvg: {
    alias: '均值'
  }
};
class SpeedAvg extends React.Component <IProps> {

  render() {
    const { data, ticks } = this.props
    const dv = chartDataFold(data, { ticks, tickKey: 'date', typeKey: 'speedKey', valueKey: 'speedAvg', DV: DataSet.View });
    
    console.log(dv.rows);

    return <>
      <Card
        title="speed均值"
        bordered={false}
      >
      {
        data.length === 0
        ? '空'
        : <Chart height={400} data={dv} scale={cols} padding={"auto"} forceFit>
        <Legend />
        <Axis
          line={{
            stroke: "rgb(213,213,213)"
          }}
          tickLine={{
            stroke: "rgb(213,213,213)",
            length:2 // 刻度线长度
          }}
          title
          name="speedAvg"
        />
        <Axis
          name="date"
          title={{ position: 'end' }}
        />

        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="line" position="date*speedAvg" size={2} color={'speedKey'} shape={'smooth'} />
      </Chart>
      }
      </Card>
    </>
  }
  
}

export default SpeedAvg;