import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 text-center">
            <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
            <p className="mt-4 text-2xl font-semibold text-gray-800">
                Something went wrong.
            </p>
            <p className="mt-2 text-gray-600">
                We couldn’t load the page you’re looking for.
            </p>
            <Link to="/" className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700">
                Go back home
            </Link>
        </div>
    );
};

export default ErrorPage;