import React from 'react';
import {
  Card,
  Select,
} from 'antd';

import { getCountData } from '~/ajax';
import FChart from './chart';


type IProps = {
  appId: string,
  countGroups: Array<any>,
}

class CountData extends React.Component<IProps> {
  state = {
    currentGroupKey:'',
    data: [] as Array<any>,
    ticks: [] as Array<string>,
  };

  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getCountData();
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const { appId: prevId } = prevProps;
    const { appId } = this.props;
    const { currentGroupKey } = this.state;
    if (appId && appId !== prevId) {
      this.getCountData();
    } 
    else if (prevState.currentGroupKey !== currentGroupKey) {
      this.getCountData();
    }
  }

  private setCurrentGroupKey = (currentGroupKey: string) => {
    this.setState({ currentGroupKey });
  }

  private getCurrentGroup = () => {
    const { currentGroupKey } = this.state;
    const { countGroups } = this.props;
    if ( countGroups.length === 0 && !currentGroupKey) {
      return {};
    }
    return countGroups.find((t)=> t.groupKey === currentGroupKey) || countGroups[0];
  }

  private getCountData = () => {
    const {
      appId,
    } = this.props;
    
    const items = this.getCurrentGroup().items || [];

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
    const {
      currentGroupKey
    } = this.state;
    
    const { countGroups = [] } = this.props;
    console.log('到底是啥',countGroups)
    return <>
      <Card
        title=""
      >
        <span> 当前分组</span>
        <Select
          style={{width: "300px"}}
          defaultValue={currentGroupKey || (countGroups.find((t) => t.items[0]) || { groupKey:''}).groupKey}
          onChange={this.setCurrentGroupKey}
          placeholder="默认分组"
        >
          {
            countGroups.map((group) => {
              const { groupKey, items } = group;
              return <Select.Option disabled={items.length === 0} value={groupKey}>{`${groupKey}(${items.length})`}</Select.Option>
            }) || <></>
          }
        </Select>
        
        <FChart
          data={data}
          ticks={ticks}
        />
      </Card>
    </>;
  }
}

export default CountData;