import React, { Component } from 'react';
import styles from './styles.module.css';
import { Container, Row, Col, Button, FormControl,} from 'react-bootstrap';
import idGenerator from './../helpers/idGenerator';
import Task from './Task/Task';
import NewTask from './NewTask/NewTask';



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
       const newTasks=this.state.tasks.filter((taskObject)=> taskId!==taskObject._id);

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
        let uniqueTask = tasks.map((taskObject) => {
            return <Col
                key={taskObject._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                >
                <Task 
                data={taskObject}
                onToggle={this.selectTask}
                onDelete={this.removeTask}
                disabled={!!selectedTasks.size}
                />
            </Col>

        });

        return (
            <Container
            >
                <Row>
                    <Col>
                    <h2>To Do List</h2>
                    <NewTask
                    value={inputValue}
                    onChange={this.handleChange}
                    onClick={this.addTask}
                    onKeyDown={this.handleKeyDown}
                    disabledInput={!!selectedTasks.size}
                    disabledButton={!!selectedTasks.size}

                    />
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