import axios from 'axios';
import { message } from 'antd';
import { host } from './config';

import { clone } from '~/utils';

function emptyAajx (time = 400 ,res = { resType: 0 }) {
  return new Promise((reslove: any) => {
    setTimeout(() => {
      reslove(res);
    }, time);
  });
}

function ajax (method: Function ,url: string , data: any ,errMsg = '网络或服务器异常，请重试') {
  return new Promise((re, rj) => {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });
    method(host + url, (method === axios.get) ? { params: {...data} } : params).then((res: any) => {
      const body = res.data;
      if (body.isOk) {
        re(body.data);
      } else {
        rj(body);
      }
    }, (err: any) => {
      console.error('请求失败', err);
      message.error(errMsg);
      rj(err);
    });
  });
}

export const getWarning = (appId: string) => {
  return new Promise((reslove: any) => {
    setTimeout(() => {
      reslove({
        resType: 0,
      })
    }, 400);
  });
}

export const getJ = (appId: string) => {
  return ajax(axios.get, 'data/getJ', { appId });
};


export const doLogin = (userName: string, password: string) => {
  return ajax(axios.post, 'api/doLogin', { userName, password });
};

export const doLogout = () => {
  return ajax(axios.get, 'api/doLogout', {});
};

export const doRegister = (userName: string, password: string, ali: string) => {
  return ajax(axios.post, 'api/doRegister', { userName, password, ali });
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

export const getAppById = (appId: string) => {
  return ajax(axios.post, 'api/getAppById', { appId });
}

export const createApp = (appName: string, appInfo: string) => {
  return ajax(axios.post, 'api/createApp', { appName, appInfo });
};

export const editApp = (appId: string, appInfo: string) => {
  return ajax(axios.post, 'api/editApp', { appId, appInfo});
};

export const bindUrl = (appId: string, bindUrl: string) => {
  return ajax(axios.post, 'api/bindUrl', { appId, bindUrl });
};

export const joinApp = (appId: string) => {
  return ajax(axios.post, 'api/joinApp', { appId });
};

export const getAppUsers = (appId: string) => {
  return ajax(axios.post, 'api/getAppUsers', { appId });
};

export const deleteAppUsers = (appId: string, users: string[]) => {
  if ( users.length === 0 ) {
    return new Promise(()=>{});
  } 
  return ajax(axios.post, 'api/deleteAppUsers', { appId, users: JSON.stringify(users) });
};

export const newBoss = (appId: string, user: string) => {
  return ajax(axios.post, 'api/newBoss', { appId, user });
};

export const deletApp = (appId: string) => {
  return ajax(axios.post, 'api/delApp', { appId });
};

export const outApp = (appId: string) => {
  return ajax(axios.post, 'api/outApp', { appId });
}

export const getCountGroups = (appId: string) => {
  return ajax(axios.get, 'api/getCountGroups', { appId });
};

export const changeCountGroups = (appId: string , changes: { type: string, groupKey: string, items: string }[]) => {
  return ajax(axios.post, 'api/changeCountGroups', { appId, changes: JSON.stringify(changes) });
};

export const getMessage = () => {
  return ajax(axios.post, 'api/getMessage', {});
}

export const allowJoin = (appId: string, userName: string) => {
  return ajax(axios.post, 'api/allowJoin', { appId, userName});
}

export const getAlarm = (appId: string) => {
  return ajax(axios.post, 'api/getAlarm', { appId });
}

export const setAlarm = (appId: string, alarms: any[]) => {
  return ajax(axios.post, 'api/setAlarm', { appId, alarms: JSON.stringify(alarms) });
}

export const makeAlarm = (alarmId: string, values: any) => {
  return emptyAajx();
}

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

export const getPvCount = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getPvCount', { appId });
}

export const getErrorData = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getErrorData', { appId });
}

export const getErrorList = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getErrorList', { appId });
}

export const getStaticMissList = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getStaticMissList', { appId });
}

export const getErrorDetial = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getErrorDetail', { appId });
}

export const getApiList = (appId: string) => {
  return getDataWithTime(axios.get, 'data/getApiList', { appId });
}

export const getApiErrorLog = (appId: string, apiUrl: string) => {
  return getDataWithTime(axios.get, 'data/getApiErrorLog', { appId, apiUrl });
}

export const getApiData = (appId: string, apiUrl: string) => {
  return getDataWithTime(axios.get, 'data/getApiData', { appId, apiUrl });
}

export const getApiSpeedPrice = (appId: string, apiUrl: string) => {
  return getDataWithTime(axios.get, 'data/getApiSpeedPrice', { appId, apiUrl });
}
