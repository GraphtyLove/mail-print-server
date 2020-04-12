import React from 'react';
import './App.css';

// * ----- Compenents ----- *
import Header from './components/Header/Header'
import FileList from './components/FileList/FileList'
import Footer from './components/Footer/Footer'

function App() {
    return (
        <div className="App">
            <Header />
            <FileList />
            <Footer />
        </div>
    );
}

export default App;
