const thumbnails = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
let current = 0;
let slideshowInterval = null;

// Preload next image
function preloadNext() {
  const next = new Image();
  next.src =
    "assets/thumbnails/the-chair/" +
    thumbnails[(current + 1) % thumbnails.length];
}

function startSlideshow() {
  if (slideshowInterval) return; // Already running

  slideshowInterval = setInterval(() => {
    current = (current + 1) % thumbnails.length;
    document.getElementById("chair-thumbnail").src =
      "assets/thumbnails/the-chair/" + thumbnails[current];
    preloadNext();
  }, 1500);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    current = 0; // Reset to first image
    document.getElementById("chair-thumbnail").src =
      "assets/thumbnails/the-chair/" + thumbnails[0];
  }
}

const projectLinks = document.querySelectorAll("a[href]");

projectLinks.forEach((link) => {
  const preview = link.nextElementSibling;

  // Only add hover behavior if there's a preview div after the link
  if (preview && preview.classList.contains("preview")) {
    link.addEventListener("mouseenter", () => {
      preview.style.display = "block";
      preview.style.position = "fixed";
      preview.style.opacity = "0";
      // Trigger reflow to ensure transition works
      preview.offsetHeight;
      preview.style.opacity = "1";

      startSlideshow(); // Start slideshow when preview appears
    });

    link.addEventListener("mousemove", (e) => {
      const rect = preview.getBoundingClientRect();
      const x = Math.min(e.clientX + 10, window.innerWidth - rect.width - 16);
      const y = Math.min(e.clientY + 10, window.innerHeight - rect.height - 16);

      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    });

    link.addEventListener("mouseleave", () => {
      preview.style.opacity = "0";
      stopSlideshow(); // Stop slideshow when preview hides

      // Wait for fade out before hiding
      setTimeout(() => {
        preview.style.display = "none";
      }, 200);
    });
  }
});

class CardManager {
  constructor() {
    this.openCards = [];
    this.cardIdCounter = 0;
    this.container = document.getElementById("cards-container");
    this.templateCache = new Map();
  }

  // Reusable template fetcher
  async getTemplate(templateName) {
    // Check cache first
    if (this.templateCache.has(templateName)) {
      return this.templateCache.get(templateName);
    }

    // Fetch from built files
    const response = await fetch(`/cards/${templateName}`);
    if (!response.ok) {
      throw new Error(`Template ${templateName} not found`);
    }

    const html = await response.text();
    this.templateCache.set(templateName, html);
    return html;
  }

  async openCard(type, options = {}) {
    const cardId = `card-${this.cardIdCounter++}`;

    // Get the pre-rendered template
    const content = await this.getTemplate(`${type}.html`);

    // Create and append card
    const cardElement = this.createCardElement(cardId, type, content, options);
    this.container.appendChild(cardElement);

    // Store reference
    this.openCards.push({
      id: cardId,
      type: type,
      element: cardElement,
    });

    // Run any post-mount initialization
    await this.initializeCard(cardId, type, cardElement);

    // Animate in
    setTimeout(() => cardElement.classList.add("visible"), 10);
  }

  // Initialize card-specific JavaScript (runs AFTER template is in DOM)
  async initializeCard(cardId, type, element) {
    const initializers = {
      "the-chair": this.initTheChair.bind(this),
      projects: this.initProjects.bind(this),
      // Add more as needed
    };

    const initializer = initializers[type];
    if (initializer) {
      await initializer(cardId, element);
    }
  }

  // Card-specific initialization
  async initTheChair(cardId, element) {
    // Make sure Swiper is loaded
    if (!window.Swiper) {
      await this.loadSwiper();
    }

    const contentEl = element.querySelector(".card-content");

    // Initialize vertical swiper (unique to this card instance)
    const verticalSwiper = new Swiper(contentEl.querySelector(".swiper-v"), {
      direction: "vertical",
      navigation: {
        nextEl: contentEl.querySelector(".swiper-button-down"),
        prevEl: contentEl.querySelector(".swiper-button-up"),
      },
      nested: true,
    });

    // Initialize all horizontal swipers in this card
    const horizontalSwipers = contentEl.querySelectorAll(".swiper-h");
    horizontalSwipers.forEach((swiperEl) => {
      new Swiper(swiperEl, {
        direction: "horizontal",
        navigation: {
          nextEl: swiperEl.querySelector(".swiper-button-next"),
          prevEl: swiperEl.querySelector(".swiper-button-prev"),
        },
        nested: true,
      });
    });

    // Store swiper instances for cleanup
    this.openCards.find((card) => card.id === cardId).swipers = {
      vertical: verticalSwiper,
      horizontal: Array.from(horizontalSwipers),
    };
  }

  async initProjects(cardId, element) {
    // Any project-specific initialization
    console.log("Projects card initialized");
  }

  async loadSwiper() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    await new Promise((resolve) => {
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  getCardTitle(type) {
    const titles = {
      "the-chair": "The Chair",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    };
    return titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
  }

  closeCard(cardId) {
    const cardData = this.openCards.find((card) => card.id === cardId);
    if (!cardData) return;

    const cardElement = cardData.element;

    // Clean up swipers if they exist
    if (cardData.swipers) {
      cardData.swipers.vertical?.destroy();
      cardData.swipers.horizontal?.forEach((s) => s.destroy());
    }

    // Animate out
    cardElement.classList.remove("visible");

    setTimeout(() => {
      cardElement.remove();
      this.openCards = this.openCards.filter((card) => card.id !== cardId);
    }, 300);
  }
}

// Initialize and expose globally
const cardManager = new CardManager();
window.openCard = (type, options) => cardManager.openCard(type, options);
