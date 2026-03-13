import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
      {!token ? (
        <>
          <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/login" className="hover:underline" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" className="hover:underline" onClick={() => setIsOpen(false)}>Register</Link>
        </>
      ) : (
        <>
          <Link to="/new" className="hover:underline" onClick={() => setIsOpen(false)}>Write</Link>
          <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
          <button onClick={handleLogout} className="cursor-pointer hover:underline">Logout</button>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-10 bg-myblue text-white px-8 md:px-16 lg:px-32 xl:px-48 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-2xl">BlogAPIs</Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 font-medium">
        <NavLinks />
      </div>

      {/* Hamburger Icon */}
      <div className="size-8 md:hidden flex items-center justify-center">
        <button onClick={toggleMenu} className='cursor-pointer text-2xl'>
          {isOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 right-0 w-1/3 bg-myblue text-white px-6 py-4 rounded-bl-2xl flex flex-col items-center space-y-4 font-medium md:hidden shadow-lg">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
