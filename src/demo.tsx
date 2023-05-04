import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
const LoginPage = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger
    try {
      const response = await fetch("https://localhost:7141/api/Authenticate/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the access token in a secure way
        console.log(data.token);
        localStorage.setItem("access_token", JSON.stringify(data));
        console.log(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" value={username} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
};

const EmployeeDashboardPage = () => {
  return <h1>Employee Dashboard</h1>;
};

const AdminDashboardPage = () => {
  return <h1>Admin Dashboard</h1>;
};

const App = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);

  const handleLogout = () => {
    // Remove the access token from the storage
    localStorage.removeItem("access_token");
    setUser(null);
  };

  useEffect(() => {
    debugger
    // Check if the user is logged in and has a valid access token
    const access_token = localStorage.getItem("access_token");

    if (access_token != null) {
      try {
        console.log(access_token)
        const payload = JSON.parse(access_token);
        setUser({ role: payload.role });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <>
      {user ? (
        <>
          {user.role === "Employee" ? (
            <EmployeeDashboardPage />
          ) : user.role === "admin" ? (
            <AdminDashboardPage />
          ) : (
            <p>Unknown role</p>
          )}
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default App;