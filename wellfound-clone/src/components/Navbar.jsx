const Navbar = () => {
    return (
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
            <svg fill="currentColor" viewBox="0 0 554.89997 266.70002" width="50" class="w-30 text-black"><path d="M 80.9,263.59999 0,2.9999988 H 75.3 L 123,190.39999 174.9,2.9999988 h 75.5 L 302.3,190.39999 350,2.9999988 h 75.3 L 343.5,263.59999 H 263.3 L 212.7,75.399999 161.1,263.59999 H 80.9 Z"></path><circle cx="511.09995" cy="222.89999" fill="#EC2E3A" r="43.799999"></circle><circle cx="511.09995" cy="43.799999" fill="#EC2E3A" r="43.799999"></circle></svg>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#" className="text-gray-700">Discover</a>
                <a href="#" className="text-gray-700">Find Jobs</a>
                <a href="#" className="text-gray-700">For Recruiters</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2">Log In</button>
              <button className="px-4 py-2 bg-black text-white rounded-md">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;