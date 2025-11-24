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
		}
	});
}, observerOptions);

// Add animation classes to elements you want to animate
// You can add a CSS class .animate-in { opacity: 1; transform: translateY(0); }
// and initial state in CSS for these elements.
// For now, we'll just leave this structure ready for future enhancements.

