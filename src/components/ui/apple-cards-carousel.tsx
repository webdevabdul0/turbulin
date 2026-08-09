import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/use-outside-click';

export type Card = {
  src?: string;
  background?: string;
  title: string;
  category: string;
  description: string;
  content?: React.ReactNode;
};

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({ onCardClose: () => {}, currentIndex: 0 });

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  // Auto-scroll every 3.5s, loops back to start
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isPausedRef.current || !carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const atEnd = scrollLeft >= scrollWidth - clientWidth - 2;
      if (atEnd) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    isPausedRef.current = true;
    carouselRef.current?.scrollBy({ left: -336, behavior: 'smooth' });
    setTimeout(() => { isPausedRef.current = false; }, 5000);
  };
  const scrollRight = () => {
    isPausedRef.current = true;
    carouselRef.current?.scrollBy({ left: 336, behavior: 'smooth' });
    setTimeout(() => { isPausedRef.current = false; }, 5000);
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: (320 + 16) * index, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div
        className="relative w-full"
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
      >
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-8"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row gap-4 px-6 lg:px-10">
            {items}
          </div>
        </div>

        {/* Nav arrows */}
        <div className="flex justify-end gap-2 px-6 lg:px-10 pb-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-30"
            style={{ background: 'var(--bg-light-3)', border: '1px solid var(--border-light)' }}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-4 w-4" style={{ color: 'var(--text-on-light)' }} />
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all disabled:opacity-30"
            style={{ background: 'var(--bg-light-3)', border: '1px solid var(--border-light)' }}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-4 w-4" style={{ color: 'var(--text-on-light)' }} />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }: { card: Card; index: number }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.body.style.overflow = open ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); onCardClose(index); };

  return (
    <>
      {/* Expanded overlay */}
      {open && (
        <div className="fixed inset-0 z-50 h-screen overflow-auto">
          <div
            className="fixed inset-0 h-full w-full bg-black/20 backdrop-blur-sm"
            onClick={handleClose}
          />
          <div
            ref={containerRef}
            className="relative z-[60] mx-auto my-10 h-fit max-w-2xl rounded-3xl p-8 md:p-10"
            style={{
              backgroundColor: 'var(--bg-light)',
              border: '1px solid var(--border-light)',
              fontFamily: 'var(--font)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.12)',
            }}
          >
            <button
              className="ml-auto mb-6 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{ background: 'var(--bg-light-3)', border: '1px solid var(--border-light)' }}
              onClick={handleClose}
            >
              <X className="h-4 w-4" style={{ color: 'var(--text-on-light)' }} />
            </button>
            <p className="text-[11px] font-light tracking-[0.2em] uppercase mb-3" style={{ color: '#FF8D00' }}>
              {card.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-normal leading-tight tracking-tight mb-5" style={{ color: 'var(--text-on-light)', fontFamily: 'var(--font)' }}>
              {card.title}
            </h3>
            <p className="text-sm font-normal leading-relaxed mb-8" style={{ color: 'var(--text-muted-on-light)', fontFamily: 'var(--font)' }}>
              {card.description}
            </p>
            {/* Image placeholder */}
            <div
              className="w-full h-56 rounded-2xl flex items-center justify-center"
              style={{ background: card.background ?? 'linear-gradient(135deg, #f6f6f6, #efefef)', border: '1px solid var(--border-light)' }}
            >
              {card.src ? (
                <img src={card.src} alt={card.title} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-subtle-on-light)' }}>Image coming soon</span>
              )}
            </div>
            {card.content && <div className="mt-8">{card.content}</div>}
          </div>
        </div>
      )}

      {/* Card thumbnail — full bleed, portrait, Aceternity style */}
      <div
        onClick={handleOpen}
        className="relative overflow-hidden rounded-3xl cursor-pointer group"
        style={{
          width: '26rem',
          height: '42rem',
          flexShrink: 0,
          fontFamily: 'var(--font)',
        }}
      >
        {/* Full-bleed background */}
        {card.src ? (
          <img
            src={card.src}
            alt={card.title}
            className="absolute inset-0 z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: card.background ?? 'linear-gradient(160deg, #1a0a00, #3d1500)' }}
          />
        )}

        {/* Base dark overlay across entire card */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Top gradient overlay — for text readability */}
        <div className="absolute inset-x-0 top-0 z-10 h-2/3 bg-gradient-to-b from-black/75 via-black/30 to-transparent" />

        {/* Bottom gradient overlay — for description */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Top content — category + title */}
        <div className="absolute top-0 left-0 right-0 z-20 p-7">
          <p className="text-xs font-light tracking-[0.2em] uppercase mb-3 text-white/70">
            {card.category}
          </p>
          <h3 className="text-3xl font-semibold leading-snug text-white max-w-[18rem]">
            {card.title}
          </h3>
        </div>

        {/* Bottom content — description + learn more */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-7 space-y-3">
          <p className="text-base font-medium leading-relaxed text-white/80 line-clamp-3">
            {card.description}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-light tracking-[0.15em] uppercase text-white/50 group-hover:text-[#FF8D00] transition-colors duration-300">
            Learn more →
          </span>
        </div>
      </div>
    </>
  );
};
