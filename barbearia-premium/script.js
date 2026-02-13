// script.js - captura dados do formulário de agendamento e abre WhatsApp com mensagem preenchida
document.addEventListener('DOMContentLoaded', function () {
  const bookingForm = document.getElementById('bookingForm');
  const phoneNumber = '5519988887777'; // número destino

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData(bookingForm);
    const name = form.get('name') || '';
    const phone = form.get('phone') || '';
    const service = form.get('service') || '';
    const datetime = form.get('datetime') || '';

    let message = `Olá, gostaria de agendar um serviço.%0A`;
    if (name) message += `Nome: ${name}%0A`;
    if (phone) message += `Telefone: ${phone}%0A`;
    if (service && service !== 'Escolha um serviço') message += `Serviço: ${service}%0A`;
    if (datetime) message += `Data/Hora: ${datetime}%0A`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');

    // fecha modal (Bootstrap 5)
    const modalEl = document.getElementById('bookingModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    bookingForm.reset();
  });

  // ---------- Testimonials slider & stars ----------
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    const items = slider.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    let index = 0;

    function updateSlider() {
      const viewport = slider.parentElement.clientWidth;
      slider.style.transform = `translateX(-${index * viewport}px)`;
    }

    window.addEventListener('resize', updateSlider);

    prevBtn && prevBtn.addEventListener('click', function () {
      index = Math.max(0, index - 1);
      updateSlider();
    });

    nextBtn && nextBtn.addEventListener('click', function () {
      index = Math.min(items.length - 1, index + 1);
      updateSlider();
    });

    // autoplay testimonials
    let tAuto = setInterval(function () {
      index = (index + 1) % items.length;
      updateSlider();
    }, 4500);

    // pause on hover
    slider.addEventListener('mouseenter', function () { clearInterval(tAuto); });
    slider.addEventListener('mouseleave', function () { tAuto = setInterval(function () { index = (index + 1) % items.length; updateSlider(); }, 4500); });

    // render stars based on data-rating
    const starsEls = slider.querySelectorAll('.stars');
    starsEls.forEach(function (el) {
      const rating = parseInt(el.getAttribute('data-rating')) || 0;
      el.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        if (i <= rating) star.className = 'fas fa-star';
        else star.className = 'far fa-star';
        el.appendChild(star);
      }
    });

    // initial position
    setTimeout(updateSlider, 50);
  }

  // ---------- Hero background slideshow ----------
  const heroSlides = document.querySelectorAll('.hero-bg .slide');
  if (heroSlides && heroSlides.length) {
    let hIndex = 0;
    heroSlides[hIndex].classList.add('active');
    setInterval(() => {
      heroSlides[hIndex].classList.remove('active');
      hIndex = (hIndex + 1) % heroSlides.length;
      heroSlides[hIndex].classList.add('active');
    }, 5000);
  }

  // ---------- Highlight current day in hours list ----------
  const today = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  const hoursList = document.querySelectorAll('.hours-list li');
  hoursList.forEach(li => {
    if (li.getAttribute('data-day') == String(today)) {
      li.classList.add('today');
    }
  });

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.custom-navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
