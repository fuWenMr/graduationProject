import React from 'react';

import {
  getApiErrorLog,
  getApiData,
  getApiSpeedPrice,
} from '~/ajax';
import { clone } from '~/utils';

import SuccessRatio from '../successRatio';
import ApiTimeSpend from '../apiTimeSpend';
import ErrorLog from '../errorLog';

type IProps = {
  appId: string,
  activeApi: string,
}
class Left extends React.Component<IProps> {
  state = {
    countData: [] as any[],
    countDataTicks: [] as string[],
    speedData: [] as any[],
    speedDataTicks: [] as string[],
    errorLog: [] as any[],
  }
  componentDidMount() {
    const { appId, activeApi } = this.props;
    if (appId && activeApi) {
      this.getData();
    }
  }
  componentDidUpdate(prevProps: IProps) {
    const { appId, activeApi } = this.props;
    if (appId && activeApi) {
      if (appId !== prevProps.appId || activeApi !== prevProps.activeApi) {
        this.getData();
      }
    }
  }
  private getData() {
    try { this.getApiData(); } catch(e) {}
    try { this.getErrorLoag(); } catch(e) {}
    try { this.getApiSpeedPrice(); } catch(e) {}
  }
  private getApiData() {
    const { appId, activeApi } = this.props;
    getApiData(appId, activeApi).then((res: any) => {
      if (res.resType === 0) {
        this.setState({
          countData: res.data.map((t: any) => {
            let obj = clone(t);
            if (t.okSum === 0) {
              obj.successRatio = 1
            } else {
              obj.successRatio = (t.okSum)/(t.okSum+t.failSum);
            }
            obj.successRatio = Number(obj.successRatio.toFixed(2))
            return obj;
          }),
          countDataTicks: res.ticks
        });
        return ;
      }
    })
  }

  private getApiSpeedPrice() {
    const { appId, activeApi } = this.props;
    getApiSpeedPrice(appId, activeApi).then((res: any) => {
      if (res.resType === 0) {
        console.log('收到到相应', res.ticks);
        this.setState({
          speedData: res.data,
          speedDataTicks: res.ticks,
        });

        
        return ;
      }
    });
  }

  private getErrorLoag() {
    const { appId, activeApi } = this.props;
    getApiErrorLog(appId, activeApi).then((res: any) => {
      if (res.resType === 0) {
        this.setState({
          errorLog: res.data,
        });
        return ;
      }
    });
  }


  render () {
    const {
      countData,
      countDataTicks,
      speedData,
      speedDataTicks,
      errorLog,
    } = this.state;
    return <div className="api_item_data">
      <SuccessRatio data={countData} ticks={countDataTicks} />
      <ApiTimeSpend data={speedData} ticks={speedDataTicks} />
      <ErrorLog data={errorLog} />
    </div>;
  }
}

export default Left;
