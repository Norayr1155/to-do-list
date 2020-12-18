import React,{Component} from 'react';


class Description extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
            this.props.description
        )
    }
}

export {Description};