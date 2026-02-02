import React from 'react';
import type { Todo } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { useTodoMutations } from '../../hooks/useTodos';

interface TodoCardProps {
	todo: Todo;
	onEdit: (todo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit }) => {
	const { updateTodo, deleteTodo } = useTodoMutations();

	const handleToggle = () => {
		updateTodo.mutate({
			id: todo.id,
			data: { title: todo.title, is_done: !todo.is_done }
		});
	};

	const handleDelete = () => {
		if (confirm('Are you sure you want to delete this todo?')) {
			deleteTodo.mutate(todo.id);
		}
	};

	return (
		<div className={`card bg-base-100 shadow-xl border-l-4 ${todo.is_done ? 'border-success' : 'border-warning'}`}>
			{todo.image_url && (
				<figure className="h-48 w-full object-cover">
					<img src={import.meta.env.VITE_STORAGE_URL.replace('/storage', '') + todo.image_url} alt={todo.title} className="w-full h-full object-cover" />
				</figure>
			)}
			<div className="card-body">
				<div className="flex justify-between items-start">
					<h2 className={`card-title ${todo.is_done ? 'line-through text-gray-400' : ''}`}>{todo.title}</h2>
					{todo.is_done ? (
						<div className="badge badge-success">Done</div>
					) : (
						<div className="badge badge-warning">Pending</div>
					)}
				</div>
				<p className="text-gray-600">{todo.descriptions}</p>
				<div className="card-actions justify-between mt-4">
					<div>
						<p className="text-gray-600">{todo?.created_at}</p>
						{todo?.updated_at && todo?.is_done && (
							<p className="text-gray-600">Updated at: {todo?.updated_at}</p>
						)}
					</div>
					<div>
						<label className="swap swap-rotate btn btn-circle btn-sm btn-ghost">
							<input type="checkbox" checked={todo.is_done} onChange={handleToggle} />
							<div className="swap-on text-success text-lg">✔</div>
							<div className="swap-off text-warning text-lg">⏱️</div>
						</label>

						<button className="btn btn-square btn-sm btn-ghost text-info" onClick={() => onEdit(todo)}>
							<Pencil size={18} />
						</button>
						<button className="btn btn-square btn-sm btn-ghost text-error" onClick={handleDelete}>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoCard;
