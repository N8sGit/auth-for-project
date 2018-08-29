import React from 'react'

export default class Error extends React.Component{
    constructor(props){
        super(props)
    }
render(){
    console.log(this.props.errorMessage);
    return(
        <div>
       <p> {this.props.errorMessage} </p>
        </div>
    )
}    
}