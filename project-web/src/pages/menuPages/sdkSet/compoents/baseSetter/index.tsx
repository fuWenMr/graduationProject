import React, { useRef, useEffect } from 'react';
import { Checkbox } from 'antd';
import { CheckboxWrapper, ContentTitleWrapper } from './styled';
import { getJSONByForm } from '~/utils';
import { checkList } from './data';

function CheckboxItem(props: any) {
    const { title, tip, name, checked, onChange = () => {} } = props;
    return (
        <div className="checkout_item">
            <span className="checkbox_title">{title}:</span>
            <Checkbox onChange={onChange} name={name} checked={checked} value />
            <span className="checkbox_tip">{tip}</span>
        </div>
    );
}

function BaseSetter(props: any) {
    const formRef = useRef(null);
    const { baseConfig, setBaseConfig } = props;

    const isNew = baseConfig === '';
    const config = isNew ? {} : JSON.parse(baseConfig);

    const handleChange = (e?: any) => {
        const FormElem = formRef.current;
        const extarData = e ? { [e.target.name]: e.target.checked } : {};
        const BaseConfigJson = getJSONByForm(FormElem, extarData);
        setBaseConfig(BaseConfigJson);
        console.log(BaseConfigJson);
    };
    useEffect(() => {
        handleChange();
    }, []); // eslint-disable-line
    return (
        <div>
            <ContentTitleWrapper>
                <h1>探针配置项</h1>
                <p>注意:在这里勾选之后, 页面下方的探针植入脚本会实时改变,</p>
                <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;将脚本复制道页面的html中,
                    并且重新部署之后,系的上报规则才会生效, 这一过程都数据显示不感知,
                </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;一般情况, 推荐使用(默认)全选配置.</p>
            </ContentTitleWrapper>
            <CheckboxWrapper>
                <form ref={formRef}>
                    {checkList.map((item) => {
                        const checked = isNew || !!config[item.name];
                        return (
                            <CheckboxItem
                                key={item.title}
                                title={item.title}
                                name={item.name}
                                tip={item.tip}
                                checked={checked}
                                onChange={handleChange}
                            />
                        );
                    })}
                </form>
            </CheckboxWrapper>
        </div>
    );
}

export default BaseSetter;
