// Always load at top of page (prevents browser scroll-restoration on mobile)
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// Project filter (home page)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const type = card.dataset.type;
      const show = filter === 'all' || type === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Touch shimmer animation for mobile (cards & buttons)
if ('ontouchstart' in window) {
  const shineTargets = document.querySelectorAll(
    '.project-card, .service-card, .featured-card, .join-card, .tag-card, ' +
    '.btn-primary, .btn-accent, .btn-contact, .btn-submit'
  );
  shineTargets.forEach(el => {
    el.addEventListener('touchstart', () => {
      el.classList.add('shine-active');
      setTimeout(() => el.classList.remove('shine-active'), 700);
    }, { passive: true });
  });
}

// Contact form — submits to Supabase Edge Function, shows toast on success
const CONTACT_ENDPOINT =
  'https://xmxeafjpscgqprrreulh.supabase.co/functions/v1/contact-submit';

const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const toast = document.getElementById('toast');

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.textContent = 'Message sent! We\'ll be in touch.';
        toast.classList.add('show');
        form.reset();
      } else {
        toast.textContent = 'Something went wrong. Try emailing us directly.';
        toast.classList.add('show');
      }
    } catch {
      toast.textContent = 'Network error. Please try again.';
      toast.classList.add('show');
    }

    btn.textContent = 'Send Message';
    btn.disabled = false;
    setTimeout(() => toast.classList.remove('show'), 4000);
  });
}
