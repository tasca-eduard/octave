import { useState } from 'react';
import { Shield, FileText, X } from 'lucide-react';

export default function Footer() {
  const [open, setOpen] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="footer" onClick={(e) => e.stopPropagation()}>
        <span className="footer__copy">&copy; {new Date().getFullYear()} Octave Mapper</span>
        <nav className="footer__links">
          <button onClick={() => setOpen('privacy')}>
            <Shield size={12} />
            Privacy Policy
          </button>
          <button onClick={() => setOpen('terms')}>
            <FileText size={12} />
            Terms of Use
          </button>
        </nav>
      </footer>

      {open && (
        <div className="legal-overlay" onClick={() => setOpen(null)}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
            <button className="legal-modal__close" onClick={() => setOpen(null)}>
              <X size={18} />
            </button>
            {open === 'privacy' ? <PrivacyPolicy /> : <TermsOfUse />}
          </div>
        </div>
      )}
    </>
  );
}

function PrivacyPolicy() {
  return (
    <div className="legal-content">
      <h2>Privacy Policy</h2>
      <p className="legal-content__updated">Last updated: March 2026</p>

      <h3>Overview</h3>
      <p>
        Octave Mapper ("we", "our", "the app") is a free, open web application hosted at
        octave.devedco.com. We are committed to protecting your privacy. This policy explains
        what data we collect, how we use it, and your rights.
      </p>

      <h3>Data We Collect</h3>
      <p>
        We use <strong>Vercel Web Analytics</strong>, a privacy-friendly, cookie-free analytics
        service. It collects only:
      </p>
      <ul>
        <li>Page views (URL visited)</li>
        <li>Referrer (where you came from)</li>
        <li>Browser and operating system type</li>
        <li>Country-level location (derived from IP, which is not stored)</li>
      </ul>
      <p>
        Vercel Analytics does <strong>not</strong> use cookies, does not track users across
        sites, does not collect personal information, and does not store IP addresses. It is
        fully compliant with GDPR, CCPA, and PECR without requiring user consent.
      </p>

      <h3>Data We Do Not Collect</h3>
      <ul>
        <li>No personal information (name, email, etc.)</li>
        <li>No user accounts or authentication</li>
        <li>No cookies or local storage for tracking</li>
        <li>No third-party advertising or marketing trackers</li>
        <li>No audio recordings — all sound is generated locally in your browser</li>
      </ul>

      <h3>Local Storage</h3>
      <p>
        The app may use your browser's local storage to persist user preferences such as
        custom tunings or color settings. This data stays entirely on your device and is never
        transmitted to any server.
      </p>

      <h3>Third-Party Services</h3>
      <ul>
        <li><strong>Vercel</strong> — hosting and analytics (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>)</li>
        <li><strong>Google Fonts</strong> — font delivery (<a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer">Google Fonts Privacy</a>)</li>
      </ul>

      <h3>Children's Privacy</h3>
      <p>
        The app does not knowingly collect any data from children. Since we collect no personal
        data from any user, there is no age-specific concern.
      </p>

      <h3>Changes to This Policy</h3>
      <p>
        We may update this policy from time to time. Changes will be reflected by the "Last
        updated" date above.
      </p>
    </div>
  );
}

function TermsOfUse() {
  return (
    <div className="legal-content">
      <h2>Terms of Use</h2>
      <p className="legal-content__updated">Last updated: March 2026</p>

      <h3>Acceptance of Terms</h3>
      <p>
        By accessing and using Octave Mapper ("the app") at octave.devedco.com, you agree to
        be bound by these Terms of Use. If you do not agree, please do not use the app.
      </p>

      <h3>Description of Service</h3>
      <p>
        Octave Mapper is a free, web-based music theory tool that visualizes the relationship
        between piano octaves and guitar fretboard notes. The app is provided as-is for
        educational and personal use.
      </p>

      <h3>Use License</h3>
      <p>
        You are granted a limited, non-exclusive, non-transferable license to use the app for
        personal, non-commercial purposes. You may not:
      </p>
      <ul>
        <li>Embed the app in an iframe on another website</li>
        <li>Attempt to reverse-engineer, decompile, or modify the app's source code for malicious purposes</li>
        <li>Use the app to infringe on any third party's intellectual property rights</li>
        <li>Use automated systems (bots, scrapers) to access the app in a way that degrades service for others</li>
      </ul>

      <h3>Disclaimer of Warranties</h3>
      <p>
        The app is provided <strong>"as is"</strong> and <strong>"as available"</strong> without
        warranties of any kind, either express or implied. We do not warrant that:
      </p>
      <ul>
        <li>The app will be uninterrupted, error-free, or secure</li>
        <li>The musical information displayed is 100% accurate for all use cases</li>
        <li>The app will be compatible with all browsers or devices</li>
      </ul>

      <h3>Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, in no event shall the creators of Octave Mapper
        be liable for any indirect, incidental, special, consequential, or punitive damages,
        including but not limited to loss of profits, data, or use, arising out of or related
        to your use of the app.
      </p>

      <h3>Audio Disclaimer</h3>
      <p>
        The app generates audio through your browser using synthesized sounds. You are
        responsible for controlling your device's volume. We are not liable for any hearing
        discomfort caused by unexpected volume levels.
      </p>

      <h3>Intellectual Property</h3>
      <p>
        The app's design, code, and branding are the property of their respective creators.
        Musical theory concepts (note names, chord names, tunings) are common knowledge and
        not claimed as proprietary.
      </p>

      <h3>Modifications</h3>
      <p>
        We reserve the right to modify, suspend, or discontinue the app at any time without
        notice. We may also update these terms from time to time. Continued use after changes
        constitutes acceptance of the updated terms.
      </p>

      <h3>Governing Law</h3>
      <p>
        These terms shall be governed by and construed in accordance with applicable laws,
        without regard to conflict of law principles.
      </p>
    </div>
  );
}
