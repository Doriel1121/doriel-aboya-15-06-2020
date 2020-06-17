import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: "NjJtqeAEOr7Jfz7GyIwGThSAbJvsU7N7",
      ChosenCity: [],
      weatherOfCity: [],
      FavoritsCities: [],
      CurrentCity:"",
      optionalCities: undefined,
    };
  }
  componentDidMount = () => {
    axios
      .get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${this.state.apiKey}&language=en-us&details=false&metric=true`
      )
      .then((res) => {
        let all = res.data;
        this.setState({ ChosenCity: res.data });
        this.SearchTheCityWeather(all);
      })
      .catch((err) => {
        console.log(err);
        alert("opps ");
      });
  };
  updateCityName = (city) => {
    let cityName = city.target.value;
    this.setState({CurrentCity:cityName})
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.state.apiKey}&q=${cityName}&language=en-us`
      )
      .then((res) => {
        if (res.data.length > 1) {
          this.setState({ optionalCities: res });
        } else {
          this.setState({ ChosenCity: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong 1 ");
      });
  };

  SearchTheCityWeather = (data) => {      
    if (this.state.ChosenCity.length > 0) {
      axios
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.ChosenCity[0].Key}?apikey=${this.state.apiKey}&language=en-us&details=true&metric=true`
        )
        .then((res) => {
          this.setState({ weatherOfCity: res.data.DailyForecasts });
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong 2");
        });
    } else {
      axios
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${this.state.apiKey}&language=en-us&details=true&metric=true`
        )
        .then((res) => {
          this.setState({ weatherOfCity: res.data.DailyForecasts });
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong ");
        });
    }
  };

  moveFavoriteCities = (fav) => {  
    if (this.state.FavoritsCities.length > 0) {  
      let allfav = this.state.FavoritsCities;
      allfav.push({ cityKey: fav, cityName: this.state.CurrentCity });
      this.props.favorite(allfav);
      this.setState({
        FavoritsCities: [
          ...this.state.FavoritsCities,
          { cityKey: fav, cityName: this.state.CurrentCity },
        ],
      });
    } else {
      let favoriteCityInfo = [{ cityKey: fav, cityName: this.state.CurrentCity }];
      this.props.favorite(favoriteCityInfo);
      this.setState({ FavoritsCities: favoriteCityInfo });
    }
  };

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid style={{ textAlign: "right" }} item xs={3}>
            <input
              style={{ height: 30, opacity: 0.9 }}
              placeholder="City name"
              onChange={this.updateCityName}
              list="Cities"
              name="city"
              id="city"
            />
            <datalist id="cities">
              {this.state.optionalCities !== undefined
                ? this.state.optionalCities.data.map((element) => {
                    return (
                      <option
                        value={element.LocalizedName}
                        onClick={() => this.SearchTheCityWeather(element.Key)}
                      />
                    );
                  })
                : undefined}
              <input type="submit" />
            </datalist>
          </Grid>
          <Grid style={{ textAlign: "left" }} item xs={3}>
            <Button
              onClick={() => this.SearchTheCityWeather()}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>

        {
          this.state.weatherOfCity.length > 0 ? (
            <div>
              <Grid container spacing={3}>
                  <Grid style={{textAlign:"center" , color:"white" , fontWeight:"bolder"}} item xs={12}>{this.state.CurrentCity}</Grid>
                <Grid style={{ textAlign: "center" }} item xs={1}>
                    {this.state.ChosenCity.length > 0 ? 
                    <Button
                    color="secondary"
                    className="btn"
                    onClick={() =>
                      this.moveFavoriteCities(this.state.ChosenCity[0].Key)
                    }
                  >
                    <FavoriteBorderIcon/>save
                  </Button>
                  :
                  <Button
                  disabled
                  className="btn"
                  id="disable"
                >
                  <FavoriteBorderIcon/>save
                </Button>}
                  
                </Grid>
                {this.state.weatherOfCity.map((element) => {
                  return (
                    <Grid item xs={2}>
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            style={{ height: 140 }}
                            image="https://cdn4.vectorstock.com/i/1000x1000/68/93/sunny-day-weather-forecast-info-icon-yellow-sun-vector-24566893.jpg"
                            title="sunday"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {element.Date}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {element.Temperature.Minimum.Value} -{" "}
                              {element.Temperature.Maximum.Value}{" "}
                              {element.Day.IconPhrase}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : undefined
        }
      </div>
    );
  }
}
