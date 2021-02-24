import * as actionTypes from './actionTypes';


const defaultState={
    tasks:[],
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    saveTaskSuccess:false,
    loading: false
};

export default function reducer(state=defaultState, action){

    switch(action.type){

      case actionTypes.PENDING:{
        return {
          ...state,
          loading: true,
          addTaskSuccess: false,
          deleteTasksSuccess: false,
          saveTaskSuccess: false
        };
      }
      case 'GET_TASKS':{
        return {
          ...state,
          tasks: action.tasks,
          loading: false
        };
      }

      case 'ADD_TASK':{
        return {
          ...state,
          tasks: [...state.tasks, action.task],
          addTaskSuccess: true,
          loading: false
        };
      }
      
      case 'DELETE_TASK':{

        const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
        return {
          ...state,
          tasks: newTasks,
          loading: false
        };
      }

      case 'DELETE_TASKS':{

        const newTasks = state.tasks.filter((task) => {
          if (action.taskIds.has(task._id)) {
              return false;
          }
          return true;
      });

        return {
          ...state,
          tasks: newTasks,
          deleteTasksSuccess: true,
          loading: false
        };
      }

      
      case 'SAVE_TASK':{

        const foundIndex = state.tasks.findIndex((task) => task._id === action.editedTask._id); 
        state.tasks[foundIndex]=action.editedTask;

        return {
          ...state,
          tasks:state.tasks,
          saveTaskSuccess:true,
          loading: false
        };
      }


      default: return state;
    }
} 
