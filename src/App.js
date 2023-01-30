import { Component } from 'react';
import FormF from './Container/FormF';
import FormC from './Container/FormC';
import Nav from './Components/Nav';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isFormFActive: true,
    }
  };

  onSwitchToggle (value) {
    this.setState({
      isFormFActive: value
    })
  };

  onSwitchToggle = this.onSwitchToggle.bind(this);

  render() {
    const { state, onSwitchToggle } = this;
    const { isFormFActive } = state;

    return <div>
      <Nav 
        header={`${isFormFActive ? 'Functional' : 'Class'} Based Component`} 
        toggleValue={['F', 'C']} 
        isToggled={isFormFActive} 
        onSwitchToggle={onSwitchToggle}
      />
      {isFormFActive ? <FormF /> : <FormC />}
    </div>
  }
}

export default App;
