import './App.css'
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'

export default class App extends Component {
  name = 'Dhruv'
  api_key = '87db7d55fa594e4ab9cfdbb2b38edf6f'
  render() {
    return (
      <div>
        <Navbar/>
        <News pageSize={12}/>
      </div>
    )
  }
}

