import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default class Navigation extends Component {
    render() {
        return (
            <div style={{textAlign:"right"}}>
                <Link to ="/"><Button style={{fontWeight:"bold"}}>Homepage</Button></Link>|
                <Link to ="/5daysWeather"><Button style={{fontWeight:"bold"}}>Favorites</Button></Link>
            </div>
        )
    }
}
