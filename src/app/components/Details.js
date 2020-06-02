import React, { Component } from 'react'
import '../styles/Details.css'
const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0;
  }
 class Details extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        let details ="";
        if(!isEmptyObject(this.props.weatherData) && !isEmptyObject(this.props.selectedCity)){
            const wi = this.props.weatherData;
            const selectedCity = this.props.selectedCity;
            const cityName = selectedCity && selectedCity[Object.keys(selectedCity)[0]]
            if(wi && wi.hasOwnProperty("Temperature")){
            const simble = wi.Temperature.Metric.Unit;  
            details = <div className="details">
                <span>{wi.WeatherText} </span>
                <span>{wi.Temperature.Metric.Value}° {simble}</span>
                <span> in {cityName}</span>
            </div>
            }
        }
        else{
            details = "Please try to search an existing city to check the weather in."
        }
        return (
            <div>
                {details}
            </div>
        )
    }
}

export default Details;