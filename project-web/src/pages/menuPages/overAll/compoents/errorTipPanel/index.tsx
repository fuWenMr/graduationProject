import React from 'react';
import { Row, Col } from 'antd';
import DataPanel, { DatasPanel } from '../dataPanel';
import { getJ } from '~/ajax';

function isEmpty(t: any) {
  return t === undefined || t === null;
}

type IProps = {
  appId: string,
};
class ErrorTipPanel extends React.Component<IProps> {
  state = {
    errorData: {} as any,
  };
  componentDidMount() {
    const { appId } = this.props;
    if (appId) {
      this.getData();
    }

  }
  componentDidUpdate(prevProps: any) {
    const { appId } = this.props;
    if (appId && appId !== prevProps.appId) {
      this.getData();
    }
  }

  private getData = () => {
    const { appId } = this.props;
    getJ(appId).then((res: any) => {
      if (res.resType === 0) {
        this.setState({
          errorData: res.data,
        });
      }
    });
  }

  render() {
    const { 
      renderTime,
      renderTimeChange,
      jsErrorNum,
      jsErrorNumChange,
      jsErrorRatio,
      jsErrorRatioChange,
      apiErrorNum,
      apiErrorNumChange,
      apiErrorRatio,
      apiErrorRatioChange,
      staticMissNum,
      staticMissNumChange,
      staticMissRatio,    
      staticMissRatioChange,    
    } = this.state.errorData;
    return (
      <Row gutter={[16, 16]}>
        <Col span={3}>
          <DataPanel
            data={isEmpty(renderTime) ? '' : `${renderTime}ms`} 
            dataTitle={'首屏渲染时间'} 
            dataChange={renderTimeChange} 
            needMore
          />
        </Col>
        <Col span={5} md={7}>
          <DatasPanel
            datas={[jsErrorNum, isEmpty(jsErrorRatio) ? '' : `${jsErrorRatio}%`]}
            dataTitles={['js错误数', 'js错误率']}
            dataChanges={[jsErrorNumChange, jsErrorRatioChange]}
            isDatasNeedMore={[false, false]}
          />
        </Col>
        <Col span={5} md={7}>
          <DatasPanel
            datas={[apiErrorNum, isEmpty(jsErrorRatio) ? '' : `${apiErrorRatio}%`]}
            dataTitles={['API错误数', 'API错误率']}
            dataChanges={[apiErrorNumChange, apiErrorRatioChange]}
            isDatasNeedMore={[false, false]}
          />
        </Col>
        <Col span={5} md={7}>
          <DatasPanel
            datas={[staticMissNum, isEmpty(staticMissRatio) ? '' : `${staticMissRatio}%`]}
            dataTitles={['资源请求错误数', '资源请求错误率']}
            dataChanges={[staticMissNumChange, staticMissRatioChange]}
            isDatasNeedMore={[false, false]}
          />
        </Col>
      </Row>
    );
  }
}

export default ErrorTipPanel;
