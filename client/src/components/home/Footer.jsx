import { Link } from 'react-router-dom'
import { FaDribbble, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer id='about-us' className='border-t border-slate-200 bg-white px-4 pt-16 text-slate-600 md:px-16 lg:px-24'>

      {/* top section — main footer content */}
      <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:gap-16'>
        
        {/* left side — logo + short intro */}
        <div className='flex-1'>
          
          <Link to="/">
            <img 
              src='/favicon.svg' 
              alt='logo' 
              className='h-10.5 w-auto' 
            />
          </Link>

          <p className='mt-5 max-w-sm text-sm leading-relaxed text-slate-500'>
            Build professional resumes faster using AI. Simple, clean, and designed to help you stand out.
          </p>

          <div className='mt-4 flex items-center gap-3 text-slate-400'>
            <span aria-label='Dribbble'>
              <FaDribbble className='size-5 transition hover:-translate-y-0.5' />
            </span>

            <span aria-label='Instagram'>
              <FaInstagram className='size-5 transition hover:-translate-y-0.5' />
            </span>

            <span aria-label='Twitter'>
              <FaTwitter className='size-5 transition hover:-translate-y-0.5' />
            </span>

            <span aria-label='LinkedIn'>
              <FaLinkedin className='size-5 transition hover:-translate-y-0.5' />
            </span>
          </div>

          <p className='mt-5 text-sm font-medium text-slate-500'>
            Developed by Sahil Hande
          </p>
        </div>

        <div className='flex flex-col gap-8 md:flex-1 md:flex-row md:gap-20'>
          <div className='flex flex-col'>
            <h2 className='mb-4 font-semibold text-slate-900'>Company</h2>

            <a href='#top' className='py-1.5 transition hover:text-slate-900'>Home</a>
            <a href='#features' className='py-1.5 transition hover:text-slate-900'>Features</a>
            <a href='#pricing' className='py-1.5 transition hover:text-slate-900'>Pricing</a>
            <a href='#faq' className='py-1.5 transition hover:text-slate-900'>FAQ</a>
          </div>

          <div>
            <h2 className='mb-4 font-semibold text-slate-900'>
              Subscribe to our newsletter
            </h2>

            <div className='max-w-xs space-y-4 text-sm'>
              
              <p>
                Get updates, tips, and new features straight to your inbox.
              </p>

              <form 
                onSubmit={(e) => e.preventDefault()} 
                className='flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5'
              >
                <input 
                  type='email' 
                  placeholder='Enter your email'
                  required
                  className='w-full rounded-lg bg-white px-2 py-2 text-slate-800 outline-none'
                />

                <button className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800'>
                  Subscribe
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>

      <div className='mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-4 md:flex-row'>
        
        <p className='text-center text-sm'>
          © 2026 ResumeAI. All rights reserved.
        </p>

        <div className='flex items-center gap-6 text-sm'>
          <a href='#about-us' className='transition hover:text-slate-900'>About</a>
          <a href='#faq' className='transition hover:text-slate-900'>Support</a>
          <a href='#top' className='transition hover:text-slate-900'>Back to Top</a>
        </div>

      </div>

    </footer>
  )
}

export default Footer
