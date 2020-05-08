import React from 'react';
import {
  Card,
} from 'antd';

import { getCountData } from '~/ajax';

import FChart from './chart';

type IProps = {
  appId: string,
  countGroups: Array<any>,
}

class CountData extends React.Component<IProps> {
  state = {
    currentGroup: null as any,
    data: [] as Array<any>,
    ticks: [] as Array<string>,
  }

  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getCountData();
    }
  }

  componentDidUpdate(prevProps: any) {
    const { appId: prevId } = prevProps;
    const { appId } = this.props;
    if (appId && appId !== prevId) {
      this.getCountData();
    }
  }

  private getCountData = () => {
    const {
      appId,
      countGroups,
    } = this.props;
    const { currentGroup } = this.state;

    let items = [] as any;
    if ( currentGroup && currentGroup.items ) {
      items = currentGroup.items;
    } else if (countGroups[0] && countGroups[0].items) {
      items = countGroups[0] && countGroups[0].items
    }
    getCountData(appId, items).then((res: any) => {
     if (res.resType === 0) {
       console.log('count 响应', res)
       this.setState({
         data: res.data,
         ticks: res.ticks,
       });
       return ;
     } 
    }).finally(() => {

    })
  };

  render() {
    const {
      data,
      ticks,
    } = this.state;
    return <>
      <Card
        title=""
      >
        <FChart
          data={data}
          ticks={ticks}
        />
      </Card>
    </>;
  }
}

export default CountData;