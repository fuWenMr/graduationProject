import React from 'react';
import getScript from './getScript';
import { Icon, Tooltip } from 'antd';
import { connectAlita } from 'redux-alita';
import { STATE_CURRENT_APP } from '~/redux/reduxStateName';

import { ProbelWrapper } from './styled';

class Probel extends React.Component<any> {
    codeTextRef = React.createRef() as React.RefObject<any>;

    private selectCode = () => {
        const selection = window.document.getSelection();
        selection && selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(this.codeTextRef.current);
        selection && selection.addRange(range);
    };

    render() {
        const { baseConfig, specialConfig } = this.props;
        const currentApp = this.props[STATE_CURRENT_APP];

        const scriptStrs = getScript(baseConfig, specialConfig, currentApp && currentApp.data.id);

        return (
            <ProbelWrapper>
                <h1>在你的页面中使用探针</h1>
                <p>
                    复制下方代码到HTML页面中的的 {'<body>'}标签头部
                    <Tooltip title="选中">
                        <Icon
                            className="quick_click"
                            type="copy"
                            theme="filled"
                            onClick={this.selectCode}
                        />
                    </Tooltip>
                </p>
                <div className="code_area" ref={this.codeTextRef}>
                    {scriptStrs.map((str) => {
                        return <p key={str}>{str}</p>;
                    })}
                </div>
            </ProbelWrapper>
        );
    }
}

export default connectAlita([STATE_CURRENT_APP])(Probel);
