import React,{Component} from 'react';


class Price extends Component{
    
    state={
        price:this.props.price
    }
    
    changeCurrency=(event)=> {
        if(this.state.price.includes('$')){

        this.setState({
            price:`${this.state.price.slice(0,this.state.price.length-1)*500}AMD`
        })
        
        }

        if(this.state.price.includes('AMD')){

            this.setState({
                price:`${this.state.price.slice(0,this.state.price.length-3)/500}$`
            })
            
        }
    }

    render(){
        
        return(
            <div>
            <span>{this.state.price} </span>
            <button onClick={this.changeCurrency} >change the currency</button>
            </div>
        )
    }
}

export {Price};