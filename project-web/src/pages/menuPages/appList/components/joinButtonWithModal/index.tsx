import React from 'react';
import { Button, Icon, Modal } from 'antd';


class JoinButtonWithModal extends React.Component {
  state = {
    ModalVisible: false,
  }

  private showModal = () => {
    this.setState({createVisible: true});
  };

  render () {
    const {
      ModalVisible,
    } = this.state;
    return <>
      <Button
        className="btn btn_join"
        onClick={this.showModal}
      >
        加入 <Icon type="plus" />
      </Button>
      <Modal
        title="查找应用并加入"
        visible={ModalVisible}
      >
        <div className="row">
          1
        </div>
      </Modal>
    </>
  }
}

export default JoinButtonWithModal;
