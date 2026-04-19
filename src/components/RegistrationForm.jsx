import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { HiOutlineUser, HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding } from 'react-icons/hi'
import { MdOutlineLocalHospital } from 'react-icons/md'

// ── Country codes (Gulf + common) ─────────────────────────────
const countryCodes = [
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan' },
  { code: '+63',  flag: '🇵🇭', name: 'Philippines' },
  { code: '+44',  flag: '🇬🇧', name: 'UK' },
  { code: '+1',   flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+90',  flag: '🇹🇷', name: 'Turkey' },
  { code: '+98',  flag: '🇮🇷', name: 'Iran' },
]

// ── Medical specialties (comprehensive) ──────────────────────
const specialties = [
  // Cardiology
  'Cardiology',
  'Interventional Cardiology',
  'Electrophysiology',
  'Heart Failure & Transplant',
  'Cardiac Imaging',
  'Preventive Cardiology',
  'Cardiac Surgery',
  'Vascular Surgery',
  // Internal Medicine
  'Internal Medicine',
  'Endocrinology & Diabetes',
  'Nephrology',
  'Pulmonology & Respiratory',
  'Gastroenterology',
  'Rheumatology',
  'Hematology',
  'Oncology',
  'Infectious Diseases',
  // Emergency & Critical Care
  'Emergency Medicine',
  'Critical Care / ICU',
  'Anesthesiology',
  // Other Clinical
  'General Surgery',
  'Neurology',
  'Neurosurgery',
  'Orthopedics',
  'Urology',
  'Ophthalmology',
  'ENT (Otolaryngology)',
  'Dermatology',
  'Psychiatry',
  'Obstetrics & Gynecology',
  'Pediatrics',
  'Pediatric Cardiology',
  'Radiology & Imaging',
  'Nuclear Medicine',
  'Pathology',
  'Family & Community Medicine',
  'General Practice',
  // Allied Health
  'Nursing',
  'Clinical Pharmacy',
  'Physiotherapy',
  'Dietetics & Nutrition',
  'Medical Laboratory',
  'Biomedical Engineering',
  // Academia
  'Medical Student',
  'Research / Academia',
  'Healthcare Administration',
  'Other',
]

const GAS_URL = import.meta.env.VITE_GAS_URL

export default function RegistrationForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})
  const [countryCode, setCountryCode] = useState('+971')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    specialty: '',
    hospital: '',
  })

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required'
    if (!form.specialty) e.specialty = 'Please select your specialty'
    if (!form.hospital.trim()) e.hospital = 'Hospital / institution is required'
    return e
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')

    const payload = {
      fullName:  form.fullName.trim(),
      email:     form.email.trim(),
      phone:     `${countryCode} ${form.phoneNumber.trim()}`,
      specialty: form.specialty,
      hospital:  form.hospital.trim(),
    }

    try {
      // URLSearchParams → GAS reads via e.parameter (no CORS preflight)
      const body = new URLSearchParams(payload)
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      setStatus('success')
      setForm({ fullName: '', email: '', phoneNumber: '', specialty: '', hospital: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full bg-[#0D0D1A]/80 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-1'
  const inputOk = 'border-[#A8885C]/30 focus:border-[#A8885C] focus:ring-[#A8885C]/20'
  const inputErr = 'border-red-500/60 focus:border-red-500 focus:ring-red-500/25'
  const cls = (f) => `${inputBase} ${errors[f] ? inputErr : inputOk}`

  // ── Success overlay ────────────────────────────────────────
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-[#A8885C]/15 border border-[#A8885C]/40 flex items-center justify-center mb-5">
          <FiCheck className="text-[#C1AC84] text-4xl" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-2">You're Registered!</h3>
        <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-6">
          Thank you for registering. Your details have been recorded and our team will be in touch shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline-gold px-6 py-2.5 rounded-xl text-sm font-display tracking-wide"
        >
          Register Another
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Full Name */}
      <div>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 ml-0.5 font-medium">
          <HiOutlineUser className="text-[#C1AC84]" /> Full Name <span className="text-[#C1AC84]">*</span>
        </label>
        <input
          value={form.fullName}
          onChange={e => handleChange('fullName', e.target.value)}
          placeholder="Dr. Ahmed Al Rashid"
          className={cls('fullName')}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 ml-0.5 font-medium">
          <HiOutlineMail className="text-[#C1AC84]" /> Email Address <span className="text-[#C1AC84]">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="doctor@hospital.ae"
          className={cls('email')}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>}
      </div>

      {/* Phone with country code */}
      <div>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 ml-0.5 font-medium">
          <HiOutlinePhone className="text-[#C1AC84]" /> Phone Number <span className="text-[#C1AC84]">*</span>
        </label>
        <div className="flex gap-2">
          {/* Country code picker */}
          <select
            value={countryCode}
            onChange={e => setCountryCode(e.target.value)}
            className="bg-[#0D0D1A]/80 border border-[#A8885C]/30 rounded-xl px-3 py-3.5 text-sm text-white outline-none focus:border-[#A8885C] focus:ring-1 focus:ring-[#A8885C]/20 w-36 shrink-0"
          >
            {countryCodes.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          {/* Number input */}
          <input
            value={form.phoneNumber}
            onChange={e => handleChange('phoneNumber', e.target.value.replace(/\D/g, ''))}
            placeholder="50 123 4567"
            className={`${cls('phoneNumber')} flex-1`}
            inputMode="numeric"
          />
        </div>
        {errors.phoneNumber && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.phoneNumber}</p>}
      </div>

      {/* Medical Specialty */}
      <div>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 ml-0.5 font-medium">
          <MdOutlineLocalHospital className="text-[#C1AC84]" /> Medical Specialty <span className="text-[#C1AC84]">*</span>
        </label>
        <select
          value={form.specialty}
          onChange={e => handleChange('specialty', e.target.value)}
          className={cls('specialty')}
        >
          <option value="" disabled>Select your specialty</option>
          {specialties.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.specialty && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.specialty}</p>}
      </div>

      {/* Hospital */}
      <div>
        <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 ml-0.5 font-medium">
          <HiOutlineOfficeBuilding className="text-[#C1AC84]" /> Hospital / Institution <span className="text-[#C1AC84]">*</span>
        </label>
        <input
          value={form.hospital}
          onChange={e => handleChange('hospital', e.target.value)}
          placeholder="Al Qassimi Hospital, Sharjah"
          className={cls('hospital')}
        />
        {errors.hospital && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.hospital}</p>}
      </div>

      {/* Registration type — locked as Online Webinar */}
      <div className="flex items-center gap-3 bg-[#66C7E9]/5 border border-[#66C7E9]/20 rounded-xl px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-[#66C7E9] pulse-live shrink-0" />
        <div>
          <p className="text-[#66C7E9] text-xs font-semibold font-display tracking-wide">Online Webinar</p>
          <p className="text-slate-500 text-[11px]">Live via Zoom · All times UTC+4</p>
        </div>
        <span className="ml-auto text-[10px] bg-[#66C7E9]/15 text-[#66C7E9] px-2 py-0.5 rounded font-semibold">FREE</span>
      </div>

      {/* Error banner */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5 text-red-400 text-sm bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"
          >
            <FiAlertCircle className="shrink-0" />
            Submission failed. Please check your connection and try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-gold py-4 rounded-xl text-sm font-semibold font-display tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {status === 'loading' ? (
          <><FiLoader className="animate-spin" /> Submitting...</>
        ) : (
          'Complete Registration →'
        )}
      </button>

      <p className="text-center text-slate-600 text-[11px]">
        Your data is sent securely. No spam — ever.
      </p>
    </form>
  )
}
