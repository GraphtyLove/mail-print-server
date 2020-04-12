import React, { Fragment } from 'react';
import './App.css';

// * ----- Compenents ----- *
import Header from './components/Header/Header'
import FileList from './components/FileList/FileList'
import Footer from './components/Footer/Footer'

function App() {
    return (
        <Fragment>
            <Header />
            <FileList />
            <Footer />
        </Fragment>
    );
}

export default App;
