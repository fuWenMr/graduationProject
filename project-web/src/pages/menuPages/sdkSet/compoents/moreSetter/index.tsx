import React from 'react';
import { Button, Input } from 'antd';
import { Wrapper } from './styled';

class MoreSetter extends React.PureComponent<any> {
    state = {
        able2bind: false,
        bindWaring: '',
        isBindLoading: false,
        able2delete: false,
        isDeleteLoading: false,
    };

    domainInput = React.createRef() as React.RefObject<any>;

    private allowBind = () => {
        this.setState({
            able2bind: true,
        });
    };

    private handleBind = () => {
        const value = this.domainInput.current.value;
        if (value !== 'test') {
            this.setState({
                bindWaring: '根域名不合法',
            });
        }
    };

    private handleDeleteCheck = (e: any) => {
        this.setState({
            able2delete: e.target.value === 'since2020',
        });
    };

    render() {
        const { able2bind, bindWaring, isBindLoading, able2delete, isDeleteLoading } = this.state;
        return (
            <Wrapper>
                <div className="operate_item">
                    <h1>根域名绑定</h1>
                    <p>
                        绑定根域名之后,来自其它域名下站点的数据会被忽略(即使存在wid),一般来说不必进行此操作,同一时间只允许绑定一个域名
                    </p>
                    <p>当前绑定域名: 未绑定</p>
                    {able2bind ? (
                        <>
                            <div className="input">
                                <Input
                                    ref={this.domainInput}
                                    maxLength={50}
                                    style={{ maxWidth: '700px' }}
                                    placeholder="输入你想绑定的根域名"
                                />
                            </div>
                            <Button
                                type="primary"
                                onClick={this.handleBind}
                                loading={isBindLoading}
                            >
                                绑定跟域名
                            </Button>
                            {bindWaring && <span className="waring_tip">{bindWaring}</span>}
                        </>
                    ) : (
                        <Button type="primary" onClick={this.allowBind}>
                            绑定跟域名
                        </Button>
                    )}
                </div>

                <div className="operate_item delete">
                    <h1>删除项目</h1>
                    <p className="warning">
                        警告: 除非是私有化部署项目, 否则该操作造成的数据损失完全不可撤销,
                        如果确认要删除,请在下面的输入框中输入项目名
                    </p>
                    <div className="input">
                        <Input
                            maxLength={50}
                            style={{ maxWidth: '700px' }}
                            placeholder="输入正确的项目名"
                            onChange={this.handleDeleteCheck}
                        />
                    </div>
                    <Button type="danger" loading={isDeleteLoading} disabled={!able2delete}>
                        删除项目
                    </Button>
                </div>
            </Wrapper>
        );
    }
}

export default MoreSetter;
