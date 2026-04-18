import React from "react";
import SectionTitle from "../home/Section_title";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    id: 1,
    title: "Starter Plan",
    description: "Perfect for small business and personal use",
    price: "$19",
    buttonText: "Get Started",
    features: [
      "Create up to 10 free projects",
      "Get 10 AI tasks monthly",
      "Generate simple AI text content",
      "Access a basic chatbot tool",
      "Receive email-based support only",
    ],
  },
  {
    id: 2,
    title: "Pro Plan",
    description: "Perfect for medium business and personal use",
    price: "$49",
    mostPopular: true,
    buttonText: "Upgrade Now",
    features: [
      "Enjoy unlimited AI task usage",
      "Integrate API for smooth workflow",
      "Create text and image outputs",
      "Get priority chat and email help",
      "View detailed analytics and reports",
    ],
  },
  {
    id: 3,
    title: "Custom Plan",
    description: "Perfect for organizations and personal use",
    price: "$149",
    buttonText: "Contact Sales",
    features: [
      "Build fully customized AI models",
      "Manage teams with shared access",
      "Get a dedicated account manager",
      "Integrate private APIs securely",
      "Guaranteed uptime with SLA support",
    ],
  },
];

const Pricing_section = () => {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center py-4"
    >
      <SectionTitle
        title="Our Pricing Plan"
        description="Our pricing plans are affordable and flexible, catering to all budgets. Choose what fits you best."
      />

      <div className="mt-12 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((item) => (
          <div key={item.id} className="group w-full">
            <div
              className={`rounded-2xl border p-6 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md ${
                item.mostPopular
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-200 bg-white"
              }`}
            >
              {item.mostPopular && (
                <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p
                className={`mt-1 text-sm ${
                  item.mostPopular ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {item.description}
              </p>

              <p className="mt-5 text-3xl font-semibold">
                {item.price}{" "}
                <span
                  className={`text-sm font-normal ${
                    item.mostPopular ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  /month
                </span>
              </p>

              <button
                className={`mt-5 h-10 w-full rounded-xl text-sm font-medium transition ${
                  item.mostPopular
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {item.buttonText}
              </button>
            </div>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-5 py-3">
              {item.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 border-b border-slate-100 py-2.5 text-sm text-slate-700 last:border-b-0"
                >
                  <div
                    className={`mt-0.5 rounded-full p-1 ${
                      item.mostPopular ? "bg-slate-800" : "bg-slate-700"
                    }`}
                  >
                    <CheckIcon className="size-3 text-white" strokeWidth={2.5} />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing_section;