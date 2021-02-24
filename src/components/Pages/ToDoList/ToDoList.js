import React, {Component} from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal';
import styles from './toDoListStyles.module.css';
import {connect} from 'react-redux';
import { getTasks, deleteTask,deleteTasks } from '../../store/actions';

class ToDoList extends Component {

    state = {
        selectedTasks:new Set(),
        showConfirm:false,
        openNewTaskModal:false,
        editTask:null

    }

    componentDidMount(){
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({
                openNewTaskModal: false
            });
            return;
        }

        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess){
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        }

        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess){
            this.setState({
                editTask:null
            });
            return;
        }

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
        const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);

    };

    toggleConfirm=()=>{
        this.setState({
            showConfirm:!this.state.showConfirm
        });
    };

    selectAll=()=>{
        const taskIds=this.props.tasks.map((task)=>task._id);
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

    

    render() {

        const{selectedTasks,showConfirm,openNewTaskModal,editTask}=this.state;
        const {tasks}=this.props;
        
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
                onDelete={this.props.deleteTask}
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
                  onClose={this.togglenewTaskModal}
                  />
                }
                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={()=>this.handleEdit(null)}
                        onSave={this.props.handleSaveTask}
                    />
                }
                
            </Container>
            
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess:state.editTasksSuccess,

    };
};

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks,
};



export default connect(mapStateToProps,mapDispatchToProps)(ToDoList);

