import React, { useState, useEffect } from "react";
import { MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/authSlice";

// static links
const links = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'About Us', href: '#about-us' },
]

// logo
const Logo = React.memo(() => (
  <svg 
    viewBox="0 0 200 200" 
    className="h-8 w-8"
    fill="none"
  >
    <rect width="200" height="200" rx="40" fill="#FFFBF5"/>
    <circle cx="100" cy="95" r="10" fill="#FF9800"/>
  </svg>
))

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  const isAuth = Boolean(user || token || localStorage.getItem("token"))
  const isHomePage = pathname === "/"
  const ctaTarget = isAuth ? "/app" : "/login?state=register"

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  // logout
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsOpen(false)
  }

  return (
    <>
      <nav className='sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200/60 bg-white/70 px-6 py-3 backdrop-blur-md md:px-16 lg:px-24'>
        
        {/* Logo */}
        {isHomePage ? (
          <a href="#top" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold tracking-tight">
              ResumeAI
            </span>
          </a>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold tracking-tight">
              ResumeAI
            </span>
          </Link>
        )}

        {/* Desktop Links */}
        {isHomePage && (
          <div className='hidden items-center gap-8 text-sm text-slate-600 md:flex'>
            {links.map((link) => (
              <a key={link.name} href={link.href} className='font-medium transition hover:text-slate-900'>
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">
          
          {!isAuth ? (
            <>
              <Link to='/login?state=login' className='text-sm font-medium text-slate-600 transition hover:text-slate-900'>
                Login
              </Link>

              <Link 
                to={ctaTarget}
                className='rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800'
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {pathname !== "/app" && (
                <Link 
                  to='/app' 
                  className='text-sm font-medium text-slate-600 transition hover:text-slate-900'
                >
                  Dashboard
                </Link>
              )}

              <button 
                onClick={handleLogout}
                className='flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600'
              >
                <LogOutIcon className='size-4' />
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile menu button */}
        <button onClick={() => setIsOpen(true)} className='rounded-md p-1.5 transition hover:bg-slate-100 md:hidden'>
          <MenuIcon className='size-6' />
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/95 backdrop-blur-xl transition-transform duration-300 md:hidden 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {isHomePage && links.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            className='text-lg font-medium text-slate-800'
          >
            {link.name}
          </a>
        ))}

        {!isAuth ? (
          <>
            <Link to='/login?state=login' onClick={() => setIsOpen(false)} className='text-base font-medium text-slate-700'>
              Login
            </Link>

            <Link 
              to={ctaTarget}
              onClick={() => setIsOpen(false)}
              className='rounded-full bg-slate-900 px-8 py-3 font-medium text-white'
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            {pathname !== "/app" && (
              <Link to='/app' onClick={() => setIsOpen(false)} className='text-base font-medium text-slate-700'>
                Dashboard
              </Link>
            )}

            <button 
              onClick={handleLogout}
              className='font-medium text-red-500'
            >
              Logout
            </button>
          </>
        )}

        <button onClick={() => setIsOpen(false)} className='rounded-md p-1.5 text-slate-700 transition hover:bg-slate-100'>
          <XIcon />
        </button>
      </div>
    </>
  )
}

export default Navbar
