import { motion } from 'framer-motion'

const roleStyles = {
  'Club Director': {
    badge:  'bg-[#A8885C]/20 text-[#C1AC84] border-[#A8885C]/40',
    ring:   'ring-[#C1AC84]/40',
    bar:    'from-[#C1AC84] to-[#A8885C]',
    accent: '#C1AC84',
  },
  'Club Secretary': {
    badge:  'bg-[#66C7E9]/20 text-[#66C7E9] border-[#66C7E9]/35',
    ring:   'ring-[#66C7E9]/35',
    bar:    'from-[#66C7E9] to-[#30B8E6]',
    accent: '#66C7E9',
  },
  'Club Manager': {
    badge:  'bg-[#A8885C]/15 text-[#C1AC84] border-[#A8885C]/30',
    ring:   'ring-[#C1AC84]/30',
    bar:    'from-[#C1AC84] to-[#66C7E9]',
    accent: '#C1AC84',
  },
}

// ── Horizontal card (Club Director — row 1) ────────────────────
export function BoardCardHorizontal({ member, index }) {
  const s = roleStyles[member.role]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center sm:items-stretch group cursor-default"
    >
      {/* Accent bar */}
      <div className={`w-full sm:w-1.5 h-1.5 sm:h-auto bg-gradient-to-b ${s.bar} flex-shrink-0`} />

      {/* Photo */}
      <div className="flex-shrink-0 p-6 sm:pl-8 sm:pr-0 flex items-center justify-center">
        <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full ring-2 ${s.ring} shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-[#f0f0f0]`}>
          {member.photo
            ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
            : <div className={`w-full h-full bg-gradient-to-br ${s.bar} flex items-center justify-center`}>
                <span className="font-display font-bold text-[#0D0D1A] text-3xl">{member.initials}</span>
              </div>
          }
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 px-6 sm:px-10 py-7 flex flex-col justify-center text-center sm:text-left">
        <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border mb-3 tracking-widest uppercase font-display inline-block w-fit mx-auto sm:mx-0 ${s.badge}`}>
          {member.role}
        </span>
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-1">{member.name}</h3>
        <p className="text-[#66C7E9] text-sm font-medium mb-0.5">{member.title}</p>
        <p className="text-slate-500 text-xs mb-4">{member.department}</p>
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A8885C] to-transparent mb-4 mx-auto sm:mx-0" />
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{member.bio}</p>
      </div>
    </motion.div>
  )
}

// ── Vertical card (Secretary & Manager — row 2) ────────────────
export default function BoardCard({ member, index }) {
  const s = roleStyles[member.role]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col items-center text-center group cursor-default"
    >
      {/* Top accent bar */}
      <div className={`w-full h-1 bg-gradient-to-r ${s.bar}`} />

      <div className="px-8 py-8 flex flex-col items-center w-full">
        {/* Photo */}
        <div className={`relative w-36 h-36 rounded-full ring-2 ${s.ring} shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-[#f0f0f0] mb-5`}>
          {member.photo
            ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
            : <div className={`w-full h-full bg-gradient-to-br ${s.bar} flex items-center justify-center`}>
                <span className="font-display font-bold text-[#0D0D1A] text-2xl">{member.initials}</span>
              </div>
          }
        </div>

        <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border mb-3 tracking-widest uppercase font-display ${s.badge}`}>
          {member.role}
        </span>
        <h3 className="font-display font-bold text-xl text-white mb-1">{member.name}</h3>
        <p className="text-[#66C7E9] text-sm font-medium mb-0.5">{member.title}</p>
        <p className="text-slate-500 text-xs mb-4">{member.department}</p>
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[#A8885C] to-transparent mb-4" />
        <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  )
}
