/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */


import Dashboard from './dashboard/Dashboard';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import QueryParams from './extension/QueryParams';
import Visitor from './extension/Visitor';
import MultipleMenu from './extension/MultipleMenu';

export default {
    Dashboard,
    AuthBasic,
    RouterEnter,
    QueryParams,
    Visitor,
    MultipleMenu, 
} as any;
