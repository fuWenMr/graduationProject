/**
 * Created by Mr.F
 */
import React from 'react';
import { Row, Col } from 'antd';
import ErrorTipPanel from './compoents/errorTipPanel';
import PvEchartsViews from './compoents/pvEchartsViews';

class OverAll extends React.Component {
  render() {
    return (
      <>
        <ErrorTipPanel />
        <Row gutter={[16, 16]}>
          <Col>
            <PvEchartsViews />
          </Col>
        </Row>
      </>
    );
  }
}

export default OverAll;
