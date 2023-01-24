'use-strict';
import { Component } from "react";
import './styles.css';

class CalcButton extends Component {

    onClickHandler = () => {
        this?.props?.onClick(this?.props?.value);
    }

    render () {
        const { children, containerClassName, className } = this?.props;
        return (
            <div 
                className={`default-calc-button-container ${containerClassName ?? ''}`}
                onClick={this?.onClickHandler}
            >
                <div className={`default-calc-button-text ${className ?? ''}`}>
                    {children}
                </div>
            </div>
        );
    }
};

export default CalcButton;
