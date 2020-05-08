import axios from 'axios';
import { message } from 'antd';
import { host } from './config';

import { clone } from '~/utils';

function ajax (method: Function ,url: string , data: any ,errMsg = '网络或服务器异常，请重试') {
  return new Promise((re, rj) => {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    console.log('get 不灵了？',params.get('appId'));
    method(host + url, (method === axios.get) ? { params: {...data} } : params).then((res: any) => {
      const body = res.data;
      if (body.isOk) {
        re(body.data);
      } else {
        rj(body);
      }
      console.log('表面请求成功', res);
    }, (err: any) => {
      console.error('请求失败', err);
      message.error(errMsg);
      rj(err);
    });
  });
}



export const doLogin = (userName: string, password: string) => {
  return ajax(axios.post, 'api/doLogin', { userName, password });
};

export const doLogout = () => {
  return ajax(axios.get, 'api/doLogout', {});
};

export const doRegister = (userName: string, password: string) => {
  return ajax(axios.post, 'api/doRegister', { userName, password });
};

export const doReset = (userName: string, newPassword: string, captcha: string) => {
  return ajax(axios.post, 'api/doReset', { userName, password: newPassword, captcha });
};

export const getResetCaptcha = (userName: string) => {
  return ajax(axios.post, 'api/getResetCaptcha', { userName });
};

export const getUserApps = () => {
  return ajax(axios.post, 'api/getUserApps', {});
};

export const createApp = (appName: string, appInfo: string) => {
  return ajax(axios.post, 'api/createApp', { appName, appInfo });
};

export const bindUrl = (appId: string, bindUrl: string) => {
  return ajax(axios.post, 'api/bindUrl', { appId, bindUrl });
};

export const deletApp = (appId: string) => {
  return ajax(axios.post, 'api/delApp', { appId });
};

export const getCountGroups = (appId: string) => {
  return ajax(axios.get, 'api/getCountGroups', { appId });
};

export const changeCountGroups = (appId: string , changes: { type: string, groupKey: string, items: string }[]) => {
  return ajax(axios.post, 'api/changeCountGroups', { appId, changes: JSON.stringify(changes) });
};


/**
 * 拉图表数据专用的接口们
 * @param method 
 * @param url 
 * @param data 
 * @param timeEnd 
 * @param timeStep 
 * @param steps 
 */
function getDataWithTime(method: Function ,url: string , data: any, timeEnd?: string, timeStep?: number, steps?: number){
  let _data = clone(data);
  if (timeEnd) {_data.timeEnd = timeEnd}
  if (timeStep) {_data.timeStep = timeStep}
  if (steps) {_data.steps = steps}
  return ajax(method, url, _data);
}

export const getSpeedAvg = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getSpeedAvg', { appId })
};

export const getSpeedPrice = (appId: string, speedKey: string) => {
  return getDataWithTime(axios.get, 'data/getSpeedPrice', { appId, speedKey })
};

export const getCustomKeys = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getCustomKeys', { appId });
}

export const getCountData = (appId: string, countKeys: Array<string>) => {
  return getDataWithTime(axios.get, 'data/getCountData', { appId, countKeys: JSON.stringify(countKeys) });
}
