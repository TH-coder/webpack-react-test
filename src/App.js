import React from 'react';
import './App.css';
import p1 from './assets/reactGIF.gif';
import p2 from './assets/reactJPEG.jpeg';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            text:''
        }
        this.loadComponent = this.loadComponent.bind(this);
    }
    loadComponent(){
        import('./component/text/Text').then(text=>{
            this.setState({
                text:text.default
            })
        })
    }
    render() {
        const {text:Text} = this.state;
        return (
            <div className="App">
                <img src={p1} alt="" onClick={this.loadComponent} />
                <img src={p2} alt=""/>
                <div className="box"></div>
                33333333444555667788 
                动态加载:{Text&&<Text />}
            </div>
        )
    }
}



export default App;
