const defaultState={
    tasks:[]
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
          newTask: action.newTask,
        };
      }

      case 'DELETE_TASK':{
        return {
          ...state,
           tasks:action.filteredTasks 
        };
      }

      default: return state;
    }
} 