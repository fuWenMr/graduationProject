import React from 'react';
import {
  Table,
  Popconfirm,
  message,
} from 'antd';
import {
  outApp,
} from '~/ajax';
import TooltipWithWrapper from '~/components/styledAntdTooltip';

type IProps = {
  appList: any[],
}
class JoinTable extends React.Component<IProps> {
  state = {
    loading: false,
  };

  private columns = [
    {
      title: '应用名',
      dataIndex: 'appName',
      render: (value: any, app: any) => <TooltipWithWrapper title={`wid：${app.id}`}>{value}</TooltipWithWrapper>
    }, {
      title: '创建日期',
      dataIndex: 'createdAt',
      render: (value: any) => (new Date(value) as any).toString('yyyy-MM-dd hh:mm:ss')
    }, {
      title: '负责人',
      dataIndex: 'owner',
    }, {
      title: '绑定域名',
      dataIndex: 'bindUrl',
      render: (value: any,) => value || <div className="_grey_tip_text">暂未绑定</div>
    }, {
      title: '介绍',
      dataIndex: 'appInfo',
      render: (value: any,) => value || <div className="_grey_tip_text">空</div>
    }, {
      title: '操作',
      render: (value: any, app: any) => (
        <div className="table_operate">
          <Popconfirm
            title="你确定要退出该项目吗"
            okText="退出"
            cancelText="取消"
            onConfirm={() => {this.HandleDelete(app.id);}}
          >
            <div
              className="operate_item delete"
            >
              退出项目
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  private HandleDelete = ( appId: string) => {
    this.setState({ loading: true});
    outApp(appId).then((res: any) => {
      if (res.resType === 0) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        return ;
      }
      message.error('操作失败');
    }).finally(() => {
      this.setState({ loading: true});
    });
  }

  render() {
    const { appList } = this.props;
    const { loading } = this.state;
    return <Table loading={loading} columns={this.columns} dataSource={appList} pagination={false} />
  }
}

export default JoinTable;
