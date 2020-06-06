import React from 'react';
import {
  Empty,
  Icon,
  message,
} from 'antd';

import { copyText } from '~/utils';


function StaticMissItem(props: { missError: any }) {
  const { url, sum } = props.missError;
  return <li>
    <Icon type="warning" theme="twoTone" twoToneColor="red" />
    <span className="miss_url">资源地址：
      <span
        onClick={() => {
          copyText(url);
          message.success(`成功复制 ${url} 到剪贴板`);
        }}
        className="miss_url_text"
      >
        {url}
      </span>
    </span>
    <span className="static_num"> 次数：{sum}</span>
  </li>
}

type Iprops = {
  data: any[],
}
class StaticMissList extends React.Component<Iprops> {

  render() {
    const { data } = this.props;
    return <>
      {
        data.length === 0
        ? <Empty />
        : <ul className="static_miss_list">
          {
            data.map((missError: any) => <StaticMissItem missError={missError} />)
          }
          </ul>
      }
    </>;
  }
}

export default StaticMissList;
