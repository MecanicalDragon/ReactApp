import React from 'react';
import logo from '@/logo.svg';
import './app.css';
import HelloWorld from '@/hello/hello'
import HelloComponent from '@/hello/comp'

export default function App() {

    const someVar = SOME_VARIABLE;
    const HelloApp = () => (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <HelloWorld name={someVar}>
                    <HelloComponent val={666}/>
                    <span>learning React</span>
                </HelloWorld>
            </header>
        </div>
    );

    return HelloApp()
}