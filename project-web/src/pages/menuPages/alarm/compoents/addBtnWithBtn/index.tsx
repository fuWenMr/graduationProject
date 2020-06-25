import React from 'react';
import {
  Button,
  Icon,
} from 'antd';

type IProps = {
  onClick: () => void,
};
class AddBtnWithModal extends React.Component<IProps> {

  render() {
    const {
      onClick = () => {},
    } = this.props;
    return (
      <Button
        className="add_btn"
        onClick={onClick}
      >
        设置报警条件 <Icon type="plus" />
      </Button>
    );
  }
}

export default AddBtnWithModal;