import React, {Component} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../helpers/utils';
import styles from './editTaskModalStyles.module.css';



export default class NewTask extends Component {
    
    constructor(props){
        super(props);
    const {date} = props.data;

    this.state = {
        ...props.data,
        date: date ? new Date(date) : new Date()
    };
  }

    state = {
        title: '',
        description: ''
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
        this.props.onSave({
            _id:this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        });
    };

    handleChangeDate=(value)=>{
        this.setState({
          date: value || new Date()
        });
      };

    render(){
        const{onClose}=this.props;
        const{title,description}=this.state;
        
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
                            Edit Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <FormControl
                    onChange={this.handleChange}
                    placeholder='Title'
                    onKeyPress={this.handleKeyDown}
                    className='mb-3'
                    name='title'
                    value={title}
                    />
                    <FormControl 
                    as='textarea' 
                    rows={5}
                    placeholder='Description'
                    onChange={this.handleChange}
                    name='description'
                    value={description}
                    />  
                    <DatePicker 
                    className={styles.editedDate}
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
                    Save
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
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    data:PropTypes.object.isRequired

};