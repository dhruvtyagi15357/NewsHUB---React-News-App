import React, { Component } from 'react'
import './Spinner.css'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="lds-hourglass"></div>
      </div>
    )
  }
}
