import React, {Component} from 'react';
import {Button,FormControl} from 'react-bootstrap';
import styles from './newTaskStyle.module.css';

export default class NewTask extends Component{
    render(){
        const{value,onChange,disabledInput,onKeyDown,onClick,disabledButton}=this.props;
        return(
            <>
                <FormControl
                            value={value}
                            onChange={onChange}
                            type='text'
                            className={styles.input}
                            disabled={disabledInput}
                            onKeyDown={onKeyDown}
                        >
                        </FormControl>
                        <Button
                            variant='secondary'
                            onClick={onClick}
                            className={styles.addTaskButton}
                            disabled={disabledButton}
                        >
                            ADD THE TASK
                        </Button>
            </>
            
        )
    }
}