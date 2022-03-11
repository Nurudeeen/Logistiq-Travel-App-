import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  return <div>
    <h2>Logistiq App</h2>
    <BrowserRouter>
    <Route>
    <Route path="/login" exact component={Login} />
		<Route path="/register" exact component={Register} />
    <Route path="/dashboard" exact component={Dashboard} />
    </Route>
			</BrowserRouter>
  </div>
}

export default App;
