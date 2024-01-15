import './App.css'
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import About from './Components/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


export default class App extends Component {
  name = 'Dhruv'
  api_key = '87db7d55fa594e4ab9cfdbb2b38edf6f'
  state = {
    categories: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
  };

  render() {

    return (
      <BrowserRouter>
        <div>
          <Navbar categories={this.state.categories}/>
          <Routes>
            <Route path="/" element={<News country='in'/>}/>
            {this.state.categories.map((e) => {
              return (
                <Route key={e} path={`/${e}`} element={<News country='in' category={e}/>}/>
              )
            }
          )}
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

