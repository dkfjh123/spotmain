import { PERSONAS, FAQS } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Persona Grid
    const personaGrid = document.getElementById('persona-grid');
    if (personaGrid) {
        PERSONAS.forEach(p => {
            const card = document.createElement('div');
            card.className = 'p-10 border border-zinc-100 rounded-[40px] hover:border-blue-100 hover:bg-zinc-50 transition-all flex flex-col h-full group';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-10">
                    <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-zinc-50">
                        <i data-lucide="${p.icon}" class="text-zinc-400 group-hover:text-blue-600 transition-colors"></i>
                    </div>
                    <span class="text-[10px] font-black text-zinc-300 uppercase tracking-widest">${p.tag}</span>
                </div>
                <h4 class="text-2xl font-bold mb-4 leading-tight">${p.title}</h4>
                <p class="text-blue-600 text-xs font-bold mb-6">${p.subtitle}</p>
                <p class="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">${p.description}</p>
                <button onclick="openModal()" class="w-full py-4 rounded-2xl bg-white border border-zinc-100 text-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-all">상담하기</button>
            `;
            personaGrid.appendChild(card);
        });
    }

    // FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        FAQS.forEach((f) => {
            const item = document.createElement('div');
            item.className = 'faq-item border border-zinc-100 p-6 rounded-3xl cursor-pointer bg-white transition-all hover:border-zinc-300';
            item.innerHTML = `
                <div class="flex justify-between items-center gap-6">
                    <h4 class="text-lg font-bold text-zinc-800">Q. ${f.q}</h4>
                    <div class="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center transition-colors">
                        <i data-lucide="plus" class="w-4 h-4 text-zinc-400 transition-transform"></i>
                    </div>
                </div>
                <div class="faq-answer text-zinc-500 leading-relaxed overflow-hidden max-h-0 transition-all duration-300">
                    <div class="pt-6 mt-6 border-t border-zinc-50">
                        <p class="text-zinc-600 text-sm font-medium leading-relaxed">${f.a}</p>
                    </div>
                </div>
            `;
            item.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('[data-lucide="plus"]');
                const isActive = item.classList.toggle('active');
                answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : '0px';
                if (icon) icon.style.transform = isActive ? 'rotate(45deg)' : 'rotate(0deg)';
            });
            faqContainer.appendChild(item);
        });
    }

    lucide.createIcons();

    // Scroll Animations
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.batch("#persona-grid > div, .catalog-item", {
            onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }),
            start: "top 90%"
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = menuToggle?.querySelector('i');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('hidden');
            // Toggle icon between menu and x
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
                lucide.createIcons();
            }
        });
    }

    // Mobile Nav Links - close menu on click
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // Form Submit
    const form = document.getElementById('consultForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(form);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    alert('성공적으로 접수되었습니다!\n확인 후 순차적으로 연락드리겠습니다.');
                    form.reset();
                    closeModal();
                } else {
                    alert('전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                }
            } catch (error) {
                alert('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
