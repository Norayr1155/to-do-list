import React, { Component } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import Task from './Task/Task';
import NewTask from './NewTask/NewTask';
import Confirm from '../components/Confirm';



class ToDoList extends Component {

    state = {
        tasks: [],
        selectedTasks:new Set(),
        showConfirm:false,
        openNewTaskModal:false,
        editedTask:''

    }

    addTask = (newTask) => {
        
        this.setState({
            tasks: [...this.state.tasks, newTask],
            openNewTaskModal:false

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

    selectAll=()=>{
        const taskIds=this.state.tasks.map((task)=>task._id);
        this.setState({
            selectedTasks:new Set(taskIds)
        });
    };

    unselectAll=()=>{
        this.setState({
            selectedTasks:new Set()
        });
    };

    togglenewTaskModal=()=>{
        this.setState({
            openNewTaskModal:!this.state.openNewTaskModal
        });
    };

    toggleEditTaskModal=(taskObject)=>{
        this.setState({
            editedTask:taskObject
        });

        if(!this.state.editedTask){
            this.setState({
                openNewTaskModal:!this.state.openNewTaskModal
            });
        }
    };

    render() {

        const{tasks,selectedTasks,showConfirm,openNewTaskModal}=this.state;
        
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
                selected={selectedTasks.has(taskObject._id)}
                onEdit={()=>this.toggleEditTaskModal(taskObject)}
                changed={this.state.editedTask}
                />
            </Col>

        });

        return (
            <Container
            >
                <Row>
                    <Col>
                    <h2>To Do List</h2>
                    
                        <Button
                            variant='primary'
                            onClick={this.togglenewTaskModal}
                            disabled={!!selectedTasks.size}
                            className='mr-3'
                            >
                            Add new task
                        </Button>
                        <Button
                            variant='warning'
                            onClick={this.selectAll}
                            className='mr-3'
                            >
                            Select all
                        </Button>

                        <Button
                            variant='success'
                            onClick={this.unselectAll}
                            className='mr-3'
                            >
                            Unselect all
                        </Button>
                        <Button
                            variant='danger'
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            >
                            Delete selected
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
                {
                  openNewTaskModal &&
                  <NewTask
                  onAdd={this.addTask}
                  onClose={this.togglenewTaskModal}
                  />
                }
                
            </Container>
            
        );
    }
}

export { ToDoList };