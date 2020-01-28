
import React, { Component } from 'react';
import Head from 'next/head';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import io from 'socket.io-client';
import firebase from 'firebase';
import ContentLoader from 'react-content-loader'
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
                     this.state.messaging.setBackgroundMessageHandler(function (payload) {
            console.log('Message received: ', payload);
        });
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
                    <ContentLoader
                        viewBox="0 0 1360 300"
                        height={300}
                        width={1360}
                        speed={2}
                        
                    >
                        <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                        <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
                        <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
                        <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
                        <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
                        <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
                        <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
                        <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
                        <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
                        <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
                        <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
                        <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
                        
                     
                    </ContentLoader>
 
                    <ContentLoader 
                        speed={2}
                        width={600}
                        height={160}
                        viewBox="0 0 600 160"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <circle cx="10" cy="20" r="8" /> 
                        <rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                        <circle cx="10" cy="50" r="8" /> 
                        <rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
                        <circle cx="10" cy="80" r="8" /> 
                        <rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
                        <circle cx="10" cy="110" r="8" /> 
                        <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
                    </ContentLoader>
 
                    
                    <p>Body - {this.state.message}</p>
                    <button onClick={this.shoot}>Take the shot!</button>
                    <button onClick={this.getFCMToken}>Take the shot!</button>
                </div>

            </div>
        )
    }
})

