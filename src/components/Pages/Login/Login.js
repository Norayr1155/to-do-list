import React, {useState,} from 'react';
import { Button,Form } from 'react-bootstrap';
import styles from './loginStyles.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/actions';


const requiredErrorMessage = 'Field is required';


function Login(props){

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null
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

        if(!valuesExist && !erorsExist){ 
            setErrors({
                email: requiredErrorMessage,
                password: requiredErrorMessage
            });
        }

        props.login(values);
    }
    

    return (
        <>
            <h1 className={styles.title}>Log in</h1>
            <div className={styles.formBody}>

                <Form className={styles.form}>
                    
                    
                    <Form.Group>
                        <Form.Control 
                        className={errors.email ? styles.invalid: ''}
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
                        className={errors.password ? styles.invalid: ''}
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

                    <div className="text-center">
                        <Button 
                        variant="primary"
                        onClick = {submitForm}
                        >
                        Log in
                        </Button>
                    </div>

                    <NavLink
                    to='/registration'
                    activeClassName={styles.active}
                    exact
                    className='mr-3'
                    >
                    Don't have account yet? Register now!
                    </NavLink>
                </Form>

            </div>
        </>
    );
}; 

const mapDispatchToProps = {
    login
}
export default connect(null, mapDispatchToProps)(Login);