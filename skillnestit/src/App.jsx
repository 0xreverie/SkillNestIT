import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Projects from "./pages/students/Projects";
import ProjectDetail from "./pages/students/ProjectDetail";
import { Dashboard } from "./pages/company/Dashboard";
import { ReviewProject } from "./pages/company/ReviewProject";
import StudentsRegister from "./pages/StudentsRegister";
import CompanyRegister from "./pages/CompanyRegister";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ListProjectStudents from "./pages/students/ListProject";
import Register from "./pages/Register";
import ListProjectCompany from "./pages/company/ListProject";
import PropTypes from "prop-types"; // Import PropTypes
import { Toaster } from "sonner";

const ProtectedRoute = ({ element, redirectTo }) => {
  const token = localStorage.getItem("token"); // Mengambil token dari localStorage

  if (!token) {
    return <Navigate to={redirectTo} />; // Jika tidak ada token, redirect ke login
  }

  return element;
};

// Menambahkan PropTypes untuk memvalidasi properti
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, // element harus berupa React element
  redirectTo: PropTypes.string.isRequired, // redirectTo harus berupa string (URL)
};

const App = () => {
  const location = useLocation();

  const pageWithHeaderFooter = [
    "/",
    "/projects",
    "/projects/:id",
    "/submit-project",
    "/about-us",
    "/students/projects",
  ];

  const shouldShowHeaderFooter = pageWithHeaderFooter.includes(
    location.pathname
  );

  return (
    <>
      <Toaster position="top-center" richColors closeButton />

      {shouldShowHeaderFooter && <NavigationBar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Projects />} path="/projects" />
        <Route element={<ProjectDetail />} path="/projects/:id" />
        <Route element={<StudentsRegister />} path="/register/students" />
        <Route
          element={
            <ProtectedRoute
              element={<ListProjectStudents />}
              redirectTo="/login"
            />
          }
          path="/students/projects"
        />
        <Route element={<AboutUs />} path="/about-us" />

        {/* Login */}
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute element={<Dashboard />} redirectTo="/login" />
          }
          path="/company-dashboard"
        />
        <Route
          element={
            <ProtectedRoute
              element={<ListProjectCompany />}
              redirectTo="/login"
            />
          }
          path="/company-list"
        />
        <Route
          element={
            <ProtectedRoute element={<ReviewProject />} redirectTo="/login" />
          }
          path="/company-review"
        />
        <Route element={<CompanyRegister />} path="/register/company" />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default App;
