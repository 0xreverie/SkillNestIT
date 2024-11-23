import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleCompanyClick = () => {
    setShowCompanyForm(true);
    setShowStudentForm(false);
    navigate('/register/company'); // Navigate to /register/company
  };

  const handleStudentClick = () => {
    setShowStudentForm(true);
    setShowCompanyForm(false);
    navigate('/register/students'); // Navigate to /register/students
  };

  return (
    <div className="relative h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-r from-[#D6EFD8] to-[#A1D9B9] animate-gradient">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D6EFD8] to-[#A1D9B9] opacity-30 animate-background"></div>
      <div className="text-center mb-8 z-10 relative">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Register As:</h1>
        <p className="text-lg text-gray-600">Choose your role to begin the registration process.</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 z-10 relative flex-wrap justify-center">
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
          <Button className="w-full sm:w-48" color="danger" size="lg" auto ghost onClick={handleCompanyClick}>
            Company
          </Button>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto">
          <Button className="w-full sm:w-48" color="secondary" size="lg" auto ghost onClick={handleStudentClick}>
            Student
          </Button>
        </div>
      </div>

      {/* Show company form if clicked */}
      {showCompanyForm && (
        <div className="w-full max-w-lg mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Company Registration</h2>
          <form>
            <Input clearable label="Company Name" fullWidth className="mb-4" />
            <Input clearable label="Email" type="email" fullWidth className="mb-4" />
            <Textarea label="Company Description" fullWidth className="mb-4" />
            <Button color="success" fullWidth size="lg" auto>
              Submit
            </Button>
          </form>
        </div>
      )}

      {/* Show student form if clicked */}
      {showStudentForm && (
        <div className="w-full max-w-lg mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Student Registration</h2>
          <form>
            <Input clearable label="Student Name" fullWidth className="mb-4" />
            <Input clearable label="Email" type="email" fullWidth className="mb-4" />
            <Textarea label="Student Bio" fullWidth className="mb-4" />
            <Button color="success" fullWidth size="lg" auto>
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
