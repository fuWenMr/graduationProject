import React, { ReactNode } from 'react';
import {
  Popover,
  Icon,
} from 'antd';
type IProps = {
  tipTitle?: string | ReactNode,
  tipContent?: string | ReactNode,
};
function HelperIcon (props: IProps) {

  const {
    tipTitle = '',
    tipContent = '',
  } = props;

  return (
    <Popover
      title={tipTitle}
      content={tipContent}
    >
      <Icon className="_tip_icon" type="question-circle" />
    </Popover>
  );
}

export default HelperIcon;