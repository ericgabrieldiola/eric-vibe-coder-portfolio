// Navigation mobile toggle & click-outside listener
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (mainNav.classList.contains('open') && !mainNav.contains(event.target) && event.target !== menuToggle) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Sticky header elevation on scroll
const siteHeader = document.getElementById('siteHeader');
function handleHeaderElevation() {
  if (!siteHeader) return;
  if ((window.scrollY || window.pageYOffset) > 20) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleHeaderElevation, { passive: true });
handleHeaderElevation();

// Active-section navigation highlighting (scroll spy)
const navLinks = mainNav ? Array.from(mainNav.querySelectorAll('a[href^="#"]')) : [];
const trackedSectionIds = ['home', 'about', 'education', 'skills', 'services', 'projects', 'certificates', 'activities', 'contact'];
const trackedSections = trackedSectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

function setActiveNavLink(targetId) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${targetId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function handleScrollSpy() {
  if (!trackedSections.length) return;
  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // If scrolled to bottom of the page, activate the last section (Contact)
  if (scrollY + viewportHeight >= docHeight - 40) {
    setActiveNavLink('contact');
    return;
  }

  // Find topmost section currently passing the header threshold
  let currentId = trackedSections[0].id;
  for (const section of trackedSections) {
    const top = section.getBoundingClientRect().top;
    if (top <= 140) {
      currentId = section.id;
    }
  }
  setActiveNavLink(currentId);
}

window.addEventListener('scroll', handleScrollSpy, { passive: true });
window.addEventListener('resize', handleScrollSpy, { passive: true });
handleScrollSpy();

// Animate sections as they enter the viewport; respects reduced-motion preferences.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('reveal-ready');
  const revealTargets = document.querySelectorAll('.content-section, .contact-banner, .intro-strip');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach(section => revealObserver.observe(section));
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☾' : '☼';
  });
}

// Copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// AI Portfolio Assistant
const chatLauncher = document.getElementById('chatLauncher');
const chatPanel = document.getElementById('chatPanel');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

function toggleChat(open) {
  if (!chatPanel || !chatLauncher) return;
  chatPanel.hidden = !open;
  chatLauncher.setAttribute('aria-expanded', String(open));
  if (open && chatInput) {
    setTimeout(() => chatInput.focus(), 80);
  }
}

if (chatLauncher) {
  chatLauncher.addEventListener('click', () => toggleChat(chatPanel ? chatPanel.hidden : false));
}
if (chatClose) {
  chatClose.addEventListener('click', () => toggleChat(false));
}

// Wire up "Try Assistant" button from the Projects section
const tryAssistantBtn = document.getElementById('tryAssistantBtn');
if (tryAssistantBtn) {
  tryAssistantBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleChat(true);
  });
}

/**
 * Natural knowledge-based portfolio assistant.
 * Strictly uses verified portfolio information without inventing details, age, or secrets.
 */
function getAnswer(question) {
  const raw = question.trim().toLowerCase();
  const normalized = raw.replace(/['"’‘.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. Age (Strictly verified: not provided in portfolio)
  if (
    normalized.includes('how old') ||
    /\bage\b/.test(normalized) ||
    normalized.includes('birth date') ||
    normalized.includes('birthday') ||
    normalized.includes('when was eric born') ||
    normalized.includes('birth year')
  ) {
    return "Eric's age has not been provided in this portfolio information. If you'd like to learn more about him, feel free to ask about his education, technical skills, or featured projects!";
  }

  // 2. Greetings (e.g. "hi", "hello", "good morning", "hey", etc.)
  if (
    /^(hi|hello|hey|heya|howdy|sup|greetings|good (morning|afternoon|evening)|yo)\b/.test(normalized) ||
    normalized === 'hi' || normalized === 'hello' || normalized === 'hey' || normalized.includes('good morning')
  ) {
    return "Hello! 👋 Welcome! I'm Eric's portfolio assistant. How can I help you today? You can ask me about Eric Gabriel, his educational background at Torres Capitol College, his technical skills, projects (such as FixFlow, Inventory Management, Cire, Robot Battle Arena, or the Acoustic Wave Firefighting Robot), or his certificates!";
  }

  // 3. Interests / Passions / Hobbies
  if (
    normalized.includes('interest') ||
    normalized.includes('passion') ||
    normalized.includes('hobby') ||
    normalized.includes('hobbies')
  ) {
    return "Eric's core IT interests include:\n• **Web Development**\n• **Software Development**\n• **Databases**\n• **Computer Troubleshooting**\n• **Android Development**\n• **AI-Assisted Prototyping**\n• **Robotics**\n\nHe is an active learner who focuses on building, testing, and improving practical IT projects through hands-on development.";
  }

  // 4. Role / Status (BSIT Student / Aspiring IT Professional)
  if (
    normalized.includes('role') ||
    normalized.includes('is eric a graduate') ||
    normalized.includes('did eric graduate') ||
    /\bstudent\b/.test(normalized) ||
    normalized.includes('profession') ||
    /\bjob\b/.test(normalized)
  ) {
    return "Eric Gabriel P. Diola is currently a **BSIT student and aspiring IT professional** enrolled in the **Bachelor of Science in Information Technology (BSIT)** program at **Torres Capitol College, Inc.** (academic period shown in the portfolio: 2026–2027). He is actively studying and building practical skills, not a graduate yet.";
  }

  // 5. Identity / "Who are you?"
  if (
    normalized.includes('who are you') ||
    /\bwhat are you\b/.test(normalized) ||
    normalized.includes('introduce yourself') ||
    normalized.includes('your name') ||
    normalized.includes('who is this') ||
    normalized.includes('what is this assistant')
  ) {
    return "I am Eric's portfolio assistant. I can guide you through this website and answer questions about Eric Gabriel P. Diola — including his academic profile, education, technical skills, projects, certificates, and interests!";
  }

  // 6. Location
  if (
    normalized.includes('where is eric from') ||
    normalized.includes('where is eric located') ||
    normalized.includes('where do you live') ||
    normalized.includes('country') ||
    normalized.includes('location') ||
    normalized.includes('philippines')
  ) {
    return "Eric is based in the **Philippines** and is currently studying at Torres Capitol College, Inc.";
  }

  // 7. Biography / Personal Profile / "Tell me about Eric"
  if (
    normalized.includes('tell me about eric') ||
    normalized.includes('who is eric') ||
    normalized.includes('about eric') ||
    normalized.includes('who is he') ||
    normalized.includes('tell me about yourself') ||
    normalized.includes('eric background') ||
    normalized.includes('biography') ||
    normalized.includes('bio') ||
    normalized.includes('profile')
  ) {
    return "**Eric Gabriel P. Diola** is a BSIT student and aspiring IT professional currently studying at **Torres Capitol College, Inc.** (academic period 2026–2027) in the **Bachelor of Science in Information Technology (BSIT)** program.\n\nHe is an active learner who builds, tests, and improves practical IT projects through hands-on development. His core technical interests include web development, software development, databases, computer troubleshooting, Android development, AI-assisted prototyping, and robotics.";
  }

  // 8. Education / "Where does Eric study?"
  if (
    normalized.includes('where does eric study') ||
    normalized.includes('where do you study') ||
    normalized.includes('where does he study') ||
    normalized.includes('where did eric study') ||
    normalized.includes('education') ||
    normalized.includes('school') ||
    normalized.includes('college') ||
    normalized.includes('university') ||
    normalized.includes('torres') ||
    normalized.includes('damulog') ||
    normalized.includes('madana') ||
    normalized.includes('degree') ||
    normalized.includes('program') ||
    normalized.includes('academic period') ||
    normalized.includes('academic') ||
    normalized.includes('education years')
  ) {
    return "Eric's educational background features three academic institutions:\n• **Torres Capitol College, Inc.** — Bachelor of Science in Information Technology (BSIT) (2026–2027)\n• **Old Damulog National High School** — Secondary Education (2022–2023)\n• **Madana Mohana Academy** — Primary & Junior High School Education (2016–2017)\n\nHis academic period at Torres Capitol College, Inc. is 2026–2027.";
  }

  // 9. FixFlow / "What is FixFlow?" / Troubleshooting
  if (
    normalized.includes('fixflow') ||
    normalized.includes('fix flow') ||
    normalized.includes('troubleshoot') ||
    normalized.includes('troubleshooting') ||
    normalized.includes('support ticket') ||
    normalized.includes('knowledge base')
  ) {
    return "**FixFlow — IT Troubleshooting Assistant** is an IT troubleshooting website created by Eric. It features searchable step-by-step troubleshooting guides for common PC and network issues, support ticket simulation, and an organized knowledge base.\n\nYou can explore the live website at https://fixflow-web-opnb.onrender.com/ or try the local prototype included with this portfolio.";
  }

  // 10. Inventory Management System
  if (
    normalized.includes('inventory') ||
    normalized.includes('sales') ||
    normalized.includes('stock') ||
    normalized.includes('school supply')
  ) {
    return "**Inventory Management** is an inventory and sales management project created by Eric to manage product records, suppliers, stock movements (stock-in/stock-out), and sales data. You can access the live system deployed on Railway at https://inventory-management-system-production-7080.up.railway.app/.";
  }

  // 11. Cire AI Assistant
  if (
    normalized.includes('cire') ||
    normalized.includes('personal assistant') ||
    normalized.includes('voice assistant')
  ) {
    return "**Cire** is Eric's personal AI assistant project. It explores conversational workflows, local language models using Ollama, a Python/FastAPI backend, and voice interaction concepts. It is available live at https://cire-web.onrender.com/.";
  }

  // 12. Robot Battle Arena / Games
  if (
    normalized.includes('what games') ||
    normalized.includes('games has eric made') ||
    normalized.includes('robot battle') ||
    normalized.includes('battle arena') ||
    normalized.includes('gaming') ||
    (normalized.includes('game') && !normalized.includes('project'))
  ) {
    return "**Robot Battle Arena** is Eric's game development project. It is an interactive combat game designed to explore game logic, real-time interactive mechanics, and creative problem-solving. You can see its details in the Projects section of this portfolio!";
  }

  // 13. Acoustic Wave Firefighting Robot
  if (
    normalized.includes('firefighting') ||
    normalized.includes('fire fighting') ||
    normalized.includes('fire robot') ||
    normalized.includes('acoustic') ||
    normalized.includes('sound wave') ||
    normalized.includes('soundwave') ||
    normalized.includes('extinguish')
  ) {
    return "The **Acoustic Wave Firefighting Robot** is Eric's robotics/research project. It is an academic capstone prototype that explores autonomous navigation, heat detection, and obstacle avoidance using Arduino and sensors, directing low-frequency acoustic sound waves toward flame suppression. A complete video demonstration is available on the project card in the Projects section!";
  }

  // 14. What projects has Eric built? / Projects Overview
  if (
    normalized.includes('what projects') ||
    normalized.includes('projects has eric built') ||
    normalized.includes('portfolio work') ||
    normalized.includes('featured projects') ||
    normalized.includes('show me projects') ||
    normalized === 'projects' ||
    normalized.includes('list projects')
  ) {
    return "Eric has built and prototyped several practical IT projects:\n• **FixFlow** — IT troubleshooting website with searchable guides, support tickets, and knowledge base (Live: https://fixflow-web-opnb.onrender.com/)\n• **Inventory Management** — Inventory and sales management project tracking products, suppliers, stock movements, and sales (Live: https://inventory-management-system-production-7080.up.railway.app/)\n• **Cire** — Personal AI assistant exploring local models and voice interaction (Live: https://cire-web.onrender.com/)\n• **Robot Battle Arena** — Game development project exploring combat logic and gameplay mechanics\n• **Acoustic Wave Firefighting Robot** — Robotics/research prototype using an acoustic-wave-based fire suppression concept\n• **Portfolio AI Assistant** — This interactive portfolio guide right here!";
  }

  // 15. Technical Skills (Transparent Learning Levels)
  if (
    normalized.includes('skill') ||
    normalized.includes('skills') ||
    normalized.includes('tech stack') ||
    normalized.includes('technologies') ||
    normalized.includes('programming') ||
    normalized.includes('languages') ||
    normalized.includes('coding') ||
    normalized.includes('what can eric do') ||
    normalized.includes('expert')
  ) {
    return "Eric's technical skills have different learning levels and reflect ongoing, hands-on growth (he is an active learner, not claiming expert status):\n\n• **Web Development**: HTML5 (Beginner), CSS3 / Flexbox (Beginner), JavaScript (Currently Learning)\n• **Programming & Data**: Python (Beginner), PHP (Currently Learning), MySQL (Currently Learning), Java / Eclipse (Beginner)\n• **AI & Prototyping**: AI-Assisted Prototyping (Hands-on), Local LLMs via Ollama (Exploring), FastAPI (Basic)\n• **Tools & Hardware**: Git & GitHub (Beginner), VS Code (Dev Tool), Arduino & Sensors (Project Exposure)\n\nHe uses these tools to build, test, and improve practical IT applications.";
  }

  // 16. Certificates and Training
  if (
    normalized.includes('certificate') ||
    normalized.includes('certificates') ||
    normalized.includes('certification') ||
    normalized.includes('certifications') ||
    normalized.includes('activities') ||
    normalized.includes('activity') ||
    normalized.includes('seminar') ||
    normalized.includes('seminars') ||
    normalized.includes('workshop') ||
    normalized.includes('workshops') ||
    normalized.includes('training') ||
    normalized.includes('devcon') ||
    normalized.includes('code org') ||
    normalized.includes('mix move') ||
    normalized.includes('danger zone') ||
    normalized.includes('pre-internship') ||
    normalized.includes('preinternship') ||
    normalized.includes('internship') ||
    normalized.includes('sipp')
  ) {
    return "Eric has completed the following verified training and seminars, with original certificates shown in the portfolio:\n• **Certificate of Completion — Two-Day Mandatory Pre-Internship Training Program (SIPP)** (Torres Capitol College, Inc. · Sept 30, 2026)\n• **DEVCON Bits of Light Roadshow** (Frontend Forge workshop)\n• **Mix & Move with AI** (Code.org Hour of AI)\n• **BSIT Seminar-Workshop 2026** (Code + Communicate)\n• **Digital Danger Zone** (Protecting Yourself in the Age of Digital Deception)\n\nYou can view all the original certificate documents in the Certificates section of this portfolio.";
  }

  // 17. Resume
  if (
    normalized.includes('resume') ||
    normalized.includes('cv') ||
    normalized.includes('curriculum vitae')
  ) {
    return "You can view or download Eric's one-page resume directly from the Resume section of this portfolio using the 'View Resume' and 'Download Resume' buttons.";
  }

  // 18. Contact / Hire / Links
  if (
    normalized.includes('contact') ||
    normalized.includes('email') ||
    normalized.includes('hire') ||
    normalized.includes('reach') ||
    normalized.includes('message') ||
    normalized.includes('touch') ||
    normalized.includes('github')
  ) {
    return "You can contact Eric via email at ericgabrieldiola9@gmail.com, send a message through the contact form at the bottom of the page, or connect with him on GitHub at https://github.com/ericgabrieldiola.";
  }

  // 19. Courtesies / Simple Follow-ups
  if (
    /^(thank|thanks|thank you|great|awesome|cool|nice|good job|ok|okay)\b/.test(normalized)
  ) {
    return "You're very welcome! Let me know if there's anything else about Eric's background, education, skills, or projects you'd like to explore.";
  }

  // 20. Fallback for unknown questions
  return "I don't have information on that in this portfolio. I can answer questions about Eric Gabriel P. Diola — such as his BSIT program at Torres Capitol College, his technical skills, his projects (FixFlow, Inventory Management, Cire, Robot Battle Arena, or the Acoustic Wave Firefighting Robot), and training certificates. Feel free to ask about any of those topics!\n\n*(Note: I am a local knowledge-based portfolio assistant built with portfolio facts; no external AI model or API is connected.)*";
}

/**
 * Format markdown for assistant responses into safe HTML.
 */
function formatAssistantText(text) {
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Bullet points
  safe = safe.replace(/• /g, '&bull; ');

  // Links
  safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  // Line breaks
  safe = safe.replace(/\n/g, '<br>');

  return safe;
}

function addMessage(text, type) {
  if (!chatMessages) return;
  const div = document.createElement('div');
  div.className = `message ${type === 'user' ? 'user-message' : 'assistant-message'}`;
  if (type === 'user') {
    div.textContent = text;
  } else {
    div.innerHTML = formatAssistantText(text);
  }
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendQuestion(question) {
  const cleaned = question.trim();
  if (!cleaned) return;
  addMessage(cleaned, 'user');
  const answer = getAnswer(cleaned);
  setTimeout(() => {
    addMessage(answer, 'assistant');
  }, 120);
}

if (chatForm && chatInput) {
  chatForm.addEventListener('submit', event => {
    event.preventDefault();
    sendQuestion(chatInput.value);
    chatInput.value = '';
  });
}

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => sendQuestion(button.dataset.prompt));
});

/**
 * Contact form submission handler.
 * Validates name, visitor email, and message; sends JSON payload to backend/api/contact.php;
 * shows non-sensitive feedback and resets form only upon actual storage in database.
 */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const status = document.getElementById('contactFormStatus');
  const submitBtn = document.getElementById('contactSubmitBtn') || (form ? form.querySelector('button[type="submit"]') : null);
  if (!form || !status || form.dataset.contactBound) return;
  form.dataset.contactBound = 'true';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.classList.remove('error', 'success');
    status.textContent = '';

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    // Sensible client-side validation
    if (!name) {
      status.classList.add('error');
      status.textContent = 'Please enter your name.';
      if (nameInput) nameInput.focus();
      return;
    }
    if (name.length > 100) {
      status.classList.add('error');
      status.textContent = 'Name must be 100 characters or fewer.';
      if (nameInput) nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      status.classList.add('error');
      status.textContent = 'Please enter your email address.';
      if (emailInput) emailInput.focus();
      return;
    }
    if (!emailRegex.test(email) || email.length > 190) {
      status.classList.add('error');
      status.textContent = 'Please provide a valid email address (e.g., you@example.com).';
      if (emailInput) emailInput.focus();
      return;
    }

    if (!message) {
      status.classList.add('error');
      status.textContent = 'Please enter a message.';
      if (messageInput) messageInput.focus();
      return;
    }
    if (message.length > 5000) {
      status.classList.add('error');
      status.textContent = 'Message must be 5,000 characters or fewer.';
      if (messageInput) messageInput.focus();
      return;
    }

    // Set sending state
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send message ↗';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending message…';
    }
    status.textContent = 'Sending message…';

    try {
      const response = await fetch('backend/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      let result = null;
      try {
        result = await response.json();
      } catch (err) {
        // Response was not JSON
      }

      if (!response.ok || !result || result.ok !== true) {
        const errorMsg = (result && result.message)
          ? result.message
          : 'Unable to save your message right now. Please try again later or reach out via email directly.';
        throw new Error(errorMsg);
      }

      // Success: message actually stored in database
      status.classList.add('success');
      status.textContent = result.message || 'Thank you! Your message has been saved successfully.';
      form.reset();
    } catch (error) {
      status.classList.add('error');
      status.textContent = (error && error.message)
        ? error.message
        : 'Unable to connect to the backend server. Please email directly at ericgabrieldiola9@gmail.com.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initCertificateLightbox();
  });
} else {
  initContactForm();
  initCertificateLightbox();
}

// Certificate Lightbox
function initCertificateLightbox() {
  const lightbox = document.getElementById('certLightbox');
  const backdrop = document.getElementById('certLightboxBackdrop');
  const closeBtn = document.getElementById('certLightboxClose');
  const imgEl = document.getElementById('certLightboxImage');
  const titleEl = document.getElementById('certLightboxTitle');
  const captionEl = document.getElementById('certLightboxCaption');
  const externalLink = document.getElementById('certLightboxExternal');

  if (!lightbox || !imgEl) return;

  let lastActiveElement = null;

  function openLightbox(src, title, caption) {
    lastActiveElement = document.activeElement;
    imgEl.src = src;
    imgEl.alt = title ? `Enlarged view of ${title}` : 'Enlarged certificate preview';
    if (titleEl) titleEl.textContent = title || 'Certificate';
    if (captionEl) captionEl.textContent = caption || '';
    if (externalLink) {
      externalLink.href = src;
      externalLink.setAttribute('aria-label', `Open original file for ${title || 'certificate'} in a new tab`);
    }

    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  // Attach to certificate cards with data-full or triggers
  document.querySelectorAll('.certificate-grid [data-full]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-full') || trigger.getAttribute('href');
      const title = trigger.getAttribute('data-title') || trigger.closest('.about-card')?.querySelector('h3')?.textContent || 'Certificate';
      const caption = trigger.getAttribute('data-caption') || trigger.closest('.about-card')?.querySelector('.cert-institution, p')?.textContent || '';
      if (src) {
        openLightbox(src, title, caption);
      }
    });
  });

  // Also support existing image links in .certificate-grid
  document.querySelectorAll('.certificate-grid a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (/\.(jpg|jpeg|png|webp)$/i.test(href) && !link.hasAttribute('data-full')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.about-card');
        const title = card?.querySelector('h3')?.textContent || 'Certificate';
        const caption = card?.querySelector('p')?.textContent || '';
        openLightbox(href, title, caption);
      });
    }
  });
}
