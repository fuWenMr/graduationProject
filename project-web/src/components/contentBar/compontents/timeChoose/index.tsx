import React from 'react';

import { Wrapper } from './styled';
import {
  Button,
  Tooltip,
} from 'antd';

class TimeChoose extends React.Component {

  render() {
    return (
      <Wrapper>
        <Tooltip title={"数据不足"}>
         <Button disabled>一个月内</Button>
        </Tooltip>
        <span className="space">正正</span>
        <Tooltip title={"数据不足"}>
         <Button disabled>一周内</Button>
        </Tooltip>
        <span className="space">正正</span>
        <Button>12小时内</Button>
      </Wrapper>
    );
  }
}

export default TimeChoose;