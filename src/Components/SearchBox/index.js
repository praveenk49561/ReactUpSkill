
import { Component } from "react";


class SearchBox extends Component {
    render () {
        console.log('Render Func In SearchBox Comp');

        const { className, value, placeholder, onChange } = this.props;
        return <input 
          className={`search-box ${className}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
    }
}

export default SearchBox;