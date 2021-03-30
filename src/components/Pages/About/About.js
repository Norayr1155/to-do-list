import React from 'react';
import styles from './aboutStyles.module.css';

export default function About(props){

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>About us page
            </h1>
            <div className={styles.text}>
            <p>
                This website is powered by Norayr Hovhannisyan, Front-End (React.JS) developer.
                The puprpose of website is to add new tasks and track them.
                You can also edit, delete and search them (by using different methods).
            </p>
            </div>
            
        </div>
    );
};    