import React,{useState,} from 'react';
import { Button,Form } from 'react-bootstrap';
import styles from './registrationStyles.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../store/actions';

const requiredErrorMessage = 'Field is required';


function Registration(props){

    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword:null
    });

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

        if(name==='password' && value){
            const passwordReg = /[0-9a-zA-Z]{6,}/;
            if(!passwordReg.test(value)){
              setErrors({
                  ...errors,
                  password: 'Invalid password'
              }); 
            }
        }

        if(name==='confirmPassword' && value){
            if(value!==values.password){
              setErrors({
                  ...errors,
                  confirmPassword: 'Password must be the same'
              }); 
            }

        }

         setValues({
            ...values,
            [name]: value.trimStart()
        });

    }

    function submitForm (){

        const errorsArr = Object.values(errors);
        const erorsExist = !errorsArr.every(el => el===null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el==='');

        if(valuesExist && !erorsExist){

            props.register(values); 
        }  

        if(!valuesExist && !erorsExist){ 
            setErrors({
                name: requiredErrorMessage,
                surname: requiredErrorMessage,
                email: requiredErrorMessage,
                password: requiredErrorMessage,
                confirmPassword:requiredErrorMessage
            });
        }

    }

    function handleKeyDown (event){
        if (event.key === 'Enter') {
            submitForm();
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Register</h1>
            <div className={styles.formBody}>

                <Form className={styles.form}>
                    <Form.Group>
                        <Form.Control
                        type="text" 
                        placeholder="Enter your name"
                        name="name" 
                        onChange={inputChangeValue}
                        value={values.name}
                        />
                        <Form.Text className="text-danger">
                        {errors.name}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        type="text" 
                        placeholder="Enter your surname"
                        name="surname"
                        onChange={inputChangeValue}
                        value={values.surname}
                        />
                        <Form.Text className="text-danger">
                        {errors.surname}
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email"
                        onChange={inputChangeValue}
                        value={values.email}
                        />
                        <Form.Text className="text-danger">
                        {errors.email}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        type="password" 
                        placeholder="Password"
                        name="password"
                        onChange={inputChangeValue}
                        value={values.password}
                        />
                        <Form.Text className="text-danger">
                        {errors.password}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                        type="password" 
                        placeholder="Confirm password"
                        name="confirmPassword" 
                        onChange={inputChangeValue}
                        value={values.confirmPassword}
                        onKeyPress={handleKeyDown}
                        />
                        <Form.Text className="text-danger">
                        {errors.confirmPassword}
                        </Form.Text>
                    </Form.Group>

                    
                    <div className="text-center">
                        <Button 
                        variant="primary"
                        onClick = {submitForm}
                        className='mb-3'
                        >
                        Register
                        </Button>
                    </div>

                    <div className="text-center">
                        <NavLink
                        to='/login'
                        activeClassName={styles.active}
                        exact
                        >
                        Already registered? Try to login.
                        </NavLink>
                    </div>

                </Form>

            </div>
        </div>
    );
}; 

const mapDispatchToProps = {
    register
}
export default connect(null, mapDispatchToProps)(Registration);