import React from 'react';
import {
  Card,
  Input,
  Icon,
  Collapse,
} from 'antd';
import { connectAlita } from 'redux-alita';
import {
  STATE_USER,
  STATE_APP_LIST,
} from '~/redux/reduxStateName';
import AdminTable from './components/adminTable';
import JoinTable from './components/joinTable';

import BarButtons from './components/barButtons';
import { Wrapper } from './style';

const { Panel } = Collapse;

class AppList extends React.Component<any> {
  state = {
    keyWord: '',
  };
  keyWordInput = React.createRef() as React.RefObject<any>

  setKeyWord = () => {
    this.setState({
      keyWord: this.keyWordInput.current.input.value.trim(),
    });
  }

  render() {
    const { keyWord } = this.state; 
    // eslint-disable-next-line
    const appList = this.props[STATE_APP_LIST] && this.props[STATE_APP_LIST].data || [];
    // eslint-disable-next-line
    const user = this.props[STATE_USER] && this.props[STATE_USER].data;
    // eslint-disable-next-line
    const userName = user && user.userName || '';

    let adminApps = [] as any[];
    let joinApps = [] as any[];
    appList.forEach((app: any) => {
      try {
        if ((keyWord && (!app.owner.includes(keyWord) && !app.appName.includes(keyWord) ))) {
          return ;
        }
      } catch (e) {
        setTimeout(() => { throw e } ,0)
      }
      if (app.owner === userName) {
        adminApps.push(app);
      } else {
        joinApps.push(app);
      } 
    });
    
    console.log('admin', adminApps);
    console.log('join', joinApps);

    const filterInput = <Input
      ref={this.keyWordInput}
      style={{width: '300px'}}
      placeholder="根据项目名或负责人筛选"
      suffix={<Icon className="_click" type="search" onClick={this.setKeyWord} />}
    />; // eslint-disable-line

    return <Wrapper>
      <Card
        bordered={false}
        title={<BarButtons apps={appList} />}
        extra={filterInput}
      >
        <Collapse defaultActiveKey={['0', '1']}>
          <Panel header={`我负责的项目（${adminApps.length}）`} key="0">
            <AdminTable
              appList={adminApps}
            />
          </Panel>
          <Panel header={`我参与的项目（${joinApps.length}）`} key="1">
            <JoinTable
              appList={joinApps}
            />
          </Panel>
        </Collapse>
      </Card>
    </Wrapper>
  }
}

export default connectAlita([STATE_APP_LIST, STATE_USER])(AppList);
