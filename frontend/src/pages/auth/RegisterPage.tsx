import { type ChangeEvent, type FormEvent, useState } from "react";
import Input from "../../components/Input.tsx";
import { Eye, Mail, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    github_account: "",
    bio: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: make bio field non-required
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.github_account ||
      !formData.bio
    ) {
      return alert("Please fill in all fields!");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match!");
    }

    if (
      !(
        formData.github_account.startsWith("https://github.com/") ||
        formData.github_account.startsWith("https://gitee.com/")
      )
    ) {
      return alert("Invalid github account!");
    }

    const { success, message } = await register(formData);

    if (success) {
      alert(message);
      navigate("/auth/login/");
    } else {
      alert(message);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl max-w-xl w-full mx-3 flex flex-col gap-3 p-3 md:p-6 border border-neutral-700 shadow-lg text-center my-10"
      >
        <h2 className="text-4xl font-bold mb-8">Register</h2>

        <Input
          type="text"
          placeholder="Username..."
          icon={<User size={25} />}
          value={formData.username}
          name="username"
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email..."
          icon={<Mail size={25} />}
          value={formData.email}
          name="email"
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

        <Input
          type="password"
          placeholder="Confirm Password..."
          icon={<Eye size={25} />}
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        <Input
          type="url"
          placeholder="Github account..."
          icon={<FaGithub size={23} />}
          value={formData.github_account}
          name="github_account"
          onChange={handleChange}
        />

        <textarea
          className="rounded-xl px-4 py-2 flex border border-neutral-800 focus:border-neutral-600 outline-none h-[150px]"
          onChange={handleChange}
          value={formData.bio}
          name="bio"
          placeholder="About you..."
        ></textarea>

        <button
          type="submit"
          className="mt-6 bg-neutral-300 hover:bg-neutral-100 text-black rounded-2xl p-2 cursor-pointer text-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
}
