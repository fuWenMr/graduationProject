/**
 * Created by Mr.F
 */
import React from 'react';
import { Row, Col } from 'antd';
import { connectAlita } from 'redux-alita';
import {
  STATE_CURRENT_APP,
} from '~/redux/reduxStateName';
import { getPvCount } from '~/ajax';

import ErrorTipPanel from './compoents/errorTipPanel';
import PvEchartsViews from './compoents/pvEchartsViews';
import PvDistributionView from './compoents/pvDistributionView';

import { Wrapper } from './styled'

class OverAll extends React.Component<any> {
  state = {
    data: [] as Array<any>,
    ticks: [] as Array<string>,
  };
  private appId = '';

  constructor(props: any) {
    super(props);
    console.log('看看', props);
    const currentApp = props[STATE_CURRENT_APP] && props[STATE_CURRENT_APP].data;
    this.appId = (currentApp || {}).id || '';
  }

  componentDidMount() {
    if (this.appId) {
      this.getPvData();
    }   
  }
  componentDidUpdate() {
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const appId = (currentApp || {}).id || '';
    if (appId && appId !== this.appId) {
      this.appId = appId;
      this.getPvData();
    }
  }

  private getPvData() {
    getPvCount(this.appId).then((res: any) => {
      console.log('wtf ', res.data);
      if (res.resType === 0) {
        this.setState({ data: res.data, ticks: res.ticks });
      }
    });
  }

  private getcountSum = () => {
    const { data } = this.state;
    if (!data || data.length === 0) {
      return [[], 0];
    }
    let pvSumCount = 0;
    let flag = {} as any
    let res = [] as any[];
    // console.log('+++++++++++')
    // console.log(data)
    for (let row of data) {
      let pageName = row.page;
      if (pageName === 'all/all') {
        continue;
      }
      pvSumCount += row.pv;
      let index = flag[pageName];
      if (index) {
        let temp = res[index]
        temp.pv += row.pv;
        temp.uv += row.uv;
      } else {
        let temp = {
          pv: row.pv,
          uv: row.uv,
          page: row.page,
        };
        flag[pageName] = res.push(temp) - 1;
      }
    }

    return [res, pvSumCount] as any[];
  };

  render() {
    const {
      data,
      ticks,
    } = this.state;
    const currentApp = this.props[STATE_CURRENT_APP] && this.props[STATE_CURRENT_APP].data;
    const appId = ((currentApp && currentApp.id) || '') as string ;
    let [pvSum, pvSumCount] = this.getcountSum();


    return (
      <Wrapper>
        <ErrorTipPanel appId={appId || ''} />
        <Row gutter={[16, 16]}>
          <Col>
            <PvEchartsViews
              pvSumCount={pvSumCount}
              dataSource={data}
              ticks={ticks}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <PvDistributionView
              pvSumCount={pvSumCount}
              dataSource={pvSum}
            />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default connectAlita([STATE_CURRENT_APP])(OverAll);
