import React from "react"
import axios from 'axios'
// import {boomsetKey} from '../../../secret'
// console.log(boomsetKey, 'key?');


export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            source: this.props.source,
            sessions: []
        }
    }

    componentDidMount(){
        axios.post('/boomset', {email: this.props.email, url: this.props.url, source: this.props.source})
            .then((response) => {
                this.setState({sessions: response.data.result})
            })
    }


    render(){
    let url = this.props.url
    let sessions = this.state.sessions
    console.log(this.state.sessions);
    ;
        return (
            <div id='schedule-list'> 
                 <a href={url}> Click here to manage your schedule </a>
                { 
                sessions.map(event => {
                    return (
                        <div>
                        <h2> Event: {event.name}</h2>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}