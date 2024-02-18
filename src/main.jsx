import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Login from './screens/login.jsx';
import Register from './screens/register.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import Post from './screens/posts.jsx';
import MyPost from './screens/myPost.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={<Post />} />
      <Route path='/myPost' element={<MyPost />} />
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