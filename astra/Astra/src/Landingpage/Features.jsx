import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-2xl border bg-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export function Features() {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden text-center" id="features">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/bg2.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Heading */}
      <div className="relative z-10 mb-16">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 mx-auto">
          <span className="text-sm font-medium text-white/90">Features</span>
          <Sparkles className="text-yellow-500"/>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
          Elevate Your Safety <br />
          <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            With ASTRA
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Intelligent AI-powered reporting platform to keep your cities, workplaces, and campuses secure.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-6">
          
          {/* Card 1 */}
         <Card className="group col-span-full lg:col-span-2 hover:-translate-y-2 bg-gray-900/40 backdrop-blur-xl border-gray-700">
  <CardContent className="text-center">
    <img src="/images/eyes.gif" className="mx-auto h-64 mb-6" alt="Anonymous Reporting"/>
    <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
      No Identity Revealed
    </h2>
    <p className="text-gray-300 mt-2">
      Report fearlessly without exposing yourself.
    </p>
  </CardContent>
</Card>


          {/* Card 2 */}
          <Card className="group col-span-full sm:col-span-3 lg:col-span-2 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
            <CardContent className="text-center">
              <video 
                src="/Video/Radar.mp4" 
                muted autoPlay loop playsInline
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                Secure by Default
              </h2>
              <p className="text-gray-600 mt-2">Real-time AI reporting with enterprise-grade security.</p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="group col-span-full sm:col-span-3 lg:col-span-2 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <CardContent className="text-center">
              <video 
                src="/Video/increment.mp4" 
                muted autoPlay loop playsInline
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                Realtime Progress Tracking
              </h2>
              <p className="text-gray-600 mt-2">Monitor report updates instantly.</p>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="group col-span-full lg:col-span-3 hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
            <CardContent className="text-center">
              <img src="/images/ai.gif" className="mx-auto h-42  mb-6 rounded-md" alt="AI Powered"/>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                Powered by LLMs
              </h2>
              <p className="text-gray-600 mt-2">AI categorizes & routes reports efficiently.</p>
            </CardContent>
          </Card>

          {/* Card 5 */}
          <Card className="group col-span-full lg:col-span-3 hover:-translate-y-2 bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200">
            <CardContent className="text-center">
              <video 
                src="/Video/crown.mp4" 
                muted autoPlay loop playsInline
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                One of a Kind Platform
              </h2>
              <p className="text-gray-600 mt-2">Astra is a revolutionary platform.</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
