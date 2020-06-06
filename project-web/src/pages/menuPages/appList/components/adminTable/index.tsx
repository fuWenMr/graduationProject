import React from 'react';
import { 
  Table,
} from 'antd';
import TooltipWithWrapper from '~/components/styledAntdTooltip';
import EditModal from '../editModal';
import UserModal from '../userModal';

type IProps = {
  appList: any[],
}
class AdminTable extends React.Component<IProps> {
  state = {
    editModalVisible: false,
    editModalApp: null as any,
    userModalVisible: false,
    userModalApp: null as any,
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
          <div
            className="operate_item"
            onClick={()=>{this.showEidtModal(app)}}
          >
            编辑
          </div>
          <span className="space">正</span>
          <div
            className="operate_item"
            onClick={()=>{this.showUserModal(app)}}
          >
            成员
          </div>
        </div>
      ),
    },
  ];

  private showEidtModal = (app: any) => {
    this.setState({ 
      editModalVisible: true,
      editModalApp: app,
    });
  }
  private hideEditMOdal = () => {
    this.setState({ editModalVisible: false });
  }
  private showUserModal = (app: any) => {
    this.setState({ 
      userModalVisible: true,
      userModalApp: app,
    });
  }
  private hideUserModal = () => {
    this.setState({ userModalVisible: false });
  }



  render() {
    const { appList } = this.props;
    const {
      editModalVisible,
      editModalApp,
      userModalVisible,
      userModalApp,
    } = this.state;
    return <>
      <Table
        columns={this.columns}
        dataSource={appList}
        pagination={false}
      />
      <EditModal
        visible={editModalVisible}
        hideEditMOdal={this.hideEditMOdal}
        app={editModalApp}
      />
      <UserModal
        visible={userModalVisible}
        hideEditMOdal={this.hideUserModal}
        app={userModalApp}
      />
    </>
  }
}

export default AdminTable;
