import React from 'react';
import {  Check, CircleDollarSign} from 'lucide-react';
import { motion } from 'framer-motion';

const Card = ({ children, highlighted = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.05, rotate: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
    className="relative cursor-pointer"
  >
    <div
      className={`absolute inset-0 rounded-2xl blur-3xl opacity-20 transition-all duration-500 ${
        highlighted
          ? 'bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-400'
          : 'bg-gradient-to-tr from-blue-200 via-green-200 to-teal-200'
      }`}
    />
    <div
      className={`relative rounded-2xl border p-6 transition-all duration-300 ${
        highlighted
          ? 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] scale-[1.02] shadow-xl'
          : 'border-black/[0.08] dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/10 bg-white dark:bg-black'
      }`}
    >
      {children}
    </div>
  </motion.div>
);

const Pricing = () => {
  const packages = [
    {
      name: 'City Package',
      price: 'Custom Quote',
      description: 'For municipal offices and city operations',
      features: [
        'Custom dashboards for city management',
        'Priority government support',
        'Data analytics & reports',
        'Integration with existing systems',
      ],
      cta: 'Request a Quote',
      highlighted: true,
    },
    {
      name: 'University Package',
      price: 'Custom Quote',
      description: 'For deans and educational institutions',
      features: [
        'Campus-wide software integration',
        'Faculty & student dashboards',
        'Dedicated support & training',
        'Custom modules per department',
      ],
      cta: 'Request a Quote',
      highlighted: false,
    },
    {
      name: 'Enterprise Package',
      price: 'Custom Quote',
      description: 'For CEOs and corporate clients',
      features: [
        'Full-suite automation & analytics',
        'Dedicated account manager',
        'Custom workflow integrations',
        'Priority enterprise support',
      ],
      cta: 'Request a Quote',
      highlighted: false,
    },
  ];

  return (
<div className="relative min-h-screen flex items-center" id="pricing">
  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('/images/bg4.jpeg')] bg-cover  bg-no-repeat dark:bg-black" />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

  {/* Content goes here */}
     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 mx-auto"
        >
          <span className="text-sm font-medium text-white/90">Pricings</span>
          <CircleDollarSign className="text-green-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Our Service Packages
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            Custom software solutions designed for city offices, universities, and enterprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.name} highlighted={pkg.highlighted}>
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full blur-[2px]" />
                    <div className="relative px-4 py-1.5 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-sm rounded-full border border-black/10 dark:border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-1 h-1 rounded-full bg-black/60 dark:bg-white/60 animate-pulse" />
                        <span className="text-xs font-medium text-black/80 dark:text-white/80">
                          Most Popular
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-medium text-black dark:text-white mb-2">{pkg.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{pkg.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-black/30 dark:text-white/30" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-colors">
                {pkg.cta}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
