/**
 * Created by Mr.F
 */
import React from 'react';
import ConfigSetter from './compoents/configSetter';
import Probel from './compoents/probel';

interface SDKsetState {
    baseConfig: string;
    specialConfig: string;
}

class SDKSet extends React.Component<any, SDKsetState> {
    constructor(props: any) {
        super(props);
        this.state = this.initState();
    }

    private initState() {
        const baseConfigJSON = localStorage.getItem('baseConfigJSON');
        const specialConfigJSON = localStorage.getItem('specialConfigJSON');
        return {
            baseConfig: baseConfigJSON || '',
            specialConfig: specialConfigJSON || '',
        };
    }

    private setSpecialConfig = (json: string) => {
        localStorage.setItem('specialConfigJSON', json);
        this.setState({ specialConfig: json });
    };

    private setBaseConfig = (json: string) => {
        localStorage.setItem('baseConfigJSON', json);
        this.setState({ baseConfig: json });
    };

    render() {
        const { baseConfig, specialConfig } = this.state;
        return (
            <div className="menu_page_content">
                <ConfigSetter
                    baseConfig={baseConfig}
                    specialConfig={specialConfig}
                    setBaseConfig={this.setBaseConfig}
                    setSpecialConfig={this.setSpecialConfig}
                    w
                />
                <Probel baseConfig={baseConfig} specialConfig={specialConfig} />
            </div>
        );
    }
}

export default SDKSet;
