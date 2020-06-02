import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForCity } from '../services/apiRequests'
import '../styles/Favorits.css'
const mapStateToProps = (state) => {
    return {
      state
    }
  }
 class Favorits extends Component {
    constructor(props) {
        super(props);
        this.state = {favoritsData:{}}
      }

      componentDidMount(){
          const favoritsList = this.props.state.Favorits.favorits;
          const favoritsListKeys = Object.keys(favoritsList);
          favoritsListKeys.forEach(element => {
            getForCity(element).then(data => {
              const objN = {};
              objN[element] = data;
              objN[element].key = element;
              const newState = Object.assign(this.state.favoritsData,objN)
              this.setState({newState})
            });
          });
      }

       temlate(data, favoritsList, key){
            let simble,Temperature;
            if(data && data.Temperature){
              simble = data.Temperature.Metric.Unit;  
              Temperature = data.Temperature.Metric.Value;  
            }
            return <div className="favoriteElement" id={key}>
                      <div className="locationName">{data && data.key && favoritsList && favoritsList[data.key]}</div>
                      {data && Temperature && simble && <span>{Temperature}° {simble}</span>}
                      <div>{data && data.WeatherText}</div>
                   </div>
        } 

    render() {
      const favoritsList = this.props.state.Favorits.favorits;
      const dataList = Object.values(this.state.favoritsData);
        return (
            <div>
                <h2>Favorits</h2>
                <div className="favoriteContent">
                  {dataList.length !== 0 && dataList.map((data, key)=>
                    this.temlate(data, favoritsList, key))}
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps)(Favorits);