import React from 'react';
import {
  Card,
  Empty,
  Tooltip,
  Select,
} from 'antd';

import { getApiList } from '~/ajax';


function getRatio (api: any) {
  let { successSum, failSum } = api;
  if (!successSum && !failSum) {
    return 0;
  }
  return successSum / (successSum + failSum);
}


function Item (props: { api: any, active: boolean, onClick?: () => void }) {
  const { src, successSum, failSum, time } = props.api;
  const { onClick = () => {}, active=false } = props;

  const successRate = (getRatio({ successSum, failSum }) * 100).toFixed(2) + '%'
  return (
    <li onClick={onClick} className={active? 'active' : ''}>
      <Tooltip title={src}>
        <div className="api_src">
          {src}
        </div>
      </Tooltip>
      <div className="api_data">
        {`成功率:${successRate}  平均耗时:${time}ms`}
      </div>
    </li>
  );
}


type IProps = {
  appId: string,
  activeApi: string,
  chooseApi?: (a: string) => void,
}
class Left extends React.Component<IProps> {

  state = {
    listData: [] as any[],
    sort_key: 'RATIO' as 'RATIO'| 'RATIO_DESC' | 'SPEED' | 'SPEED_DESC',
  };
  private sortters = {
    'RATIO': (a: any, b: any) => getRatio(a) - getRatio(b),
    'RATIO_DESC': (a: any, b: any) => getRatio(b) - getRatio(a),
    'SPEED': (a: any, b: any) => Number(a.time) - Number(b.time),
    'SPEED_DESC': (a: any, b: any) => Number(b.time) - Number(a.time),
  }

  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getApiListData();
    }
  }
  componentDidUpdate(prevProps: IProps) {
    const { appId } = this.props;
    if (appId && appId !== prevProps.appId) {
      this.getApiListData();
    }
  }


  private handleData(data: any[]) {
    const {
      chooseApi = () => {},
    } = this.props;
    let apiMap = {} as any;
    for (let t of data) {
      if(!apiMap[t.url]) {
        apiMap[t.url]= {} as any; 
      }
      apiMap[t.url][t.ok] = t;
    }

    let apis = [];
    const keys = Object.keys(apiMap);
    for (let key of keys) {
      let api = apiMap[key];
      apis.push({
        src: (api['0'] || api['1']).url,
         // eslint-disable-next-line
        successSum: api['1'] && api['1'].sum || 0, 
         // eslint-disable-next-line
        failSum: api['0'] && api['0'].sum || 0,
        time: (api['1'] || api['0']).time,
      });
    }

    this.setState({
      listData: apis,
    });
    if (apis.length > 0) {
      chooseApi(apis[0].src);
    }
  }

  private getApiListData() {
    const { appId } = this.props;
    getApiList(appId).then((res: any) => {
      if (res.resType === 0) {
        this.handleData(res.data);
        return ;
      }
    }).finally();
  }

  private hanldSort = (value: string) => {
    this.setState({
      sort_key: value,
    });
  }


  render () {
    const {
      listData,
      sort_key,
    } = this.state;
    const {
      chooseApi = () => {},
      activeApi = '',
    } = this.props;
    const sortSelect = (
      <Select
        style={{ width: '150px' }}
        className="sort_select"
        defaultValue={sort_key}
        onChange={this.hanldSort}
      >
        <Select.Option value="RATIO">按调用成功率升序</Select.Option>
        <Select.Option value="RATIO_DESC">按调用成功率降序</Select.Option>
        <Select.Option value="SPEED">按响应速度升序</Select.Option>
        <Select.Option value="SPEED_DESC">按响应速度降序</Select.Option>
      </Select>
    );
    console.log(`排序${sort_key}`, listData.sort(this.sortters[sort_key]))
    return <>
      <div
        className="api_list"
      >
        <Card title={<>有效api<i className="space">正</i> {sortSelect}</>}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            height: '700px',
          }}
        >
          <ul className="api_list_area">
            {
              listData.sort(this.sortters[sort_key]).length === 0
              ? <Empty description="暂无数据" />
              : listData.map((api) => {
                  return <Item key={api.src} api={api} active={activeApi === api.src} onClick={()=>{chooseApi(api.src)}} />;
                })
            }
          </ul>
        </Card>
      </div>
    </>;
  }
}

export default Left;