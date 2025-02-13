(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener("DOMContentLoaded", function() {
  const marqueeSection = document.getElementById("anniversary-marquee");
  const currentDate = new Date();
  const endDate = new Date('2024-08-31'); // Set the end date for the marquee display

  if (currentDate > endDate) {
    if (marqueeSection) {
      marqueeSection.style.display = 'none';
    }
  }
});

/**
 * Function for the logo load for client and partner section
**/
document.addEventListener('DOMContentLoaded', () => {
  // Load and display client logos
  fetch('clients.txt')
    .then(response => response.text())
    .then(data => {
      const clients = data.trim().split('\n');
      const clientContainer = document.getElementById('client-logos');
      
      clients.forEach(client => {
        const [image, url] = client.split(',');
        if (image && url) {
          const imgElement = document.createElement('img');
          imgElement.src = `assets/img/clients/${image.trim()}`;
          imgElement.alt = image.trim();
          
          const anchorElement = document.createElement('a');
          anchorElement.href = url.trim();
          anchorElement.appendChild(imgElement);
          
          clientContainer.appendChild(anchorElement);
        }
      });
    })
    .catch(error => console.error('Error loading client logos:', error));
  
  // Load and display partner logos
  fetch('partners.txt')
    .then(response => response.text())
    .then(data => {
      const partners = data.trim().split('\n');
      const partnerContainer = document.getElementById('partner-logos');
      
      partners.forEach(partner => {
        const [image, url] = partner.split(',');
        if (image && url) {
          const imgElement = document.createElement('img');
          imgElement.src = `assets/img/partners/${image.trim()}`;
          imgElement.alt = image.trim();
          
          const anchorElement = document.createElement('a');
          anchorElement.href = url.trim();
          anchorElement.appendChild(imgElement);
          
          partnerContainer.appendChild(anchorElement);
        }
      });
    })
    .catch(error => console.error('Error loading partner logos:', error));
});

/**
 * Marquee text
 */
document.addEventListener('DOMContentLoaded', () => {
  fetch('Slider.txt')
    .then(response => response.text())
    .then(text => {
      const marquee = document.getElementById('marquee-text');
      if (marquee) {
        marquee.innerHTML = text;
      }
    })
    .catch(error => console.error('Error fetching anniversary text:', error));
});

/**
 * Team
 */
document.addEventListener('DOMContentLoaded', function() {
  const teamMembersContainer = document.getElementById('team-members');

  function fetchTeamData() {
    fetch('team.txt')
      .then(response => response.text())
      .then(data => {
        const members = data.trim().split('\n');
        let cardHtml = '';

        members.forEach(member => {
          const [imageName, fullName, profession, linkedin, twitter, instagram, facebook] = member.split(',');

          cardHtml += `
            <div class="swiper-slide">
              <div class="card-item">
                <div class="user-image-wrapper">
                  <img src="./assets/img/team/${imageName.trim()}" alt="${fullName.trim()}" class="user-image">
                </div>
                <h2 class="user-name">${fullName.trim()}</h2>
                <p class="user-profession">${profession.trim()}</p>
                <div class="social-links">
                  <a href="${linkedin.trim() ? linkedin.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
                  <a href="${twitter.trim() ? twitter.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-twitter"></i></a>
                  <a href="${facebook.trim() ? facebook.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
                  <a href="${instagram.trim() ? instagram.trim() : '#'}" target="_blank" rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>
                </div>
              </div>
            </div>
          `;
        });

        teamMembersContainer.innerHTML = cardHtml;

        new Swiper('.team-slider', {
          slidesPerView: 1,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        });
      })
      .catch(error => console.error('Error fetching team data:', error));
  }

  if (teamMembersContainer) {
    fetchTeamData();
  }
});

/**
 * Offices
 */
document.addEventListener("DOMContentLoaded", () => {
  const officeCards = document.getElementById('officeCards');

  if (officeCards) {
    fetch('offices.txt')
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');

        lines.forEach(line => {
          const [image, location, phone, email, address] = line.split('|');

          if (image && location && phone && email && address) {
            const card = document.createElement('div');
            card.classList.add('office-card');

            card.innerHTML = `
              <img src="assets/img/offices/${image}" alt="${location}">
              <div class="office-card-content">
                <h3>${location}</h3>
                <p>${address}</p>
                <p>${phone}</p>
                <a href="mailto:${email}">${email}</a>
              </div>
            `;

            officeCards.appendChild(card);
          } else {
            console.error('Error: Missing data in line:', line);
          }
        });
      })
      .catch(error => console.error('Error fetching office data:', error));
  } else {
    console.error('Error: officeCards element not found');
  }
});

/**
 * blog
 */
// Function to load blog posts from text file
// Function to load blog posts from text file
async function loadBlogPosts() {
  try {
    const response = await fetch('blog.txt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    const lines = data.trim().split('\n');

    const swiperWrapper = document.querySelector('#blog-posts');

    lines.forEach(line => {
      const [image, title, url] = line.split('|');

      if (title && url) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        if (image && image.trim()) {
          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'blog-image-wrapper';

          const img = document.createElement('img');
          img.src = `assets/img/blog/${image}`;
          img.alt = title;
          img.className = 'blog-image';

          imgWrapper.appendChild(img);
          blogCard.appendChild(imgWrapper);
        }

        const blogTitle = document.createElement('div');
        blogTitle.className = 'blog-title';
        blogTitle.textContent = title;

        const readMoreButton = document.createElement('a');
        readMoreButton.className = 'blog-read-more';
        readMoreButton.textContent = 'Read Blog';
        readMoreButton.href = url;
        readMoreButton.target = '_blank'; // Open in a new tab

        blogCard.appendChild(blogTitle);
        blogCard.appendChild(readMoreButton);

        slide.appendChild(blogCard);
        swiperWrapper.appendChild(slide);
      }
    });

    // Initialize Swiper
    const swiper = new Swiper('.blog-slider', {
      slidesPerView: 1, // Default for small screens
      spaceBetween: 15,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 1, // Still 1 card per row for small screens
        },
        1024: {
          slidesPerView: 3, // Show 3 cards per row for large screens
        },
      },
    });

  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

// Load the blog posts when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
});


/* contact 

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let formData = new FormData(this);
  let action = this.getAttribute('action');

  fetch(action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
  .then(data => {
    if (data.trim() === 'OK') {
      document.querySelector('.sent-message').classList.add('d-block');
      document.querySelector('.loading').classList.remove('d-block');
      document.querySelector('.error-message').classList.remove('d-block');
      document.getElementById('contact-form').reset();
    } else {
      throw new Error(data);
    }
  })
  .catch((error) => {
    displayError(error);
  });
});

function displayError(error) {
  document.querySelector('.loading').classList.remove('d-block');
  document.querySelector('.error-message').innerHTML = error;
  document.querySelector('.error-message').classList.add('d-block');
}

old blog section

async function loadBlogPosts() {
  try {
    const response = await fetch('blog.txt');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.text();
    const lines = data.trim().split('\n');

    const swiperWrapper = document.querySelector('#blog-posts');

    lines.forEach(line => {
      const [image, title, author, timestamp, summary, content] = line.split('|');

      if (title && summary) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';

        if (image && image.trim()) {
          const imgWrapper = document.createElement('div');
          imgWrapper.className = 'blog-image-wrapper';

          const img = document.createElement('img');
          img.src = `assets/img/blog/${image}`;
          img.alt = title;
          img.className = 'blog-image';

          imgWrapper.appendChild(img);
          blogCard.appendChild(imgWrapper);
        }

        const blogTitle = document.createElement('div');
        blogTitle.className = 'blog-title';
        blogTitle.textContent = title;

        const blogSummary = document.createElement('div');
        blogSummary.className = 'blog-summary';
        blogSummary.textContent = summary;

        const readMoreButton = document.createElement('button');
        readMoreButton.className = 'blog-read-more';
        readMoreButton.textContent = 'Read More';
        readMoreButton.onclick = () => showBlogDetails(image, title, author, timestamp, content);

        blogCard.appendChild(blogTitle);
        blogCard.appendChild(blogSummary);
        blogCard.appendChild(readMoreButton);

        slide.appendChild(blogCard);
        swiperWrapper.appendChild(slide);
      }
    });

    // Initialize Swiper
    const swiper = new Swiper('.blog-slider', {
      slidesPerView: 1, // Default for small screens
      spaceBetween: 15,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 1, // Still 1 card per row for small screens
        },
        1024: {
          slidesPerView: 3, // Show 3 cards per row for large screens
        },
      },
    });

  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}

// Function to show blog details in dialog
function showBlogDetails(image, title, author, timestamp, content) {
  document.getElementById('dialog-image').src = `assets/img/blog/${image}`;
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-author').textContent = `Author: ${author}`;
  document.getElementById('dialog-timestamp').textContent = `Published on: ${timestamp}`;
  document.getElementById('dialog-content').innerHTML = content;

  document.getElementById('blog-details-dialog').style.display = 'flex';
}

// Function to close the dialog
function closeDialog() {
  document.getElementById('blog-details-dialog').style.display = 'none';
}

document.querySelector('.dialog-close').addEventListener('click', closeDialog);

// Load the blog posts when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  loadBlogPosts();
});

*/