import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Firstround from './Firstround.jsx';

import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Secondround from './Secondround.jsx';
import Thirdround from './Thirdround.jsx';
import App from './App.jsx';
import Register from './Resister.jsx';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />

          <Route path='/value1' element={<Firstround />} />
                    <Route path='/value2' element={<Secondround />} />
                                        <Route path='/value3' element={<Thirdround />} />


        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
