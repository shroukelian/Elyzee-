document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. معالجة تبديل اللغة (Arabic First) ---
    const langBtn = document.getElementById('langSwitcher');
    const langText = document.getElementById('langText'); 
    const htmlTag = document.documentElement;

    function applyLanguage(lang) {
        if (lang === 'en') {
            htmlTag.setAttribute('lang', 'en');
            htmlTag.setAttribute('dir', 'ltr');
            if (langText) langText.textContent = 'العربية';
        } else {
            htmlTag.setAttribute('lang', 'ar');
            htmlTag.setAttribute('dir', 'rtl');
            if (langText) langText.textContent = 'English';
        }
        localStorage.setItem('userLang', lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = htmlTag.getAttribute('lang') || 'ar';
            const nextLang = (currentLang === 'ar') ? 'en' : 'ar';
            applyLanguage(nextLang);
        });
    }

    // تطبيق اللغة عند التحميل
    const savedLang = localStorage.getItem('userLang') || 'ar';
    applyLanguage(savedLang);


    // --- 2. تشغيل قائمة الموبايل (Hamburger Menu) ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links'); // التعديل هنا لاستهداف الـ UL مباشرة

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navLinks.classList.toggle('active');
            
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }


    // --- 3. أنيميشن السكرول (Reveal on Scroll) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

});