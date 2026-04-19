import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight } from 'react-icons/hi'
import { HiAcademicCap } from 'react-icons/hi'
import { SiZoom } from 'react-icons/si'
import { MdLanguage, MdSchedule, MdContentCopy, MdCheck, MdOpenInNew } from 'react-icons/md'
import { BsFillCalendarEventFill, BsCameraVideoFill } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'

// ── Webinar config ────────────────────────────────────────────
const WEBINAR = {
  title: 'Wave 1 — Al Qassimi Cardiology Club',
  subtitle: 'Advanced Cardiology Symposium 2025',
  date: 'April 24, 2025',
  // April 24 2025 at 18:00 Dubai time (UTC+4)
  dateObj: new Date('2025-04-24T18:00:00+04:00'),
  time: '6:00 PM',
  timezone: 'Dubai Time (UTC+4)',
  duration: '2 Hours',
  cme: '4 CME Credits',
  language: 'Arabic & English',
  chairperson: 'Dr. Georgios Sianos',
  poweredBy: 'AMGEN',
  zoomLink: 'https://us06web.zoom.us/j/9290423006?pwd=iGBa8pzCNyV3rQEEbY2bwuPElBE1hc.1&omn=86881939345',
  meetingId: '929 042 3006',
}

// ── Countdown hook ────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = targetDate - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      live:    false,
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

// ── Steps to join ─────────────────────────────────────────────
const steps = [
  {
    n: '01',
    title: 'Register',
    desc: 'Complete the registration form to receive your confirmation and reminder email.',
    action: { label: 'Register now', to: '/register' },
  },
  {
    n: '02',
    title: 'Install Zoom',
    desc: 'Download the free Zoom app on your phone, tablet, or computer before the event.',
    action: { label: 'zoom.us/download', href: 'https://zoom.us/download' },
  },
  {
    n: '03',
    title: 'Join at 6:00 PM',
    desc: 'On April 24 at 6:00 PM Dubai time, click the Join button or enter the Meeting ID.',
    action: { label: 'Join Webinar', href: WEBINAR.zoomLink },
  },
]

export default function Webinar() {
  const countdown = useCountdown(WEBINAR.dateObj)
  const [copied, setCopied] = useState(false)

  const copyId = () => {
    navigator.clipboard.writeText(WEBINAR.meetingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isLive = countdown.live

  return (
    <>
      <Helmet>
        <title>Join Webinar – Al Qassimi Cardiology Club · April 24</title>
        <meta name="description" content="Join the Al Qassimi Cardiology Club live webinar on April 24 at 6:00 PM Dubai time. Free — earn 4 CME credits. Powered by Zoom." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Banner bg */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/bannerHorz.jpg)' }} />
        <div className="absolute inset-0 bg-[#0D0D1A]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0D0D1A_85%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-16">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {isLive ? (
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-500/15 border border-red-500/35 px-4 py-1.5 rounded-full">
                <span className="pulse-live w-2 h-2 rounded-full bg-red-400 inline-block" />
                Live Now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C1AC84] bg-[#A8885C]/15 border border-[#A8885C]/35 px-4 py-1.5 rounded-full">
                <BsFillCalendarEventFill size={11} /> April 24 · 6:00 PM Dubai
              </span>
            )}
            <span className="text-xs font-semibold text-white bg-[#7A1A1A]/80 border border-[#7A1A1A] px-3 py-1.5 rounded-full uppercase tracking-wide">
              Powered by {WEBINAR.poweredBy}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#66C7E9] bg-[#66C7E9]/10 border border-[#66C7E9]/25 px-3 py-1.5 rounded-full">
              <HiAcademicCap /> {WEBINAR.cme}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-3 leading-tight"
          >
            <span className="gold-gradient">Wave 1</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg mb-2"
          >
            {WEBINAR.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-10"
          >
            <FaUserTie className="text-[#C1AC84]" />
            Chairperson: <span className="text-[#C1AC84] font-medium">{WEBINAR.chairperson}</span>
          </motion.div>

          {/* ── Countdown ─────────────────────────────────────── */}
          {!isLive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-3 sm:gap-5 mb-10"
            >
              {[
                { v: countdown.days,    l: 'Days' },
                { v: countdown.hours,   l: 'Hours' },
                { v: countdown.minutes, l: 'Minutes' },
                { v: countdown.seconds, l: 'Seconds' },
              ].map(({ v, l }) => (
                <div key={l} className="glass-card rounded-2xl w-16 sm:w-20 py-4 flex flex-col items-center">
                  <span className="font-display font-black text-2xl sm:text-3xl gold-gradient leading-none">
                    {String(v).padStart(2, '0')}
                  </span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest mt-1">{l}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Join Button ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href={WEBINAR.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-gold px-8 py-4 rounded-xl text-base font-semibold font-display tracking-wide inline-flex items-center gap-2.5 group ${
                isLive ? 'animate-pulse' : ''
              }`}
            >
              <SiZoom className="text-lg" />
              {isLive ? 'Join Now — Live!' : 'Join on Zoom'}
              <MdOpenInNew className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link
              to="/register"
              className="btn-outline-gold px-8 py-4 rounded-xl text-base font-display tracking-wide inline-flex items-center gap-2 group"
            >
              Register Free
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Meeting details card ─────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left: zoom info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#2D8CFF]/15 border border-[#2D8CFF]/30 flex items-center justify-center">
                <SiZoom className="text-[#2D8CFF] text-2xl" />
              </div>
              <div>
                <p className="text-white font-display font-semibold">Zoom Webinar</p>
                <p className="text-slate-500 text-xs">Primary platform</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#0D0D1A]/60 rounded-xl p-3.5 flex items-center justify-between group">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-0.5">Meeting ID</p>
                  <p className="text-white font-mono font-semibold text-base tracking-widest">{WEBINAR.meetingId}</p>
                </div>
                <button
                  onClick={copyId}
                  className="text-slate-400 hover:text-[#C1AC84] transition-colors p-1.5 rounded-lg hover:bg-[#A8885C]/10"
                  title="Copy ID"
                >
                  {copied ? <MdCheck className="text-green-400" size={18} /> : <MdContentCopy size={18} />}
                </button>
              </div>

              <a
                href={WEBINAR.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#0D0D1A]/60 rounded-xl p-3.5 group hover:border hover:border-[#A8885C]/30 transition-all"
              >
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wide mb-0.5">Direct Join Link</p>
                  <p className="text-[#66C7E9] text-xs font-medium truncate max-w-[200px]">
                    us06web.zoom.us/j/9290423006
                  </p>
                </div>
                <MdOpenInNew className="text-slate-500 group-hover:text-[#C1AC84] transition-colors" size={18} />
              </a>
            </div>
          </div>

          {/* Right: event meta */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {[
              { icon: <BsFillCalendarEventFill />, label: 'Date', value: WEBINAR.date },
              { icon: <MdSchedule />,              label: 'Start Time', value: WEBINAR.time },
              { icon: <BsCameraVideoFill />,        label: 'Duration', value: WEBINAR.duration },
              { icon: <HiAcademicCap />,            label: 'CME Credits', value: WEBINAR.cme },
              { icon: <MdLanguage />,               label: 'Language', value: WEBINAR.language },
              { icon: <FaUserTie />,                label: 'Timezone', value: WEBINAR.timezone },
            ].map((m, i) => (
              <div key={i} className="bg-[#0D0D1A]/60 rounded-xl p-3.5">
                <div className="text-[#C1AC84] mb-1.5 text-sm">{m.icon}</div>
                <p className="text-slate-500 text-[10px] uppercase tracking-wide">{m.label}</p>
                <p className="text-white text-xs font-semibold mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── How to join steps ────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
            How to <span className="gold-gradient">Join</span>
          </h2>
          <p className="text-slate-400 text-sm">Three simple steps to attend the live session</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <span className="font-display font-black text-4xl text-[#A8885C]/30 leading-none mb-4">{step.n}</span>
              <h4 className="font-display font-bold text-white text-lg mb-2">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{step.desc}</p>
              {step.action.to ? (
                <Link to={step.action.to} className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold font-display tracking-wide text-center">
                  {step.action.label}
                </Link>
              ) : (
                <a href={step.action.href} target="_blank" rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-display tracking-wide text-center inline-flex items-center justify-center gap-1.5 ${
                    i === 2 ? 'btn-gold' : 'btn-outline-gold'
                  }`}>
                  {step.action.label}
                  <MdOpenInNew size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Program preview ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="bg-[#7A1A1A]/70 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-white text-base">Wave 1 Program</h3>
            <Link to="/program" className="text-[#C1AC84] text-xs hover:underline font-display">
              Full schedule →
            </Link>
          </div>
          {[
            { time: '06:00 – 06:05', topic: 'Opening', speaker: '' },
            { time: '06:05 – 06:30', topic: 'Every Delay Counts: When LDL-C Management Falls Short', speaker: 'Dr. Jalal Kerfes' },
            { time: '06:30 – 06:55', topic: 'Addressing Residual Risk: Act Early, Treat Intensively', speaker: 'Dr. Hosam Zaki' },
            { time: '06:55 – 07:20', topic: 'A New Pathway Forward: Protecting Patients at High Risk', speaker: 'Dr. Paolo Fiorina' },
            { time: '07:20 – 07:45', topic: 'Timing Matters: Improving Outcomes in Practice', speaker: 'Dr. Noha Yasin' },
            { time: '07:45 – 08:00', topic: 'Q&A', speaker: '' },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-[120px_1fr_160px] px-6 py-4 border-b border-[#A8885C]/8 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
              <span className="text-[#C1AC84] font-mono text-xs font-semibold self-center">{row.time}</span>
              <span className="text-white text-sm font-medium self-center pr-4">{row.topic}</span>
              <span className="text-slate-400 text-xs self-center">{row.speaker}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={WEBINAR.zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 rounded-xl text-base font-semibold font-display tracking-wide inline-flex items-center gap-2.5 group"
          >
            <SiZoom className="text-lg" />
            Join the Webinar on Zoom
            <MdOpenInNew className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="text-slate-500 text-xs mt-3">April 24, 2025 · 6:00 PM Dubai Time (UTC+4)</p>
        </div>
      </section>
    </>
  )
}
