import { Routes, Route } from "react-router-dom";
import "./App.css";
import { RootLayout } from "./components/Layouts";

import { Auth, NotFound, SignUp, Home, Login, Dashboard } from "./pages";
import Onboarding from "./pages/Onboarding";

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
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
}

export default App;
