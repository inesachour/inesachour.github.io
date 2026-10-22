// DOM Elements
const body = document.body;
const btnTheme = document.querySelector('.theme-toggle');
const btnHamburger = document.querySelector('.nav-hamburger');
const navList = document.querySelector('.nav-list');
const btnScrollTop = document.querySelector('.scroll-top');
const themeIcon = btnTheme ? btnTheme.querySelector('i') : null;
const hamburgerIcon = btnHamburger ? btnHamburger.querySelector('i') : null;

// Theme Handling
const themeKey = 'portfolio-theme';
const getSavedTheme = () => localStorage.getItem(themeKey);
const saveTheme = (theme) => localStorage.setItem(themeKey, theme);

const applyTheme = (theme) => {
	if (theme === 'light') {
		body.classList.add('light');
		body.classList.remove('dark');
		if (themeIcon) {
			themeIcon.classList.remove('fa-sun');
			themeIcon.classList.add('fa-moon');
		}
	} else {
		body.classList.add('dark');
		body.classList.remove('light');
		if (themeIcon) {
			themeIcon.classList.remove('fa-moon');
			themeIcon.classList.add('fa-sun');
		}
	}
};

const toggleTheme = () => {
	const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	applyTheme(newTheme);
	saveTheme(newTheme);
};

// Initialize Theme
const savedTheme = getSavedTheme();
if (savedTheme) {
	applyTheme(savedTheme);
} else {
	// Default to dark
	applyTheme('dark');
}

if (btnTheme) {
	btnTheme.addEventListener('click', toggleTheme);
}

// Mobile Menu
const toggleMenu = () => {
	navList.classList.toggle('show');
	if (hamburgerIcon) {
		if (navList.classList.contains('show')) {
			hamburgerIcon.classList.remove('fa-bars');
			hamburgerIcon.classList.add('fa-times');
		} else {
			hamburgerIcon.classList.remove('fa-times');
			hamburgerIcon.classList.add('fa-bars');
		}
	}
};

if (btnHamburger) {
	btnHamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
document.querySelectorAll('.link--nav').forEach(link => {
	link.addEventListener('click', () => {
		navList.classList.remove('show');
		if (hamburgerIcon) {
			hamburgerIcon.classList.remove('fa-times');
			hamburgerIcon.classList.add('fa-bars');
		}
	});
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
}

// Scroll to Top
const handleScroll = () => {
	if (window.scrollY > 300) {
		btnScrollTop.classList.add('show');
	} else {
		btnScrollTop.classList.remove('show');
	}
};

window.addEventListener('scroll', handleScroll);

// Scroll Reveal Animation (Simple Intersection Observer)
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('animate-in');
			observer.unobserve(entry.target);
			// Drop the reveal classes afterwards so card hover transitions work normally
			setTimeout(() => entry.target.classList.remove('reveal', 'animate-in'), 700);
		}
	});
}, observerOptions);

document.querySelectorAll(
	'.section-header, .about-content, .project-card, .timeline-item, .article-card, .skill-category, .contact-container'
).forEach(el => {
	el.classList.add('reveal');
	observer.observe(el);
});

// Highlight the nav link of the section in view
const navLinks = document.querySelectorAll('.link--nav');
const sectionObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			navLinks.forEach(link => {
				link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
			});
		}
	});
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

