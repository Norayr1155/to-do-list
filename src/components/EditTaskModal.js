import React, {Component,createRef} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../helpers/utils';
import styles from './editTaskModalStyles.module.css';
import {editTask} from './store/actions';
import {connect} from 'react-redux';



class NewTask extends Component {
    
    constructor(props){
        super(props);
    const {date} = props.data;

    this.state = {
        ...props.data,
        date: date ? new Date(date) : new Date()
    };

    this.editRef = createRef();
  }

    state = {
        title: '',
        description: '',
    };
    

    componentDidMount(){
        this.editRef.current.focus();
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

    handleSave = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();

        if (!title) {
            return;
        }
        const editedTask ={
            _id:this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        };

        this.props.editTask(editedTask, this.props.from);
        
        if(this.props.from==='single'){
            this.props.onSave()
        }
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
                    ref={this.editRef}
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
                        onClick={this.handleSave}
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
    onClose: PropTypes.func.isRequired,
    data:PropTypes.object.isRequired

};

const mapDispatchToProps = {
   editTask
};

export default connect(null,mapDispatchToProps)(NewTask);