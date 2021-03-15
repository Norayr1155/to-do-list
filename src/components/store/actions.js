import request from '../../helpers/request';
import * as actionTypes from './actionTypes';
import { history } from '../../helpers/history';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}){

    const query = Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&');

    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task?${query}`)
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
        request(`${apiHost}/task`, 'POST', newTask)
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
            request(`${apiHost}/task/${taskId}`, 'DELETE')
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
        request(`${apiHost}/task`, 'PATCH', {
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

        request(`${apiHost}/task/${editedTask._id}`, 'PUT', editedTask)
        .then(()=>{
            dispatch({ 
                type: actionTypes.EDIT_TASK, 
                editedTask, from,
                status: editedTask.status
            });
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

        request(`${apiHost}/task/${taskId}`)
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

export function register(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/user`, 'POST', data)
        .then(() => {
            dispatch({ 
                type: actionTypes.REGISTER_SUCCESS, 
            });
            history.push('/login');
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
}
}

export function login(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
         request(`${apiHost}/user/sign-in`, 'POST', data)
        .then((res) => {
            localStorage.setItem('token', JSON.stringify(res));

            dispatch({ 
                type: actionTypes.LOGIN_SUCCESS, 
            });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: actionTypes.ERROR,
                error: err.message
            });
        });
}
}

