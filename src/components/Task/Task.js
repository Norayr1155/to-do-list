import React, {Component} from 'react';
import {Button,Card} from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'


export default class Task extends Component{

    static propTypes={
        data:PropTypes.object.isRequired,
        onToggle:PropTypes.func.isRequired,
        onDelete:PropTypes.func.isRequired,
        disabled:PropTypes.bool.isRequired,
        selected:PropTypes.bool.isRequired

    };

    handleChange=()=>{
        const{data,onToggle}=this.props;
        onToggle(data._id);
    };
    
    
    render(){
        
        const taskObject = this.props.data;
        const {onDelete,disabled,selected,onEdit}=this.props;
        return(
            <Card className={`${styles.task} ${selected?styles.selectedTask:""}`}>
                    <Card.Body>
                        <input 
                        type='checkbox'
                        onChange={this.handleChange}
                        checked={selected}
                        >
                        </input>
                        <Card.Title>{taskObject.title}</Card.Title>
                        <Card.Text>
                        {taskObject.description}
                        </Card.Text>
                        
                        <Button 
                        variant="success"
                        onClick={()=>onEdit(taskObject)}
                        disabled={disabled}
                        className='mr-2'
                        >
                        <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        <Button 
                        variant="danger"
                        onClick={()=>onDelete(taskObject._id)}
                        disabled={disabled}
                        >
                        <FontAwesomeIcon icon={faTrash} />
                        </Button>

                    </Card.Body>
                </Card>
        )
    }
}