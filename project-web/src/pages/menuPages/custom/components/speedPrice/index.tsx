import React from "react";
import {
  Card,
  Select,
  Popover,
  Empty,
  Icon,
  Spin,
} from 'antd'

import { getSpeedPrice } from '~/ajax';

import FChart from './speedPriceChart';

const { Option } = Select;

const defaultSpeedKey = 't0';
const speedKeys = [
  defaultSpeedKey, 't1', 't2', 't3',
  't4', 't5', 't6', 't7',
  't8', 't9', 't10', 't11'
]

const SPEED_PRICE_TIP_1 = '与均值不同， 每个分位值都对应着一条真实的数据. ';
const SPEED_PRICE_TIP_2 = '好的站点应保证至少30%的用户体验较佳，至少60%的用户体验正常';

function SpeedKeySelect(props: {onCahnge: (a: any) => void}) {
  const { onCahnge } = props;
  return <>
    <Select
      style={{ width: '120px' }} 
      defaultValue={defaultSpeedKey}
      onChange={onCahnge}
    >
      {
        speedKeys.map((t: string) => {
        return <Option value={t}>{t}</Option>
        })
      }
    </Select>
  </>
}

function SpeedCardTitle() {
  return <>
    speed分位值
    <Popover
      title="关于分位数统计"
      content={
        <div style={{ width: '200px' }} className="_grey_tip_text" >
          {SPEED_PRICE_TIP_1}<br />
          {SPEED_PRICE_TIP_2}
        </div>
      }
    >
      <Icon className="_tip_icon" type="question-circle" />
    </Popover>
  </>
}

type IProps = {
  appId: string,
}

class Areanull extends React.Component<IProps> {

  state = {
    speedPriceData: [],
    speedPriceTicks: [] as Array<string>,
    speedkey: defaultSpeedKey,
    loading: true,
  }

  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getSpeedPriceData();
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: any) {

    const isAppChanged = prevProps.appId !== this.props.appId;
    const isSpeedKeyChanged = prevState.speedkey !== this.state.speedkey;
    if (isAppChanged || isSpeedKeyChanged) {
      this.getSpeedPriceData();
    }
  }

  // 发送网络请求拉数据
  private getSpeedPriceData = () => {
    const { appId } = this.props;
    const { speedkey } = this.state;
    if (!appId || !speedkey) {
      return ;
    }
    this.setState({ loading: true });
    getSpeedPrice(appId, speedkey).then((res: any) => {
      console.log('speedPrice数据get');
      if (res.resType === 0) {
        this.setState({
          speedPriceData: res.data,
          speedPriceTicks: res.ticks,
        });
      }
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  private handleSelectChange = (value: string) => {
    const { speedkey } = this.state;
    if (value !== speedkey) {
      this.setState({speedkey: value});
    }
  }

  render() {
    const {
      speedPriceData,
      speedPriceTicks,
      loading,
    } = this.state;
    return <>
      <Card
        bordered={false}
        title={<SpeedCardTitle />}
        extra={<SpeedKeySelect onCahnge={this.handleSelectChange} />}
      >
        <Spin spinning={loading} tip="Loading...">   
        {
          speedPriceData.length === 0
          ? <Empty
              style={{ minHeight: '400px' }}
              description="暂无数据"
            />
          : <FChart 
              data={speedPriceData}
              ticks={speedPriceTicks}
            />
        }
        </Spin>

      </Card>
    </>;
  }
}

export default Areanull;
