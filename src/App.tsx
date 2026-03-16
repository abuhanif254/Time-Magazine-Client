


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-red-700 text-white py-6 px-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">Time Magazine</div>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/categories" className="hover:underline">Categories</a>
          <a href="/trending" className="hover:underline">Trending</a>
          <a href="/login" className="hover:underline">Login</a>
        </nav>
      </header>

      {/* Featured Articles Carousel Placeholder */}
      <section className="my-8 px-4">
        <div className="text-2xl font-bold mb-4">Featured Articles</div>
        <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Carousel goes here
        </div>
      </section>

      {/* Categories/Tags Filter Placeholder */}
      <section className="px-4 mb-8">
        <div className="text-xl font-semibold mb-2">Categories</div>
        <div className="flex space-x-2">
          <button className="bg-red-100 text-red-700 px-3 py-1 rounded">Politics</button>
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">Science</button>
          <button className="bg-green-100 text-green-700 px-3 py-1 rounded">Culture</button>
          <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">World</button>
        </div>
      </section>

      {/* Magazine Articles Section Placeholder */}
      <main className="flex-1 px-4">
        <div className="text-xl font-bold mb-4">Latest Articles</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example article cards */}
          <div className="bg-white shadow rounded p-4">
            <div className="h-32 bg-gray-100 rounded mb-2"></div>
            <div className="font-semibold">Article Title</div>
            <div className="text-sm text-gray-500">Category • Date</div>
            <div className="mt-2 text-gray-700">Short summary of the article...</div>
          </div>
          <div className="bg-white shadow rounded p-4">
            <div className="h-32 bg-gray-100 rounded mb-2"></div>
            <div className="font-semibold">Article Title</div>
            <div className="text-sm text-gray-500">Category • Date</div>
            <div className="mt-2 text-gray-700">Short summary of the article...</div>
          </div>
          <div className="bg-white shadow rounded p-4">
            <div className="h-32 bg-gray-100 rounded mb-2"></div>
            <div className="font-semibold">Article Title</div>
            <div className="text-sm text-gray-500">Category • Date</div>
            <div className="mt-2 text-gray-700">Short summary of the article...</div>
          </div>
        </div>
      </main>

      {/* Trending Section Placeholder */}
      <section className="px-4 my-8">
        <div className="text-xl font-semibold mb-2">Trending</div>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Trending Article 1</li>
          <li>Trending Article 2</li>
          <li>Trending Article 3</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 px-4 mt-auto text-center">
        &copy; 2026 Time Magazine. All rights reserved.
      </footer>
    </div>
  );
}

export default App
