import React from 'react';
import CreateButtonWithModal from '../createButtonWithModal';
import JoinButtonWithModal from '../joinButtonWithModal';

function BarButtons () {
  return <div className="bar_btns">
    <CreateButtonWithModal />
    <JoinButtonWithModal />
  </div>
}

export default BarButtons;
