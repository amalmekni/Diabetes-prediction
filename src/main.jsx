import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AddAnalysePage from './screens/AddAnalysePage.jsx';
import Home from './screens/Home.jsx';
import UploadAnalysePage from './screens/UploadAnalysePage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" index element={<Home />} />
      </Route>
      <Route path="/add-analyse" element={<AddAnalysePage />} />
      <Route path="/upload-analyse" element={<UploadAnalysePage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
