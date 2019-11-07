
import React, { Component } from 'react';
import Head from 'next/head';
import { site_name } from '../utils/Common';
import { withRouter } from 'next/router';

export default withRouter(class Index extends Component {
    componentDidMount = () => {
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
                    <p>Body</p>
                </div>
 
            </div>
        )
    }
})

