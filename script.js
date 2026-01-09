// West Parfums - JavaScript Functionality

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navbar.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navbar.classList.remove('active');
    }
  });
}

// Product size selection functionality
function selectSize(selectedElement) {
  // Get the parent product card
  const productCard = selectedElement.closest('.product-card');
  
  // Remove 'selected' class from all size options in this product
  const sizeOptions = productCard.querySelectorAll('.size-option');
  sizeOptions.forEach(option => option.classList.remove('selected'));
  
  // Add 'selected' class to clicked option
  selectedElement.classList.add('selected');
  
  // Optional: Update WhatsApp link with selected size
  updateWhatsAppLink(productCard, selectedElement);
}

// Function to update WhatsApp link with selected size
function updateWhatsAppLink(productCard, sizeElement) {
  const productName = productCard.querySelector('.product-name').textContent;
  const sizeLabel = sizeElement.querySelector('.size-label').textContent;
  const sizePrice = sizeElement.querySelector('.size-price').textContent;
  const whatsappBtn = productCard.querySelector('.whatsapp-btn');
  
  // Get the base WhatsApp number
  const whatsappNumber = '59169470832';
  
  // Create updated message
  const message = `Hola! Me interesa el *${productName}* en tamaño ${sizeLabel} (${sizePrice}) 🌸

¿Podrías darme más información sobre precio y disponibilidad?`;
  
  // Update the href
  const encodedMessage = encodeURIComponent(message);
  whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

// Smooth scrolling for internal links
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

// Animation on scroll functionality
function animateOnScroll() {
  const cards = document.querySelectorAll('.product-card, .info-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  animateOnScroll();
  
  // Lazy loading for images
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
  });
});

// Function to add new products dynamically (for future use)
function addProduct(productData) {
  const productsGrid = document.querySelector('.products-grid');
  
  const productHTML = `
    <div class="product-card">
      <div class="product-image">
        <img src="${productData.image}" alt="${productData.name}">
      </div>
      <div class="product-info">
        <h3 class="product-name">${productData.name}</h3>
        <p class="product-description">${productData.description}</p>
        <div class="product-sizes">
          <div class="size-option selected" onclick="selectSize(this)">
            <span class="size-label">5ml</span>
            <span class="size-price">Bs. ${productData.price5ml}</span>
          </div>
          <div class="size-option" onclick="selectSize(this)">
            <span class="size-label">10ml</span>
            <span class="size-price">Bs. ${productData.price10ml}</span>
          </div>
        </div>
        <a class="whatsapp-btn" href="https://wa.me/59169470832?text=Hola!%20Me%20interesa%20el%20*${encodeURIComponent(productData.name)}*%20🌸%0A%0A¿Podrías%20darme%20más%20información%20sobre%20precio%20y%20disponibilidad?" target="_blank">
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  `;
  
  productsGrid.insertAdjacentHTML('beforeend', productHTML);
}