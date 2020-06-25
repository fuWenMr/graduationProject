/**
 * Created by Mr.F
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import SiderCustom from '../SiderCustom';
import { Menu, Icon, Layout, Badge, Popover, Avatar } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import MessageModal from './components/messageModal'
import { doLogout, getMessage } from '~/ajax';
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
import { RENCET_LOGIN } from '~/utils/constant/storageKey';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

type HeaderCustomProps = RouteComponentProps<any> & {
  toggle: () => void;
  collapsed: boolean;
  user: any;
  responsive?: any;
  path?: string;
};

class HeaderCustom extends Component<HeaderCustomProps> {
  state = {
    visible: false,
    messageModalViaible: false,
    messages: [] as any[],
    messageNum: 0
  };

  componentDidMount() {
    getMessage().then((res: any) => {
      if (res.resType === 0) {
        const messages = this.hadleMessages(res.messages)
        this.setState({ 
          messages: messages,
          messageNum: messages.length
        });
      }
    })
  }

  private readOneMessage = () => {
    this.setState({
      messageNum: this.state.messageNum -1,
    });
  }

  private hideMissageModal = () => {
    this.setState({ messageModalViaible: false});
  };
  private showMessageModal = () => {
    const { messages } = this.state;
    if (messages.length === 0) {
      return ;
    }
    this.setState({ messageModalViaible: true});
  };

  private hadleMessages = (messages: any[]) => {
    const { userName } = this.props.user;
    let usefulMessages = [] as any[];
    for (let t of messages) {
      t.reactKey = `${t.appId}${t.userName}${t.created}${t.active}${Math.random()}`;
      if (t.App.owner === userName && (t.active === 1 || t.active === 4 )) {
        usefulMessages.push(t);
      } else if (t.userName === userName && (t.active === 2 || t.active === 3)) {
        usefulMessages.push(t);
      }
    }
    return usefulMessages;
  };

  screenFull = () => {
    if (screenfull.isEnabled) {
      try {
        screenfull.request();
      } catch(e) {

      }
      
    }
  };
  menuClick = (e: { key: string }) => {
    e.key === 'logout' && this.logout();
  };
  logout = () => {
    umbrella.removeLocalStorage('user');
    doLogout().finally(() => {
      umbrella.removeLocalStorage(RENCET_LOGIN);
      this.props.history.push('/login');
    });
  };
  popoverHide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };
  render() {
    const {
      messages,
      messageNum,
      messageModalViaible,
    } = this.state;
    const { user, responsive = { data: {} } } = this.props;
    return (
      <Header className="custom-theme header" style={{minHeight: '66px'}}>
        {responsive.data.isMobile ? (
          <Popover
            content={<SiderCustom popoverHide={this.popoverHide} />}
            trigger="click"
            placement="bottomLeft"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          >
            <Icon type="bars" className="header__trigger custom-trigger" />
          </Popover>
        ) : (
          <Icon
            className="header__trigger custom-trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          />
        )}
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
          onClick={this.menuClick}
        >
          <Menu.Item key="pwa">
            <PwaInstaller />
          </Menu.Item>
          <Menu.Item key="full" onClick={this.screenFull}>
            <Icon type="arrows-alt" onClick={this.screenFull} />
          </Menu.Item>
          <Menu.Item key="1">
            <Badge
              count={messageNum}
              overflowCount={10}
              style={{ marginLeft: 10 }}
            >
              <Icon
                type="notification"
                style={{ fontSize: '20px' }}
                onClick={this.showMessageModal}
              />
            </Badge>
            <MessageModal
              readMessage={this.readOneMessage}
              messages={messages}
              visible={messageModalViaible}
              hideModal={this.hideMissageModal}
            />
          </Menu.Item>
          <SubMenu
            // title={`欢迎 ~ ${user.userName || ''}`}
            title={
              <>
                欢迎 ~ <span className="space">~</span>
                <Avatar size={32} style={{backgroundColor: '#7265e6'}}>
                  {user.ali}
                </Avatar>
              </>
            }
          >
            <MenuItemGroup title={user.userName || ''}>
              <Menu.Item key="logout">
                <span onClick={this.logout}>退出登录</span>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

// 重新设置连接之后组件的关联类型
const HeaderCustomConnect: React.ComponentClass<
  HeaderCustomProps
> = connectAlita(['responsive'])(HeaderCustom);

export default withRouter(HeaderCustomConnect);
