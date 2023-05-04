import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import { createContext, useEffect, useState } from 'react';
import React from "react";
import { userData } from './Data/UserData';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AdminDashboard from './Pages/AdminDashboard';

export const AppContext = React.createContext<any>({});

function App() {
  const [user, setUser] = useState<userData | null>(null);
  useEffect(() => {
    debugger
    const access_token = localStorage.getItem("access_token");

    if (access_token != null) {
      try {
        console.log(access_token)
        const payload = JSON.parse(access_token);
        setUser(payload);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={user}>
      <BrowserRouter>
      <div className="App">
        {user ?(
          <>
          {user.role == "Employee"? <EmployeeDashboard /> : (user.role =="Admin" ? <AdminDashboard /> : <p>Unknown</p>)}
          </>
        ):<Home />}
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;