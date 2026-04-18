import React, { useState } from 'react'
import SectionTitle from '../home/Section_title'
import { MinusIcon, PlusIcon } from 'lucide-react'

// keeping data outside so it doesn’t recreate every render
const faqs = [
  {
    id: 1,
    question: 'Do I need coding or design experience to use this builder?',
    answer: "Basic understanding helps, but you can still use it without deep design knowledge.",
  },
  {
    id: 2,
    question: 'What does this resume builder actually do?',
    answer: 'It helps you generate, edit, and optimize resumes using AI with minimal effort.',
  },
  {
    id: 3,
    question: 'Can I use this in my existing workflow?',
    answer: 'Yes, you can export and use your resume anywhere you want.',
  },
  {
    id: 4,
    question: 'How customizable is the resume?',
    answer: 'You can edit content, structure, and choose different templates.',
  },
  {
    id: 5,
    question: 'Does it support collaboration?',
    answer: "Currently focused on individual use, team features may come later.",
  },
  {
    id: 6,
    question: 'Can I try it before paying?',
    answer: 'Yes, you can start for free and upgrade later if needed.',
  },
]

const Faq_section = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id='faq' className='flex flex-col items-center justify-center py-10'>
      <SectionTitle 
        title="FAQ's" 
        description="Quick answers to common questions about the product." 
      />

      <div className='mx-auto mt-12 w-full max-w-3xl space-y-3'>
        {faqs.map((item, index) => {
          const isActive = openIndex === index

          return (
            <div 
              key={item.id} 
              className='rounded-xl border border-slate-200 bg-white px-4 shadow-sm sm:px-5'
            >
              <button
                onClick={() => setOpenIndex(isActive ? null : index)}
                className='flex w-full items-start justify-between gap-4 py-4 text-left font-medium text-slate-800'
              >
                {item.question}

                {isActive ? (
                  <MinusIcon className='size-5 text-slate-500' />
                ) : (
                  <PlusIcon className='size-5 text-slate-500' />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-44 pb-4' : 'max-h-0'
                }`}
              >
                <p className='text-sm leading-relaxed text-slate-500'>
                  {item.answer}
                </p>
              </div>

            </div>
          )
        })}

      </div>

    </section>
  )
}

export default Faq_section
