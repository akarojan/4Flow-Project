'use strict';
import React, { useState, useEffect, Component } from 'react';
import './external-reminder.css';
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/Firebase";

const nodemailer = require('nodemailer');

function useDbData() {

    const [dbData, setDbData] = useState([]);

    
        
            // const form = await axios.post('/api/form', {
    
            // })
        
    


    // useEffect(() => {
    //     firebase.firestore().collection('Users').doc('User-Data').onSnapshot((snapshot) => {
    //         const val = snapshot.data();
    //         const newDbData = Object.keys(val).map((keyName) => (
    //             val[keyName]
    //         ))
    //         setDbData(newDbData);
    //     })
    // }, []);
    return dbData;
}

function ExternalReminder() {

    const dbData = useDbData();
        let taskID = 11;
        console.log("in broadcast")
        let people = dbData.map((person) => person.email);
        let date = '17.1.2020 10:07 PM';
        let type = 'Type3';
        let subject = "Hi, Test!";
        let mailBody = "Testing reminders";


    function handleClick(event){
        useEffect( async () => {
        event.preventDefault();
        

        }, [])
    }
    return (
        <div>
            <div id="contact-template">
                <div className="template-body">
                    <div className="row row-content">
                        <div className="heading">
                            <h3>People Involved</h3>
                        </div>
                        <div className="col-md-12 column-content">
                            <h5>List of people involved in the task</h5>
                            <ul>
                                {/* {dbData.map((doc) => {
                                    return <li key={doc.id}>{doc.email}</li>
                                })} */}
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleClick}>
                                <div className="form-group">
                                    <div className="row">
                                        <label className="control-label" style={{ textAlign: 'left' }}><strong>Mail subject:</strong></label>
                                    </div>
                                    <div className="row">
                                        <input className="form-control" type="text" name="subject"></input>
                                    </div>
                                    <div className="row">
                                        <textarea className="form-control" type="text" name="subject">You have been assigned to the new task:</textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button type="submit" className="btn btn-primary btm-sm" >Send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ExternalReminder;