
import React, { Component } from 'react';
import Head from 'next/head';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';
import axios from 'axios';
import io from 'socket.io-client';
export default withRouter(class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message :''
        }
    }
    componentDidMount = () => {
        this.socket = io();
        setInterval(this.receiveValues(), 1000)
    }
    receiveValues = () => {
        this.socket.on('connectUserFront', (req) => {
            this.setState({ message: req.will });
            console.log('connectUser front end'); // true
        });
    }
    shoot = () => {
        this.socket.emit('connectProvider',{value:'connected from react'});
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
                </div>

            </div>
        )
    }
})

