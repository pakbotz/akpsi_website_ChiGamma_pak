export default function Footer() {
    return (
      <footer className="bg-[#0a0a0a] min-h-dvh flex flex-col justify-center py-20 md:py-28">
        <div className="mx-auto">
          {/* Top: flag/logo left, wordmark right */}
          <div className="flex items-start justify-between">
            <span className="text-sm tracking-wide text-white/50">
              ΑΚΨ<sup className="text-[10px]">®</sup>
            </span>
  
            <span
              className="font-medium leading-none tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
            >
              AKΨ
            </span>
          </div>
  
          {/* CTA line */}
          <div className="mt-20 sm:mt-28">
            <p className="max-w-xl text-2xl leading-snug text-white/80 sm:text-3xl">
              For recruitment updates, follow our instagram{' '}
              <span className="text-white">@ucscakpsi</span>
            </p>
          </div>
  
          <div className="mt-20 border-t border-white/10 pt-12 sm:mt-28">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
              {/* Organization */}
              <div>
                <h3 className="mb-5 text-sm text-white">Organization</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li>Home</li>
                  <li>About</li>
                  <li>Careers</li>
                  <li>Intern Spotlight</li>
                  <li>Gallery</li>
                  <li>Rush AKΨ</li>
                </ul>
              </div>
  
              {/* Brothers */}
              <div>
                <h3 className="mb-5 text-sm text-white">Brothers</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li>All Brothers</li>
                  <li>Brothers by Class</li>
                  <li>Brothers by Leadership</li>
                  <li>Alumni List</li>
                </ul>
              </div>
  
              {/* Contact */}
              <div>
                <h3 className="mb-5 text-sm text-white">Contact</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/45">
                  <li>Contact Us</li>
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