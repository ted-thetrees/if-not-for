export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Header */}
        <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">
          If not for…
        </h1>
        <p className="text-lg text-gray-500 italic mb-16">A gratitude project.</p>

        {/* Episodes placeholder */}
        <div className="mb-16 space-y-4">
          <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center text-gray-400">
            Episode 1: Novelist, Maine
          </div>
          <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center text-gray-400">
            Episode 2: Painter, Colorado
          </div>
          <div className="bg-gray-100 rounded-lg p-6 h-24 flex items-center justify-center text-gray-400">
            Episode 3: Sailor, British Columbia
          </div>
        </div>

        {/* FAQ Section */}
        <section className="space-y-12">
          <h2 className="text-2xl font-medium text-gray-900">FAQ</h2>

          <div className="space-y-8">
            <FAQ 
              question="What is 'If not for…'"
              answer={
                <>
                  <p className="mb-4">
                    It's a podcast I started that is really just an excuse to spend time finding and 
                    talking with people who remind me of my journalist dad and the 38 people he hosted, 
                    seven at a time, for dim sum brunches, 2,546 Saturdays in a row, from 1966 (the year 
                    dad joined the New York Times) to 2015 (the year dad passed away).
                  </p>
                  <p>
                    Each guest talks, for no more than five minutes, about a single person who's had an 
                    indelibly positive effect on their life.
                  </p>
                </>
              }
            />

            <FAQ 
              question="What was special about your dad and those 38 people?"
              answer={
                <p>
                  They all possessed two specific character traits that you rarely find together in 
                  even one person — High intelligence and high, authentic humility.
                </p>
              }
            />

            <FAQ 
              question="Why are the episodes so short?"
              answer={
                <>
                  <p className="mb-4">
                    When the podcast started, the episodes were much longer. But that turned out to be 
                    impractical, a lot to ask of each guest, and a barrier to hearing from as many 
                    people as possible.
                  </p>
                  <p className="text-gray-500 italic">
                    [Earlier long-form interviews would appear here]
                  </p>
                </>
              }
            />

            <FAQ 
              question="Did you get to go to your dad's dim sum brunches when you were a kid?"
              answer={
                <p>
                  He started having me tag along in 1980, when I was eleven, right after he split 
                  with my mom. I'd never been around grown-ups who got along that well or laughed 
                  that much. Getting to be around those people is probably the most important thing 
                  that's ever happened to me.
                </p>
              }
            />

            <FAQ 
              question="Do you only feature folks who remind you of your dad and his friends?"
              answer={
                <>
                  <p className="mb-4">No.</p>
                  <p className="mb-4">
                    Too many people, of all stripes, reached out wanting to tell stories about folks 
                    who'd made a difference to them. This made the podcast better.
                  </p>
                  <p>
                    However, subscribers have the option to receive only those episodes that feature 
                    folks who remind me of my dad and his dim sum crew.
                  </p>
                </>
              }
            />

            <FAQ 
              question="How do I subscribe?"
              answer={
                <p>
                  Send me a note at{' '}
                  <a href="mailto:ted@ifnotfor.com" className="text-blue-600 hover:underline">
                    ted@ifnotfor.com
                  </a>{' '}
                  and I'll add you to the roster of subscribers. You'll get new episodes via email.
                </p>
              }
            />

            <FAQ 
              question="Why can't I subscribe through my podcast player?"
              answer={
                <p>
                  I didn't want this podcast to have ads, and podcast players have a nasty habit of 
                  inserting ads into podcasts that are meant to be ad-free.
                </p>
              }
            />

            <FAQ 
              question="Can I be a guest?"
              answer={
                <p>
                  Tell me about the person you'd like to talk about, in an email. My address is{' '}
                  <a href="mailto:ted@ifnotfor.com" className="text-blue-600 hover:underline">
                    ted@ifnotfor.com
                  </a>
                </p>
              }
            />

            <FAQ 
              question="Have you ever gotten podcast guests together in person?"
              answer={
                <>
                  <p className="mb-4">Yes. When I have time to organize them.</p>
                  <p className="text-gray-500 italic">
                    [Photos of gatherings would appear here]
                  </p>
                </>
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-3">{question}</h3>
      <div className="text-gray-600 leading-relaxed">{answer}</div>
    </div>
  );
}
