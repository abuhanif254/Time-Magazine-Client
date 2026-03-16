import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="px-4 py-12">
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-red-700">404</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
          Page not found
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          The page you’re looking for doesn’t exist, or it may have moved.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-red-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-800"
          >
            Go home
          </Link>
          <Link
            to="/articles"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-extrabold text-gray-900 hover:bg-gray-50"
          >
            Browse articles
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
