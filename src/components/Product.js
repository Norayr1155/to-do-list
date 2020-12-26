import React,{Component} from 'react';
import {Description} from './Description';
import {Name} from './Name';
import {Price} from './Price';


class Product extends Component {
    
    render(){
        return(
            <>
                <Description description={this.props.description} />
                <Name name={this.props.name}/>
                <Price price={this.props.price}/>
            </>
            
        )
    }
}

export {Product};