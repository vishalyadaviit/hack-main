import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { Navbar } from './components';
import './index.css';
import AddReferral from './pages/add_referral';
import Dashboard from './pages/dashboard';
import Form from './pages/form';
import Signup from './pages/signup';
import Signin from './pages/signin';

// ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="add_referral" element={<AddReferral />} />
    </Routes>
  </BrowserRouter>,
  rootElement,
);
