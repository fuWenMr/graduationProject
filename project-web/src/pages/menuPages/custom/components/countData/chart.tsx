import React from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from 'bizcharts';
import DataSet from "@antv/data-set";

import { chartDataFold } from '~/utils';

type IProps = {
  data: Array<any>
  ticks: Array<string>
}

class FChart extends React.Component<IProps> {

  render() {
    const {
      data,
      ticks
    } = this.props;
    console.log('数据？');
    console.log(ticks, data)
    let dv = chartDataFold(data, {
      ticks,
      tickKey: 'date',
      typeKey: 'countKey',
      valueKey: 'count',
      DV: DataSet.View,
    });
    return <>
      {
        data.length > 0 && (
          <Chart height={400} data={dv} padding={"auto"} forceFit>
            <Legend
              marker="circle"
            />
            <Axis
              name="count"
              line={{
                stroke: "rgb(213,213,213)"
              }}
              tickLine={{
                stroke: "rgb(213,213,213)",
                length:2 // 刻度线长度
              }}
              title
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
            <Geom
              type="line"
              position="date*count"
              size={2}
              color={'countKey'}
              shape={'smooth'} 
            />
          </Chart>
        )
      }
    </>
  }
}

export default FChart;
