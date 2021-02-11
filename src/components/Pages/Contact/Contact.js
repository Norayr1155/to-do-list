import React, { useState, useRef,useEffect } from 'react';
import { Button, FormControl,Form } from 'react-bootstrap';
import styles from './contactStyles.module.css';

export default function Contact(props) {

    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    const inputNameRef = useRef(); 

    useEffect(()=>{
        inputNameRef.current.focus();
    }, []);

    function inputChangeValue(event){

        if(event.target.name==='name'){
            setValues({
                ...values,
                name: event.target.value
                });
        }
        if(event.target.name==='email'){
            setValues({
                ...values,
                email: event.target.value
                });
        }
        if(event.target.name==='textarea'){
            setValues({
                ...values,
                message: event.target.value
                });
        }

        return;
    }

    function submitForm (formDetails)  {
        fetch('http://localhost:3001/form', {
            method:'POST',
            body:JSON.stringify(formDetails),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(async(response)=>{
            const res = await response.json();

            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error
                }
                else{
                    throw new Error('Something was wrong')
                }
            }
            
        })
        .catch((error)=>{
            console.log('Error catched',error);
        })
        
        
    }

    return (
        <>
            <h1 className={styles.title}>Contact Page</h1>
            <div className={styles.formBody}>
            <Form className={styles.form}>
                <FormControl
                    placeholder='Name'
                    name='name'
                    className='mb-3'
                    type='text'
                    value={values.name}
                    ref={inputNameRef}
                    onChange = {inputChangeValue}
                />
                <FormControl
                    placeholder='E-mail'
                    name='email'
                    type='email'
                    className='mb-3'
                    required
                    value={values.email}
                    onChange = {inputChangeValue}
                />
                <FormControl
                    as='textarea'
                    name='textarea'
                    rows={5}
                    placeholder='Message'
                    className='mb-3'
                    required
                    value={values.message}
                    onChange = {inputChangeValue}
                />
                <Button 
                variant="primary" 
                type="submit"
                onClick={()=>submitForm(values)}
                >
                Submit
                </Button>
            </Form>
            </div>
        </>
    );
};    