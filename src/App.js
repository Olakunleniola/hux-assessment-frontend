import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ContactsPage from "./pages/ContactsPage";
import ContactDetailPage from "./pages/ContactDetailPage";
import EditContactPage from "./pages/EditContactPage";
import CreateContactPage from "./pages/CreateContactPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Homepage";
import AuthProvider from "./authContext";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/contacts/create" element={<CreateContactPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/contacts/edit/:id" element={<EditContactPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
