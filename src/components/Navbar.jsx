import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/board', label: 'Board' },
  { to: '/program', label: 'Program' },
  { to: '/webinar', label: 'Webinar' },
  { to: '/register', label: 'Register' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D1A]/95 backdrop-blur-md shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Al Qassimi Cardiology Club"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-display tracking-wide ${
                    isActive
                      ? 'text-[#C1AC84] bg-[#A8885C]/15'
                      : 'text-slate-300 hover:text-[#C1AC84] hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/register"
          className="hidden md:block btn-gold px-5 py-2 rounded-lg text-sm font-display tracking-wide"
        >
          Register Now
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-[#C1AC84] text-2xl p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#1A1A2E]/98 backdrop-blur-xl border-t border-[#A8885C]/20 px-4 pb-6 pt-4"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium font-display tracking-wide transition-all ${
                        isActive
                          ? 'text-[#C1AC84] bg-[#A8885C]/15'
                          : 'text-slate-300 hover:text-[#C1AC84]'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block btn-gold px-4 py-3 rounded-lg text-sm text-center font-display tracking-wide"
                >
                  Register Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
