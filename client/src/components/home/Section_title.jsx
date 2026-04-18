import React from 'react'

const SectionTitle = ({ title, description }) => {
  return (
    <div className='mt-16 flex flex-col items-center justify-center md:mt-24 lg:mt-28'>
      <h3 className='text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl'>
        {title}
      </h3>

      <p className='mt-3 max-w-xs text-center text-sm leading-relaxed text-slate-500 md:max-w-2xl md:text-base'>
        {description}
      </p>
    </div>
  )
}

export default SectionTitle
