import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

class App extends Component {
  state = {
    samples: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/api/value').then((response) => {
      this.setState({
        samples: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.samples.map((value: any) => (
          <div key={value.id}>
            <Button>{value.name}</Button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
