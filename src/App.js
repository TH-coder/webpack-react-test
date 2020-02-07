import React from 'react';
import './App.css';
import p1 from './assets/reactGIF.gif';
import p2 from './assets/reactJPEG.jpeg';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <img src={p1} alt=""/>
                <img src={p2} alt=""/>
                <div className="box"></div>
            </div>
        )
    }
}



export default App;
