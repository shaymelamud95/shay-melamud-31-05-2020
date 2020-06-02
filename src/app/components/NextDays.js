import React, { Component } from 'react'
import moment from 'moment'
import '../styles/NextDays.css'

class NextDays extends Component {
    constructor(props) {
        super(props);
      }
        DayEx(dayEx,key){
            if(dayEx && dayEx.Date && dayEx.Temperature){
                const dayName = moment(dayEx.Date).format('dddd');    
                return <div className="nextDayElement" key={key}>
                        <div className="dayName">{dayName}</div>
                        <div>{dayEx.Temperature.Minimum.Value}° {dayEx.Temperature.Minimum.Unit}</div>
                </div>
            }
        } 
    render() {
       
        const nextDays = this.props.nextDays;

        return (
            <div className="nextDayContent">
                {nextDays && nextDays.map((d, key) => {
                    return  this.DayEx(d,key)})}
            </div>
        )
    }
}

export default NextDays;