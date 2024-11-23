import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerStudent } from '../services/authStudentsRegister';
import { toast } from 'sonner';

// Definisikan schema validasi menggunakan Zod
const studentRegisterSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  lastEducation: z.string().min(1, { message: "Last education is required" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string().min(1, { message: "Confirm password is required" })
});

const StudentsRegister = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      lastEducation: "",
      password: "",
      confirmPassword: ""
    },
    resolver: zodResolver(studentRegisterSchema),
    mode: "onChange"
  });

  const handleRegister = async (data) => {
    // Validasi konfirmasi password secara manual
    if (data.password !== data.confirmPassword) {
      // Jika password dan confirm password tidak cocok, set error di form
      setError("confirmPassword", {
        type: "manual",
        message: "Password and confirm password must match"
      });
      return;
    }

    const newData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      lastEducation: data.lastEducation,
      password: data.password,
      role: 'student',
    };

    try {
      // Menunggu respons dari API
      const response = await registerStudent(newData);

      // Periksa jika ada pesan sukses dalam respons
      if (response && response.message) {
        // console.log(response.message); 
      }

      // Arahkan ke halaman login setelah sukses
      toast.success("Register Success!")
      navigate('/login');
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center w-full max-w-4xl bg-[#D6EFD8] p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="w-full sm:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Student Register</h2>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-2">Phone Number *</label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="phoneNumber"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="lastEducation" className="block text-gray-700 text-sm font-semibold mb-2">Last Education *</label>
              <Controller
                control={control}
                name="lastEducation"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="lastEducation"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.lastEducation && <p className="text-red-600 text-sm">{errors.lastEducation.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password *</label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="confirmPassword"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A5319] text-white px-4 py-2 rounded-lg hover:bg-[#80AF81] focus:outline-none focus:ring-2 focus:ring-[#1A5319] focus:ring-opacity-50"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentsRegister;
