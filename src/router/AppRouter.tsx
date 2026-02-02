import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

const ProtectedRoute = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated());
	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated());
	return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
	{
		element: <PublicRoute />,
		children: [
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> }
		]
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{ path: '/', element: <Dashboard /> }
		]
	},
	{
		path: '*',
		element: <Navigate to="/" replace />
	}
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
