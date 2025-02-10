// Animation for impact statistics
function animateStats() {
  const plasticRecycled = document.getElementById('plastic-recycled');
  const contributors = document.getElementById('contributors');
  const treesSaved = document.getElementById('trees-saved');
  const co2Saved = document.getElementById('co2-saved');

  let current = 0;
  const target = {
    plastic: 5000,
    contributors: 1200,
    trees: 300,
    co2: 10000
  };
  const duration = 2000;
  const steps = 60;

  const increment = {
    plastic: target.plastic / steps,
    contributors: target.contributors / steps,
    trees: target.trees / steps,
    co2: target.co2 / steps
  };

  const interval = duration / steps;

  const animation = setInterval(() => {
    current++;
    
    plasticRecycled.textContent = Math.round(increment.plastic * current);
    contributors.textContent = Math.round(increment.contributors * current);
    treesSaved.textContent = Math.round(increment.trees * current);
    co2Saved.textContent = Math.round(increment.co2 * current);

    if (current === steps) {
      clearInterval(animation);
    }
  }, interval);
}

// Product carousel functionality
function initCarousel() {
  const carousel = document.querySelector('.product-grid');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  let currentPosition = 0;

  nextButton.addEventListener('click', () => {
    currentPosition -= 100;
    if (currentPosition < -(carousel.children.length - 1) * 100) {
      currentPosition = 0;
    }
    carousel.style.transform = `translateX(${currentPosition}%)`;
  });

  prevButton.addEventListener('click', () => {
    currentPosition += 100;
    if (currentPosition > 0) {
      currentPosition = -(carousel.children.length - 1) * 100;
    }
    carousel.style.transform = `translateX(${currentPosition}%)`;
  });
}

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Modal functionality
window.openScheduleForm = function() {
  document.getElementById('schedule-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

window.closeScheduleForm = function() {
  document.getElementById('schedule-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.handleScheduleSubmit = function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Here you would typically send the form data to your backend
  // For now, we'll just show a success message
  alert('Thank you for scheduling a collection! We will contact you shortly.');
  closeScheduleForm();
}

// Contact form submission
window.handleContactSubmit = function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Here you would typically send the form data to your backend
  alert('Thank you for your message! We will get back to you soon.');
  form.reset();
}

// Show rewards
window.showRewards = function() {
  alert('Join our rewards program to earn points and get up to 30% discount on our products!');
}

// Smooth scrolling for navigation
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Scroll animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Google Maps initialization
window.initMap = function() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

// Track collection status
window.trackCollection = function() {
  const trackingId = document.getElementById('tracking-id').value;
  if (!trackingId) {
    alert('Please enter a tracking ID');
    return;
  }
  
  // Here you would typically fetch the tracking status from your backend
  // For now, we'll just show a mock status
  const status = document.getElementById('tracking-status');
  status.innerHTML = `
    <div class="tracking-details">
      <p><strong>Status:</strong> In Progress</p>
      <p><strong>Estimated Arrival:</strong> 30 minutes</p>
      <p><strong>Collection Agent:</strong> John Doe</p>
    </div>
  `;
}

// Initialize all functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
  initCarousel();
  initFAQ();
  initSmoothScroll();
  initMobileMenu();
  initScrollAnimations();
});

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('schedule-modal');
  if (event.target === modal) {
    closeScheduleForm();
  }
}

// Handle active navigation links
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize active nav link functionality
updateActiveNavLink();