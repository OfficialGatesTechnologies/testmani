import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

export default withRouter(class Error extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
          
          <div>
                <Head>
                    <meta charSet="utf-8" />
                    <title>Page not found</title>
                    <meta name="distribution" content="Global" />
                    <meta name="revisit-after" content="1 days" />
                    <meta name="creator" content="officialgates (www.officialgates.com)" />
                    <meta name="publisher" content="officialgates (www.officialgates.com)" />
                </Head>
            
             <div className="main-wrap">
                    
                    <div className="page-cnt-wrap py-5 py-m-3 pb-0">
                        <div className="page-main-cnt pb-5 pb-m-2">
                        <div className="container">
                                <div className="err-page">
                                    <div className="err-img"><img src="../static/images/others/404.png" alt="image"/></div>
                                </div>
                            </div>
            </div>
            </div>
            </div>
</div>
            )
    }
})
 
