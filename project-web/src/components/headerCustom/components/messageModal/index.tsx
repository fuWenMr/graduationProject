import React from 'react';
import {
  Modal,
} from 'antd';
import Message from '../message';
import { Wrapper } from './styled'

type IProps = {
  messages: any[],
  visible: boolean,
  hideModal: () => void,
  readMessage: () => void,
};
class MessageModal extends React.Component<IProps> {
  

  render() {
    const {
      messages,
      visible,
      readMessage = () => {},
      hideModal = () => {},
    } = this.props;
    return (
      <Modal
        visible={visible}
        onCancel={hideModal}
        bodyStyle={{
          background: 'rgb(235,236,236)'
        }}
        footer={null}
        title="消息列表"
        width={700}
      >
        <Wrapper>
          <ul>
          {
            messages.map((msg) => (
              <Message readMessage={readMessage} key={msg.reactKey} message={msg} />
            ))
          }
          </ul>
        </Wrapper>
      </Modal>
    );
  }
}

export default MessageModal;
