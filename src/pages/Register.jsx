import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { HiAcademicCap } from 'react-icons/hi'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import RegistrationForm from '../components/RegistrationForm'

const perks = [
  { icon: '📡', title: 'Live Webinar Access', desc: 'Join the session live on Zoom with real-time Q&A.' },
  { icon: '🎓', title: 'CME Credits', desc: 'Earn accredited CME credits upon completion.' },
  { icon: '🌍', title: 'International Faculty', desc: 'Learn from world-class cardiologists.' },
  { icon: '📜', title: 'Certificate', desc: 'Official attendance certificate issued digitally.' },
]

export default function Register() {
  return (
    <>
      <Helmet>
        <title>Register – Al Qassimi Cardiology Club</title>
        <meta name="description" content="Register for the Al Qassimi Cardiology Club online webinar. Free registration — earn CME credits." />
      </Helmet>

      {/* Header */}
      <section className="relative pt-36 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#A8885C]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C1AC84] text-xs uppercase tracking-widest font-semibold mb-3 block font-display"
          >
            Join Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-white mb-4"
          >
            <span className="gold-gradient">Register</span> Now
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-0.5 bg-[#A8885C] mx-auto mb-5"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm leading-relaxed"
          >
            Complete the form below to secure your spot at the Al Qassimi Cardiology Club webinar.
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left info column ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Event card */}
            <div className="relative glass-card rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: 'url(/bannerHorz.jpg)' }}
              />
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/15 border border-red-500/30 px-2.5 py-1 rounded-full">
                    <span className="pulse-live w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                    Live Webinar
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#C1AC84] bg-[#A8885C]/15 border border-[#A8885C]/30 px-2.5 py-1 rounded-full">
                    <BsFillCalendarEventFill size={9} /> April 24, 2025
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-lg leading-snug mb-1">
                  Advanced Cardiology Symposium
                </h3>
                <p className="text-[#66C7E9] text-xs mb-4">Al Qassimi Cardiology Club · Sharjah, UAE</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'Time', value: '06:00 PM' },
                    { label: 'Duration', value: '2 Hours' },
                    { label: 'CME Credits', value: '4 Credits' },
                    { label: 'Language', value: 'Arabic & English' },
                  ].map(m => (
                    <div key={m.label} className="bg-[#0D0D1A]/50 rounded-lg px-3 py-2">
                      <p className="text-slate-500 text-[10px] uppercase tracking-wide">{m.label}</p>
                      <p className="text-white font-semibold text-xs mt-0.5">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Perks */}
            <div className="glass-card rounded-2xl p-5 space-y-3">
              <h4 className="font-display font-semibold text-[#C1AC84] text-xs uppercase tracking-widest mb-3">
                What you get
              </h4>
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-xl leading-none">{p.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{p.title}</p>
                    <p className="text-slate-500 text-[11px]">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* EHS + social */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MdVerified className="text-[#66C7E9]" />
                <span className="text-[#66C7E9] text-xs font-semibold">Emirates Health Services</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mb-3">
                CME accredited by EHS. All registered attendees who attend the full session receive an official certificate.
              </p>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/profile.php?id=61573318744963" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#C1AC84] text-[11px] hover:underline">
                  <FaFacebookF size={11} /> Follow us
                </a>
                <span className="text-slate-700">·</span>
                <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#C1AC84] text-[11px] hover:underline">
                  <FaLinkedinIn size={11} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Form column ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-3 glass-card rounded-2xl p-7 md:p-9"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Registration Form</h3>
                <p className="text-slate-500 text-xs mt-1">Fields marked <span className="text-[#C1AC84]">*</span> are required</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#A8885C]/10 border border-[#A8885C]/25 px-3 py-1.5 rounded-full">
                <HiAcademicCap className="text-[#C1AC84] text-sm" />
                <span className="text-[#C1AC84] text-[10px] font-semibold uppercase tracking-wide font-display">CME</span>
              </div>
            </div>
            <RegistrationForm />
          </motion.div>

        </div>
      </section>
    </>
  )
}
