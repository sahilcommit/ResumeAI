import React from 'react'
import SectionTitle from '../home/Section_title'
import { SparklesIcon, FileTextIcon, DownloadIcon } from 'lucide-react'

// keeping this outside so it doesn’t recreate on every render
const steps = [
  {
    id: 1,
    title: 'Enter Your Details',
    description: 'Add your experience, skills, and job role you’re targeting.',
    icon: FileTextIcon,
  },
  {
    id: 2,
    title: 'AI Generates Your Resume',
    description: 'Our AI instantly creates a professional, job-ready resume tailored to you.',
    icon: SparklesIcon,
  },
  {
    id: 3,
    title: 'Download & Apply',
    description: 'Export your resume and start applying to jobs with confidence.',
    icon: DownloadIcon,
  },
]

const How_it_works = () => {
  return (
    <div id="features">
      <section className='flex flex-col items-center justify-center py-12'>
        <SectionTitle 
          title='How It Works' 
          description='Create a professional resume in minutes with the power of AI.' 
        />

        <div className='mt-12 grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {steps.map((item, index) => (
            <div 
              key={item.id} 
              className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
            >
              <div className='relative flex h-full flex-col'>
                <div className='mb-4 inline-flex w-fit rounded-xl bg-slate-900 p-2.5'>
                  <item.icon className='size-5 text-white' />
                </div>

                <span className='absolute right-0 top-0 text-xs font-medium text-slate-400'>
                  0{index + 1}
                </span>

                <h3 className='text-base font-semibold text-slate-900'>{item.title}</h3>

                <p className='mt-2 text-sm leading-relaxed text-slate-500'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default How_it_works