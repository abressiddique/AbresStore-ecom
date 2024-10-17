const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-800 py-10"> {/* Changed to light pink color */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start flex-wrap px-4">
        {/* Logo and About Section */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <img src="/logo.png" alt="Logo" className="w-36 mb-4" />
          <p className="text-gray-600">
            Welcome to AbresStore! Discover a world of trendy and stylish clothing designed with quality and creativity. We’re here to bring your fashion dreams to life. Thank you for choosing us!
          </p>
        </div>

        {/* Contact Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-start">
          <h4 className="text-gray-800 text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-600">Phone: +91 9453300916</p>
          <p className="text-gray-600 mb-4">Email: abresstore@gmail.com</p>
          <p className="text-gray-600">Offices: Mumbai, Prayagraj</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com" className="text-gray-600 hover:text-pink-600" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com" className="text-gray-600 hover:text-pink-600" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-gray-600">GST Number: 09AUC PS2880C1ZK</p> {/* Add your actual GST number here */}
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Abres Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
