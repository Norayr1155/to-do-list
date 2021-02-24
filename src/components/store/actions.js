import request from '../../helpers/request';
import * as actionTypes from './actionTypes';


export function getTasks(){

    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request('http://localhost:3001/task')
        .then((tasks)=>{
        dispatch({type: 'GET_TASKS', tasks: tasks});
        });
    }
}

export function addTask(newTask){
    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request('http://localhost:3001/task', 'POST', newTask)
        .then((task)=>{
        dispatch({type: 'ADD_TASK', task});
        });
    }
};

export function deleteTask(taskId){
        return function(dispatch){
            dispatch({type: actionTypes.PENDING});
            request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(()=>{
                dispatch({type: 'DELETE_TASK', taskId});
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
            });
    }
}

export function handleSaveTask(editedTask){
    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});

        request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
        .then(()=>{
        dispatch({type: 'SAVE_TASK', editedTask});
        });
    }
};

