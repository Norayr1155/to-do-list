import React, {PureComponent} from 'react';
import {Button,Card} from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit,faCheck, faRedo} from '@fortawesome/free-solid-svg-icons';
import {formatDate,textTruncate} from '../../helpers/utils';
import {Link} from 'react-router-dom';
import {editTask} from '../../components/store/actions';
import {connect} from 'react-redux';


class Task extends PureComponent{

    static propTypes={
        data:PropTypes.object.isRequired,
        onToggle:PropTypes.func.isRequired,
        onDelete:PropTypes.func.isRequired,
        disabled:PropTypes.bool.isRequired,
        selected:PropTypes.bool.isRequired

    };

    handleChange=()=>{
        const{data,onToggle}=this.props;
        onToggle(data._id);
    };
    
    
    render(){
        
        const taskObject = this.props.data;
        const {onDelete,disabled,selected,onEdit,editTask}=this.props;
        return(
            <Card className={`${styles.task} ${selected?styles.selectedTask:""}`}>
                    <Card.Body>
                        <input 
                        type='checkbox'
                        onChange={this.handleChange}
                        checked={selected}
                        >
                        </input>
                        <Link to={`/task/${taskObject._id}`}>
                          <Card.Title>{textTruncate(taskObject.title,25)}</Card.Title>
                        </Link>
                        <Card.Text>
                        Description:{textTruncate(taskObject.description,58)}
                        </Card.Text>
                        <Card.Text>   
                        Status: {taskObject.status}
                        </Card.Text>
                        <Card.Text>   
                        Created at: {formatDate(taskObject.created_at)}
                        </Card.Text>
                        <Card.Text>   
                        Date: {formatDate(taskObject.date)}
                        </Card.Text>
                        
                        <Button 
                        className='mr-2'
                        variant="danger"
                        onClick={()=>onDelete(taskObject._id)}
                        disabled={disabled}
                        >
                        <FontAwesomeIcon icon={faTrash} />
                        </Button>

                        <Button 
                        variant="success"
                        onClick={()=>onEdit(taskObject)}
                        disabled={disabled}
                        className='mr-2'
                        >
                        <FontAwesomeIcon icon={faEdit} />
                        </Button>

                        {
                            taskObject.status==="active" ?
                            <Button
                            variant="success"
                            disabled={disabled}
                            onClick={() => editTask({
                            status: 'done',
                            _id: taskObject._id
                            })}
                            >
                            <FontAwesomeIcon icon={faCheck} />
                            </Button> :

                            <Button
                            variant="secondary"
                            disabled={disabled}
                            onClick={() => editTask({
                            status: 'active',
                            _id: taskObject._id
                            })}
                            >
                            <FontAwesomeIcon icon={faRedo} />
                            </Button>
                        }

                    </Card.Body>
                </Card>
        )
    }
}

const mapDispatchToProps = {
    editTask
};

export default connect(null, mapDispatchToProps)(Task);