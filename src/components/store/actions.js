import request from '../../helpers/request';
import * as actionTypes from './actionTypes';
import { history } from '../../helpers/history';

export function getTasks(){

    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request('http://localhost:3001/task')
        .then((tasks)=>{
        dispatch({type: 'GET_TASKS', tasks: tasks});
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
    }
}

export function addTask(newTask){
    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request('http://localhost:3001/task', 'POST', newTask)
        .then((task)=>{
        dispatch({type: 'ADD_TASK', task});
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
    }
};

export function deleteTask(taskId,from){
        return function(dispatch){
            dispatch({type: actionTypes.PENDING});
            request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(()=>{
                dispatch({ type: actionTypes.DELETE_TASK, taskId, from});
                if (from === 'single') {
                    history.push('/');
                }
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
        }
}

export function deleteTasks(taskIds){
    return function(dispatch){
        dispatch({type: actionTypes.PENDING});
        request(`http://localhost:3001/task`, 'PATCH', {
            tasks: [...taskIds]
        })
        .then(()=>{
            dispatch({type: 'DELETE_TASKS', taskIds});
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
    }
}

export function editTask(editedTask,from){
    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
        .then(()=>{
        dispatch({type: actionTypes.EDIT_TASK, editedTask, from});
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
    }
}

export function getTask(taskId) {

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING });

        request(`http://localhost:3001/task/${taskId}`)
            .then((task) => {
                dispatch({ type: actionTypes.GET_TASK, task});
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

