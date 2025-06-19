import React, { useState } from "react";
import logo from "../assets/logo.svg";

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
    <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const AnimatedBg = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Animated gradient blobs */}
    <div className="absolute top-[-15%] left-[-10%] w-[120vw] h-[120vw] bg-gradient-to-br from-pink-200 via-blue-200 to-yellow-100 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-tr from-yellow-200 via-pink-100 to-blue-100 rounded-full blur-2xl opacity-60 animate-pulse-slower" />
    {/* Animated hearts and stars */}
    <div className="absolute left-10 top-1/3 animate-float-slow">
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><path d="M18 32s-9.5-7.5-13-12C1.5 15 3 9 9 9c3.5 0 5.5 2.5 6.5 4C16.5 11.5 18.5 9 22 9c6 0 7.5 6 4 11-3.5 4.5-13 12-13 12z" fill="#f472b6"/></svg>
    </div>
    <div className="absolute right-10 top-1/4 animate-float">
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M16 2l3.09 6.26L26 9.27l-5 4.87L22.18 22 16 18.27 9.82 22 11 14.14l-5-4.87 6.91-1.01L16 2z" fill="#fbbf24"/></svg>
    </div>
    <div className="absolute left-1/4 bottom-10 animate-float-reverse">
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M14 25s-7.5-6-10-9.5C2 13 3.5 8 8 8c2.5 0 4 1.5 5 3 1-1.5 2.5-3 5-3 4.5 0 6 5 4 7.5-2.5 3.5-10 9.5-10 9.5z" fill="#f472b6"/></svg>
    </div>
    <div className="absolute right-1/3 bottom-16 animate-float-slower">
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.47 5.01L20 7.27l-4 3.87L16.18 18 12 15.27 7.82 18 9 11.14l-4-3.87 5.53-.26L12 2z" fill="#fbbf24"/></svg>
    </div>
    <style>{`
      @keyframes pulse-slow { 0%,100%{opacity:.7} 50%{opacity:1} }
      .animate-pulse-slow { animation: pulse-slow 4s infinite alternate; }
      @keyframes pulse-slower { 0%,100%{opacity:.6} 50%{opacity:.9} }
      .animate-pulse-slower { animation: pulse-slower 7s infinite alternate; }
      @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-16px)} 100%{transform:translateY(0)} }
      .animate-float { animation: float 5s ease-in-out infinite; }
      .animate-float-slow { animation: float 8s ease-in-out infinite; }
      .animate-float-slower { animation: float 12s ease-in-out infinite; }
      .animate-float-reverse { animation: float 7s ease-in-out infinite reverse; }
      @keyframes border-anim { 0%{background-position:0% 50%} 100%{background-position:100% 50%} }
      .animate-border-gradient { background-size: 200% 200%; animation: border-anim 6s linear infinite; }
      @keyframes ribbon-slide { 0%{transform:translateY(-20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
      .animate-ribbon { animation: ribbon-slide 1.2s cubic-bezier(.4,0,.2,1) forwards; }
    `}</style>
  </div>
);

const Footer = () => (
  <footer className="mt-10 text-xs text-gray-400 flex flex-col items-center gap-1">
    <div className="flex gap-4">
      <a href="#about" className="hover:underline">About</a>
      <a href="#privacy" className="hover:underline">Privacy</a>
      <a href="https://github.com/StableSwipe" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
    </div>
    <div>© {new Date().getFullYear()} StableSwipe</div>
  </footer>
);

const testimonials = [
  {
    quote: "I met my co-founder and my soulmate on StableSwipe. Web3 dating is the future!",
    name: "@cryptoqueen"
  },
  {
    quote: "No more fake profiles or data leaks. I feel safe and in control.",
    name: "@sui4love"
  },
  {
    quote: "The UI is so smooth and the on-chain tips are a fun touch!",
    name: "@defi_dater"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[idx];
  return (
    <div className="mt-8 w-full max-w-sm mx-auto text-center">
      <div className="bg-white/80 rounded-xl shadow p-4 border border-pink-100 transition-all duration-500">
        <div className="text-pink-500 text-lg font-semibold mb-2">“{t.quote}”</div>
        <div className="text-xs text-gray-400">{t.name}</div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<{ onZkLogin: () => void; loading?: boolean }> = ({ onZkLogin, loading }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-yellow-50 px-4 relative overflow-hidden">
    <AnimatedBg />
    {loading && <Spinner />}
    {/* Animated tagline ribbon */}
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 animate-ribbon">
      <div className="bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 px-6 py-1 rounded-full shadow text-white font-bold text-sm tracking-wide flex items-center gap-2">
        <span className="animate-bounce">✨</span> 100% On-Chain, 100% Yours <span className="animate-bounce">✨</span>
      </div>
    </div>
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-md mx-auto">
        {/* Glassmorphism card with animated border */}
        <div className="bg-white/80 rounded-3xl shadow-2xl p-10 border-4 animate-border-gradient border-transparent bg-clip-padding backdrop-blur-lg relative z-10"
          style={{
            borderImage: 'linear-gradient(90deg, #f472b6, #fbbf24, #60a5fa, #f472b6) 1',
            backgroundOrigin: 'border-box',
            boxShadow: '0 8px 32px 0 rgba(255, 0, 128, 0.12)'
          }}
        >
          <img src={logo} alt="StableSwipe Logo" className="w-28 h-28 mb-4 drop-shadow-xl animate-float-slow mx-auto" />
          <h1 className="text-5xl font-extrabold text-pink-600 mb-2 tracking-tight text-center font-sans" style={{fontFamily:'Poppins, Inter, sans-serif'}}>StableSwipe</h1>
          <h2 className="text-xl font-semibold text-blue-500 mb-2 text-center">Find Love. Own Your Data. Swipe On-Chain. <span className='inline-block animate-bounce'>💖</span></h2>
          <p className="text-gray-600 text-center mb-6">The next generation of private, transparent, and rewarding dating—powered by zkLogin & Sui Blockchain. <span className="text-pink-400 font-bold">No catfish. No data selling. Just real connections.</span></p>
          <button
            onClick={onZkLogin}
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-60 disabled:cursor-not-allowed mb-2 animate-pulse"
          >
            {loading ? "Signing in..." : "Sign in with Google (zkLogin)"}
          </button>
          <div className="text-xs text-gray-400 mt-2">Powered by zkLogin & Sui Blockchain</div>
        </div>
      </div>
      <TestimonialCarousel />
    </div>
    <Footer />
  </div>
);

export default LandingPage;
