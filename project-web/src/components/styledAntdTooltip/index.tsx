import React, { CSSProperties } from 'react';
import { Tooltip } from 'antd';

type IProps = {
  title: string,
  display?: 'block'|'inline-block',
  className?: string,
  style: CSSProperties,
} & any

function StyledTooltip (props: IProps) {
  const {
    title,
    display = 'inline-block',
    className = '',
    children,
    style = {},
    ...other
  } = props;
  return <Tooltip title={title} {...other}>
    <span className={className} style={ Object.assign({ display }, style)}>
      <>{children}</>
    </span>
  </Tooltip>;
}

export default StyledTooltip;
