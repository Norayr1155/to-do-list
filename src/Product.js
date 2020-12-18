import React,{Component} from 'react';
import {Description} from './Description';
import {Name} from './Name';
import {Price} from './Price';


class Product extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <p>
                <Description description={this.props.description} />
                <Name name={this.props.name}/>
                <Price price={this.props.price}/>
            </p>
            
        )
    }
}

export {Product};