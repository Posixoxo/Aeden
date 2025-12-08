// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    document.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        const scrollThreshold = 200; // Adjust this value for when the fade-out starts
    
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add("fade-out");
        } else {
            navbar.classList.remove("fade-out");
        }
    });

    // Blog Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.querySelectorAll('.blog-posts-wrapper .container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active and prev classes from all posts
        blogPosts.forEach(post => {
            post.classList.remove('active', 'prev');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add active class to current post
        blogPosts[index].classList.add('active');
        
        // Add active class to current indicator
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentIndex = index;
    }

    // Next button click
    nextBtn.addEventListener('click', function() {
        blogPosts[currentIndex].classList.add('prev');
        let nextIndex = (currentIndex + 1) % blogPosts.length;
        showSlide(nextIndex);
    });

    // Previous button click
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + blogPosts.length) % blogPosts.length;
        showSlide(prevIndex);
    });

    // Indicator click
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // Auto-slide every 5 seconds (optional)
    let autoSlide = setInterval(function() {
        blogPosts[currentIndex].classList.add('prev');
        let nextIndex = (currentIndex + 1) % blogPosts.length;
        showSlide(nextIndex);
    }, 5000);

    // Pause auto-slide on hover
    const carousel = document.querySelector('.blog-carousel');
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });

    carousel.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            blogPosts[currentIndex].classList.add('prev');
            let nextIndex = (currentIndex + 1) % blogPosts.length;
            showSlide(nextIndex);
        }, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});


/*....... JavaScript for the carousel ......*/ 

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const carouselContainer = document.querySelector('.carousel-container');
    let currentSlide = 0;
    let autoPlayInterval;

    // Set initial height based on first image
    function setCarouselHeight() {
        const activeSlide = document.querySelector('.carousel-slide.active img');
        if (activeSlide && activeSlide.complete) {
            carouselContainer.style.height = activeSlide.offsetHeight + 'px';
        }
    }

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Wrap around if index is out of bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Adjust container height to match new image
        const newActiveImg = slides[currentSlide].querySelector('img');
        if (newActiveImg.complete) {
            carouselContainer.style.height = newActiveImg.offsetHeight + 'px';
        } else {
            newActiveImg.onload = function() {
                carouselContainer.style.height = this.offsetHeight + 'px';
            };
        }
    }

    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners for controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Set initial height and handle window resize
    window.addEventListener('load', setCarouselHeight);
    window.addEventListener('resize', setCarouselHeight);

    // Ensure all images trigger height calculation when loaded
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img.complete) {
            setCarouselHeight();
        } else {
            img.addEventListener('load', setCarouselHeight);
        }
    });
}); 


/*.................. Blogpost ..................*/

// Set current date
const dateElement = document.getElementById('current-date');
const currentDate = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = currentDate.toLocaleDateString('en-US', options);

// Like button functionality
const likeBtn = document.getElementById('like-btn');
likeBtn.addEventListener('click', function() {
    this.classList.toggle('liked');
    if (this.classList.contains('liked')) {
        this.textContent = '♥ Liked';
    } else {
        this.textContent = '♥ Like';
    }
});

// Share button functionality
const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: document.querySelector('h1').textContent,
            text: 'Check out this blog post!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            const originalText = this.textContent;
            this.textContent = '✓ Link Copied!';
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    }
});


/*.................. comment section..................*/

document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toLocaleDateString();
    document.getElementById('current-date').textContent = currentDate;

    const submitCommentButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('comments-container');

    submitCommentButton.addEventListener('click', function() {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.textContent = commentText;
            commentsContainer.appendChild(commentDiv);
            commentInput.value = '';
        }
    });
});

      // Scroll to top on logo click
      const logos = document.querySelectorAll('img[alt="logo"], .img-z');
      logos.forEach(logo => {
        logo.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });

});
