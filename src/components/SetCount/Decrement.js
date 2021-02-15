import React from 'react';
import {connect} from 'react-redux';

function Decrement(props) {

    return (
        <button
            onClick={props.onChange}
        >
        Decrement
        </button>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        onChange: () => {
            dispatch({ type: 'DECREMENT_COUNT' });
        },
    };

};

export default connect(null, mapDispatchToProps)(Decrement);