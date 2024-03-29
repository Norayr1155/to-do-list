import request from '../../helpers/request';
import * as actionTypes from './actionTypes';
import { history } from '../../helpers/history';
import {saveToken} from '../../helpers/auth';
import requestWithoutToken from '../../helpers/auth';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params={}){

    const query = Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&');

    return (dispatch)=>{
        dispatch({type: actionTypes.PENDING});
        request(`${apiHost}/task?${query}`)
        .then((tasks)=>{
        if(!tasks)  return;
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
        if(!task)  return;
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
            .then((res)=>{
            if(!res)  return;
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
        .then((res)=>{
            if(!res)  return;
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
        .then((editedTask)=>{
            if(!editedTask)  return;
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
            if(!task)  return;
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
        requestWithoutToken(`${apiHost}/user`, 'POST', data)
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
        requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
        .then((res) => {
            saveToken(res);

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

export function sendContact(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING, });
        requestWithoutToken(`${apiHost}/form`, 'POST', data)
        .then(() => {

            dispatch({ 
                type: actionTypes.SEND_CONTACT,
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

export function getUserInfo() {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING, });
        request(`${apiHost}/user`)
        .then((res) => {
            if(!res)  return;
            dispatch({ 
                type: actionTypes.GET_USER_INFO,
                userInfo:res,
                
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
