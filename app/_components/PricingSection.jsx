"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, X, CreditCard } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "annual"
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const plans = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? 0 : 0,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      desc: "Perfect for exploring AI-generated course outline wizardry.",
      features: [
        "3 course generations per month",
        "Up to 5 chapters per course",
        "Standard generation speed",
        "Community forum access",
      ],
      cta: "Get started",
      featured: false,
      href: "/sign-up"
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? 12 : 99,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      desc: "Unlock the full power of AI-curated learning paths.",
      features: [
        "Unlimited course generation",
        "Up to 20 chapters per course",
        "High-priority generation speed",
        "Ad-free YouTube video sync",
        "Custom banner image uploads",
        "Priority AI request scheduling",
      ],
      cta: "Upgrade to Pro",
      featured: true,
      href: "/sign-up"
    },
    {
      name: "Enterprise",
      price: billingCycle === "monthly" ? 29 : 249,
      period: billingCycle === "monthly" ? "/ month" : "/ year",
      desc: "For institutions, organizations, and continuous learning teams.",
      features: [
        "Everything in Pro plan",
        "Collaborative shared workspaces",
        "Course export to PDF & Markdown",
        "Custom Gemini prompt personalization",
        "Dedicated API key access",
        "Dedicated support representative",
      ],
      cta: "Contact Sales",
      featured: false,
      href: "/sign-up"
    }
  ];

  const pricingRef = useRef(null);
  const isInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="pricing" className="bg-[#080808] py-20 px-4 md:px-8 border-t border-neutral-900 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
      <div className="max-w-[1000px] mx-auto">
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-semibold block text-center mb-3">
          Fair & Flexible Plans
        </span>
        <h2 className="text-2xl md:text-4xl font-medium text-center text-[#E1E0CC] mb-4 tracking-tight">
          Simple, transparent pricing.
        </h2>
        <p className="text-gray-400 text-center max-w-md mx-auto mb-10 text-xs sm:text-sm">
          Choose the learning tier that fits your educational needs. All plans feature automatic updates and AI improvements.
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`text-sm ${billingCycle === "monthly" ? "text-[#E1E0CC]" : "text-gray-500"} transition-colors duration-200`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            className="w-12 h-6 rounded-full bg-neutral-800 p-1 flex items-center relative transition-colors duration-300 focus:outline-none"
            aria-label="Toggle billing cycle"
          >
            <motion.div 
              className="w-4 h-4 rounded-full bg-primary"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                alignSelf: billingCycle === "monthly" ? "flex-start" : "flex-end",
                marginLeft: billingCycle === "monthly" ? "0" : "auto"
              }}
            />
          </button>
          <span className={`text-sm flex items-center gap-1.5 ${billingCycle === "annual" ? "text-[#E1E0CC]" : "text-gray-500"} transition-colors duration-200`}>
            Annually
            <span className="bg-primary/20 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          ref={pricingRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`rounded-2xl p-6 flex flex-col justify-between border relative transition-all duration-300 ${plan.featured
                ? "bg-[#151515] border-primary/50 shadow-lg shadow-primary/5"
                : "bg-[#101010] border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 bg-primary text-black font-semibold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-[#E1E0CC] mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 h-10">{plan.desc}</p>
                
                {/* Price block */}
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl md:text-4xl font-bold text-[#E1E0CC]">${plan.price}</span>
                  <span className="text-gray-400 text-xs">{plan.period}</span>
                </div>

                <hr className="border-neutral-800 mb-5" />

                {/* Features list */}
                <ul className="flex flex-col gap-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA Button */}
              {plan.name === "Starter" ? (
                <Link href={plan.href} className="block w-full mt-2">
                  <button
                    className="w-full py-2.5 rounded-full font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-neutral-700 text-[#E1E0CC] hover:bg-neutral-800 hover:border-neutral-600"
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              ) : (
                <div className="block w-full mt-2">
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className={`w-full py-2.5 rounded-full font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${plan.featured
                      ? "bg-primary text-black hover:bg-[#c9c6b3]"
                      : "border border-neutral-700 text-[#E1E0CC] hover:bg-neutral-800 hover:border-neutral-600"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Payment coming soon modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101010] border border-neutral-800 rounded-2xl max-w-sm w-full p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center text-[#E1E0CC]">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-[#E1E0CC] mb-3">
              Payment Coming Soon!
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              We are currently finalizing our secure Stripe checkout integration. Premium features will be available to purchase very soon!
              <br /><br />
              For now, feel free to use all the core workspace tools completely for free on our Starter plan.
            </p>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-primary text-black rounded-full py-2.5 text-xs font-semibold hover:bg-primary/95 transition-all cursor-pointer active:scale-95"
            >
              Okay, got it!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
