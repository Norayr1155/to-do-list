import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, Button, FormControl, DropdownButton, Dropdown,Row, Col} from 'react-bootstrap';
import { textTruncate } from '../../helpers/utils';
import DatePicker from "react-datepicker";
import {getTasks} from '../store/actions';
import styles from './searchStyles.module.css';
import "react-datepicker/dist/react-datepicker.css";

const statusOptions = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];

const sortOptions = [
    {
        label: ' All ',
        value: ''
    },
    {
        label: ' A-Z ',
        value: 'a-z'
    },
    {
        label: ' Z-A ',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    }
];

const dateOptions = [
    {
        label: 'Created before',
        value: 'create_lte'
    },
    {
        label: 'Created after',
        value: 'create_gte'
    },
    {
        label: 'Complete before',
        value: 'complete_lte'
    },
    {
        label: 'Complete after',
        value: 'complete_gte'
    }
];

function Search({getTasks}) {

    const [status, setStatus] = useState({
        value: ''
    });

    const [sort, setSort] = useState({
        value: ''
    });

    const [search, setSearch] = useState('');


    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });

    const handleChangeDate = (value, name)=>{
        setDates({
            ...dates,
            [name]: value
        });
    };

    const collectParams= ()=>{
            
        const params = {};

        search && (params.search = search);
        sort.value && (params.sort = sort.value);
        status.value && (params.status = status.value);


        for(let key in dates){
            const value = dates[key];
            if(value){
                const date = value.toLocaleDateString();
                params[key] = date;
            }
        }
        
        return params;
    }

    const handleSubmit = ()=>{

        getTasks(collectParams());
    };

    const handleKeyDown = (event) => {
        
        if(event.key === 'Enter'){
            getTasks(collectParams());       
        }
    };

    return (
        <div className="mb-3">
            <InputGroup 
                className={'mb-3'}
            >
                
                <FormControl
                    placeholder="Search"
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={status.value ? status.label : 'Status'}
                    id="input-group-dropdown-1"
                >
                    {
                        statusOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={status.value === option.value}
                                onClick={() => setStatus(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-primary"
                    title={sort.value ? textTruncate(sort.label, 6) : 'Sort'}
                    id="input-group-dropdown-1"
                >
                    {
                        sortOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                active={sort.value === option.value}
                                onClick={() => setSort(option)}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>

                <InputGroup.Append>

                    <Button 
                    variant="outline-primary"
                    onClick={handleSubmit}
                    >
                    Search</Button>
                </InputGroup.Append>

            </InputGroup>
                    <Row className={styles.datePickersRow}>
                        

                    {
                        dateOptions.map((option, index)=>(
                            <Col
                            xs={12}
                            sm={6}
                            md={6}
                            lg={3}
                            xl={3}
                            key={index}
                            >
                                
                            <span >{option.label} </span>
                            
                            <DatePicker 
                            selected={dates[option.value]}
                            onChange={(value)=> handleChangeDate(value, option.value)}
                            className='mt-1'
                            />
                            
                            
                            </Col>
                        ))
                    }
                    
                    </Row>
        </div>
    )
}

const mapDispatchToProps = {
    getTasks
  };

export default connect(null, mapDispatchToProps)(Search);