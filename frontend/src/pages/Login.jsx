import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await login(email, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch {

            setError("Invalid email or password");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-5"
            >

                <h1 className="text-3xl font-bold text-center">
                    Expense Manager
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-lg p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-600 text-sm">
                        {error}
                    </p>
                )}

                <button
                    className="w-full bg-slate-900 text-white rounded-lg p-3 hover:bg-slate-800"
                >
                    Login
                </button>

                <p className="text-center">

                    Don't have an account?

                    <Link
                        className="text-blue-600 ml-2"
                        to="/register"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;