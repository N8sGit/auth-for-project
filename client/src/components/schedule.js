import React from "react"
import axios from 'axios'
// import {boomsetKey} from '../../../secret'
// console.log(boomsetKey, 'key?');

let exampleEvents = [{ eventName: 'event1', time: '2pm'},{eventName: 'event2', time: '5pm'}, {eventName: 'event2', time: '1pm'}]

export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            source: this.props.source
        }
    }

    componentDidMount(){
        console.log('component did mount in schedule.js');
        axios.post('/boomset', {email: this.props.email, url: this.props.url, source: this.props.source})
            .then((response) => {
                console.log('route hit in schedule.js');
                console.log(response, 'response at boomset axios req in frontend');
            })
    }


    render(){
    let url = this.props.url
    ;
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