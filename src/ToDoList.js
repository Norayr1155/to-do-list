import React, { Component } from 'react';


class ToDoList extends Component {

    state = {
        task: ['It is the first task', 'It is the second task'],
        inputValue: ''
    }

    addTask = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleClick = () => {
        this.setState({
            task: [... this.state.task, this.state.inputValue],
            inputValue: ''
        })
    }

    render() {
        
        let newTask = this.state.task.map((el, index) => {
        return <ul 
                key={index}>
                <li>{el}</li>
                </ul>;
        })
        
        return (
            <div>
                <input
                    type='text'
                    value={this.state.inputValue}
                    onChange={this.addTask}
                ></input>
                <button
                    onClick={this.handleClick}
                >New Task</button>
                <ul>{newTask}</ul>
            </div>
        )
    }
}

export { ToDoList };