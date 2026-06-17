// ===== CUSTOM CURSOR FOLLOWER =====
const cursor = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.navbar__link[data-section]');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});


// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));


// ===== ANIMATED STAT COUNTER =====
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const suffix = '+';

  function update() {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      return;
    }
    element.textContent = Math.floor(current) + suffix;
    requestAnimationFrame(update);
  }

  update();
}

const statValues = document.querySelectorAll('.hero__stat-value[data-count]');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statValues.forEach(stat => {
        const target = parseInt(stat.dataset.count, 10);
        animateCounter(stat, target);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) statsObserver.observe(heroStats);


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;

  // Simulate submission
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    // Show toast
    toast.classList.add('show');

    // Reset form
    contactForm.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }, 1500);
});


// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


// ===== TILT EFFECT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});


// ===== MAGNETIC EFFECT ON BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});


// ===== TYPING EFFECT FOR HERO BADGE =====
const badge = document.querySelector('.hero__badge');
if (badge) {
  const roles = ['Available for opportunities', 'Open to freelance work', 'Seeking collaborations'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textNode = badge.childNodes[badge.childNodes.length - 1];

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      textNode.textContent = ' ' + currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      textNode.textContent = ' ' + currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 40 : 70;
    setTimeout(typeEffect, speed);
  }

  setTimeout(typeEffect, 3000);
}


// ===== PARALLAX ON HERO ORBIT =====
const heroOrbit = document.querySelector('.hero__orbit');
if (heroOrbit) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroOrbit.style.transform = `rotate(${scrolled * 0.1}deg)`;
  });
}


// ===== SKILL TAG RANDOM COLOR ON HOVER =====
const skillTags = document.querySelectorAll('.skill-tag');
const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#6366f1'];

skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    tag.style.borderColor = randomColor;
    tag.style.color = randomColor;
    tag.style.background = randomColor + '15';
  });

  tag.addEventListener('mouseleave', () => {
    tag.style.borderColor = '';
    tag.style.color = '';
    tag.style.background = '';
  });
});
