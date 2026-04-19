import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight } from 'react-icons/hi'
import { MdAccessTime, MdPerson, MdLocationOn } from 'react-icons/md'
import { BsPersonBadge, BsFillCalendarEventFill } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { waves } from '../constants/programSchedule'

const typeConfig = {
  ceremony: {
    rowBg: 'bg-[#A8885C]/8 border-l-[#A8885C]',
    tag: null,
    topicColor: 'text-[#C1AC84]',
  },
  lecture: {
    rowBg: 'bg-transparent border-l-[#66C7E9]/40',
    tag: null,
    topicColor: 'text-white',
  },
  qa: {
    rowBg: 'bg-[#66C7E9]/5 border-l-[#66C7E9]',
    tag: null,
    topicColor: 'text-[#66C7E9]',
  },
}

function WaveCard({ wave, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-sm font-display font-semibold tracking-wide transition-all duration-200 ${
        isActive
          ? 'btn-gold shadow-lg shadow-[#A8885C]/20'
          : 'border border-[#A8885C]/30 text-slate-400 hover:text-[#C1AC84] hover:border-[#A8885C]/60 bg-transparent'
      }`}
    >
      {wave.title}
      <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-normal ${
        isActive ? 'bg-[#0D0D1A]/30 text-[#0D0D1A]' : 'bg-[#A8885C]/15 text-[#C1AC84]'
      }`}>
        {wave.dateShort}
      </span>
    </button>
  )
}

export default function Program() {
  const [activeWaveId, setActiveWaveId] = useState(waves[0].id)
  const wave = waves.find(w => w.id === activeWaveId)

  return (
    <>
      <Helmet>
        <title>Scientific Program – Al Qassimi Cardiology Club</title>
        <meta name="description" content="Al Qassimi Cardiology Club Wave 1 scientific program — April 24. LDL-C management, residual risk, cardiovascular prevention. Chairperson: Dr. Georgios Sianos." />
      </Helmet>

      {/* Page Header */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-[#A8885C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-[#66C7E9]/4 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C1AC84] text-xs uppercase tracking-widest font-semibold mb-3 block font-display"
          >
            Scientific Agenda
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-white mb-4"
          >
            Scientific <span className="gold-gradient">Program</span>
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
            className="text-slate-400 text-sm max-w-xl mx-auto"
          >
            CME-accredited sessions featuring international faculty on cardiovascular risk management and prevention.
          </motion.p>

          {/* Wave Tabs */}
          {waves.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-3 mt-8 flex-wrap"
            >
              {waves.map(w => (
                <WaveCard
                  key={w.id}
                  wave={w}
                  isActive={activeWaveId === w.id}
                  onClick={() => setActiveWaveId(w.id)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Wave Content */}
      <AnimatePresence mode="wait">
        <motion.section
          key={wave.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        >
          {/* Wave Header Card */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            {/* Background: banner image with dark overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/bannerHorz.jpg)' }}
            />
            <div className="absolute inset-0 bg-[#0D0D1A]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D1A]/60 via-transparent to-[#0D0D1A]/40" />

            <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Left: Wave title + meta */}
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {/* AMGEN badge */}
                  <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#7A1A1A] px-3 py-1 rounded">
                    Powered by {wave.poweredBy}
                  </span>
                  {/* Date badge */}
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C1AC84] bg-[#A8885C]/20 border border-[#A8885C]/40 px-3 py-1 rounded">
                    <BsFillCalendarEventFill size={11} />
                    {wave.dateShort}
                  </span>
                  {/* Timezone */}
                  <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded">
                    All times UTC+4
                  </span>
                </div>

                <h2 className="font-display font-black text-3xl md:text-4xl gold-gradient mb-1">
                  {wave.title}
                </h2>
                <p className="text-slate-300 text-sm">{wave.date}</p>
              </div>

              {/* Right: Chairperson */}
              <div className="flex-shrink-0">
                <div className="glass-card rounded-xl px-5 py-4 flex items-center gap-3 border-[#A8885C]/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C1AC84] to-[#A8885C] flex items-center justify-center shrink-0">
                    <FaUserTie className="text-[#0D0D1A] text-base" />
                  </div>
                  <div>
                    <p className="text-[#C1AC84] text-[10px] uppercase tracking-widest font-semibold font-display mb-0.5">
                      ◆ Chairperson ◆
                    </p>
                    <p className="text-white font-display font-semibold text-base">{wave.chairperson}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Table */}
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_160px] md:grid-cols-[140px_1fr_200px] bg-[#7A1A1A]/80 border-b border-[#A8885C]/20">
              <div className="px-4 md:px-6 py-4 flex items-center gap-2 text-white font-display font-bold text-sm italic">
                <MdAccessTime className="text-[#C1AC84]" />
                Time
              </div>
              <div className="px-4 py-4 flex items-center gap-2 text-white font-display font-bold text-sm italic">
                Topic
              </div>
              <div className="px-4 md:px-6 py-4 flex items-center gap-2 text-white font-display font-bold text-sm italic">
                <MdPerson className="text-[#C1AC84]" />
                Speaker
              </div>
            </div>

            {/* Sessions */}
            {wave.sessions.map((session, i) => {
              const cfg = typeConfig[session.type]
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ delay: i * 0.07 }}
                  className={`grid grid-cols-[100px_1fr_160px] md:grid-cols-[140px_1fr_200px] border-l-2 border-b border-b-[#A8885C]/10 last:border-b-0 transition-colors hover:bg-white/3 ${cfg.rowBg} ${isEven ? '' : 'bg-white/[0.02]'}`}
                >
                  {/* Time */}
                  <div className="px-4 md:px-6 py-4 md:py-5 flex flex-col justify-center gap-0.5">
                    <span className="text-[#C1AC84] font-mono font-semibold text-sm whitespace-nowrap">
                      {session.timeStart}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">{session.timeEnd}</span>
                  </div>

                  {/* Topic */}
                  <div className="px-4 py-4 md:py-5 flex items-center border-x border-[#A8885C]/10">
                    <p className={`font-semibold text-sm leading-snug ${cfg.topicColor}`}>
                      {session.topic}
                    </p>
                  </div>

                  {/* Speaker */}
                  <div className="px-4 md:px-6 py-4 md:py-5 flex items-center">
                    {session.speaker ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A8885C]/40 to-[#66C7E9]/20 flex items-center justify-center shrink-0">
                          <BsPersonBadge className="text-[#C1AC84] text-xs" />
                        </div>
                        <span className="text-slate-300 text-sm font-medium leading-tight">
                          {session.speaker}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-600 text-xs italic">—</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom note + CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <MdLocationOn className="text-[#C1AC84]" />
              Al Qassimi Hospital, Sharjah · All times in UTC+4
            </div>
            <Link
              to="/register"
              className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group font-display tracking-wide"
            >
              Reserve Your Seat
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Coming soon waves teaser — only show if only 1 wave */}
          {waves.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-10 glass-card rounded-xl p-5 flex items-center gap-4 border-dashed border-[#A8885C]/20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A8885C]/10 flex items-center justify-center shrink-0 text-[#C1AC84] font-display font-bold text-sm">
                W2
              </div>
              <div>
                <p className="text-white font-display font-semibold text-sm">Wave 2 — Coming Soon</p>
                <p className="text-slate-500 text-xs mt-0.5">Additional waves will be announced. Register to receive updates.</p>
              </div>
              <Link to="/register" className="ml-auto text-[#C1AC84] text-xs hover:underline whitespace-nowrap font-display">
                Stay notified →
              </Link>
            </motion.div>
          )}
        </motion.section>
      </AnimatePresence>
    </>
  )
}
