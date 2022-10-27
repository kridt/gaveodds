import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./functions/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./functions/Login";
import ProtectedRoute from "./components/PrivateRoute";
import ForgotPassword from "./functions/ForgotPassword";
import UpdateProfile from "./functions/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/updateProfile" element={<UpdateProfile />} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
