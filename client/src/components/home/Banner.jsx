import React, { useState } from 'react'
import { ArrowRightIcon, XIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Banner = () => {
  const [show, setShow] = useState(true)
  const { user, token } = useSelector((state) => state.auth)
  const ctaTarget = user || token || localStorage.getItem("token")
    ? "/app"
    : "/login?state=register"

  if (!show) return null

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center gap-3 bg-linear-to-b from-orange-500 to-orange-600 px-10 py-2.5 text-sm font-medium text-white">

        <p>Build your resume with AI — free to start 🚀</p>

        <Link
          to={ctaTarget}
          className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-orange-600 transition hover:bg-orange-50 active:scale-95"
        >
          Get Started
          <ArrowRightIcon className="size-3.5" />
        </Link>

        <button
          onClick={() => setShow(false)}
          className="absolute right-3 rounded-md p-1 text-white/90 transition hover:bg-white/15"
        >
          <XIcon className="size-4" />
        </button>

      </div>
    </div>
  )
}

export default Banner
