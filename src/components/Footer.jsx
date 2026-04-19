import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0D0D1A] border-t border-[#A8885C]/20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Al Qassimi Cardiology Club"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Advancing cardiovascular medicine through education, research, and collaboration across the UAE and the Gulf region.
            </p>
            <p className="text-slate-500 text-xs mt-3">Affiliated with Emirates Health Services (EHS) · Sharjah, UAE</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C1AC84] font-display font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/board', label: 'Board Members' },
                { to: '/program', label: 'Scientific Program' },
                { to: '/webinar', label: 'Upcoming Webinar' },
                { to: '/register', label: 'Registration' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 text-sm hover:text-[#C1AC84] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[#C1AC84] font-display font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-5">
              <a
                href="https://www.linkedin.com/in/al-qassimi-cardio-club-23a97a3b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1A1A2E] border border-[#A8885C]/30 flex items-center justify-center text-[#C1AC84] hover:bg-[#A8885C]/20 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573318744963"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#1A1A2E] border border-[#A8885C]/30 flex items-center justify-center text-[#C1AC84] hover:bg-[#A8885C]/20 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="mailto:cardiology.club@ehs.gov.ae"
                className="w-9 h-9 rounded-lg bg-[#1A1A2E] border border-[#A8885C]/30 flex items-center justify-center text-[#C1AC84] hover:bg-[#A8885C]/20 transition-colors"
                aria-label="Email"
              >
                <MdEmail size={16} />
              </a>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Al Qassimi Hospital<br />
              Corniche Road, Sharjah<br />
              United Arab Emirates
            </p>
          </div>
        </div>

        <div className="border-t border-[#A8885C]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {year} Al Qassimi Cardiology Club. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Affiliated with <span className="text-[#66C7E9]">Emirates Health Services</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
