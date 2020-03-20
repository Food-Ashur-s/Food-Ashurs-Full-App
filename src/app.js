import React from 'react';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';

// import './app.scss';

function app() {
    return (
        <React.Fragment>
            <Header />
            {/* <ToDoList /> */}
            <Footer />
        </React.Fragment>
    )
} // end of app function 

export default app;