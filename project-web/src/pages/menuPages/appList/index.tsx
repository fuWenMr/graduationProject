import React from 'react';
import {
  Card,
  Input,
  Icon,
  Collapse,
} from 'antd';

import BarButtons from './components/barButtons';
import { Wrapper } from './style';

const { Panel } = Collapse;

class AppList extends React.Component {

  

  render() {

    const filterInput = <Input
      style={{width: '300px'}}
      placeholder="根据项目名或负责人筛选"
      suffix={<Icon type="search" />}
    />; // eslint-disable-line

    return <Wrapper>
      <Card
        bordered={false}
        title={<BarButtons />}
        extra={filterInput}
      >
        <Collapse defaultActiveKey={['0', '1']}>
          <Panel header="我负责的应用" key="0">1</Panel>
          <Panel header="我参与的应用" key="1">1</Panel>
        </Collapse>
      </Card>
    </Wrapper>
  }
}

export default AppList;
