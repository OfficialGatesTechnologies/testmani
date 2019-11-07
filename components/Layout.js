import React, {Component} from 'react';
import Header from './header';

import '../styles/styles.scss';
 


export default class Layout extends Component {
    state = { 
        loading: false 
    };

    componentDidMount() {
         
    }


    render () {
        return (
            <div>
                
                
                   <Header/>
                
                    {this.props.children}
            </div>
        )
    }
}
    
 