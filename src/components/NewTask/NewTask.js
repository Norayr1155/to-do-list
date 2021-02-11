import React, { PureComponent,createRef } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
//import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../../helpers/utils';
import styles from './newTaskStyle.module.css';



export default class NewTask extends PureComponent {

    constructor(props){
        super(props);
        
        this.state = {
            title: '',
            description: '',
            date: new Date()
        }
        this.addNewTask = createRef();
    }

    componentDidMount(){
        this.addNewTask.current.focus();
    }

    handleChange = (event) => {
        const {name,value}=event.target;
        this.setState({
            [name]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }

        const {date} = this.state;
        const newTask = {
            title,
            description,
            date: formatDate(date.toISOString())
        };

        this.props.onAdd(newTask);

    };

    handleChangeDate=(value)=>{
        this.setState({
          date: value || new Date()
        });
      };

    render(){
        const{onClose}=this.props;
        
        return(
            
                <Modal
                    show={true}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <FormControl
                    onChange={this.handleChange}
                    placeholder='Title'
                    onKeyPress={this.handleKeyDown}
                    className='mb-3'
                    name='title'
                    ref={this.addNewTask}
                    />
                    <FormControl 
                    as='textarea' 
                    rows={5}
                    placeholder='Description'
                    onChange={this.handleChange}
                    name='description'
                    />    
                    <DatePicker 
                    className={styles.date}
                    minDate = {new Date()}
                    selected={this.state.date}
                    onChange={this.handleChangeDate}
                    />               
                    </Modal.Body>
                    <Modal.Footer>
                    <Button
                        onClick={this.handleSubmit}
                        variant='danger'
                    >
                    Add
                    </Button>
                    <Button
                        onClick={onClose}
                        variant='warning'
                    >
                    Cancel
                    </Button>
                    </Modal.Footer>
                </Modal>
                

        );
    }
}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,

};