import { React, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import ViewSheet from './pages/ViewSheet';


function App() {
  

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/upload' element={<Upload/>} />
            <Route path='/sheet/:id' element={<ViewSheet/>} />
          </Routes>
        </div>

        
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
