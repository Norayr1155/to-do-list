import React, { PureComponent } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';


export default class NewTask extends PureComponent {

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

        const newTask = {
            _id: idGenerator(),
            title,
            description
        };

        this.props.onAdd(newTask);

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
                    />
                    <FormControl 
                    as='textarea' 
                    rows={5}
                    placeholder='Description'
                    onChange={this.handleChange}
                    name='description'
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