'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import PlayButton from '@/components/PlayButton';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-transparent overflow-x-auto overflow-y-hidden flex items-center pb-20"
    >
      <main className="flex flex-row gap-4 p-6 min-w-max max-h-[850px]">
        {/* Column 1: Header + Episodes */}
        <div className="flex flex-col gap-4 w-[400px] shrink-0">
          <Card className="p-8">
            <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-1">
              If not for…
            </h1>
            <p className="text-gray-500 italic">A gratitude project.</p>
          </Card>

          {/* Episode cards with play buttons */}
          <Card className="p-5">
            <PlayButton
              src="https://f004.backblazeb2.com/file/trees-audio/new-site/Novelist-Maine-001.mp3"
              title="Novelist, Maine"
            />
          </Card>

          <Card className="p-5">
            <PlayButton
              src="https://f004.backblazeb2.com/file/trees-audio/new-site/Painter-Colorado-001.mp3"
              title="Painter, Colorado"
            />
          </Card>

          <Card className="p-5">
            <PlayButton
              src="https://f004.backblazeb2.com/file/trees-audio/new-site/Sailor-BritishColumbia-001.mp3"
              title="Sailor, British Columbia"
            />
          </Card>
        </div>

        {/* Column 2: What is + What was special */}
        <div className="flex flex-col gap-4 w-[350px] shrink-0">
          <Card className="p-6 flex-1">
            <h3 className="font-medium text-gray-900 mb-3">What is 'If not for…'</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              It's a podcast I started that is really just an excuse to spend time
              finding and talking with people who remind me of my journalist dad and
              the 38 people he hosted, seven at a time, for dim sum brunches, 2,546
              Saturdays in a row, from 1966 to 2015.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Each guest talks, for no more than five minutes, about a single person
              who's had an indelibly positive effect on their life.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">What was special about your dad and those 38 people?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              They all possessed two specific character traits that you rarely find
              together in even one person — High intelligence and high, authentic
              humility.
            </p>
          </Card>
        </div>

        {/* Column 3: Why short + Dim sum */}
        <div className="flex flex-col gap-4 w-[350px] shrink-0">
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">Why are the episodes so short?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              When the podcast started, the episodes were much longer. But that
              turned out to be impractical, a lot to ask of each guest, and a
              barrier to hearing from as many people as possible.
            </p>
            <p className="text-xs text-gray-400 italic">
              [Earlier long-form interviews here]
            </p>
          </Card>

          <Card className="p-6 flex-1">
            <h3 className="font-medium text-gray-900 mb-3">Did you get to go to your dad's dim sum brunches?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              He started having me tag along in 1980, when I was eleven, right after
              he split with my mom. I'd never been around grown-ups who got along
              that well or laughed that much. Getting to be around those people is
              probably the most important thing that's ever happened to me.
            </p>
          </Card>
        </div>

        {/* Column 4: Only feature + Subscribe */}
        <div className="flex flex-col gap-4 w-[300px] shrink-0">
          <Card className="p-6 flex-1">
            <h3 className="font-medium text-gray-900 mb-3">Do you only feature folks who remind you of your dad?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">No.</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              Too many people, of all stripes, reached out wanting to tell stories
              about folks who'd made a difference to them. This made the podcast
              better.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              However, subscribers have the option to receive only those episodes
              that feature folks who remind me of my dad and his dim sum crew.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">How do I subscribe?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Send me a note at{' '}
              <a
                href="mailto:ted@ifnotfor.com"
                className="text-blue-600 hover:underline"
              >
                ted@ifnotfor.com
              </a>{' '}
              and I'll add you to the roster. You'll get new episodes via email.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">Why can't I use my podcast player?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              I didn't want this podcast to have ads, and podcast players have a
              nasty habit of inserting ads into podcasts that are meant to be
              ad-free.
            </p>
          </Card>
        </div>

        {/* Column 5: Be a guest + Gatherings */}
        <div className="flex flex-col gap-4 w-[300px] shrink-0">
          <Card className="p-6">
            <h3 className="font-medium text-gray-900 mb-3">Can I be a guest?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tell me about the person you'd like to talk about, in an email. My
              address is{' '}
              <a
                href="mailto:ted@ifnotfor.com"
                className="text-blue-600 hover:underline"
              >
                ted@ifnotfor.com
              </a>
            </p>
          </Card>

          <Card className="p-6 flex-1">
            <h3 className="font-medium text-gray-900 mb-3">Have you ever gotten guests together in person?</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Yes. When I have time to organize them.
            </p>
            <p className="text-xs text-gray-400 italic">
              [Photos of gatherings here]
            </p>
          </Card>

          <Card className="p-6">
            <Link
              href="/test"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Test page →
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}
