import React from 'react';
import { Card } from 'antd';
import Count from '../count';
import Speed from '../speed';

const tabList = [{key:'count',tab:'计数类'},{key:'speed',tab:'计速类'}];

class CustomChart extends React.Component {
  
  state = {
    activeTabKey:'count',
  };

  private handleOnTabChange = (key: string) => {
    this.setState({activeTabKey: key});
  }

  render() {
    const { activeTabKey } = this.state;
    return <div className="custom_chart">
      <Card
        tabList={tabList}
        activeTabKey={activeTabKey}
        bodyStyle={{minHeight:'800px'}}
        onTabChange={this.handleOnTabChange}
      >
        {activeTabKey === 'count' && <Count />}
        {activeTabKey === 'speed' && <Speed />}
      </Card>
    </div>
  }
}

export default CustomChart;
