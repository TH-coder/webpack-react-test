import React, { Component } from 'react';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("debug");
    }
    render() { 
        return ( 
            <div>
                test
            </div>
         );
    }
}
 
export default Test;