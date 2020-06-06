import React from 'react';
import {
  Card,
  Empty,
} from 'antd';
import HelperIcon from '~/components/helperIcon'
import { getErrorData } from '~/ajax';
import FChart from './chart';


function HelpIcon() {
  return (
    <HelperIcon tipContent={<p className="_grey_tip_text _re_p">
        每个页面产生一次以上报错， 会计做一次受影响访问
        <br />
        可以用受影响访问近似的估计受影响用户数
      </p>} 
    />
  );
}

type IProps = {
  appId: string,
};
class ErrorChart extends React.Component<any> {

  state = {
    errorData: [] as any[],
    ticks: [] as string[],
  };

  componentDidMount() {
    const { appId } = this.props;
    console.log('hello', appId)
    if (appId) {
      this.getData();
    }
  }

componentDidUpdate(prevProps: IProps) {
  if ( this.props.appId && prevProps.appId !== this.props.appId) {
    this.getData()
  }
}

  private getData = () => {
    const { appId } = this.props;
    console.log('hello1', appId)
    getErrorData(appId).then((res: any) => {
      if (res.resType === 0) {
        this.setState({ errorData: res.data, ticks: res.ticks });
      }
    }).finally(() => {

    });
  }

  render() {
    const {
      errorData,
      ticks,
    } = this.state;
    return <>
      <Card
        title={<>报错趋势<HelpIcon /></>}
      >
        {
          errorData.length > 0
          ? <FChart
              data={errorData}
              ticks={ticks}
            />
          : <Empty />
        }
      </Card>
    </>;
  }
}

export default ErrorChart;
