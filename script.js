// Инициализация AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Инициализация particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    }
);

// Эффект печатающегося текста
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Инициализация эффекта печатающегося текста
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    typeWriter(typingElement, typingElement.textContent);
});

// Добавляем функционал навигации с более плавной прокруткой
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        const section = this.getAttribute('data-section');
        let element;
        
        if (section === 'header') {
            element = document.querySelector('header');
        } else {
            element = document.querySelector(`.${section}`);
        }
        
        if (element) {
            const startPosition = window.pageYOffset;
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 50;
            const distance = targetPosition - startPosition;
            const duration = 800; // Уменьшаем длительность анимации с 1500 до 800
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                const ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                
                window.scrollTo(0, startPosition + (distance * ease(progress)));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Добавляем функцию плавности
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Обновляем активную кнопку при скролле
window.addEventListener('scroll', () => {
    const sections = ['header', 'about', 'skills', 'contact'];
    let current = '';
    
    sections.forEach(section => {
        const element = section === 'header' ? 
            document.querySelector('header') : 
            document.querySelector(`.${section}`);
            
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section;
            }
        }
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
});

// Обновляем обработчик формы с новым полем
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]:nth-child(1)').value;
            const telegram = this.querySelector('input[type="text"]:nth-child(2)').value;
            const message = this.querySelector('textarea').value;
            
            const BOT_TOKEN = '7485499760:AAG2Fq9mrnQ3Dr251RkyB6ZJ62z2yz-4NSk';
            const CHAT_ID = '6685769779';
            
            const text = `Новое сообщение!\n\nИмя: ${name}\nTelegram: ${telegram}\nСообщение: ${message}`;
            
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            
            const button = this.querySelector('.send-button');
            button.classList.add('sending');
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'HTML'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    setTimeout(() => {
                        button.classList.remove('sending');
                        button.classList.add('sent');
                        this.reset();
                        setTimeout(() => {
                            button.classList.remove('sent');
                        }, 2000);
                    }, 1000);
                } else {
                    button.classList.remove('sending');
                    alert('Произошла ошибка при отправке сообщения');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                button.classList.remove('sending');
                alert('Произошла ошибка при отправке сообщения');
            });
        });
    }
});

// Добавляем анимацию счетчика
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCount() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCount();
}

// Запускаем анимацию счетчиков при появлении в viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                const target = parseInt(number.textContent);
                animateCounter(number, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about-stats').forEach(stats => {
    observer.observe(stats);
}); 