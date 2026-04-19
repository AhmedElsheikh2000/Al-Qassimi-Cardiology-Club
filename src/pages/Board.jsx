import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight } from 'react-icons/hi'
import BoardCard, { BoardCardHorizontal } from '../components/BoardCard'
import { boardMembers } from '../constants/boardMembers'

export default function Board() {
  const director = boardMembers.find(m => m.row === 1)
  const rest     = boardMembers.filter(m => m.row === 2)

  return (
    <>
      <Helmet>
        <title>Board Members – Al Qassimi Cardiology Club</title>
        <meta name="description" content="Meet the board of the Al Qassimi Cardiology Club — Club Director Dr. Arif AlNooryani, Secretary Dr. Ehab ALSaeidy, and Manager Dr. Wael Abo Shokka." />
      </Helmet>

      {/* Header */}
      <section className="relative pt-36 pb-14 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A8885C]/6 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[#C1AC84] text-xs uppercase tracking-widest font-semibold mb-3 block font-display">
            Leadership
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Our <span className="gold-gradient">Board</span>
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }}
            className="w-16 h-0.5 bg-[#A8885C] mx-auto mb-5" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-400 text-base leading-relaxed">
            Guided by experienced cardiologists committed to advancing cardiovascular care in the UAE.
          </motion.p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Row 1 — Director: full-width horizontal card */}
        {director && (
          <div className="mb-8">
            <BoardCardHorizontal member={director} index={0} />
          </div>
        )}

        {/* Connector */}
        <div className="flex justify-center mb-8">
          <div className="relative flex flex-col items-center">
            <div className="w-px h-6 bg-gradient-to-b from-[#A8885C]/50 to-transparent" />
            <div className="flex gap-40 md:gap-56">
              <div className="w-px h-5 bg-[#A8885C]/20" />
              <div className="w-px h-5 bg-[#A8885C]/20" />
            </div>
          </div>
        </div>

        {/* Row 2 — Secretary & Manager: wider vertical cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((member, i) => (
            <BoardCard key={member.id} member={member} index={i + 1} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#A8885C]/30" />
          <span className="text-[#C1AC84] text-sm uppercase tracking-widest font-semibold font-display">Join the Club</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#A8885C]/30" />
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card rounded-2xl p-10 text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🫀</div>
          <h3 className="font-display font-bold text-2xl text-white mb-3">Apply for Membership</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Join a growing community of cardiovascular professionals with access to CME events, scientific resources, and leading specialists.
          </p>
          <Link to="/register"
            className="btn-gold px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group font-display tracking-wide">
            Register as Member
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
