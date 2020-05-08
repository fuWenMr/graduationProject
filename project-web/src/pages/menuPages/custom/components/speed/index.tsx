import React from 'react';
import { connectAlita } from 'redux-alita';

import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';
import { getSpeedAvg } from '~/ajax';

import SpeedAvg from '../speedAvg';
import SpeedPrice from '../speedPrice';

// import { getSpeedAvgData_, ticks_ } from './data'

class Speed extends React.Component<any> {
  private hasRequested = false;
  state = {
    speedAvgData: [],
    ticks: [],
  }


  componentWillMount() {this.checkApp();}
  componentDidUpdate() {this.checkApp();}

  // 把数据洗一遍成标准格式
  private setSpeedAvgData(data: Array<any>, ticks: Array<string>) {
    let speedAvgData = data;
    this.setState({ speedAvgData, ticks });
  } 

  private checkApp() {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    if (!this.hasRequested && currentApp) {
      // 发请求
      getSpeedAvg(currentApp.id).then((res: any) => {
        console.log('成功拿到数据了', res);
        if (res.resType === 0) {
          const { data, ticks } = res;
          this.setSpeedAvgData(data, ticks);
        
        }
      }).finally(() => {
        // const data = getSpeedAvgData_();
        // this.setSpeedAvgData(data, ticks)
      });
      this.hasRequested = true;
    }
  }

  render() {
    const {
      speedAvgData,
      ticks,
    } = this.state;
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
      
    return <>
      <SpeedAvg
        data={speedAvgData}
        ticks={ticks}
      />
      <SpeedPrice
        appId={currentApp ? currentApp.id : ''}
      />
    </>;
  }
}

export default connectAlita([STATE_CURRENT_APP])(Speed);
