import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from "@antv/data-set";

import { complementWithTicks } from '~/utils';

type IProps = {
  dataSource: any[],
  ticks: string[];
}

class FChart extends React.Component<IProps>{

  render() {
    const {
      dataSource,
      ticks,
    } = this.props;

    const data = complementWithTicks(dataSource, ticks, 'date');
    const dv = new DataSet.View().source(data).transform({
      type: "fold",
      fields: ['pv', 'uv'],
      key: 'type',
      value: 'count',
    });


    // 纵向补全之后横向展开

    return <div className="chart_view">
      <Chart height={400} data={dv} forceFit>
        <Legend />
        <Axis name="count" />
        <Axis name="date" />

        <Tooltip />
        <Geom
          type="line"
          position="date*count"
          size={2}
          color={'type'}
          shape={'smooth'}
        />
        <Geom
          type="point"
          position="date*count"
          size={2}
          shape={'circle'}
          color={'type'}
          style={{
            stroke: '#fff',
            lineWidth: 1,
          }}
        />
      </Chart>
    </div>
  }
}

export default FChart;
