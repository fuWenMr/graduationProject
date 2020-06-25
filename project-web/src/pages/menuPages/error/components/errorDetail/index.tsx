import React from 'react';
import {
  Card,
  Button,
} from 'antd';

import ErrorTable from './table';

import { getErrorDetial } from '~/ajax'

type IProps = {
  appId: string
};
class ErrorDetail extends React.Component<IProps> {

  state = {
    show: false,
    loading: false,
    data: [] as any,
  };


  private getData = () => {
    if (this.state.loading) {
      return ;
    }
    const { appId } = this.props;
    this.setState({ loading: true })
    getErrorDetial(appId).then((res: any) => {
      if (res.resType === 0) {
        this.setState({
          show: true,
          data: res.data,
        });
        return;
      }
    }).finally(() => {
      this.setState({
        loading: false,
      });
    })
  }

  render() {
    const {
      show,
      loading,
      data,
    } = this.state;

    const showBtn = (show || <div
        onClick={this.getData}
        className="show_more_btn"
      >
        {loading && <Button loading />}查看详细日志
      </div>
    );

    return <Card title="详情日志">
      {
        showBtn
      }
      {
        show && (
          <ErrorTable
            data={data} 
          />
        )
      }
    </Card>
  }
}

export default ErrorDetail;
