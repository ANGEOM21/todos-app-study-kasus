import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { authService } from '../api/services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import TodoModal from '../components/todos/TodoModal';
import type { Todo } from '../types';
import { Plus } from 'lucide-react';


const Dashboard = () => {
	const user = useAuthStore((state) => state.user);
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const navigate = useNavigate();
	const { data: todos, isLoading, error } = useGetTodos();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

	const handleAdd = () => {
		setSelectedTodo(null);
		setIsModalOpen(true);
	};

	const handleEdit = (todo: Todo) => {
		setSelectedTodo(todo);
		setIsModalOpen(true);
	};


	const handleLogout = async () => {
		try {
			await authService.logout();
		} catch (e) {
			console.error('Logout failed remote, clearing local anyway');
		}
		clearAuth();
		navigate('/login');
		toast.success('Logged out successfully');
	};

	return (
		<div className="min-h-screen bg-base-200 p-4">
			<div className="navbar bg-base-100 rounded-box shadow-md mb-8 px-6 h-20 items-center">
				<div className="flex-1">
					<a className="btn btn-ghost text-2xl font-bold text-primary">TodoPro ANGEOM21</a>
				</div>
				<div className="flex-none gap-4 items-center">
					<div className="hidden md:flex flex-col items-end mr-2">
						<span className="text-sm font-semibold">{user?.name}</span>
						<span className="text-xs text-base-content/60">{user?.email}</span>
					</div>
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder ring ring-primary ring-offset-base-100 ring-offset-2">
							<div className="bg-neutral text-neutral-content w-10 rounded-full">
								<span className="text-lg">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
							</div>
						</div>
						<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
							<li><a onClick={handleLogout}>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div className="container mx-auto">
				<h1 className="text-3xl font-bold mb-6">My Todos</h1>

				{isLoading && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="flex flex-col gap-4">
								<div className="skeleton h-32 w-full"></div>
								<div className="skeleton h-4 w-28"></div>
								<div className="skeleton h-4 w-full"></div>
								<div className="skeleton h-4 w-full"></div>
							</div>
						))}
					</div>
				)}

				{error && (
					<div className="alert alert-error">
						<span>Error loading todos. Please try again.</span>
					</div>
				)}

				{!isLoading && !error && todos?.length === 0 && (
					<div className="hero bg-base-200 rounded-box p-10">
						<div className="hero-content text-center">
							<div className="max-w-md">
								<h1 className="text-5xl font-bold">No Todos Yet</h1>
								<p className="py-6">Get started by creating your first task using the button below!</p>
							</div>
						</div>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
					{todos?.map((todo) => (
						<TodoCard key={todo.id} todo={todo} onEdit={handleEdit} />
					))}
				</div>

				<button
					className="btn btn-circle btn-primary fixed bottom-8 right-8 shadow-lg text-2xl z-50"
					onClick={handleAdd}
				>
					<Plus />
				</button>

				<TodoModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					todoToEdit={selectedTodo}
				/>
			</div>
		</div>
	);
};

// sakit hidung anjuy
export default Dashboard;
