import React from "react"
import axios from 'axios'



export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            source: this.props.source,
            sessions: [],
            tags : [],
            errorMessage : ''
        }
    }

    componentWillMount(){
        console.log(this.props.source, 'source data on frontend');
        axios.post('/boomset', {email: this.props.email, url: this.props.url, source: this.props.source})
            .then((response) => {
                if(!response.data.result ){
                    this.setState({errorMessage : response.data.errorMessage})
                } else this.setState({sessions: response.data.result, tags : response.data.tagRefs})
            })
    }


   render(){
    let url = this.props.url
    let sessions = this.state.sessions
    let tags = this.state.tags
  
    if(sessions){
        return (
            <div id='schedule-list'> 
                <a id= 'url' href={url}> Click here to manage your schedule </a>
            { 
                sessions.map((event, index) => {
                        let dates = [event.humanize_dates.starts, event.humanize_dates.ends]
                        let name = event.name
                        let location = event.location_info || 'TBD'
                    if(tags[index].tracks.length<2){
                        tags[index].tracks[1] = ''
                    }
                    return (
                        <div id ="events-container">
                            <h3 id = 'event-track'> {tags[index] ? tags[index].tracks[0] : '' } : {tags[index].tracks[1] || ''} </h3>
                            <strong id ='event-name' className ='event-format'> {name}</strong>
                            <ul id ='event-list'>
                            <li className ='event-format'> Room # : {location}</li>i
                            <li className ='event-format'>Starts: {dates[0]}</li>
                            <li className ='event-format'>Ends : {dates[1]}</li>
                            </ul>
                            
                        </div>
                    )
                })
            }
            </div>
        )
            
    } else if(this.state.errorMessage){
        return <div> There appears to be a problem with retrieving your schedule. Please try refreshing your browser. </div> 
    } 
    
    else {
        return <div> One moment please. This make take a few seconds... </div>
    }
  }
}
