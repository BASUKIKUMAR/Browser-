'use client';

import React, { useState, useEffect } from 'react';
import { Search, Shield, Info, MoreHorizontal, Plus, Settings, Bookmark, History, LayoutGrid, Clock, ChevronRight, Share2, Download, Zap, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [adsBlocked, setAdsBlocked] = useState(1420);
  const [timeSaved, setTimeSaved] = useState(18); // minutes
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [showSmartFeed, setShowSmartFeed] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Simulate background ad blocking
    const adTimer = setInterval(() => {
      if (isShieldActive) {
        setAdsBlocked(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(adTimer);
    };
  }, [isShieldActive]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    let url = searchQuery.trim();
    if (!url.startsWith('http')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        url = `https://search.brave.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    window.open(url, '_blank');
  };

  const handleNavClick = (section: string) => {
    switch (section) {
      case 'Apps':
        window.open('https://chrome.google.com/webstore', '_blank');
        break;
      case 'History':
        // Modern browsers usually don't allow opening internal pages via JS for security
        alert('History is a browser feature. Open it via Menu > History');
        break;
      case 'Bookmarks':
        alert('Manage your bookmarks in the browser menu.');
        break;
      default:
        break;
    }
  };

  const handleStatClick = (type: string) => {
    alert(`Privacy Insight: You have saved significant ${type} thanks to Brave's shields!`);
  };

  const bookmarks = [
    { name: 'YouTube', url: 'youtube.com', icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64' },
    { name: 'Github', url: 'github.com', icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' },
    { name: 'Gmail', url: 'gmail.com', icon: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=64' },
    { name: 'X', url: 'twitter.com', icon: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=64' },
    { name: 'Netflix', url: 'netflix.com', icon: 'https://www.google.com/s2/favicons?domain=netflix.com&sz=64' },
    { name: 'Reddit', url: 'reddit.com', icon: 'https://www.google.com/s2/favicons?domain=reddit.com&sz=64' },
    { name: 'ChatGPT', url: 'chat.openai.com', icon: 'https://www.google.com/s2/favicons?domain=openai.com&sz=64' },
    { name: 'Amazon', url: 'amazon.com', icon: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=64' },
  ];

  const news = [
    { title: "Brave's AI Leo gets a major upgrade", source: "Brave Blog", time: "2h ago", image: "https://picsum.photos/seed/tech/400/200" },
    { title: "How privacy-first browsing is changing the web", source: "The Verge", time: "5h ago", image: "https://picsum.photos/seed/web/400/200" },
    { title: "Yandex announces new sleek browser features", source: "TechCrunch", time: "8h ago", image: "https://picsum.photos/seed/design/400/200" },
    { title: "The rise of decentralized search engines", source: "Engadget", time: "12h ago", image: "https://picsum.photos/seed/crypto/400/200" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-orange-500/30">
      {/* Background Image (Yandex Style) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/dark-minimal/1920/1080" 
          alt="Background" 
          className="h-full w-full object-cover opacity-40 transition-opacity duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 flex h-16 items-center justify-between px-6 backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white fill-current" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Brave-X</span>
          </div>
          
          <div className="hidden h-5 w-[1px] bg-white/10 md:block" />
          
          <div className="hidden items-center gap-4 md:flex">
            <NavIcon 
              icon={<LayoutGrid size={20} />} 
              label="Apps" 
              onClick={() => handleNavClick('Apps')}
            />
            <NavIcon 
              icon={<History size={20} />} 
              label="History" 
              onClick={() => handleNavClick('History')}
            />
            <NavIcon 
              icon={<Bookmark size={20} />} 
              label="Bookmarks" 
              onClick={() => handleNavClick('Bookmarks')}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md md:flex">
            <Shield size={16} className={cn("transition-colors", isShieldActive ? "text-orange-500" : "text-white/40")} />
            <span className="text-xs font-medium text-white/80">{adsBlocked} ads blocked</span>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Bell size={20} />
          </button>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 shadow-xl cursor-pointer hover:border-orange-500 transition-colors">
            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-32">
        
        {/* Clock section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center min-h-[120px]"
        >
          {currentTime && (
            <>
              <h2 className="font-display text-7xl font-light tracking-tight opacity-90">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </h2>
              <p className="mt-2 text-sm font-medium tracking-widest text-white/40 uppercase">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </>
          )}
        </motion.div>

        {/* Search Bar Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="group relative w-full max-w-2xl px-4"
        >
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-orange-600/50 via-purple-600/50 to-orange-600/50 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />
          
          <form 
            onSubmit={handleSearch}
            className="relative flex h-16 w-full items-center gap-3 rounded-[2rem] border border-white/20 bg-black/40 px-6 backdrop-blur-2xl transition-all focus-within:bg-black/60 focus-within:border-white/30"
          >
            <Search className="text-white/40 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search or enter URL..."
              className="h-full w-full bg-transparent text-lg font-light outline-none placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <kbd className="hidden h-6 items-center rounded border border-white/20 bg-white/5 px-1.5 text-[10px] font-medium text-white/40 md:flex">↵</kbd>
              <div className="h-8 w-[1px] bg-white/10 mx-2" />
              <button 
                type="button"
                onClick={() => setIsShieldActive(!isShieldActive)}
                className={cn(
                  "p-2 rounded-full transition-all",
                  isShieldActive ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-white/5 text-white/40"
                )}
              >
                <Shield size={20} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Speed Dial / Bookmarks */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 md:grid-cols-4">
          {bookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => {
                const targetUrl = bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`;
                window.open(targetUrl, '_blank');
              }}
              className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-orange-600/10 active:scale-95"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/5 p-3 group-hover:scale-110 transition-all duration-300">
                <img src={bookmark.icon} alt={bookmark.name} className="h-full w-full object-contain brightness-110 grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white/70 group-hover:text-white transition-colors">{bookmark.name}</span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const name = prompt('Enter site name:');
              const url = prompt('Enter site URL:');
              if (name && url) {
                alert(`Added ${name} to your shortcuts! (Local only)`);
              }
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[2.5rem] border border-dashed border-white/20 bg-transparent p-8 hover:bg-white/5 transition-all group active:scale-95"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
              <Plus className="text-white/40 group-hover:text-white transition-colors" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white/40 group-hover:text-white/60 transition-colors">Add shortcuts</span>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16">
          <StatItem 
            label="Ads Blocked" 
            value={`${adsBlocked}+`} 
            icon={<Shield className="text-orange-500" size={18} />} 
            onClick={() => handleStatClick('privacy')}
          />
          <StatItem 
            label="Bandwidth Saved" 
            value="1.2 GB" 
            icon={<Zap className="text-purple-500" size={18} />} 
            onClick={() => handleStatClick('data')}
          />
          <StatItem 
            label="Time Saved" 
            value={`${timeSaved}m`} 
            icon={<Clock className="text-blue-500" size={18} />} 
            onClick={() => handleStatClick('time')}
          />
        </div>
      </main>

      {/* Floating Buttons - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-4">
        <button 
          onClick={() => window.open('https://brave.com/settings', '_blank')}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-2xl active:scale-95"
        >
          <Settings size={22} />
        </button>
        <button 
          onClick={() => window.open('https://brave.com/about', '_blank')}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-xl shadow-orange-600/30 hover:scale-110 hover:rotate-6 transition-all duration-300 active:scale-90"
        >
          <Info size={22} />
        </button>
      </div>

      {/* Footer / Smart Feed Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/30 z-20">
        <button 
          onClick={() => setShowSmartFeed(!showSmartFeed)}
          className="flex items-center gap-2 group cursor-pointer hover:text-white/60 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase">Smart Feed</span>
          <ChevronRight size={14} className={cn("transition-transform", showSmartFeed ? "rotate-90" : "group-hover:translate-x-1")} />
        </button>
      </div>

      {/* Smart Feed Modal/Panel */}
      <AnimatePresence>
        {showSmartFeed && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-3xl overflow-y-auto px-4 py-20"
          >
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-display text-4xl font-bold">Recommended for you</h2>
                <button 
                  onClick={() => setShowSmartFeed(false)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {news.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-orange-500/50 transition-all"
                    onClick={() => window.open('https://search.brave.com/news', '_blank')}
                  >
                    <div className="h-48 w-full relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-orange-600 text-[10px] font-bold uppercase tracking-wider">News</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-white/40">{item.source}</span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="text-[10px] font-medium text-white/30">{item.time}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-orange-500 transition-colors">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavIcon({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-center gap-1 active:scale-95 transition-transform"
    >
      <div className="text-white/60 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-tighter text-white/30 group-hover:text-white/60 transition-colors">
        {label}
      </span>
    </div>
  );
}

function StatItem({ label, value, icon, onClick }: { label: string, value: string, icon: React.ReactNode, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-display font-bold group-hover:text-orange-500 transition-colors">{value}</span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">{label}</span>
      </div>
    </div>
  );
}
