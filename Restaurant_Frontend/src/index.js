import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


store.subscribe(() =>
  store.getState()
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
  <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
   <App/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


