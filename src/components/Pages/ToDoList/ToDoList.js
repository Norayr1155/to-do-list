import React, {Component} from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal';
import styles from './toDoListStyles.module.css';


class ToDoList extends Component {

    state = {
        tasks: [],
        selectedTasks:new Set(),
        showConfirm:false,
        openNewTaskModal:false,
        editTask:null

    }

    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        .then(async(response)=>{
            const res = await response.json();

            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error
                }
                else{
                    throw new Error('Something was wrong')
                }
            }
            this.setState({
                tasks: res,
            });
        })
        .catch((error)=>{
            console.log('Error catched',error);
        }) 
    }

    addTask = (newTask) => {

        fetch('http://localhost:3001/task', {
            method:'POST',
            body:JSON.stringify(newTask),
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        .then(async(response)=>{
            const res = await response.json();

            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error
                }
                else{
                    throw new Error('Something was wrong')
                }
            }
            this.setState({
                tasks: [...this.state.tasks, res],
                openNewTaskModal:false
                });
        })
        .catch((error)=>{
            console.log('Error catched',error);
        })
        
        
        
    }

    removeTask=(taskId)=>{

        fetch(`http://localhost:3001/task/${taskId}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        .then(async(response)=>{
            const res = await response.json();

            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error
                }
                else{
                    throw new Error('Something was wrong')
                }
            }
            const newTasks=this.state.tasks.filter((taskObject)=> taskId!==taskObject._id);

            this.setState({
            tasks:newTasks
            });
        })
        .catch((error)=>{
            console.log('Error catched',error);
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
        const {tasks,selectedTasks}=this.state;
        const arrFromSelectedTasks=[...selectedTasks];

        fetch('http://localhost:3001/task', {
            method:'PATCH',
            body:JSON.stringify({tasks:arrFromSelectedTasks}),
            headers:{
                'Content-Type':'application/json'
            }
            
        })
        .then(async(response)=>{
            const res = await response.json();

            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error
                }
                else{
                    throw new Error('Something was wrong')
                }
            }

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

        })
        .catch((error)=>{
            console.log('Error catched',error);
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

    handleEdit = (editTask) => {
        this.setState({ editTask });
    };

    handleSaveTask = (editedTask) => {

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
        .then(async (response) => {
            const res = await response.json();

            if(response.status >=400 && response.status < 600){

                if(res.error){
                    throw res.error;
                }
                else {
                    throw new Error('Something went wrong!');
                }
            }
                
            const tasks = [...this.state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
            tasks[foundIndex] = editedTask;

            this.setState({
                tasks,
                editTask: null
            });
        })
        .catch((error)=>{
            console.log('error catched', error);
        });
    };

    render() {

        const{tasks,selectedTasks,showConfirm,openNewTaskModal,editTask}=this.state;
        
        let uniqueTask = tasks.map((taskObject) => {
            return <Col
                key={taskObject._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                className={styles.taskCol}
                >
                <Task 
                data={taskObject}
                onToggle={this.selectTask}
                onDelete={this.removeTask}
                disabled={!!selectedTasks.size}
                selected={selectedTasks.has(taskObject._id)}
                onEdit={this.handleEdit}
                />
            </Col>

        });

        return (
            <Container
            >
                <Row>
                    <Col>
                    <h2 className={styles.title}>To Do List</h2>
                    
                        <Button
                            variant='primary'
                            onClick={this.togglenewTaskModal}
                            disabled={!!selectedTasks.size}
                            className='mr-3 mt-2' 
                            >
                            Add 
                        </Button>
                        <Button
                            variant='warning'
                            onClick={this.selectAll}
                            className='mr-3 mt-2' 
                            >
                            Select all
                        </Button>

                        <Button
                            variant='success'
                            onClick={this.unselectAll}
                            className='mr-3 mt-2' 
                            disabled={!selectedTasks.size}
                            >
                            Unselect all
                        </Button>
                        <Button
                            variant='danger'
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            className='mt-2' 
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
                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={()=>this.handleEdit(null)}
                        onSave={this.handleSaveTask}
                    />
                }
                
            </Container>
            
        );
    }
}

export { ToDoList };