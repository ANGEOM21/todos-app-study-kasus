import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { authService } from '../api/services/authService';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const setAuth = useAuthStore((state) => state.setAuth);
	const navigate = useNavigate();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== passwordConfirmation) {
			toast.error('Passwords do not match');
			return;
		}

		setIsLoading(true);
		try {
			const response = await authService.register({
				name,
				email,
				password,
				password_confirmation: passwordConfirmation
			});

			const { access_token, user } = response.data;
			setAuth(access_token, user);
			toast.success('Registered successfully');
			navigate('/');
		} catch (error: any) {
			console.error(error);
			toast.error('Failed to register');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-base-200">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title justify-center text-2xl font-bold">Create Account</h2>
					<form onSubmit={handleRegister} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder="Full Name"
								className="input input-bordered"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email@example.com"
								className="input input-bordered"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="password"
									className="input input-bordered w-full pr-10"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Confirm Password</span>
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="confirm password"
									className="input input-bordered w-full pr-10"
									value={passwordConfirmation}
									onChange={(e) => setPasswordConfirmation(e.target.value)}
									required
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>
						<div className="form-control mt-6">
							<button className="btn btn-primary" disabled={isLoading}>
								{isLoading ? <span className="loading loading-spinner"></span> : 'Register'}
							</button>
						</div>
						<div className="text-center mt-4">
							<Link to="/login" className="link link-hover text-sm">Already have an account? Login</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
