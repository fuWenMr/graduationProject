import React from 'react';
import {
  Menu,
  Icon,
  Dropdown,
} from 'antd';
import { connectAlita } from 'redux-alita';
import { STATE_APP_LIST, STATE_CURRENT_APP } from '~/redux/reduxStateName';
import { getUserApps } from '~/ajax';
import { setStateData, clone } from '~/utils';
import { Wrapper } from './styled';

class ContentBar extends React.Component<any> {

  componentDidMount() {
    const {
      currentApp,
      setAlitaState,
    } = this.props;

    const getCurrentApp = (appList: any[]) => {
      let preCurrentApp: any;
      console.log('让我看看当前的app', currentApp );
      if ( currentApp && currentApp.data) {
        preCurrentApp = appList.find((app: any) => {
          return app.id === currentApp.data.id;
        }) || appList[0];
      } else {
        preCurrentApp = appList[0];
      }
      return JSON.parse(JSON.stringify(preCurrentApp));
    }

    // 在这里请求应用列表
 
      getUserApps().then((res: any) => {
        
        // 同步一下应用列表
        if (res.resType === 0) {
          setStateData(setAlitaState, STATE_APP_LIST, res.apps);
          // 确定当前应用
          setStateData(setAlitaState, STATE_CURRENT_APP, getCurrentApp(res.apps)); 
        }
      });
 
  }

  private handleChangeApp = (e: any) => {
    const {
      setAlitaState,
    } = this.props;
    const appList = this.props[STATE_APP_LIST] && this.props[STATE_APP_LIST].data;
    const nextAppId = e.key;
    const nextApp = appList && appList.find((app: any) => app.id === nextAppId);
    if (nextApp) {
      setStateData(setAlitaState, STATE_CURRENT_APP, clone(nextApp));
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  render() {
    const {
      appList,
      currentApp,
    } = this.props;
    console.log('看看applist', appList, currentApp);
    const currentId = currentApp ? currentApp.data.id : '0';
    const menu = (appList && appList.data.length > 1) 
      ? <Menu className="reset reset_antd" onClick={this.handleChangeApp}>
      {
        appList.data.map((app: any) => (currentId !== app.id ) && <Menu.Item key={app.id}>
          {app.appName}
        </Menu.Item>)
      }
      </Menu>
      : <Menu className="reset reset_antd">
          <Menu.Item disabled>空</Menu.Item>
        </Menu>;

    return <Wrapper>
      <div className="left">
        <Dropdown
          overlay={menu} 
          trigger={['click']}
        >
          <span>
          <span className="appName">{currentApp ? currentApp.data.appName : '----'}</span>
            <Icon type="caret-down" />
          </span>
        </Dropdown>
      </div>
    </Wrapper>
  }
}

export default connectAlita([STATE_CURRENT_APP, STATE_APP_LIST])(ContentBar);