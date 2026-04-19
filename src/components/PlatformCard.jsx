import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function PlatformCard({ platform, index, recommended }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
        recommended
          ? 'border-[#D4AF5A]/60 bg-gradient-to-br from-[#D4AF5A]/10 to-[#B8973A]/5 shadow-lg shadow-[#B8973A]/10'
          : 'border-[#B8973A]/20 bg-[#1A1A2E]/60 hover:border-[#B8973A]/40'
      }`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#D4AF5A] to-[#B8973A] text-[#0D0D1A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${
          recommended ? 'bg-[#D4AF5A]/20' : 'bg-[#1A1A2E]'
        }`}>
          {platform.icon}
        </div>
        <div>
          <h3 className="font-display font-semibold text-white text-base">{platform.name}</h3>
          <p className="text-slate-500 text-xs">{platform.subtitle}</p>
        </div>
      </div>

      <ul className="space-y-2">
        {platform.features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <FaCheckCircle className="text-[#D4AF5A] mt-0.5 shrink-0" size={13} />
            {feat}
          </li>
        ))}
      </ul>

      {platform.note && (
        <p className="mt-4 text-[#6EC6E6] text-xs border-t border-[#6EC6E6]/20 pt-3">{platform.note}</p>
      )}
    </motion.div>
  )
}
