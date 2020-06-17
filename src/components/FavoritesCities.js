import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Link,Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";


export default class WeatherPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: "NjJtqeAEOr7Jfz7GyIwGThSAbJvsU7N7",
      weather: "",
      showStatus:false,
    };
  }

  componentDidMount = () => {
    this.props.cities.map((element) => {        
      axios
        .get(
          `http://dataservice.accuweather.com/currentconditions/v1/${element.cityKey}?apikey=${this.state.apiKey}&language=en-us&details=false`)
        .then((res) => {
          if (this.state.weather.length > 0) {
            let fullData = {data : res , cityName: element.cityName , key: element.cityKey}
            this.setState({ weather: [...this.state.weather, fullData] });            
          }else{
            let fullData = [{data : res , cityName: element.cityName , key: element.cityKey}]
            this.setState({weather:fullData})
          }
          
        })
        .catch((err) => {
          console.log(err);
          alert("something went ");
        });
      // }
    });
  };

  expandCityInfo= (data) => {
    this.setState({showStatus:true})
    this.props.expand(data)
  }

  render() {
    if (this.state.showStatus) {
      return <Redirect to ="/favoriteCityWeather"/>
    }
    
    if (this.props.cities !== "") {
      return (
        <div>
          <h1 style={{ textAlign: "center", marginBottom: 50 }}>
            Favorite cities
          </h1>

          {this.state.weather.length > 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              {this.state.weather.map((element) => {                
                return (
                  <Grid item xs={2}>
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          style={{ height: 140 }}
                          image="https://www.featurepics.com/StockImage/20070518/sunny-day-stock-picture-322118.jpg"
                          title="sunday"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {element.cityName}<br/>
                            {element.data.data.WeatherText}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {element.data.data[0].Temperature.Metric.Value}
                            {element.data.data[0].Temperature.Metric.Unit}<br/>
                            <Button color="primary" onClick = {()=>this.expandCityInfo(element)} >Expand</Button>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : undefined}
        </div>
      );
    }
  }
}
