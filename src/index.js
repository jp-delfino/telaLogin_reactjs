import React from 'react';
import ReactDOM from 'react-dom/client';
import TelaLogin from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateUser from './components/CreateUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TelaLogin />} />
                <Route path='/createUser' element={<CreateUser />} />
            </Routes>
        </BrowserRouter>

    </>


);

