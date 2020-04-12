import React from 'react';
import './App.css';
// * ----- Compenents ----- *
import Header from './components/Header/Header'
import FileList from './components/FileList/FileList'

function App() {
    return (
        <div className="App">
            <Header />
            <FileList />
        </div>
    );
}

export default App;
