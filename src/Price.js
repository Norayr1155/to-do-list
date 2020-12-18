import React,{Component} from 'react';


class Price extends Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
            this.props.price
        )
    }
}

export {Price};