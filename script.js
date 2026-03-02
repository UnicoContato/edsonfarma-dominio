document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('year').textContent = new Date().getFullYear();

    const units = [
        {
            name: "EDSON FARMA DROGARIA E PERFUMARIA LTDA",
            cnpj: "08.805.550/0001-90",
            address: "R Luis de Almeida Carvalho, 28, Jd Arabutam, Embu das Artes - SP",
            phone: "(11) 91449-9239",
            email: "contatec@uol.com.br",
            mapQuery: "Rua Luis de Almeida Carvalho, 28, Jardim Arabutam, Embu das Artes - SP"
        },
        {
            name: "FARMA KIDO LTDA - EPP",
            cnpj: "01.233.251/0001-89",
            address: "Av Rubens Caramez, 292, Centro, Itapevi - SP",
            phone: "(11) 4141-0000", 
            email: "N/A",
            mapQuery: "Av Rubens Caramez, 292, Centro, Itapevi - SP"
        },
        {
            name: "CALI DROGARIA E PERFUMARIA EIRELI",
            cnpj: "39.528.969/0001-75",
            address: "R Engenheiro Leon Psanquevich, 75, Centro, Cotia - SP",
            phone: "(11) 4704-4106",
            email: "contatec@uol.com.br",
            mapQuery: "R Engenheiro Leon Psanquevich, 75, Centro, Cotia - SP"
        },
        {
            name: "VEC DROGARIA E PERFUMARIA LTDA",
            cnpj: "46.412.053/0001-10",
            address: "Rod Regis Bittencourt, 78, Centro, Taboão da Serra - SP",
            phone: "(11) 6304-7442",
            email: "edson@edsonfarma.com.br",
            mapQuery: "Rod Regis Bittencourt, 78, Centro, Taboao da Serra - SP"
        }
    ];

    // Elementos do DOM
    const uName = document.getElementById('unit-legal-name');
    const uCnpj = document.getElementById('unit-cnpj');
    const uAddr = document.getElementById('unit-address');
    const uPhone = document.getElementById('unit-phone');
    const uEmail = document.getElementById('unit-email');
    const mapFrame = document.getElementById('map-frame');
    const mapOverlay = document.getElementById('map-overlay');

    window.changeUnit = function(index) {
        document.querySelectorAll('.unit-btn').forEach((btn, i) => {
            if (i === index) {
                btn.className = "unit-btn px-6 py-3 rounded-full border border-brand-yellow bg-brand-yellow text-black font-bold text-sm uppercase tracking-wide shadow-[0_0_15px_rgba(255,204,0,0.4)] transform scale-105 transition-all duration-300";
            } else {
                btn.className = "unit-btn px-6 py-3 rounded-full border border-white/20 bg-white/5 text-gray-300 font-bold text-sm uppercase tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300";
            }
        });

        const card = document.getElementById('contact-card');
        
        const unit = units[index];
        
        uName.textContent = unit.name;
        uCnpj.textContent = `CNPJ: ${unit.cnpj}`;
        uAddr.textContent = unit.address;
        uPhone.textContent = unit.phone;
        uEmail.textContent = unit.email;
        uEmail.href = unit.email !== "N/A" ? `mailto:${unit.email}` : "#";

        if(mapOverlay) {
            mapOverlay.classList.remove('opacity-0');
            setTimeout(() => {
                mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
                setTimeout(() => {
                    mapOverlay.classList.add('opacity-0');
                }, 500);
            }, 300);
        } else {
            mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(unit.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
    };

    changeUnit(0);

    let lastScrollTop = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        if (scrollTop > 50) {
            header.classList.add('bg-black/80', 'backdrop-blur-lg');
            header.classList.remove('bg-black/30');
        } else {
            header.classList.remove('bg-black/80', 'backdrop-blur-lg');
            header.classList.add('bg-black/30');
        }
        
        lastScrollTop = scrollTop;
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-element').forEach(el => {
        observer.observe(el);
    });
});