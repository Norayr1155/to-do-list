import React, { Component } from 'react';
import styles from './styles.module.css';


class ToDoList extends Component {

    state = {
        task: ['It is the first task'],
        inputValue: '',
    }

    idGenerator=()=>{
        return Math.random().toString(32).slice(2)+'-'+Math.random().toString(32).slice(2);
    }

    addTask = (event) => {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleClick = () => {
        const inputValue=this.state.inputValue.trim();
        if(!inputValue){
            return;
        }
        this.setState({
            task: [... this.state.task, this.state.inputValue],
            inputValue: ''
        });
    }
    
    render() {
        
        let newTask = this.state.task.map((el, index) => {
        return <li 
                key={index}>
                {el}
                <input type='checkbox'></input> 
                </li>
            
        });
        
        return (
            <div className={styles.newTask}>
                <input 
                    className={styles.input}
                    type='text'
                    value={this.state.inputValue}
                    onChange={this.addTask}
                ></input>
                <button
                    className={styles.addTaskButton}
                    onClick={this.handleClick}
                >Add task</button>
                <button
                 className={styles.removeTaskButton}   
                 onClick={this.removeTask}
                >Remove Task</button>
                <ol 
                className={styles.tasks}
                >
                {newTask}
                </ol>
            </div>
        )
    }
}

export { ToDoList };