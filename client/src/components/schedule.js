import React from "react"
import axios from 'axios'
// import {boomsetKey} from '../../../secret'
// console.log(boomsetKey, 'key?');


export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            source: this.props.source,
            sessions: [],
            tags : []
        }
    }

    componentWillMount(){
        axios.post('/boomset', {email: this.props.email, url: this.props.url, source: this.props.source})
            .then((response) => {
                this.setState({sessions: response.data.result, tags : response.data.tagRefs})
            })
    }


    render(){
    let url = this.props.url
    let sessions = this.state.sessions
    let tags = this.state.tags
  
    ;
        return (
            <div id='schedule-list'> 
                 <a href={url}> Click here to manage your schedule </a>
                { 
                sessions.map((event, index) => {
                    let dates = [event.humanize_dates.starts, event.humanize_dates.ends]
                    let name = event.name
                    let location = event.location_info || 'TBD'
                    if(tags[index].tracks.length<2){
                        tags[index].tracks[1] = ''
                    }
                    return (
                        <div className ="events">
                            <h3> {tags[index] ? tags[index].tracks[0] : '' } : {tags[index].tracks[1] || ''} </h3>
                            <strong> {event.name}</strong>
                            <ul> Room # : {location}  </ul>
                            <ul>Starts: {dates[0]} Ends : {dates[1]} </ul>
                            
                        </div>
                    )
                })
                }
            </div>
        )
    }
}