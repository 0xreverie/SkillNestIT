import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Higher Order Component (HOC) untuk mengecek apakah pengguna sudah login (IsAuth)
const IsAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const { token } = localStorage.getItem("token");

    // Jika tidak ada token, arahkan pengguna ke halaman login
    if (!token) {
      return <Navigate to="/login" />;
    }

    // Jika ada token, lanjutkan dengan komponen yang dibungkus
    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

// Higher Order Component (HOC) untuk mengecek apakah pengguna belum login (NotAuth)
const NotAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const { token } = useAuth();

    // Jika ada token, arahkan pengguna ke halaman dashboard
    if (token) {
      if(role==student){
        return <Navigate to="/students/projects" />;
      } else {
        return <Navigate to="/company-dashboard" />;
      }
    }

    // Jika tidak ada token, lanjutkan dengan komponen yang dibungkus
    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export { IsAuth, NotAuth };
