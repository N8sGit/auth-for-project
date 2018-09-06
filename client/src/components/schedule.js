import React from "react"

let exampleEvents = [{ eventName: 'event1', time: '2pm'},{eventName: 'event2', time: '5pm'}, {eventName: 'event2', time: '1pm'}]

export default class Display extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
    console.log(this.props.url);
        return (
            <div id='schedule-list'> 
                 <a href={this.props.url}> Click here to manage your schedule </a>
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