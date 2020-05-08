import React, { useState, useEffect, FC } from 'react';
import { Button } from 'antd';

interface IProps {
  disabled: boolean,
  onClick: () => void,
}



const CaptchaButton: FC<IProps> = (props) => {
  const {
    disabled,
    onClick,
  } = props;
  const [seconds, setSeconds] = useState(0);
  const [timerID, setTimerID] = useState(-1);

  // 卸载时清除计时器
  useEffect(() => {
    window.clearInterval(timerID);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (seconds === 0) {
      window.clearInterval(timerID);
    }
  }, [seconds]); // eslint-disable-line

  const handleClick = () => {
    onClick();
    setSeconds(5);
    setTimerID(window.setInterval(() => {
      setSeconds(t => t-1);
    }, 1000));
  }

  return <> 
    <Button
      disabled={ disabled || (seconds !==0 )}
      onClick={handleClick}
    >
      {(seconds === 0) ? '发送验证码' : `${seconds}s后可重发`}
    </Button>
  </>
}

export default CaptchaButton;
