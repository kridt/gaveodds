import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./functions/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./functions/Login";
import ProtectedRoute from "./components/PrivateRoute";
import ForgotPassword from "./functions/ForgotPassword";
import UpdateProfile from "./functions/UpdateProfile";
import AdminPanel from "./page/AdminPanel";
import AddBet from "./page/AddBet";
import AllOdds from "./page/AllOdds";
import AdminStats from "./page/AdminStats";

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
            <Route element={<ProtectedRoute />}>
              <Route path="/adminPanel" element={<AdminPanel />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/addBet" element={<AddBet />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/allodds" element={<AllOdds />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/stats" element={<AdminStats />} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
