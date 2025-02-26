import "boxicons/css/boxicons.min.css";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex justify-between items-center px-4 py-3 shadow-sm bg-plasma-black/85 backdrop-blur-sm">
      <ul className="flex gap-4">
        <li>
          <a
            href="https://seequent.com"
            target="_blank"
            className="flex items-center px-4 py-1 text-white rounded-full hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <i className="bx bx-link mr-2 text-xl"></i>
            <span className="font-bold">SPONSOR</span>
          </a>
        </li>
        <li>
          <a
            href="#documentation"
            className="flex items-center px-4 py-1 text-white rounded-full hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <i className="bx bx-book-open mr-2 text-xl"></i>
            <span className="font-bold">DOCUMENTATION</span>
          </a>
        </li>
      </ul>
      <ul className="flex gap-4">
        <li>
          <a
            href="/"
            className="flex items-center px-4 py-1 text-white rounded-full hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <i className="bx bx-home mr-2 text-xl"></i>
            <span className="font-bold">HOME</span>
          </a>
        </li>
        <li>
          <a
            href="/convert"
            className="flex items-center px-4 py-1 text-white rounded-full hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <i className="bx bx-upload mr-2 text-xl"></i>
            <span className="font-bold">CONVERT</span>
          </a>
        </li>
        <li>
          <a
            href="/viewer"
            className="flex items-center px-4 py-1 text-white rounded-full hover:text-gray-200 transition-colors duration-300 ease-in-out"
          >
            <i className="bx bx-cube mr-2 text-xl"></i>
            <span className="font-bold">VISUALIZER</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
