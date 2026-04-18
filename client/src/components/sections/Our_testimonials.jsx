import SectionTitle from "../home/Section_title";
import React from "react";

const Our_testimonials = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      text: "The AI suggestions helped me rephrase my experience in a way that actually sounds professional. Highly recommend!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      text: "Finally, a resume builder that doesn't look like it's from 2005. The UI is sleek and the AI is actually smart.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
      text: "I went from 0 interviews to 3 in one week after using the ATS optimization feature here. Absolute game changer.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Sam Rivera",
      handle: "@sam_dev",
      text: "The background remover for my headshot worked perfectly. Saved me so much time in Photoshop!",
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="mx-3 w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <img
          className="size-12 rounded-xl object-cover ring-1 ring-slate-200"
          src={card.image}
          alt="User"
        />
        <div>
          <p className="text-sm font-semibold text-slate-900">{card.name}</p>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        "{card.text || "This platform changed my job hunt forever."}"
      </p>
    </div>
  );

  return (
    <section id="testimonials" className="overflow-hidden bg-slate-50 py-20">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          animation: marqueeScroll 40s linear infinite;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>

      <SectionTitle
        title="Success Stories"
        description="See how our AI is helping thousands of professionals land their dream roles."
      />

      <div className="mt-4 space-y-7">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-linear-to-r from-slate-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-linear-to-l from-slate-50 to-transparent"></div>

          <div className="marquee-inner flex w-max">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={`row1-${index}`} card={card} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-linear-to-r from-slate-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-linear-to-l from-slate-50 to-transparent"></div>

          <div className="marquee-inner marquee-reverse flex w-max">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={`row2-${index}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Our_testimonials;
