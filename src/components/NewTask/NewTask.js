import React, {Component} from 'react';
import {Button,FormControl} from 'react-bootstrap';
import styles from './newTaskStyle.module.css';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';


export default class NewTask extends Component{

    state={
        title:'',
        description:''
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleKeyDown=(event)=>{
        if(event.key==='Enter'){
            this.handleSubmit();
        }
    };

    handleSubmit=()=>{
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title,
            description
        };

        this.props.onAdd(newTask);

        this.setState({
            title:'',
            description:''
        });
    };

    render(){
        const{disabledInput,disabledButton}=this.props;
        const{title}=this.state;
        
        return(
            <>
                <FormControl
                            value={title}
                            onChange={this.handleChange}
                            placeholder='Title'
                            className={styles.input}
                            disabled={disabledInput}
                            onKeyDown={this.handleKeyDown}
                        >
                        </FormControl>
                        <Button
                            variant='secondary'
                            onClick={this.handleSubmit}
                            className={styles.addTaskButton}
                            disabled={disabledButton}
                        >
                            ADD THE TASK
                        </Button>
            </>
            
        );
    }
}

NewTask.propTypes={
    onAdd:PropTypes.func.isRequired,
    disabledInput:PropTypes.bool.isRequired,
    disabledButton:PropTypes.bool.isRequired
};