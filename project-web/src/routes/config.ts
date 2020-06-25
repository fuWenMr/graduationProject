export interface IFMenuBase {
    key: string;
    title: string;
    icon?: string;
    component?: string;
    query?: string;
    requireAuth?: string;
    route?: string;
    /** 是否登录校验，true不进行校验（访客） */
    login?: boolean;
}

export interface IFMenu extends IFMenuBase {
    subs?: IFMenu[];
}

const menus: {
    menus: IFMenu[];
    others: IFMenu[] | [];
    [index: string]: any;
} = {
    menus: [
        // 菜单相关路由
        {
            key: '/app/data',
            title: '数据',
            icon: 'switcher',
            subs: [
                { key: '/app/data/index', title: '总览', component: 'OverAll' },
                // { key: '/app/data/speed', title: '访问速度', component: 'Home' },
                { key: '/app/data/error', title: '前端报错', component: 'ErrorPage' },
                { key: '/app/data/api', title: 'API请求', component: 'ApiPage' },
                { key: '/app/data/sum', title: '自定义统计', component: 'Custom' },
            ],
        },
        {
            key: '/app/setting',
            title: '设置',
            icon: 'switcher',
            subs: [
                { key: '/app/setting/alarm', title: '报警设置', component: 'AlarmPage' },
                // { key: '/app/setting/user', title: '账户设置', component: 'Home' },
                { key: '/app/setting/sdk', title: '项目配置', component: 'SdkSet' },
            ],
        },
        { key: '/app/appList', title: '项目列表', icon: 'mobile', component: 'AppList' },
    ],
    others: [], // 非菜单相关路由
};

export default menus;
