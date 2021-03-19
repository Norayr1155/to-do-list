import React, { useState, useRef,useEffect } from 'react';
import { Button,Form } from 'react-bootstrap';
import styles from './contactStyles.module.css';
import {sendContact} from '../../store/actions';
import {connect} from 'react-redux';

const requiredErrorMessage = 'Field is required';


function Contact(props) {

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
    });

    const inputNameRef = useRef(); 

    useEffect(()=>{
        inputNameRef.current.focus();
    }, []);

    function inputChangeValue({target:{name,value}}){

        if(!value || value.trim()===''){
            setErrors({
                ...errors,
                [name]: requiredErrorMessage
            });
        }

        else {
            setErrors({
                ...errors,
                [name]: null
            }); 
        }

        if(name==='email' && value){
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!emailReg.test(value)){
              setErrors({
                  ...errors,
                  email: 'Invalid email'
              }); 
            }
        }

            
        setValues({
            ...values,
            [name]: value.trimStart()
        });
    }

    function submitForm ()  {
        const errorsArr = Object.values(errors);
        const erorsExist = !errorsArr.every(el => el===null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el==='');

        if(valuesExist && !erorsExist){

            props.sendContact(values)

            setValues({
                name: '',
                email: '',
                message: ''
            });
            
        }  

        if(!valuesExist && !erorsExist){ 
            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                message: requiredErrorMessage
            });
    }
}


return (
        <>
            <h1 className={styles.title}>Contact Page</h1>
            <div className={styles.formBody}>

                <Form className={styles.form}>
                    <Form.Group>
                        <Form.Control
                        className={errors.name ? styles.invalid: ''}
                        type="text" 
                        placeholder="Enter your name"
                        name="name" 
                        value={values.name}
                        onChange={inputChangeValue}
                        ref={inputNameRef}
                        />
                        <Form.Text className="text-danger">
                        {errors.name}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                        className={errors.email ? styles.invalid: ''}
                        type="email" 
                        name="email" 
                        value={values.email}
                        onChange={inputChangeValue}
                        placeholder="Enter your email" 
                        />
                        <Form.Text className="text-danger">
                        {errors.email}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                        as="textarea" 
                        className={errors.message ? styles.invalid: ''}
                        placeholder="Enter your message"
                        rows={5}
                        name="message" 
                        value={values.message}
                        onChange={inputChangeValue}
                        />
                        <Form.Text className="text-danger">
                        {errors.message}
                        </Form.Text>
                    </Form.Group>
                    <div className="text-center">
                        <Button 
                        variant="warning"
                        onClick = {submitForm}
                        >
                        Send
                        </Button>
                    </div>

                </Form>

            </div>
        </>
    );
};   

const mapStateToProps = (state) => {
    return {
        sendContactSuccess:state.sendContactSuccess,
    };
};

const mapDispatchToProps = {
    sendContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);