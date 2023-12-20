import React, { useState, useEffect } from 'react';
import { getAllBirthDates } from '../api/api';
import './homePage.css';
import * as strings from '../strings/he';
import UserDetails from './userDetails';

function HomePage() {

    const [userDetailsArr, setUserDetailsArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllBirthDates();
            setUserDetailsArr(data.data);
            // console.log(data);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        <div
            className='home-page-main'
        >
            <p className='home-page-header'>
                {strings.BIRTHDAYS_THIS_WEEK}
            </p>
            {userDetailsArr.length > 0 &&
                <UserDetails
                    userDetails={userDetailsArr}
                />}

        </div>
    );
}

export default HomePage;