import React from 'react';
import {
  Tabs, Card
} from 'antd';

import JsErrorList from '../jsErroeList';
import StaticMissLIst from '../staticMissList';

import {
  getErrorList,
  getStaticMissList
} from '~/ajax'

const { TabPane } = Tabs;

type IProps = {
  appId: string,
};
class ErrorList extends React.Component<IProps> {
  state = {
    errorData: [] as any[],
    staticMissData: [] as any[],
  };

  componentDidMount() {
    if (this.props.appId) {
      this.getError();
      this.getStaticMiss();
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.appId && prevProps.appId !== this.props.appId) {
      this.getError();
      this.getStaticMiss();
    }
  }

  private getError() {
    const { appId } = this.props
    getErrorList(appId).then((res: any) => {
      if (res.resType === 0) {
        this.setState({ errorData: res.data })
        return ;
      }
    });
  }
  private getStaticMiss() {
    const { appId } = this.props
    getStaticMissList(appId).then((res: any) => {
      if (res.resType === 0) {
        this.setState({ staticMissData: res.data })
        return ;
      }
    });
  }

  render() {

    const {
      errorData,
      staticMissData,
    } = this.state;

    return <>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="js ERROR top20" key="1">
            <JsErrorList data={errorData} />
          </TabPane>
          <TabPane tab="静态资源缺失" key="2">
            <StaticMissLIst data={staticMissData} />
          </TabPane>
        </Tabs>
      </Card>
    </>
  }
}

export default ErrorList;
