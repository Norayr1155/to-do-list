import React,{Component} from 'react';


class Description extends Component{
    
    render(){
        return(
            <span>{this.props.description}</span>
        )
    }
}

export {Description};