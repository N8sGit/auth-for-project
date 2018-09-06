import React from "react"

export default class Display extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props.url);
        return (
            <div> 
                <link src={this.props.url}> Manage your schedule here </link>
                <div id ="schedule-list"> 
                {/* <ul> elements go here, will be injected programmatically */}
                </div>
            </div>
        )
    }
}