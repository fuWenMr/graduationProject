import React from 'react';
import { Modal } from 'antd';

import {
  defaultImgUrl,
  defaultProbelUrl,
} from '~/utils/constant';

export const showConfigModel = (config: string) => {
    const { alias, ratio, isAsync, probelUrl, imgUrl } = JSON.parse(config);

    let waring = '';
    if (!/^__\w{1,10}$/.test(alias)) {
        waring = '别名命名不合法';
    } else if (!/^(https|http|ftp)/.test(probelUrl)) {
        waring = '探针地址不是有效的url';
    } else if (!/^(https|http|ftp)/.test(imgUrl)) {
      waring = '数据接口不是有效的url';
  }

    const content = (
        <div>
            {alias !== '__fw' && <div>自定义别名: {alias}</div>}
            {Number(ratio) !== 1 && <div>自定义采样率: {ratio}</div>}
            {Number(isAsync) !== 0 && <div>脚本异步加载</div>}
            {probelUrl !== defaultProbelUrl && <div>自定义探针地址: {probelUrl}</div>}
            {imgUrl !== defaultImgUrl && <div>自定义数据接口: {probelUrl}</div>}
            {waring && <div style={{ color: 'red' }}>{waring}</div>}
        </div>
    );

    return new Promise((reslove) => {
        if (waring) {
            Modal.warning({
                title: '配置存在问题',
                okText: '取消',
                okType: 'danger',
                content,
            });
        } else {
            Modal.confirm({
                title: '确定要修改高级配置项吗',
                content,
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    reslove();
                },
            });
        }
    });
};
