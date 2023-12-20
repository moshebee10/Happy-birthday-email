import React from 'react';
import './userDetails.css';
import UserDetailsCell from './userDetailsCell';

function UserDetails(props) {

    return (
        <div
            className='user-details-main'
        >
            {props.userDetails.map((elm, i) => {
                return (
                    <UserDetailsCell
                        key={`birth-card-${i}`}
                        userDetails={elm}
                    />
                )
            })}
        </div >
    );
}

export default UserDetails;