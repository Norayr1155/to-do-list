const defaultState={
    tasks:[],
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    saveTaskSuccess:false,
};

export default function reducer(state=defaultState, action){

    switch(action.type){
      
      case 'GET_TASKS':{
        return {
          ...state,
          tasks: action.tasks
        };
      }

      case 'ADD_TASK':{
        return {
          ...state,
          tasks: [...state.tasks, action.task],
          addTaskSuccess: true
        };
      }
      case 'ADDING_TASK':{
        return {
          ...state,
          addTaskSuccess: false
        };
      }
      case 'DELETE_TASK':{

        const newTasks = state.tasks.filter((task) => action.taskId !== task._id);
        return {
          ...state,
          tasks: newTasks
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
          deleteTasksSuccess: true
        };
      }

      case 'DELETING_TASKS':{
        return {
          ...state,
          deleteTasksSuccess: false
        };
      }

      case 'SAVE_TASK':{

        const foundIndex = state.tasks.findIndex((task) => task._id === action.editedTask._id); 
        state.tasks[foundIndex]=action.editedTask;

        return {
          ...state,
          tasks:state.tasks,
          saveTaskSuccess:true
        };
      }

      case 'SAVING_TASK':{
        return {
          ...state,
          saveTaskSuccess: false
        };
      }

      default: return state;
    }
} 
