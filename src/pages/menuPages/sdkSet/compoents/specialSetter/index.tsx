import React from 'react';
import { Button, Radio } from 'antd';
import { SpecialConfigWrapper } from './styled';
import RadioWithCustom from '../RadioWithCustom';
import { showConfigModel } from './tool';
import { getJSONByForm } from '~/utils';

function ConfigItem(props: any) {
    const { title, children } = props;
    return (
        <div>
            <h1>{title}</h1>
            <div className="config_content">{children}</div>
        </div>
    );
}

class SpecialSetter extends React.PureComponent<any> {
    formRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef();
    }

    private hadleSumbit = () => {
        const formElem = this.formRef.current;
        const preSpecialConfig = getJSONByForm(formElem);
        showConfigModel(preSpecialConfig).then(() => {
            this.props.setspecialConfig(preSpecialConfig);
        });
    };

    render() {
        const { specialConfig } = this.props;

        const config = specialConfig ? JSON.parse(specialConfig) : {};

        return (
            <SpecialConfigWrapper>
                <form ref={this.formRef}>
                    <div className="top_tip">
                        <p>高级设置将针对开发者提供更多的功能,其改动同样会映射到下面的探针脚本</p>
                        <p>
                            与基本配置不同,高级选项修改后还需要点击确认按钮,才会体现在脚本中,同样要在新脚本部署后生效
                        </p>
                        <p className="title_tip">
                            ps: 这些功能内容往往牵扯到脚本执行机制变动,
                            错误使用可能会导致数据上报异常或失准, 请谨慎使用
                        </p>
                    </div>
                    <div className="config">
                        <ConfigItem title="应用ID">
                            <p className="wid">uu2345sdfghjkllllhaldufhelsadfhal1385s</p>
                            <p>
                                应用ID(wid)是系统为站点分配的唯一标志,
                                不可修改.所有的数据上报都会带上应用ID
                            </p>
                        </ConfigItem>

                        <ConfigItem title="别名">
                            <RadioWithCustom
                                name="alias"
                                value={config.alias}
                                defaultValue="__fw"
                            />
                            <p>
                                监控脚本的所有属性默认会挂载到window.__fw上,别名可以指定一个新的对象名,但需要符合以下规定
                                <br />
                                1.以__开头;2长度在10个字符之内;3.只含有字母,数字或下划线;
                            </p>
                        </ConfigItem>
                        <ConfigItem title="采样率">
                            <Radio.Group name="ratio" defaultValue="1">
                                <Radio value="1">100%(默认值)</Radio>
                                <Radio value="0.5">50%</Radio>
                                <Radio value="0.25">25%</Radio>
                                <Radio value="0.1">10%</Radio>
                            </Radio.Group>
                            <p>
                                大流量情况下, 频繁地数据发送会快速消耗流量和cpu资源,
                                可以通过调整采样率来减轻服务器压力
                            </p>
                        </ConfigItem>
                        <ConfigItem title="脚本异步加载">
                            <Radio.Group name="isAsync" defaultValue="0">
                                <Radio value="0">同步加载(默认值)</Radio>
                                <Radio value="1">异步加载</Radio>
                            </Radio.Group>
                            <p>
                                监控脚本需要放在 body
                                头部,会阻塞页面渲染,敏感用户可以使用异步加载的探针,或者将探针位置后移
                            </p>
                            <p className="tip">
                                注意: 不管用哪种方法,
                                都会导致无法监控得到脚本初始化之前的error和其它部分数据.
                                <br />
                                <span className="space">正正</span>
                                一般情况下网络延时在50ms之内,且有网络缓存机制,因此强烈不建议使用此选项.
                            </p>
                        </ConfigItem>
                        <ConfigItem title="自部署">
                            <p>
                                作为开源项目,如果因为数据安全等原因对本系统有私有化部署需求的用户,可以按下提示操作
                            </p>
                            <ul>
                                <li>
                                    从
                                    <a href="https://github.com/fuWenMr/graduationProject">
                                        git仓库
                                    </a>
                                    clone项目, 完成部署
                                </li>
                                <li>
                                    保存当前版本的探针脚本(
                                    <a href="https://github.com/fuWenMr/graduationProject" download>
                                        探针下载
                                    </a>
                                    ),修改最后一行中的url为自己的服务器接口地址,防止收到以后可能的版本更新影响
                                </li>
                                <li>在下面勾选并填写新的 脚本地址</li>
                            </ul>
                            <RadioWithCustom
                                name="probelUrl"
                                value={config.probelUrl}
                                defaultValue="http://localhost:3007/static/js/bundle.js"
                            />
                            <p className="tip">
                                注意: 如果你将项目部署在https协议中, 则探针的url协议也需要为https
                            </p>
                        </ConfigItem>
                        <Button type="primary" onClick={this.hadleSumbit}>
                            {' '}
                            配置变更{' '}
                        </Button>
                    </div>
                </form>
            </SpecialConfigWrapper>
        );
    }
}

export default SpecialSetter;
