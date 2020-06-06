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
      ticks,
    } = this.props;
    let dv = chartDataFold(data, {
      ticks,
      tickKey: 'date',
      typeKey: 'type',
      valueKey: 'sum',
      DV: DataSet.View,
    });
    let rows = dv.rows;
    for (let row of rows) {
      if (row.type === 'error') {
        row.type = '报错总数';
      } else if (row.type === 'errorPv') {
        row.type = '受影响访问数';
      }
    }
    console.log('看看效果', dv.rows)
    return <>
      {
        data.length > 0 && (
          <Chart height={400} data={rows} padding={"auto"} forceFit>
            <Axis
              name="sum"
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
            <Legend
              position={'right'}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              type="interval"
              position="date*sum"
              size={15}
              color={['type', ['red', 'orange']]}
              shape={'smooth'}
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 1 / 32,
                }
              ]}
            />
          </Chart>
        )
      }
    </>
  }
}

export default FChart;
