import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>

    </div>
  )
}

export default App
