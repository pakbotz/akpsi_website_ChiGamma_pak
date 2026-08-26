'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';

const FAQS = [
  {
    q: 'What distinguishes us from other organizations?',
    a: (
      <>
        What sets Alpha Kappa Psi apart is our commitment to{' '}
        <strong>professional growth without limiting who can be part of it</strong>
        . We welcome students from every major and every stage of their college
        journey, providing opportunities to build meaningful connections, develop
        career-ready skills, and discover new possibilities. Whether you're just
        beginning to explore your interests or already have a clear career path in
        mind, <strong>we're here to help you grow and make the most of your time at UCSC.</strong>
      </>
    ),
  },
  {
    q: 'Is it necessary to be a business major to join?',
    a: (
      <>
        Not at all. Alpha Kappa Psi is a{' '}
        <strong>co-ed professional fraternity open to students of all majors</strong>
        . Our chapter brings together people from a wide range of academic
        backgrounds, including Computer Science, Engineering, Psychology, Design,
        Mathematics, and beyond. We believe that some of the strongest professional
        communities are built by bringing together people with{' '}
        <strong>different perspectives, experiences, and areas of expertise.</strong>
      </>
    ),
  },
  {
    q: 'What is the Prospecting Process?',
    a: (
      <>
        The Prospecting Process is a{' '}
        <strong>6-week professional development experience</strong> designed to
        help students grow both personally and professionally while getting to know
        our chapter and its values. Throughout the process, prospects have
        opportunities to develop career-ready skills, build meaningful relationships,
        and gain a deeper understanding of what Alpha Kappa Psi has to offer. By the
        end of the six weeks, our goal is for every prospect to walk away with{' '}
        <strong>new skills, stronger connections, and greater confidence in their professional journey.</strong>
      </>
    ),
  },
  {
    q: 'How many prospects are accepted each semester?',
    a: (
      <>
        There is <strong>no predetermined number of prospects</strong> accepted each
        semester. The size of each Prospecting Process depends on the level of
        interest and participation during recruitment. Our focus is on creating a
        meaningful experience for everyone involved rather than setting an arbitrary
        limit.
      </>
    ),
  },
  {
    q: 'Is attendance at Rush Events obligatory for applying?',
    a: (
      <>
        Attending <strong>3/4 rush events is required to apply</strong>, and we
        highly encourage prospective members to attend as many as they can. Rush is
        an opportunity for you to{' '}
        <strong>get to know our members, experience our chapter culture, and learn what Alpha Kappa Psi can offer you</strong>
        . At the same time, it gives our members the chance to get to know you beyond
        your résumé or academic background.
      </>
    ),
  },
  {
    q: 'What is the time commitment once initiated?',
    a: (
      <>
        Alpha Kappa Psi is a commitment to{' '}
        <strong>your own professional and personal growth</strong>. The time you put
        into the organization directly influences what you get out of the experience,
        from professional development and networking to friendships and leadership
        opportunities. In terms of overall time and effort, the commitment is often{' '}
        <strong>comparable to taking a 5 unit course</strong>, with opportunities
        to become even more involved as you progress through the chapter.
      </>
    ),
  },
  {
    q: "Can I rush again if I don't get a bid the first time?",
    a: (
      <>
        Absolutely. Not receiving a bid one quarter does{' '}
        <strong>not prevent you from rushing again in future quarters</strong>. We
        encourage anyone who remains interested in Alpha Kappa Psi to come back,
        reconnect with our chapter, and continue pursuing membership.{' '}
        <strong>
          Showing that you're willing to grow, learn, and try again is something we
          genuinely value.
        </strong>
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const filtered = FAQS.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-[#0a0a0a] flex justify-center">
      <div className="w-[80%]">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="font-medium tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
          >
            Frequently asked questions
          </h2>

          <div className="flex items-center gap-3 border-b border-white/25 pb-2 sm:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Looking for something?"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <Search size={16} className="text-white/40" />
          </div>
        </div>

        <div>
          {filtered.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={item.q} className="border-b border-white/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full min-h-[120px] items-center justify-between gap-6 py-10 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base text-white sm:text-lg">
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex shrink-0 items-center justify-center text-white/70"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="w-full max-w-none pb-8 pr-12 text-sm leading-relaxed text-white/50 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <p className="py-10 text-sm text-white/40">
              No questions match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}