import React, {Component} from 'react';
import {Button,Card} from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';

export default class Task extends Component{

    static propTypes={
        data:PropTypes.object.isRequired,
        onToggle:PropTypes.func.isRequired,
        onDelete:PropTypes.func.isRequired,
        disabled:PropTypes.bool.isRequired
    };

    state={
        selected:false
    };

    handleChange=()=>{
        const{data,onToggle}=this.props;
        onToggle(data._id);
        this.setState({
            selected:!this.state.selected,
        })

    }

    render(){
        const taskObject = this.props.data;
        const {onDelete,disabled}=this.props;
        const {selected}=this.state;
        return(
            <Card className={`${styles.task} ${selected?styles.selectedTask:""}`}>
                    <Card.Body>
                        <input 
                        type='checkbox'
                        onChange={this.handleChange}
                        >
                        </input>
                        <Card.Title>{taskObject.title}</Card.Title>
                        <Card.Text>
                        This is new and unique task !!!
                        </Card.Text>
                        <Button 
                        variant="danger"
                        onClick={()=>onDelete(taskObject._id)}
                        disabled={disabled}
                        >
                        Delete</Button>

                    </Card.Body>
                </Card>
        )
    }
}