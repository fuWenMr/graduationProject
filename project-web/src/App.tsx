import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
import { connectAlita } from 'redux-alita';
import { checkLogin } from './utils';
import { fetchMenu } from './axios';
import umbrella from 'umbrella-storage';

import './global/global.less';

const { Content, Footer } = Layout;

type AppProps = {
    setAlitaState: (param: any) => void;
    auth: any;
    responsive: any;
};

class App extends Component<AppProps> {
    state = {
        collapsed: false,
        title: '',
    };

    componentWillMount() {
        const { setAlitaState } = this.props;
        let user = umbrella.getLocalStorage('user');
        // user = storageUser && JSON.parse(storageUser);
        user && setAlitaState({ stateName: 'auth', data: user });
        this.getClientWidth();
        window.onresize = () => {
            this.getClientWidth();
        };
    }

    componentDidMount() {
        this.openFNotification();
        this.fetchSmenu();
    }

    openFNotification = () => {
        const openNotification = () => {
            notification.open({
                message: 'hello everyone',
                description: (
                    <div>
                        <p>实践项目， 仅供学习，请勿用作商业用途</p>
                    </div>
                ),
                icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
                duration: 0,
            });
            umbrella.setLocalStorage('hideBlog', true);
        };
        const storageFirst = umbrella.getLocalStorage('hideBlog');
        if (!storageFirst) {
            openNotification();
        }
    };
    /**
     * 获取服务端异步菜单
     */
    fetchSmenu = () => {
        const setAlitaMenu = (menus: any) => {
            this.props.setAlitaState({ stateName: 'smenus', data: menus });
        };
        setAlitaMenu(umbrella.getLocalStorage('smenus') || []);
        fetchMenu().then((smenus) => {
            setAlitaMenu(smenus);
            umbrella.setLocalStorage('smenus', smenus);
        });
    };

    getClientWidth = () => {
        // 获取当前浏览器宽度并设置responsive管理响应式
        const { setAlitaState } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
        setAlitaState({ stateName: 'responsive', data: { isMobile: clientWidth <= 992 } });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;
        const { auth = { data: {} }, responsive = { data: {} } } = this.props;
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {!responsive.data.isMobile && checkLogin(auth.data.permissions) && (
                        <SiderCustom collapsed={this.state.collapsed} />
                    )}
                    <ThemePicker />
                    <Layout style={{ flexDirection: 'column', minWidth: '1150px' }}>
                        <HeaderCustom
                            toggle={this.toggle}
                            collapsed={this.state.collapsed}
                            user={auth.data || {}}
                        />
                        <Content
                            className="page_content"
                            style={{ padding: '15px', overflow: 'initial', flex: '1 1 0' }}
                        >
                            <Routes auth={auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            F work ©{new Date().getFullYear()} Created by 符
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default connectAlita(['auth', 'responsive'])(App);
