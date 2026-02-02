import React, { useEffect, useState } from 'react';
import type { Todo, TodoInput } from '../../types';
import { useTodoMutations } from '../../hooks/useTodos';


interface TodoModalProps {
	isOpen: boolean;
	onClose: () => void;
	todoToEdit?: Todo | null;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose, todoToEdit }) => {
	const { createTodo, updateTodo } = useTodoMutations();
	const [title, setTitle] = useState('');
	const [descriptions, setDescriptions] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		if (todoToEdit) {
			setTitle(todoToEdit.title);
			setDescriptions(todoToEdit.descriptions || '');
			setPreview(`${import.meta.env.VITE_STORAGE_URL.replace('/storage', '') + todoToEdit.image_url}`);
		} else {
			setTitle('');
			setDescriptions('');
			setFile(null);
			setPreview(null);
		}
	}, [todoToEdit, isOpen]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const todoData: TodoInput = {
			title,
			descriptions,
			image: file
		};

		if (todoToEdit) {
			updateTodo.mutate({ id: todoToEdit.id, data: todoData }, { onSuccess: onClose });
		} else {
			createTodo.mutate(todoData, { onSuccess: onClose });
		}
	};

	const [isDragging, setIsDragging] = useState(false);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const selectedFile = e.dataTransfer.files[0];
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleRemoveImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setFile(null);
		setPreview(null);
	};

	if (!isOpen) return null;

	return (
		<dialog className="modal modal-open">
			<div className="modal-box w-11/12 max-w-2xl">
				<form method="dialog">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
				</form>
				<h3 className="font-bold text-2xl mb-6">{todoToEdit ? 'Edit Task' : 'Create New Task'}</h3>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					{/* Title Input */}
					<div className="flex flex-col gap-2">
						<label className="font-medium text-sm text-base-content/80">Title</label>
						<input
							type="text"
							placeholder="What needs to be done?"
							className="input input-lg input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					{/* Description Input */}
					<div className="flex flex-col gap-2">
						<label className="font-medium text-sm text-base-content/80">Description (Optional)</label>
						<textarea
							placeholder="Add details..."
							className="textarea textarea-bordered h-32 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base w-full"
							value={descriptions}
							onChange={(e) => setDescriptions(e.target.value)}
						></textarea>
					</div>

					{/* Drag & Drop Image Input */}
					<div className="flex flex-col gap-2">
						<label className="font-medium text-sm text-base-content/80">Attachment</label>
						<div
							className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out flex flex-col items-center justify-center cursor-pointer min-h-[160px]
                  ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-base-content/20 hover:border-primary/50 hover:bg-base-200/50'}
                  ${preview ? 'p-0 border-solid border-base-content/10 overflow-hidden' : ''}
                `}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							onClick={() => document.getElementById('file-input')?.click()}
						>
							<input
								id="file-input"
								type="file"
								className="hidden"
								onChange={handleFileChange}
								accept="image/*"
							/>

							{preview ? (
								<div className="relative w-full h-64 group">
									<img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
										<p className="text-white font-medium">Click to change image</p>
									</div>
									<button
										type="button"
										onClick={handleRemoveImage}
										className="btn btn-circle btn-sm btn-error absolute top-2 right-2 text-white shadow-md z-10"
									>
										✕
									</button>
								</div>
							) : (
								<>
									<div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4 text-primary">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
											<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
										</svg>
									</div>
									<p className="text-lg font-semibold text-base-content/80">Click or drag file to upload</p>
									<p className="text-sm text-base-content/50 mt-1">SVG, PNG, JPG or GIF (max. 3MB)</p>
								</>
							)}
						</div>
					</div>

					<div className="modal-action mt-6 gap-2">
						<button type="button" className="btn btn-ghost hover:bg-base-200" onClick={onClose}>Cancel</button>
						<button type="submit" className="btn btn-primary px-8">{todoToEdit ? 'Save Changes' : 'Create Task'}</button>
					</div>
				</form>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button onClick={onClose}>close</button>
			</form>
		</dialog>
	);
};

export default TodoModal;
