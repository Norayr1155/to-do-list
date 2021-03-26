import React from 'react';
import styles from './footerStyles.module.css';
import gitHubLogo from './logos/github_PNG15.png';
import linkedinLogo from './logos/Linkedin-Logo.png';

export default function Footer(){

    return(
        <div className={styles.footer} >
                        <h5>Powered by Norayr Hovhannisyan</h5>

         <div>   
            <a href='https://github.com/Norayr1155/to-do-list'>
                <img 
                    src={gitHubLogo}
                    alt='gitHubLogo'
                    width='90px'
                    height='30px'
                    className='mr-2'
                    >
                </img>
            access
            </a>
        </div>

        <div>   
            
            <a href='https://www.linkedin.com/in/norayr-hovhannisyan-1394a420a/'>
                <img 
                    src={linkedinLogo}
                    alt='linkedinLogo'
                    width='90px'
                    height='30px'
                    className='mr-2'
                    >
                </img>
            access
            </a>
        </div>

        </div>
    )

};