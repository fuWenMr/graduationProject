export const checkList = [
    {
        title: '开启api上报',
        name: 'useAPI',
        tip: '关闭此选项后, 需要手动调用 api()方法上报信息',
    },
    {
        title: '开启静态资源请求上报',
        name: 'useStatic',
        tip: '开启此选项, 会监控并收集静态资源请求状况',
    },
    {
        title: '开启error监控',
        name: 'useError',
        tip: '开启此选项后, 会监控并收集初始化完成之后的未捕获错误和错误栈信息',
    },
    {
        title: '开启SPA应用模式',
        name: 'useSPA',
        tip: '开启此选项后, 针对spa应用会监听页面的hashchange事件并计算pv',
    },
    {
        title: '开启渲染性能监控',
        name: 'usePerf',
        tip: '开启此选项后, 会收集页面访问速度等相关信息',
    },
    {
        title: '允许额外性能数据上报',
        name: 'useCustomPerf',
        tip:
            '一般与SPA模式搭配,旨在解决spa应用难以度量实际渲染性能的问题,使用 load()API手动上报告额外的数据',
    },
];
