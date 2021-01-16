import React, { Component } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import Task from './Task/Task';
import NewTask from './NewTask/NewTask';
import Confirm from '../components/Confirm';



class ToDoList extends Component {

    state = {
        tasks: [],
        selectedTasks:new Set(),
        showConfirm:false
    }

    addTask = (newTask) => {
        
        this.setState({
            tasks: [...this.state.tasks, newTask],
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
            showConfirm:false


        });

    };

    toggleConfirm=()=>{
        this.setState({
            showConfirm:!this.state.showConfirm
        });
    };

    render() {
        const{tasks,selectedTasks,showConfirm}=this.state;
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
                    onAdd={this.addTask}
                    disabledInput={!!selectedTasks.size}
                    disabledButton={!!selectedTasks.size}

                    />
                        <Button
                            variant='danger'
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            >
                            REMOVE SELECTED
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {uniqueTask}
                </Row>
                {showConfirm && 
                <Confirm
                onClose={this.toggleConfirm}
                onConfirm={this.deleteSelected}
                count={selectedTasks.size}
                />
                }
            </Container>
            
        );
    }
}

export { ToDoList };