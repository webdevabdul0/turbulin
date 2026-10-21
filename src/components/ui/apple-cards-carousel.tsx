import React, { useEffect, useRef, useState, createContext } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Card = {
  src?: string;
  background?: string;
  /** Service accent colour — tints the card, label, link and hover shadow. */
  accent?: string;
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
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-[var(--bg-light-3)] disabled:opacity-30"
            style={{ background: 'var(--bg-light)', border: '1px solid var(--border-light)' }}
            aria-label="Previous service"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-4 w-4" style={{ color: 'var(--text-on-light)' }} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-[var(--bg-light-3)] disabled:opacity-30"
            style={{ background: 'var(--bg-light)', border: '1px solid var(--border-light)' }}
            aria-label="Next service"
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

// Display-only card: white panel, big title, glass render bleeding off the bottom (not clickable)
export const Card = ({ card }: { card: Card; index: number }) => (
  <div
    className="service-card relative overflow-hidden rounded-3xl flex flex-col bg-white"
    style={{ width: '24rem', height: '36rem', flexShrink: 0, fontFamily: 'var(--font)' }}
  >
    <div className="relative z-10 p-8 pb-0">
      <h3 className="text-[32px] font-normal leading-[1.1] tracking-tight" style={{ color: 'var(--text-on-light)' }}>
        {card.title}
      </h3>
      <p className="mt-4 text-[16px] font-normal leading-relaxed" style={{ color: 'var(--text-muted-on-light)' }}>
        {card.description}
      </p>
    </div>

    {/* Glass render anchored to the bottom edge, cropped by the card */}
    {card.src && (
      <div className="relative mt-auto h-[58%] flex items-center justify-center">
        <img
          src={card.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ transform: 'translateX(4%)' }}
          className="service-card-render relative w-[92%] max-w-none h-auto mix-blend-multiply"
        />
      </div>
    )}
  </div>
);
