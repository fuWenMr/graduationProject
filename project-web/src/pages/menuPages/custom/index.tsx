import React from 'react';
import { Wrapper } from './styled';
import KeyList from './components/keyList';
import CustomChart from './components/customChart';

function Custom() {
  return <Wrapper>
    <KeyList />
    <CustomChart />
  </Wrapper>
}

export default Custom;