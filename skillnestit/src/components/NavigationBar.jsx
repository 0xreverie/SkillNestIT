import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  User,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ProfileModal from "./ProfileModal";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const role = sessionStorage.getItem("role");

  const logout = () => {
    // Menghapus data login saat logout
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    localStorage.removeItem("token");

    // Redirect ke halaman login setelah logout
    navigate("/");
    window.location.reload(); // Opsional, untuk memastikan semua state ter-reset
  };

  useEffect(() => {
    // Mengecek apakah pengguna sudah login berdasarkan sessionStorage
    const auth = sessionStorage.getItem("role");
    if (auth) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-primary shadow-sm shadow-gray-500"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src={Logo} className="w-20" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/" className="text-secondary font-medium hover:underline">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/about-us"
            className="text-secondary font-medium hover:underline"
          >
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/projects"
            className="text-secondary font-medium hover:underline"
          >
            Projects
          </Link>
        </NavbarItem>
      </NavbarContent>

      {!isLogin ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button variant="bordered" className="border-secondary">
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="solid" className="bg-secondary">
              <Link to="/register" className="text-white">
                Register
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <Dropdown>
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "/assets/profile.png",
                }}
                className="transition-transform"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" onPress={onOpen}>
                Profile
              </DropdownItem>
              <DropdownItem key="my-projects">
                <Link to="/students/projects" className="text-secondary">
                  My Projects
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <ProfileModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarContent>
      )}

      <NavbarMenu>
        <NavbarMenuItem>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link to="/projects" className="hover:underline">
            Projects
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
