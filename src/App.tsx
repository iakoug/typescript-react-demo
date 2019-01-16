import * as React from 'react'
import 'antd/dist/antd.css'

import List from '../src/containers/list'
import './App.css'

export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <List />
      </div>
    );
  }
}
