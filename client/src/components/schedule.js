import React from "react"
import axios from 'axios'
// import {boomsetKey} from '../../../secret'
// console.log(boomsetKey, 'key?');

let exampleEvents = [{ eventName: 'event1', time: '2pm'},{eventName: 'event2', time: '5pm'}, {eventName: 'event2', time: '1pm'}]

export default class Display extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        axios.post('/boomset', {email: this.props.email})
            .then((response) =>{
                console.log(response, 'response at boomset axios req in frontend');
            })
    }


    render(){
    let url = this.props.url
    console.log(this.props.email, 'email');
        return (
            <div id='schedule-list'> 
                 <a href={url}> Click here to manage your schedule </a>
                { 
                exampleEvents.map(event => {
                    return (
                        <div>
                        <h2> Event: {event.eventName}</h2>
                        <ol> Time: {event.time}</ol>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}