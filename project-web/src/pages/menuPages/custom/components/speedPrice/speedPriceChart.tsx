import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

import { chartDataFold } from '~/utils'

type IProps = {
  data: Array<any>,
  ticks: Array<string>
};

const scale = {
  speed: {
    alias: '时间/ms'
  },
  date: {
    alias: '时间段'
  }
}

const areaColor = ['price', (d?: any) => {
  return ({
    30: '#a0d911',
    60: '#13c2c2',
    80: '#2f54eb',
    90: '#faad14',
    95: '#fa541c',
  } as any)[d] as string;
}] as [string, (d?: any)=> string];
const lineColor = ['price', (d?: any) => {
  return ({
    30: '#52c41a',
    60: '#1890ff',
    80: '#722ed1',
    90: '#fa8c16',
    95: '#f5222d',
  } as any)[d] as string;
}] as [string, (d?: any)=> string];;


class Areanull extends React.Component<IProps> {
  render() {
    const {
      data,
      ticks,
    } = this.props;

    let dv = chartDataFold(data, {ticks, tickKey: 'date', typeKey: 'price', valueKey: 'speed', DV: DataSet.View });


    return (
      <div>
        <Chart
          height={400}
          data={dv}
          padding={"auto"}
          scale={scale}
          forceFit
        >
          <Tooltip />
          
          <Axis
            title
            name="speed"
          />
          <Axis
            title
            name="date" 
          />

          <Geom
            type="line"
            position="date*speed"
            color={lineColor}
            size={1}
            tooltip={['speed*date*price', (speed, date, price) => {
              return {
                title: date,
                name: `${price}分位值`,
                value: speed,
              }
            }]}
            opacity={0.9}
          />
          <Legend
            marker="square"
          />
          <Geom 
            type="area"
            position="date*speed"
            color={areaColor}
            opacity={0.9}
            tooltip={false}
          />

        </Chart>
      </div>
    );
  }
}

export default Areanull;
