import { motion } from 'framer-motion'
import { BsCircleFill } from 'react-icons/bs'
import { MdLiveTv } from 'react-icons/md'
import { HiAcademicCap } from 'react-icons/hi'

const typeStyles = {
  keynote: 'border-[#D4AF5A]/60 bg-[#D4AF5A]/5',
  lecture: 'border-[#B8973A]/30 bg-[#B8973A]/5',
  panel: 'border-[#6EC6E6]/40 bg-[#6EC6E6]/5',
  'live-case': 'border-[#D4AF5A]/70 bg-[#D4AF5A]/8',
  discussion: 'border-[#6EC6E6]/30 bg-transparent',
  break: 'border-slate-700/50 bg-transparent',
  ceremony: 'border-[#B8973A]/40 bg-[#B8973A]/5',
}

const dotColors = {
  keynote: 'text-[#D4AF5A]',
  lecture: 'text-[#B8973A]',
  panel: 'text-[#6EC6E6]',
  'live-case': 'text-[#D4AF5A]',
  discussion: 'text-[#6EC6E6]',
  break: 'text-slate-600',
  ceremony: 'text-[#B8973A]',
}

export default function ProgramItem({ item, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`mt-1 ${dotColors[item.type]}`}>
          <BsCircleFill size={10} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#B8973A]/30 to-transparent min-h-[2rem]" />
        )}
      </div>

      {/* Content card */}
      <div className={`flex-1 mb-6 rounded-xl border p-4 md:p-5 transition-all duration-200 hover:border-[#B8973A]/50 ${typeStyles[item.type]}`}>
        {/* Time row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[#D4AF5A] text-xs font-semibold font-mono bg-[#D4AF5A]/10 px-2.5 py-0.5 rounded">
            {item.time}
          </span>

          {item.isLive && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded">
              <span className="pulse-live inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
              <MdLiveTv size={10} />
              Live
            </span>
          )}

          {item.cme && (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6EC6E6] bg-[#6EC6E6]/10 border border-[#6EC6E6]/25 px-2 py-0.5 rounded">
              <HiAcademicCap size={11} />
              {item.cme} CME Credit{item.cme > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <h4 className={`font-display font-semibold text-base md:text-lg mb-1 ${
          item.type === 'break' ? 'text-slate-400' : 'text-white'
        }`}>
          {item.title}
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}
