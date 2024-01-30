import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import About from './Components/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  name = 'Dhruv'
  var api_key = import.meta.env.VITE_APP_API_KEY;

  const [progress, setProgress] = useState(0);
  var categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  const [country, setCountry] = useState('in');
    return (
      <BrowserRouter>
        <div>
          <Navbar categories={categories}/>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            <Route path="/" element={<News country='in' api_key={api_key}/>}/>
            {categories.map((e) => {
              return (
                <Route key={e} path={`/${e}`} element={<News country='in' category={e} api_key={api_key}/>}/>
              )
            }
          )}
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }

export default App;