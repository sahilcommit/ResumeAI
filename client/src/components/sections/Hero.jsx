import React from 'react'
import { ArrowRightIcon, CheckIcon, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// keeping this outside so it doesn’t get recreated on every render
const specialFeatures = [
  { id: 1, text: 'AI-generated resumes in seconds' },
  { id: 2, text: 'ATS-friendly templates' },
  { id: 3, text: 'No design skills needed' }
]

const Hero = () => {
  const { user, token } = useSelector((state) => state.auth)
  const ctaTarget = user || token || localStorage.getItem("token")
    ? "/app"
    : "/login?state=register"

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center px-4 py-16 md:px-16 lg:px-24">

      {/* light background just to avoid a plain look (hidden on mobile for performance/clean UI) */}
      <svg 
        className='absolute inset-0 -z-10 size-full max-md:hidden' 
        viewBox='0 0 1440 720' 
        fill='none'
      >
        <circle cx='720' cy='360' r='300' stroke='rgba(0,0,0,0.04)' />
      </svg>

      {/* small announcement badge — not too loud, just informative */}
      <div className='mt-6 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-sm text-slate-700 shadow-sm'>
        <span>✨ AI-powered resume builder is live</span>
        <ChevronRight className='size-4' />
      </div>

      {/* main headline — this is the hook, keep it clear and outcome-focused */}
      <h1 className='mt-6 max-w-4xl bg-linear-to-r from-slate-900 to-slate-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl'>
        Build job-winning resumes with AI in seconds
      </h1>

      {/* supporting line — explains what the product actually does */}
      <p className='mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600 md:text-lg'>
        Generate, edit, and optimize your resume instantly.
        Stand out with AI suggestions and ATS-friendly formatting.
      </p>

      {/* primary + secondary actions */}
      <div className='mt-8 flex flex-wrap justify-center gap-4'>
        <Link 
          to={ctaTarget}
          className='flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800 md:text-base'
        >
          <span>Build My Resume</span>
          <ArrowRightIcon className='size-5' />
        </Link>

      </div>

      {/* quick trust signal — helps users feel it's actually used */}
      <p className='mt-6 text-sm text-slate-400'>
        Trusted by 10,000+ users
      </p>

      {/* feature highlights — short and scannable */}
      <div className='mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500'>
        {specialFeatures.map((feature) => (
          <p key={feature.id} className='flex items-center gap-2'>
            <CheckIcon className='size-5 text-slate-700' />
            {feature.text}
          </p>
        ))}
      </div>

    </section>
  )
}

export default Hero
