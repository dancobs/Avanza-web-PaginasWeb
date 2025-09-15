document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerHeight = document.getElementById("header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = {}
      for (const [key, value] of formData.entries()) {
        data[key] = value
      }

      // Simple validation
      if (!data.nombre || !data.email || !data.telefono || !data.mensaje) {
        alert("Por favor completa todos los campos obligatorios.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Por favor ingresa un email válido.")
        return
      }

      // Phone validation (Guatemala format)
      const phoneRegex = /^$$\+502$$\s\d{4}-\d{4}$/
      if (!phoneRegex.test(data.telefono)) {
        alert("Por favor ingresa el teléfono en formato (+502) XXXX-XXXX")
        return
      }

      // Simulate form submission
      alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")
      this.reset()
    })
  }

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".card, .product-card, .service-card, .project-card")
  animateElements.forEach((el) => {
    observer.observe(el)
  })

  // Header scroll effect
  let lastScrollTop = 0
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Add loading effect to images
  const images = document.querySelectorAll('img[loading="lazy"]')
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
})

// Utility functions
function formatPhoneNumber(input) {
  // Format phone number as user types
  let value = input.value.replace(/\D/g, "")

  if (value.length >= 8) {
    value = value.substring(0, 8)
    value = `(+502) ${value.substring(0, 4)}-${value.substring(4)}`
  } else if (value.length >= 4) {
    value = `(+502) ${value.substring(0, 4)}-${value.substring(4)}`
  } else if (value.length > 0) {
    value = `(+502) ${value}`
  }

  input.value = value
}

// Add phone formatting to phone input
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("telefono")
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      formatPhoneNumber(this)
    })

    phoneInput.addEventListener("focus", function () {
      if (this.value === "") {
        this.value = "(+502) "
      }
    })
  }
})
