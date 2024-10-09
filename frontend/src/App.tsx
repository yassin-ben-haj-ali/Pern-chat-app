import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import { useAuthContext } from "./context/AuthContext"

function App() {

  const { AuthUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">

      <Routes>
        <Route path="/" element={AuthUser ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={!AuthUser ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!AuthUser ? <SignUp /> : <Navigate to='/' />} />
      </Routes>

    </div>
  )
}

export default App
