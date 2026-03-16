import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  return (
    <div className="px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold tracking-wide text-red-700">Account</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access saved stories and a cleaner reading experience.
            </p>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-extrabold text-gray-900">Demo credentials</p>
              <p className="mt-2 text-sm text-gray-700">
                Use any email and password. This is UI-only right now.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/"
                  className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Back to home
                </Link>
                <Link
                  to="/articles"
                  className="rounded-full bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Browse articles
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-extrabold text-gray-900">Welcome back</h3>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email and password to continue.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus('success');
                }}
              >
                <div>
                  <label htmlFor="email" className="text-xs font-bold tracking-wide text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-xs font-bold tracking-wide text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-red-700 focus:ring-red-500"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-left text-sm font-semibold text-red-700 hover:underline"
                    onClick={() => setStatus('idle')}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-red-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-800"
                >
                  Sign in
                </button>
              </form>

              {status === 'success' ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-extrabold text-emerald-900">Signed in (demo)</p>
                  <p className="mt-1 text-sm text-emerald-800">
                    This is a UI-only login page. Hook it up to your API when you’re ready.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
