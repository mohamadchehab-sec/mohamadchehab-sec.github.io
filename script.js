/* ============================================================
   Mohamad Chehab — Portfolio
   script.js
   ------------------------------------------------------------
   - Live Beirut clock in the header
   - Scroll-triggered reveal on sections
   - Typewriter effect on hero accent line
   - Auto-updating footer year + last-touched date
   - Respects prefers-reduced-motion
   ============================================================ */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------
     1. Live Beirut clock — formatted as HH:MM:SS LBT
     -------------------------------------------------------- */
  const clockEl = document.getElementById('clock');

  if (clockEl) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Beirut',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const tick = () => {
      const parts = fmt.formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t)?.value ?? '00';
      clockEl.textContent = `${get('hour')}:${get('minute')}:${get('second')} LBT`;
    };

    tick();
    setInterval(tick, 1000);
  }

  /* --------------------------------------------------------
     2. Footer year + last-touched
     -------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const touchedEl = document.getElementById('last-touched');
  if (touchedEl) {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    touchedEl.dateTime = iso;
    touchedEl.textContent = iso;
  }

  /* --------------------------------------------------------
     3. Scroll-reveal — add .reveal to sections, observe them
     -------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.section .section-label, ' +
    '.section .section-title, ' +
    '.about-grid, ' +
    '.stack-grid, ' +
    '.project, ' +
    '.cred-grid, ' +
    '.contact-grid, ' +
    '.contact-lead'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  /* --------------------------------------------------------
     4. Typewriter effect on hero accent line
        (only if reduced-motion is OFF)
     -------------------------------------------------------- */
  const typed = document.querySelector('[data-typed]');

  if (typed && !reduceMotion) {
    const phrases = [
      'industrial systems.',
      'critical infrastructure.',
      'the things that matter.',
    ];

    const original = typed.textContent.trim();
    typed.textContent = '';
    typed.setAttribute('aria-label', original);

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    // Wait for the staggered reveal of the line to finish before typing.
    let startDelay = 1100;

    const type = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        typed.textContent = phrase.slice(0, ++charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(type, 2400);
          return;
        }
        setTimeout(type, 55 + Math.random() * 35);
      } else {
        typed.textContent = phrase.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 320);
          return;
        }
        setTimeout(type, 28);
      }
    };

    setTimeout(type, startDelay);
  }

  /* --------------------------------------------------------
     5. Tiny "console signature" — for anyone who opens devtools
     -------------------------------------------------------- */
  try {
    const css1 = 'color:#ff8a3d;font-weight:700;font-family:monospace;font-size:13px;';
    const css2 = 'color:#5fd3e6;font-family:monospace;font-size:12px;';
    console.log('%cMohamad Chehab%c // blue team · scada · automation\n// hello, defender. — Beirut, LB', css1, css2);
  } catch (_) { /* no-op */ }
})();
