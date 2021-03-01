import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, Button, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { textTruncate } from '../../helpers/utils';
import DatePicker from "react-datepicker";
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

function Search(props) {

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

    const handleSubmit = ()=>{
        console.log('search', search);
        console.log('sort', sort);
        console.log('status', status);
        console.log('dates', dates);

    };

    return (
        <div className="mb-3">
            <InputGroup 
                className={'mb-3'}
            >
                
                <FormControl
                    placeholder="Search"
                    onChange={(event) => setSearch(event.target.value)}
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

                    {
                        dateOptions.map((option, index)=>(
                            <div
                            key={index}
                            >
                            <span width='150px'>{option.label} </span>
                            <div>
                            <DatePicker 
                            selected={dates[option.value]}
                            onChange={(value)=> handleChangeDate(value, option.value)}
                            />
                            </div>
                            </div>
                        ))
                    }
        </div>
    )
}

export default connect()(Search);