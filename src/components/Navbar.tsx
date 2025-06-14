import { Link } from 'react-router-dom'
import { btnNames } from '@/lib/data'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-[#2b2a29] m-auto clip-path-bottom text-white h-[60px] flex items-center justify-between px-4 md:px-15">
      {/* Logo and Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Ahmed Fouad" className="w-10 h-10 rounded-full" />
        <span className="text-sm font-semibold">Ahmed Fouad</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-3 text-xs items-center">
        {btnNames.map((btn) => (
          <Link
            key={btn.name}
            to={btn.link}
            className="hover:text-orange-500 cursor-pointer duration-700"
          >
            {btn.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} className='cursor-pointer hover:text-orange-500'/>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[#2b2a29] lg:hidden">
          <div className="flex flex-col items-center py-4 gap-3">
            {btnNames.map((btn) => (
              <Link
                key={btn.name}
                to={btn.link}
                className="hover:text-orange-500 cursor-pointer duration-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {btn.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar 