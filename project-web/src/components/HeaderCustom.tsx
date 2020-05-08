/**
 * Created by Mr.F
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { doLogout } from '~/ajax';
import { PwaInstaller } from './widget';
import { connectAlita } from 'redux-alita';
import umbrella from 'umbrella-storage';
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
type HeaderCustomState = {
  visible: boolean;
};

class HeaderCustom extends Component<HeaderCustomProps, HeaderCustomState> {
  state = {
    visible: false,
  };

  screenFull = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };
  menuClick = (e: { key: string }) => {
    e.key === 'logout' && this.logout();
  };
  logout = () => {
    umbrella.removeLocalStorage('user');
    doLogout().finally(() => {
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
            <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
              <Icon type="notification" />
            </Badge>
          </Menu.Item>
          <SubMenu
            title={`欢迎 ~ ${user.userName || ''}`}
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
  HeaderCustomProps,
  HeaderCustomState
> = connectAlita(['responsive'])(HeaderCustom);

export default withRouter(HeaderCustomConnect);
