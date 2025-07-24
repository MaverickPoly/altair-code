import { type ChangeEvent, type FormEvent, useState } from "react";
import { Eye, User } from "lucide-react";
import Input from "../../components/Input.tsx";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return alert("All fields are required!");
    }

    const { success, message } = await login(formData);

    if (success) {
      navigate("/courses");
    } else {
      alert(message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl max-w-xl w-full mx-3 flex flex-col gap-3 p-6 border border-neutral-700 shadow-lg text-center"
      >
        <h2 className="text-4xl font-bold mb-8">Login</h2>

        <Input
          type="text"
          placeholder="Username..."
          icon={<User size={25} />}
          value={formData.username}
          name="username"
          onChange={handleChange}
        />

        <Input
          type="password"
          placeholder="Password..."
          icon={<Eye size={25} />}
          value={formData.password}
          name="password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-6 bg-neutral-300 hover:bg-neutral-100 text-black rounded-2xl p-2 cursor-pointer text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
