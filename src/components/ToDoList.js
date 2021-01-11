import React, { Component } from 'react';
import styles from './styles.module.css';
import { Container, Row, Col, Button, FormControl, Card } from 'react-bootstrap';
import idGenerator from './../helpers/idGenerator';


class ToDoList extends Component {

    state = {
        tasks: [],
        inputValue: '',
        selectedTasks:[],
    }


    addTask = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleClick = () => {
        const inputValue = this.state.inputValue.trim();
        if (!inputValue) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: inputValue
        }

        this.setState({
            tasks: [...this.state.tasks, newTask],
            inputValue: ''
        });
    }

    removeTask=(taskId)=>{
       const newTasks=this.state.tasks.filter((el)=> taskId!==el._id);

       this.setState({
           tasks:newTasks
       })
    }

    selectTask=(taskId)=>{
        this.setState({
            selectedTasks:[...this.state.selectedTasks, taskId]
        })
    }

    render() {
        let uniqueTask = this.state.tasks.map((el) => {
            return <Col
                key={el._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                >
                <Card className={styles.task}>
                    <Card.Body>
                        <input 
                        type='checkbox'
                        onClick={()=>this.selectTask(el._id)}
                        >
                        </input>
                        <Card.Title>{el.title}</Card.Title>
                        <Card.Text>
                        This is new and unique task !!!
                        </Card.Text>
                        <Button 
                        variant="danger"
                        onClick={()=>this.removeTask(el._id)}
                        >Delete</Button>

                    </Card.Body>
                </Card>
            </Col>

        });

        return (
            <Container
            >
                <Row>
                    <Col>
                    <h2>To Do List</h2>

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
                            REMOVE SELECTED
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {uniqueTask}
                </Row>

            </Container>
        )
    }
}

export { ToDoList };