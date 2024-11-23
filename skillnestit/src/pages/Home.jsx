import ProjectsCard from "../components/ProjectsCard";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bgHomeImage from "../assets/Home.png";  // Import gambar dari folder assets

const Home = () => {
  const [showProjects, setShowProjects] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi
  const isAuthenticated = false; // Ganti dengan pengecekan autentikasi Anda, misalnya menggunakan context atau localStorage

  // Handle scroll event to trigger card visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setShowProjects(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk menangani klik pada card
  const handleCardClick = () => {
    if (!isAuthenticated) {
      // Jika tidak terautentikasi, arahkan ke halaman login
      navigate("/login");  // Ini akan mengarahkan ke /login
    } else {
      // Jika terautentikasi, arahkan ke halaman proyek
      navigate("/projects");
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      {/* Jumbotron Section */}
      <div
        className="h-screen bg-center text-white flex items-center justify-start px-10"
        style={{
          backgroundImage: `url(${bgHomeImage})`,  // Gunakan gambar yang di-import
          backgroundSize: "cover",  // Gambar menyesuaikan ukuran layar
          backgroundPosition: "center",  // Memastikan gambar terpusat
          backgroundRepeat: "no-repeat",  // Menghindari gambar terulang
        }}
      >
        <div className="text-left max-w-xl">
          <h1 className="italic font-extrabold text-7xl md:text-9xl mb-5 max-sm:text-5xl text-secondary">
            SkillNestIT
          </h1>
          <p className="mb-8 text-lg md:text-xl text-black">
            Empowering Innovation, Collaboration, and Growth with the Best Talent
            in the Industry.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-4 py-10 bg-primary">
        <h1 className="font-bold text-3xl text-secondary mb-7 text-center">
          Browse Projects from Various Companies
        </h1>

        <div
          className={`transition-transform duration-700 ease-in-out ${
            showProjects ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Panggil handler klik pada ProjectsCard */}
          <div onClick={handleCardClick}>
            <ProjectsCard />
          </div>
        </div>

        <div className="flex justify-end mt-4 text-lg">
          <Link to="/projects" className="underline text-secondary">
            View more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
