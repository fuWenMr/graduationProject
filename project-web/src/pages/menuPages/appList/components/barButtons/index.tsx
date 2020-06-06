import React from 'react';
import CreateButtonWithModal from '../createButtonWithModal';
import JoinButtonWithModal from '../joinButtonWithModal';

function BarButtons (props: { apps: any[] }) {
  const { apps } = props;
  return <div className="bar_btns">
    <CreateButtonWithModal />
    <JoinButtonWithModal apps={apps} />
  </div>
}

export default BarButtons;
