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

// Contact form — submits to Formspree, shows toast on success
const form = document.getElementById('contact-form');
if (form) {
  // Keep _replyto in sync with the email field
  const emailInput = document.getElementById('email');
  const replytoField = document.getElementById('replyto-field');
  if (emailInput && replytoField) {
    emailInput.addEventListener('input', () => {
      replytoField.value = emailInput.value;
    });
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const toast = document.getElementById('toast');
    const data = new FormData(form);

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
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
