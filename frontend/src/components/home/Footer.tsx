export default function Footer() {
    return (
      <footer className="bg-[#0a0a0a]  flex flex-col justify-center py-20 md:py-28">
        <div className="w-full px-6 md:px-12">
          {/* Top: flag/logo left, wordmark right */}
          <div className="flex items-start justify-between">

            <p className="max-w-xl text-2xl leading-snug text-white/80 sm:text-3xl">
              For recruitment updates, follow our instagram{' '}
              <span className="text-white">@ucscakpsi</span>
            </p>
            
            <span
              className="font-medium leading-none tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
            >
              AKΨ
            </span>

            
          </div>

  
          <div className="mt-20 border-t border-white/10 pt-12 sm:mt-28">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              {/* Organization */}
              <div>
                <h3 className="mb-5 text-sm text-white">Organization</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li><a href="">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/brothers">Our Brothers</a></li>
                  <li><a href="/careers">Careers</a></li>
                  <li><a href="/careers">Intern Spotlight</a></li>
                  <li><a href="/gallery">Gallery</a></li>
                  
                </ul>
              </div>
  
              {/* Get Involved */}
              <div>
                <h3 className="mb-5 text-sm text-white">Get Involved!</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li><a href="/rush">Rush AKΨ</a></li>
                  <li><a href="https://linktr.ee/ucscakpsi?utm_source=ig&utm_medium=social&utm_content=link_in_bio">Interest Form</a></li>
                </ul>
              </div>
  
              {/* Contact */}
              <div>
                <h3 className="mb-5 text-sm text-white">Contact</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li><a href="mailto:ucsc.akpsi@gmail.com" target="_blank">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Bottom bar */}
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/30 sm:flex-row sm:items-center">
            <span>© UCSC Alpha Kappa Psi 2026. All rights reserved.</span>
            <span>AKΨ — Chi Gamma Chapter</span>
          </div>
        </div>
      </footer>
    );
  }