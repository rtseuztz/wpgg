import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './app/app';
import User from './routes/User'

ReactDOM.render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        {/* Nesting the routers makes the layout shared*/}
        <Route path="/" element={<App />}> 
          <Route path="user" element={<User />} />
          <Route path="/:name" element={<User />} />
        </Route>
        
      </Routes>
    </StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
