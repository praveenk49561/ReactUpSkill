import { Component } from "react";
import Panel from "./Panel";
import { panelItems } from "../../Constants/calculater";
import './styles.css';
import View from "./View";


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            tempValue: 0
        }
    }

    render () {
        return <div>
            <View />
            <Panel panelItems={panelItems} />
        </div>;
    }
}

export default Calculator;