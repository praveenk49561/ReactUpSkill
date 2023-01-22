import './App.css';
import { Component } from 'react';
import List from './Container/List';
import SearchBox from './Components/SearchBox';


export class App extends Component {
  constructor() {
    console.log('Constructer');
    super();

    this.state = {
      userList: [],
      searchQuery: ''
    }
  }


  componentDidMount () {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((res) => this.setState({
      userList: res
    }));
  }

  searchHandler = (event) => {
    this.setState({
      searchQuery: event?.target?.value,
    })
  }

  render() {
    console.log('Render');
    const { userList, searchQuery } = this?.state;

    return <div>
      <SearchBox placeholder='search a text' onChange={this.searchHandler} />
      <List userList={userList} searchQuery={searchQuery} />
    </div>
  }
}

export default App;
