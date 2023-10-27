import { Routes, Route } from "react-router-dom";
import "./App.css";
import { RootLayout } from "./components/Layouts";

import { Auth, NotFound, SignUp, Home, Login, Dashboard } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
