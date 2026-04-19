import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import { MdVerified } from 'react-icons/md'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import { SiZoom } from 'react-icons/si'

// ── Countdown to April 24 2026 · 6 PM Dubai ───────────────────
const WEBINAR_DATE = new Date('2026-04-24T18:00:00+04:00')

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      live:    false,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }

export default function Home() {
  const cd = useCountdown(WEBINAR_DATE)

  return (
    <>
      <Helmet>
        <title>Al Qassimi Cardiology Club – Sharjah, UAE</title>
        <meta name="description" content="Al Qassimi Cardiology Club — advancing cardiovascular medicine in Sharjah, UAE. Affiliated with Emirates Health Services." />
        <meta property="og:image" content="/bannerHorz.jpg" />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bannerHorz.jpg)' }} />
        <div className="absolute inset-0 bg-[#0D0D1A]/72" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0D0D1A_90%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-20">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs text-[#66C7E9] bg-[#66C7E9]/10 border border-[#66C7E9]/25 px-4 py-1.5 rounded-full mb-8">
            <MdVerified size={13} /> Affiliated with Emirates Health Services (EHS)
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex justify-center mb-8">
            <img src="/logo.png" alt="Al Qassimi Cardiology Club" className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.h1 {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4">
            <span className="gold-gradient">Al Qassimi</span><br />
            <span className="text-white">Cardiology Club</span>
          </motion.h1>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#A8885C] to-transparent mx-auto mb-5" />

          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.35 }}
            className="text-[#66C7E9] text-base md:text-lg font-light tracking-widest uppercase mb-4">
            Sharjah · United Arab Emirates
          </motion.p>

          <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}
            className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Advancing cardiovascular medicine through world-class education, research, and collaboration across the Gulf region.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="btn-gold px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 group font-display tracking-wide">
              Register Now <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/webinar" className="btn-outline-gold px-8 py-3.5 rounded-xl text-sm font-semibold font-display tracking-wide">
              Join Webinar
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex justify-center gap-3 mt-8">
            <a href="https://www.linkedin.com/in/al-qassimi-cardio-club-23a97a3b9/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#C1AC84] hover:bg-[#A8885C]/20 transition-colors">
              <FaLinkedinIn size={16} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573318744963" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[#C1AC84] hover:bg-[#A8885C]/20 transition-colors">
              <FaFacebookF size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-slate-400 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-[#A8885C] to-transparent" />
        </motion.div>
      </section>

      {/* ── Countdown ─────────────────────────────────────────── */}
      <section className="py-16 border-y border-[#A8885C]/20 bg-[#1A1A2E]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            {cd.live ? (
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-400 bg-red-500/15 border border-red-500/30 px-4 py-1.5 rounded-full">
                <span className="pulse-live w-2 h-2 rounded-full bg-red-400 inline-block" /> Live Now
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1.5 text-xs text-[#C1AC84] bg-[#A8885C]/15 border border-[#A8885C]/30 px-3 py-1 rounded-full font-display font-semibold uppercase tracking-wide">
                  <BsFillCalendarEventFill size={11} /> April 24, 2026
                </span>
                <span className="text-slate-500 text-xs">·</span>
                <span className="text-xs text-[#66C7E9] bg-[#66C7E9]/10 border border-[#66C7E9]/20 px-3 py-1 rounded-full">
                  6:00 PM · Dubai Time (UTC+4)
                </span>
              </>
            )}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-slate-500 text-xs mb-8 uppercase tracking-widest font-display">
            {cd.live ? 'The webinar is live — join now!' : 'Next webinar starts in'}
          </motion.p>

          {!cd.live && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex justify-center gap-3 sm:gap-4 mb-8">
              {[
                { v: cd.days,    l: 'Days' },
                { v: cd.hours,   l: 'Hours' },
                { v: cd.minutes, l: 'Min' },
                { v: cd.seconds, l: 'Sec' },
              ].map(({ v, l }) => (
                <div key={l} className="relative glass-card rounded-2xl w-[72px] sm:w-24 py-5 flex flex-col items-center overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#A8885C]/50 to-transparent" />
                  <span className="font-display font-black text-3xl sm:text-4xl gold-gradient leading-none tabular-nums">
                    {String(v).padStart(2, '0')}
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest mt-2">{l}</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3">
            <a href="https://us06web.zoom.us/j/9290423006?pwd=iGBa8pzCNyV3rQEEbY2bwuPElBE1hc.1&omn=86881939345"
              target="_blank" rel="noopener noreferrer"
              className="btn-gold px-7 py-3 rounded-xl text-sm font-semibold font-display tracking-wide inline-flex items-center gap-2">
              <SiZoom /> Join on Zoom
            </a>
            <Link to="/register" className="btn-outline-gold px-7 py-3 rounded-xl text-sm font-display tracking-wide inline-flex items-center gap-2">
              Register Free <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-[#C1AC84] text-xs uppercase tracking-widest font-semibold mb-3 block font-display">About Us</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">Elevating Cardiovascular</h2>
            <h2 className="font-display font-bold text-3xl md:text-4xl gold-gradient mb-6">Excellence in the UAE</h2>
            <div className="w-16 h-0.5 bg-[#A8885C] mb-7" />

            <p className="text-slate-300 leading-relaxed mb-4 text-base">
              The <span className="text-[#C1AC84] font-semibold">Al Qassimi Cardiology Club</span> is a prestigious medical society based at Al Qassimi Hospital in Sharjah — part of the Emirates Health Services (EHS) network. We unite cardiologists, physicians, and allied health professionals committed to advancing heart care across the region.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Through scientific symposia, live case transmissions, CME-accredited webinars, and collaborative research, we keep our members at the forefront of cardiovascular medicine.
            </p>

            {/* Feature list — no icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { title: 'CME Accredited',       desc: 'Recognized by UAE health authorities' },
                { title: 'International Faculty', desc: 'UAE, Gulf & global experts' },
                { title: 'Live Case Sessions',    desc: 'Real-time cath lab transmissions' },
                { title: 'EHS Affiliated',        desc: 'Emirates Health Services network' },
              ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 glass-card rounded-xl p-4">
                  <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-[#C1AC84] to-[#A8885C] shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold font-display mb-0.5">{f.title}</p>
                    <p className="text-slate-500 text-xs">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/program" className="btn-gold px-6 py-2.5 rounded-lg text-sm font-semibold font-display tracking-wide">View Program</Link>
              <Link to="/board" className="btn-outline-gold px-6 py-2.5 rounded-lg text-sm font-display tracking-wide">Meet the Board</Link>
            </div>
          </motion.div>

          {/* Right: banner */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex justify-center">
            <div className="relative w-full max-w-xs">
              <img src="/bannerVert.jpg" alt="Al Qassimi Cardiology Club"
                className="rounded-2xl w-full object-cover shadow-2xl shadow-[#A8885C]/20" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#A8885C]/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────── */}
      <section className="py-20 bg-[#1A1A2E]/30 border-y border-[#A8885C]/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#C1AC84] text-xs uppercase tracking-widest font-semibold mb-3 block font-display">
              Our Purpose
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display font-black text-3xl md:text-4xl text-white">
              Mission & <span className="gold-gradient">Vision</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mission */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="relative glass-card rounded-2xl p-8 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C1AC84] via-[#A8885C] to-transparent" />
              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#A8885C]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6">
                <p className="text-[#C1AC84] text-[10px] uppercase tracking-widest font-display font-bold mb-1">Mission</p>
                <h3 className="font-display font-black text-2xl text-white">What We Do</h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-[#A8885C]/40 pl-4">
                To advance cardiovascular health across the UAE and Gulf region by delivering world-class, CME-accredited education, fostering international scientific collaboration, and empowering healthcare professionals with the latest clinical evidence.
              </p>

              <ul className="space-y-3">
                {[
                  'Deliver evidence-based cardiology education',
                  'Bridge the gap between research and clinical practice',
                  'Strengthen the cardiovascular healthcare workforce',
                  'Partner with global institutions and industry leaders',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-[#A8885C]/20 border border-[#A8885C]/30 flex items-center justify-center text-[#C1AC84] text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="relative glass-card rounded-2xl p-8 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
              {/* Top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#66C7E9] via-[#30B8E6] to-transparent" />
              {/* Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#66C7E9]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6">
                <p className="text-[#66C7E9] text-[10px] uppercase tracking-widest font-display font-bold mb-1">Vision</p>
                <h3 className="font-display font-black text-2xl text-white">Where We're Headed</h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-[#66C7E9]/35 pl-4">
                To be the leading cardiology education hub in the Gulf — a recognized center of excellence where innovation meets compassion, and where every cardiovascular professional is equipped to deliver the highest standard of patient care.
              </p>

              <ul className="space-y-3">
                {[
                  'Become the premier cardiology network in the GCC',
                  'Set new benchmarks in cardiovascular care quality',
                  'Inspire the next generation of heart specialists',
                  'Champion prevention and early intervention regionally',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="w-5 h-5 rounded-full bg-[#66C7E9]/15 border border-[#66C7E9]/30 flex items-center justify-center text-[#66C7E9] text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="mx-4 sm:mx-6 lg:mx-8 my-20 rounded-2xl overflow-hidden">
        <div className="relative bg-cover bg-center py-20 px-6 md:px-16 text-center"
          style={{ backgroundImage: 'url(/bannerHorz.jpg)' }}>
          <div className="absolute inset-0 bg-[#0D0D1A]/78 rounded-2xl" />
          <div className="relative z-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">Ready to Join the Club?</h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
              Become a full member of the Al Qassimi Cardiology Club and gain access to exclusive events, CME credits, and a network of leading cardiovascular specialists.
            </p>
            <Link to="/register" className="btn-gold px-8 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group font-display tracking-wide">
              Apply for Membership <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
