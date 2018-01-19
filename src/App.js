import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const api_key = 'AIzaSyC1iMi_o2dCPxzMNLIONyeZFbm0B7GC31c';

const SourceTextFieldStyle = {
  margin: '20px',
  padding: '10px',
  height: '100%',
  width: '40%',
  borderStyle: 'solid',
  borderColor: 'gray',
  borderWidth: '1px',
  borderRadius: '3px',
  float: 'left',
}

const TargetTextFieldStyle = {
  margin: '20px',
  padding: '10px',
  height: '100%',
  width: '40%',
  borderStyle: 'solid',
  borderColor: 'gray',
  borderWidth: '1px',
  borderRadius: '3px',
  float: 'right',
} 

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sourceText: '',
      targetText: ''
    }
  }
  
  componentDidMount() {

  }

  translateText() {

    axios.post(`https://translation.googleapis.com/language/translate/v2?key=${api_key}`, {
      q: this.state.sourceText,
      source: 'ko',
      target: 'en',
    }).then(response => {
      console.log(response)
      if (response.data) {
        if (response.data.data) {
          if (response.data.data.translations.length > 0) {
            const obj = response.data.data.translations[0]
            if (obj.translatedText) {
              this.setState({
                targetText: obj.translatedText
              })
            }
          }
        }
      }
    }).catch(error => {
      console.log(error)
    })

  }

  sourceTextDidUpdate = (event) => {
    this.setState({
      sourceText: event.target.value,
    })
  }

  render() {
    return (
      <div className="App">
      <Button
        fullWidth={true}
        raised={true}
        color={'primary'}
        onClick={this.translateText.bind(this)}
      >Translate</Button>
      <div>
        <TextField
          id='source'
          style={SourceTextFieldStyle}
          placeholder='Source'
          multiline={true}
          rows={5}
          rowsMax={1000}
          value={this.state.sourceText}
          onChange={this.sourceTextDidUpdate}
        />
        <TextField
          id='target'
          style={TargetTextFieldStyle}
          placeholder='Target'
          multiline={true}
          rows={5}
          rowsMax={1000}
          value={this.state.targetText}
        />
        </div>
      </div>
    );
  }
}

export default App;
