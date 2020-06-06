
import React from 'react';
import { Card } from 'antd';

import FChartPv from './fchart_1';
// import FChartUv from './fchart_2';
// import FChart_allpage from './fchart_3';

type IProps = {
  pvSumCount: number,
  dataSource: any[],
}
class pvDistributionView extends React.Component<IProps> {
  
  render() {
    const { dataSource, pvSumCount } = this.props;
    return <Card bordered={false} title="访问分布">
      <div className="distribution_view">
        <FChartPv
          pvSumCount={pvSumCount}
          dataSource={dataSource}
        />
        {/* <FChartUv
          dataSource={dataSource}
        /> */}
      </div>
    </Card>
  }
}

export default pvDistributionView;
