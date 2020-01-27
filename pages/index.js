
import React, { Component } from 'react';
import Head from 'next/head';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import io from 'socket.io-client';
import firebase from 'firebase';
export default withRouter(class Index extends Component {
    constructor(props) {

        super(props);
        this.state = {
            messaging: [],
            message: '',
        }
    }
    componentDidMount = () => {
        if ('serviceWorker' in navigator) {
            if (!firebase.apps.length) {
                firebase.initializeApp({
                    apiKey: "AIzaSyA-89-et_QLVbXW-C7xlUBznS6nBpFVLMY",
                    authDomain: "webpushsample-46958.firebaseapp.com",
                    databaseURL: "https://webpushsample-46958.firebaseio.com",
                    projectId: "webpushsample-46958",
                    storageBucket: "webpushsample-46958.appspot.com",
                    messagingSenderId: "673533747681",
                    appId: "1:673533747681:web:a06e7c7da6250338"
                });
            }
            const messaging = firebase.messaging();
            this.setState({ messaging: messaging });
            navigator.serviceWorker
                .register('./static/firebase-messaging-sw.js')
                .then(registration => {
                    console.log('service worker registration successful')
                    this.state.messaging.useServiceWorker(registration);
                }).then(() => {

                })
                .catch(err => {
                    console.warn('service worker registration failed', err.message)
                })
        }
        this.socket = io();
        // setInterval(this.receiveValues(), 1000);
        this.receiveValues();

    }
    receiveValues = () => {
        this.socket.on('connectUserFront', (req) => {
            this.setState({ message: req.will });
            console.log('connectUser front end'); // true
        });
    }
    shoot = () => {
        this.socket.emit('connectProvider', { value: 'connected from react' });
    }
    getFCMToken = () => {
 
        Notification.requestPermission().then((status) => {
            console.log('Notification permission status:', status);
            if (status == 'granted'){
                return this.state.messaging.getToken();
            }
            return '';
        }).then((token) => {

            console.log('FCM_TOKEN:', token);
        });

    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>{site_name} | Home</title>
                    <meta name="distribution" content="Global" />
                    <meta name="revisit-after" content="1 days" />

                </Head>

                <div className="main-wrap">
                    <p>Body - {this.state.message}</p>
                    <button onClick={this.shoot}>Take the shot!</button>
                    <button onClick={this.getFCMToken}>Take the shot!</button>
                </div>

            </div>
        )
    }
})

