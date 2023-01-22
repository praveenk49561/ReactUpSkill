import { Component } from "react";


class Card extends Component {

    render () {
        console.log('Render Func In Card Comp');

        const { name, className } = this.props;
        return <div className={`card ${className}`}>
            {name}
        </div>
    }
}

export default Card;