import React from 'react';
import {
  Card,
  Empty,
} from 'antd';

import FChart from './chart'

type IProps = {
  data: any[],
  ticks: string[],
};
class ApiTimeSpend extends React.Component<IProps> {

  render() {
    const {
      data,
      ticks,
    } = this.props
    return <Card title="api性能分布">
      {
        data.length === 0
        ? <Empty description="暂无数据" />
        : <FChart
            data={data}
            ticks={ticks}
          />
      }
    </Card>;
  }
}

export default ApiTimeSpend;
