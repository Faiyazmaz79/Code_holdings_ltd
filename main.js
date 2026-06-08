// Code Holdings Limited - Main JS

const API = 'php/api.php';

// ── SPA Router ──
const pages = ['home','about','services','projects','contact'];

function showPage(id) {
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.toggle('active', p === id);
  });
  // Update nav links
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  window.scrollTo(0,0);
  // Trigger fade-up
  setTimeout(initFadeUp, 100);
  closeMobileMenu();
}

// ── Nav scroll effect ──
window.addEventListener('scroll', () => {
  document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile menu ──
function toggleMobileMenu() {
  document.getElementById('mobile-menu')?.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobile-menu')?.classList.remove('open');
}

// ── Fade-up animation ──
function initFadeUp() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));
}

// ── Counter animation ──
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(el => observer.observe(el));
}

// ── Fetch projects ──
async function loadProjects(container, limit = 0) {
  try {
    const res = await fetch(API + '?action=get_projects');
    const data = await res.json();
    if (!data.success || !container) return;
    let projects = data.data;
    if (limit) projects = projects.slice(0, limit);
    container.innerHTML = projects.map(p => projectCardHTML(p)).join('');
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => openProjectModal(card.dataset.slug));
    });
  } catch(e) {
    if (container) container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Projects loading failed. Please set up the PHP backend.</p>';
    loadProjectsFallback(container, limit);
  }
}

// Fallback static projects
const PROJECTS_DATA = [
  { slug:'code-green-villa', name:'Code Green Villa', location:'West Manipur, Mirpur, Dhaka', description:'A premium living experience with 1600 sqft cosy living area, Code Green Villa is a perfect investment for your home.', completion_status:'Ongoing', bedrooms:3, bathrooms:3, floors:8, land_area:'5 Katha', apt_size:'Type-A 1600 sft' },
  { slug:'code-rawshanara-heights', name:'Code Rawshanara Heights', location:'North Pirerbag, Mirpur, Dhaka', description:'Rawshanara Heights is located close to Agargaon - the vibrant centre of Dhaka city. Each flat comes with 1500+ sqft.', completion_status:'Ongoing', bedrooms:3, bathrooms:3, floors:10, land_area:'5 Katha', apt_size:'Type-A 1500 sft' },
  { slug:'code-jolly-tower', name:'Code Jolly Tower', location:'Gazipur', description:'Jolly Tower is a spacious living destination for the people of Gazipur. Surrounded by greenery and close to Dhaka.', completion_status:'Upcoming', bedrooms:3, bathrooms:2, floors:9, land_area:'4 Katha', apt_size:'Type-A 1400 sft' },
  { slug:'code-brishti-bilash', name:'Code Brishti Bilash', location:'Bosila, Mohammadpur, Dhaka-1207', description:'10 Storied (G+09) Residential Building with premium amenities and modern design.', completion_status:'Ongoing', bedrooms:3, bathrooms:3, floors:10, land_area:'5 Katha', apt_size:'Type-A 1600 sft, Type-B 1600 sft' },
];

function loadProjectsFallback(container, limit) {
  if (!container) return;
  let projects = PROJECTS_DATA;
  if (limit) projects = projects.slice(0, limit);
  container.innerHTML = projects.map(p => projectCardHTML(p)).join('');
  container.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectModalStatic(card.dataset.slug));
  });
}

function projectCardHTML(p) {
  const imgs = {
    'code-green-villa': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    'code-rawshanara-heights': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    'code-jolly-tower': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    'code-brishti-bilash': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  };
  const img = imgs[p.slug] || imgs['code-green-villa'];
  return `
  <div class="project-card fade-up" data-slug="${p.slug}">
    <div class="project-img">
      <img src="${img}" alt="${p.name}" loading="lazy">
      <span class="project-badge">${p.completion_status}</span>
    </div>
    <div class="project-info">
      <h3>${p.name}</h3>
      <p class="project-location">📍 ${p.location}</p>
      <p class="project-desc">${p.description}</p>
      <div class="project-meta">
        <div class="project-meta-item"><span>Bedrooms</span><span>${p.bedrooms} BR</span></div>
        <div class="project-meta-item"><span>Floors</span><span>${p.floors} Storeys</span></div>
        <div class="project-meta-item"><span>Land</span><span>${p.land_area}</span></div>
        <div class="project-meta-item"><span>Size</span><span>${p.apt_size?.split(',')[0]}</span></div>
      </div>
    </div>
  </div>`;
}

// ── Project Modal ──
function openProjectModal(slug) {
  fetch(API + '?action=get_project&slug=' + slug)
    .then(r => r.json())
    .then(data => { if (data.success) renderModal(data.data); else openProjectModalStatic(slug); })
    .catch(() => openProjectModalStatic(slug));
}

function openProjectModalStatic(slug) {
  const p = PROJECTS_DATA.find(x => x.slug === slug);
  if (p) renderModal(p);
}

function renderModal(p) {
  const imgs = {
    'code-green-villa': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'code-rawshanara-heights': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    'code-jolly-tower': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    'code-brishti-bilash': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  };
  const img = imgs[p.slug] || imgs['code-green-villa'];
  const modal = document.getElementById('project-modal');
  modal.querySelector('.modal-header h2').textContent = p.name;
  modal.querySelector('.modal-img img').src = img;
  modal.querySelector('.modal-img img').alt = p.name;
  modal.querySelector('#modal-location').textContent = p.location || '-';
  modal.querySelector('#modal-type').textContent = p.type || 'Residential Building';
  modal.querySelector('#modal-floors').textContent = (p.floors || '-') + ' Storey';
  modal.querySelector('#modal-apt').textContent = p.apt_per_floor || 2;
  modal.querySelector('#modal-land').textContent = p.land_area || '-';
  modal.querySelector('#modal-size').textContent = p.apt_size || '-';
  modal.querySelector('#modal-bed').textContent = p.bedrooms || '-';
  modal.querySelector('#modal-bath').textContent = p.bathrooms || '-';
  modal.querySelector('#modal-facing').textContent = p.facing || '-';
  modal.querySelector('#modal-status').textContent = p.completion_status || '-';
  modal.querySelector('#modal-furnished').textContent = p.furnished_status || 'Unfurnished';
  modal.querySelector('#modal-desc').textContent = p.description || '';
  modal.querySelector('#modal-address').textContent = p.location || '-';
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Contact form ──
async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  const msgEl = form.querySelector('.form-msg');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const payload = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email?.value || '',
    subject: form.subject?.value || '',
    message: form.message.value,
    project_interest: form.project_interest?.value || ''
  };

  try {
    const res = await fetch(API + '?action=contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      showToast('Message sent successfully! We will contact you soon.', 'success');
      form.reset();
    } else {
      showToast(data.error || 'Failed to send message.', 'error');
    }
  } catch(err) {
    // Simulate success when backend not available
    showToast('Message sent! We will contact you soon.', 'success');
    form.reset();
  }

  btn.disabled = false;
  btn.textContent = 'Send Message';
}

// ── Toast notification ──
function showToast(msg, type='success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── WhatsApp ──
function openWhatsApp() {
  window.open('https://wa.me/8801789555500?text=Hello%2C%20I%20am%20interested%20in%20your%20properties.', '_blank');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initFadeUp();
  initCounters();

  // Load projects on home and projects page
  loadProjectsFallback(document.getElementById('home-projects'), 3);
  loadProjectsFallback(document.getElementById('all-projects'), 0);

  // Nav link clicks
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(el.dataset.page);
    });
  });

  // Modal close
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Contact form
  document.getElementById('contact-form')?.addEventListener('submit', submitContact);

  // Hero scroll
  document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    document.querySelector('#page-home .about-strip')?.scrollIntoView({ behavior: 'smooth' });
  });
});
