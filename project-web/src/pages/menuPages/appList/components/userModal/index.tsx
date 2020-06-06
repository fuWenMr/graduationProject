import React from 'react';
import {
  Modal,
  Button,
  Tag,
  message,
  Empty,
} from 'antd';
import {
  getAppUsers,
  deleteAppUsers,
  newBoss,
} from '~/ajax';
import { Wrapper } from './styled';


type ItemProps = {
  user: string,
  onChoose?: (user: string)=> void,
  active?: boolean,
}
function UserItem (props: ItemProps) {
  const {
    user,
    active,
    onChoose = (user: string) => {}
  } = props;
  return <Tag color={active? 'red' : ''} className="user_item" onClick={() => {onChoose(user);}}>{user}</Tag>
}
function ChooseUserItem (props: ItemProps & { onCacle: (str: string) => void }) {
  const {
    user,
    onCacle = (user: string) => {}
  } = props;
  return <Tag color="red" closable className="user_item_choose" onClose={() => {onCacle(user);}}>{user}</Tag>
}
interface IProps {
  visible: boolean,
  app: any,
  hideEditMOdal: () => void,
};
class UserModal extends React.Component<IProps> {
  state = {
    users : ['123@163.com', 'myf@256.com', 'zhanglanke@ali.com', 'helloWorld@icloud.com'] as string[],
    chooseUsers: [] as string[],
    deleteLoading: false,
    bossLoading: false,
  };

  componentDidMount() {
    if (this.props.app) {
      this.getUsers();
    }
  }

  componentDidUpdate(prevProps: any) {
    const { app } = this.props;
    if (app && app.id !== (prevProps.app || { id: '' }).id) {
      this.getUsers();
    }
  }


  private getUsers() {
    const { id } = this.props.app;
    getAppUsers(id).then((res: any) => {
      if (res.resType === 0) {
        this.setState({
          users: res.res.map((t: any)=>t.userName),
        });
        return ;
      } 
    }).finally();
  }

  private handleDelete = () => {
    const { id } = this.props.app;
    const { chooseUsers } = this.state;
    this.setState({
      deleteLoading: false,
    });
    deleteAppUsers(id, chooseUsers).then((res: any) => {
      if (res.resType === 0) {
        message.success('成员变更成功', 1, () => {
          window.location.reload();
        });
        return ;
      }
      message.warn(res.msg || '操作失败'); 
    }).finally(() => {
      this.setState({
        deleteLoading: false,
      });
    });

  };

  private handleBoss = () => {
    const { id } = this.props.app;
    const [user] = this.state.chooseUsers;
    this.setState({
      bossLoading: true,
    });

    newBoss(id, user).then((res: any) => {
      if (res.resType === 0) {
        message.success(`负责人已经转让给${user}`, 1, () => {
          window.location.reload();
        });
        return ;
      }
      message.warn(res.msg || '转让失败失败'); 
    }).finally(() => {
      this.setState({
        bossLoading: false,
      });
    });
  };

  private onChooseUser = (user: string) => {
    const {
      chooseUsers,
    } = this.state;
    if (chooseUsers.find((t) => t === user )) {
      return ;
    } 
    chooseUsers.push(user);
    this.forceUpdate();
  }

  private handleCancleChooser = (user: string) => {
    const { chooseUsers } = this.state;
    let temp = [];
    for (let u of chooseUsers) {
      if(u === user) {
        continue;
      }
      temp.push(u);
    }
    this.setState({
      chooseUsers: temp,
    });
  }; 

  render () {
    const {
      users,
      chooseUsers,
    } = this.state;
 
    let {
      // app,
      visible: modalVisible,
      hideEditMOdal= ()=> {}
    } = this.props;
    // app = app || {}


    return (
      <Modal
        width={660}
        title={`项目成员 (${users.length } 人)`}
        centered
        footer={null}
        visible={modalVisible}
        onCancel={hideEditMOdal}
      >
        <Wrapper>
          <div className="userList">
            <div className="left">
              {
                users.length === 0
                ? <Empty description="没有其它成员" />
                : users.map((user) => (
                  <UserItem
                    key={user}
                    user={user}
                    onChoose={this.onChooseUser}
                    active={!!chooseUsers.find((t) => t === user)}
                  />
                ))
              }
            </div>
            <div className="right">
            {
                chooseUsers.map((user) => (
                  <ChooseUserItem
                    key={user}
                    user={user}
                    onCacle={this.handleCancleChooser}
                  />
                ))
              }
            </div>
            <div className="btn_area">
              <Button onClick={this.handleDelete} type="danger" shape="round" disabled={chooseUsers.length === 0}>
                从项目中删除
              </Button>
              <Button onClick={this.handleBoss} shape="round" disabled={chooseUsers.length !== 1}>
                转让负责人
              </Button>
 
            </div>
          </div>
        </Wrapper>

      </Modal>
    );
  }
}

export default UserModal;
