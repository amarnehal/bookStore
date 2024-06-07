const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex justify-center md:justify-end">
              <li className="mr-4">
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="hover:text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
