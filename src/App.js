import React, { Component } from 'react'
import HomePage from './components/HomePage';
import FavoritesCities from './components/FavoritesCities';
import ChosencityWeather from './components/ChosenCityWeather';
import Navigation from './components/Navigation';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       favorite:[],
       ExpandFavorite:[]
    }
  }

  saveFavorite= (Favorite) => {
    this.setState({favorite:Favorite})
    console.log(Favorite);
    
  }

  showExpandInfo= (data) =>{
    console.log(data);
    this.setState({ExpandFavorite:data})
  }
  
  render() {
    return (
      <div>
        {/* <Navigation/>
        <HomePage favorite = {this.saveFavorite}/> */}
        {/* {this.state.favorite.map((element) => { */}
        {/* {this.state.favorite.length > 0 ?
        <FavoritesCities expand={this.showExpandInfo} cities = {this.state.favorite}/> 
         : undefined} 
        <HomePage favorite = {this.saveFavorite}/>
        
        <ChosencityWeather savedCity = {this.state.ExpandFavorite}/> */}
        {/* // })} */}
        <Router>
        <Navigation/>
          <Switch>
      
            <Route exact path ="/">
              <HomePage favorite = {this.saveFavorite}/>
            </Route>

            <Route exact path = "/5daysWeather">
              <FavoritesCities expand={this.showExpandInfo} cities = {this.state.favorite}/> 
            </Route>

            <Route exact path ="/favoriteCityWeather">
              <ChosencityWeather savedCity = {this.state.ExpandFavorite}/>
            </Route>
            
          </Switch>
        </Router>
        
    
      </div>
    )
  }
}



