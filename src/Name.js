import React,{Component} from 'react';


class Name extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
            this.props.name
        )
    }
}

export {Name};