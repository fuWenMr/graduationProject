import React from 'react';
import { Radio } from 'antd';

interface IProps {
  title?: string;
  name?: string;
  value?: string;
  defaultValue: string;
}

export default class RadioWithCustom extends React.PureComponent<IProps> {
  state = {
    radioValue: '',
    customValue: '',
  };

  constructor(props: IProps) {
    super(props);
    this.state = this.initState();
  }

  private initState() {
    const { value = '', defaultValue } = this.props;
    let radioValue = '0';
    let customValue = '';
    const isCustom = value && value !== defaultValue;
    if (isCustom) {
      radioValue = '1';
      customValue = value;
    }
    return {
      radioValue,
      customValue,
    };
  }

  private handleChange = (e: any) => {
    const radioValue = e ? e.target.value : '0';
    this.setState({
      radioValue,
    });
    console.log(e, radioValue);
  };

  private handleCustom = (e: any) => {
    const customValue = e.target.value;
    if (customValue) {
      this.setState({
        customValue,
      });
    }
  };

  render() {
    const { name = '', defaultValue, title } = this.props;
    const { radioValue, customValue } = this.state;
    return (
      <div>
        <span style={{ paddingRight: '20px' }}>{title}</span>
        <Radio.Group defaultValue={'0'} onChange={this.handleChange}>
          <Radio value="0">{defaultValue} (默认值)</Radio>
          {radioValue === '0' && (
            <input hidden name={name} value={defaultValue} readOnly />
          )}
          <Radio value="1">自定义</Radio>
          {radioValue === '1' && (
            <input name={name} value={customValue} onChange={this.handleCustom} />
          )}
        </Radio.Group>
      </div>
    );
  }
}
