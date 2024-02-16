import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Login from './components/Login/login.jsx';
import Register from './components/register/register.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import Home from './components/Home/home.jsx';
import PostComponent from './components/Posts/postComponent.jsx';
import Post from './components/Posts/posts.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Home />} />
      <Route path='/postComponent' element={<PostComponent />} />
      <Route path='/post' element={<Post />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);