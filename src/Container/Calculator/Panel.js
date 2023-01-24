import { Component } from "react";
import CalcButton from "../../Components/CalcButton";


class Panel extends Component {

    getContainerClassName = (colItem = '') => {
        switch (colItem) {
            case '=':
                return 'equal-to-col-item';
            default:
                return '';
        }
    } 

    getButtonPanel = (panel = []) => {
        return panel?.map((eR) => {
            const rowItems = eR?.map((eC) => {
                const containerClassName = this.getContainerClassName(eC);
                return <div key={eC} className="default-panel-col-item">
                    <CalcButton containerClassName={containerClassName}>{eC}</CalcButton>
                </div>;
            });
            return <div key={eR} className="default-panel-row-item">{rowItems}</div>
        });
    };

    render () {
        const { panelItems } = this?.props;
        const panel = this.getButtonPanel(panelItems);
        return <div>
            {panel}
        </div>;
    }
}

export default Panel;