import React, { Component } from 'react';
import styles from './styles.module.css';
import { Container, Row, Col, Button, FormControl, Card } from 'react-bootstrap';
import idGenerator from './../helpers/idGenerator';


class ToDoList extends Component {

    state = {
        tasks: [],
        inputValue: '',
        selectedTasks:new Set(),
    }


    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    }

    addTask = () => {
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
       });
    }

    selectTask=(taskId)=>{
        const markedTasks=new Set(this.state.selectedTasks);
        if(markedTasks.has(taskId)){
            markedTasks.delete(taskId);
        }
        else{
            markedTasks.add(taskId);
        }
        this.setState({
            selectedTasks:markedTasks
        });
    };
    deleteSelected=()=>{
        const {tasks}=this.state;
        const {selectedTasks}=this.state;

        const newTasks =tasks.filter((task)=>{
            if(selectedTasks.has(task._id)){
                return false;
            }
            return true;
        });

        this.setState({
            tasks:newTasks,
            selectedTasks:new Set(),
        });

    };

    handleKeyDown=(event)=>{
        if(event.key==='Enter'){
            this.addTask();
        }
    };

    render() {
        const{tasks,inputValue,selectedTasks}=this.state;
        let uniqueTask = tasks.map((el) => {
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
                        onChange={()=>this.selectTask(el._id)}
                        >
                        </input>
                        <Card.Title>{el.title}</Card.Title>
                        <Card.Text>
                        This is new and unique task !!!
                        </Card.Text>
                        <Button 
                        variant="danger"
                        onClick={()=>this.removeTask(el._id)}
                        disabled={!!selectedTasks.size}
                        >
                        Delete</Button>

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
                            value={inputValue}
                            onChange={this.handleChange}
                            type='text'
                            className={styles.input}
                            disabled={!!selectedTasks.size}
                            onKeyDown={this.handleKeyDown}
                        >
                        </FormControl>
                        <Button
                            variant='secondary'
                            onClick={this.addTask}
                            className={styles.addTaskButton}
                            disabled={!!selectedTasks.size}
                        >
                            ADD THE TASK
                        </Button>
                        <Button
                            variant='danger'
                            onClick={this.deleteSelected}
                            disabled={!selectedTasks.size}
                            >
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