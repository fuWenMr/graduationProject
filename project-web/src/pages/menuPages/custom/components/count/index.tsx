import React from 'react';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';
import {
  getCountGroups,
} from '~/ajax';

import CountData from '../countData';
import CountGroupManage from '../countGroupManage';

type typeStr = 'add'|'change'|'del';
type Group = {
  type?: typeStr;
  groupKey: string;
  items: Array<string>;
};

class Count extends React.Component<any> {
  state = {
    countGroups: [] as Array<Group>,
  };

  private hasApp = false;

  componentDidMount() {this.getCountGroups();}
  componentDidUpdate() {this.getCountGroups();}

  // 拉取分组
  private getCountGroups(force = false) {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    if (force || !this.hasApp) {
      if(currentApp) {
        getCountGroups(currentApp.id).then((res: any) => {
          if (res.resType === 0) {
            const countGroups = res.countGroups;
            console.log('countGroups', countGroups)
            countGroups.forEach((t :any) => {
              t.items = JSON.parse(t.items);
            })
            this.setState({ countGroups, currentGroup: countGroups[0] || {} });
            return ;
          }
        });
        this.hasApp = true;
      }
    }
  }

  render() {
    const { countGroups } = this.state;
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    // eslint-disable-next-line
    const appId = currentApp && currentApp.id || '';
    return <>
      <CountData
        countGroups={countGroups}
        appId={appId}
      />
      <CountGroupManage
        countGroups={countGroups}
        appId={appId}
      />
    </>;
  }
}

export default connectAlita([STATE_CURRENT_APP])(Count);
