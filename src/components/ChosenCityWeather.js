import React, { Component } from 'react';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default class ChosenCityWeather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            apiKey:"NjJtqeAEOr7Jfz7GyIwGThSAbJvsU7N7",
             cityWeather:"",
        }
    }

     middleFunction = (data) => {
         return data   
    }
    

    componentDidMount =  () =>{
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.props.savedCity.key}?apikey=${this.state.apiKey}&language=en-us&details=true&metric=true`
        ).then((res)=>{
            this.middleFunction(res)
             this.setState({cityWeather:[res]})
        }).catch((err)=>{
            alert("ohh ohh somethimng wrong please try later")
            
        })
       
    }

    render() {  
        return (
            <div>
                {this.state.cityWeather !== "" ? 
                 <Grid container spacing={3}>
              <Grid item xs={12} style={{textAlign:"center" , color:"white" , fontWeight:"bolder"}}>{this.props.savedCity.cityName}</Grid>
              <Grid item xs={1}></Grid>
              
              {this.state.cityWeather[0].data.DailyForecasts.map((element) => {
                
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
                            {element.Date}<br/>
                          </Typography>
                          <Typography  component="h4">
                            {element.Day.ShortPhrase}<br/>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {element.Temperature.Maximum.Value}{element.Temperature.Maximum.Unit} - 
                            {element.Temperature.Minimum.Value}{element.Temperature.Minimum.Unit}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
    : console.log("empty")
    }
            </div>
        )
    }
}
