document.getElementById('currentYear').textContent = new Date().getFullYear();

var header = document.getElementById('header');
var lastScroll = 0;
var ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            var currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 80) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('menu-open');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) { observer.observe(el); });

document.querySelectorAll('.unit-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        var target = this.getAttribute('data-unit');
        document.querySelectorAll('.unit-tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.unit-panel').forEach(function(p) { p.classList.remove('active'); });
        var panel = document.querySelector('.unit-panel[data-panel="' + target + '"]');
        if (panel) {
            panel.classList.add('active');
            var revealEls = panel.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            revealEls.forEach(function(el) { el.classList.add('visible'); });
        }
    });
});

var privacyBtn = document.getElementById('privacyBtn');
var privacyModal = document.getElementById('privacyModal');
var closeModal = document.getElementById('closeModal');
privacyBtn.addEventListener('click', function() {
    privacyModal.classList.remove('hidden');
    requestAnimationFrame(function() { privacyModal.classList.add('show'); });
    document.body.style.overflow = 'hidden';
});
function closePrivacy() {
    privacyModal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function() { privacyModal.classList.add('hidden'); }, 300);
}
closeModal.addEventListener('click', closePrivacy);
privacyModal.addEventListener('click', function(e) { if (e.target === privacyModal) closePrivacy(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && privacyModal.classList.contains('show')) closePrivacy(); });

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});
