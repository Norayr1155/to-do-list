import React, { Component } from 'react';
import styles from './styles.module.css';
import {Container,Row,Col,Button,FormControl,Div} from 'react-bootstrap';


class ToDoList extends Component {

    state = {
        task: ['It is the first task'],
        inputValue: '',
    }

    idGenerator=()=>{
        return Math.random().toString(32).slice(2)+'-'+Math.random().toString(32).slice(2);
    }

    addTask = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleClick = () => {
        const inputValue=this.state.inputValue.trim();
        if(!inputValue){
            return;
        }
        this.setState({
            task: [... this.state.task, this.state.inputValue],
            inputValue: ''
        });
    }
    
    render() {
        
        let newTask = this.state.task.map((el, index) => {
        return <Col 
                key={index}
                className={styles.tasks}
                >
                <div>  
                {el}
                <input type='checkbox'></input> 
                </div>  
                </Col> 
            
        });
        
        return (
            <Container
            className={styles.firstContainer}
            >
                <Row>
                    <Col>
                        <FormControl
                        value={this.state.inputValue}
                        onChange={this.addTask}
                        type='text'
                        className={styles.input}
                        >
                        </FormControl>
                        <Button
                        variant='secondary'
                        onClick={this.handleClick}
                        className={styles.addTaskButton}
                        >
                        ADD THE TASK   
                        </Button>
                        <Button
                        variant='danger'>
                        REMOVE THE TASK
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {newTask}
                </Row>
            
            </Container>
        )
    }
}

export { ToDoList };