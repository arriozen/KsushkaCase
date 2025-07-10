const ksyushkas = [
    { name: "Непонимающая Ксюшка", image: "image/1.jpg", description: "Эта Ксюшка делает вид, что всё понимает, но на самом деле просто кивает и улыбается!" },
    { name: "Кофейная Ксюшка", image: "image/2.jpg", description: "Без чашки кофе эта Ксюшка не стартует, но с кофе она готова покорять мир!" },
    { name: "Ксюшка — Грустный Хомяк", image: "image/3.jpg", description: "Включает грустную музыку и строит щенячьи глазки, чтобы получить всё, что захочет!" },
    { name: "Злой Ксюшик", image: "image/4.jpg", description: "Когда кто-то шутит не в тему, она злится, но объятия быстро её успокаивают!" },
    { name: "Ксюшка-Подарок", image: "image/5.jpg", description: "Лучший сюрприз под ёлкой — это Ксюшка, завёрнутая в праздничное настроение!" },
    { name: "Сонный Ксюшик", image: "image/6.jpg", description: "Этот мастер уюта утащит всё одеяло и займёт всю кровать!" },
    { name: "Эротичный Ксюшик", image: "image/7.jpg", description: "Один взгляд — и ты понимаешь, почему все вокруг влюблены в эту Ксюшку!" },
    { name: "Плачущий Ксюшик", image: "image/8.jpg", description: "Слёзы счастья текут рекой, когда герои мультика побеждают зло!" }
];

const carouselInner = document.getElementById('carouselInner');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const result = document.getElementById('result');
const arrow = document.getElementById('arrow');
const centerArrow = document.getElementById('centerArrow');

function createCarouselItems() {
    // Create multiple sets of items for seamless scrolling
    const extendedKsyushkas = [...ksyushkas, ...ksyushkas, ...ksyushkas, ...ksyushkas];
    extendedKsyushkas.forEach(ksyushka => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = `<img src="${ksyushka.image}" alt="${ksyushka.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
        carouselInner.appendChild(item);
    });
}

function spinCarousel() {
    startBtn.disabled = true;
    result.textContent = '';
    arrow.classList.remove('visible');
    const items = document.querySelectorAll('.carousel-item');
    items.forEach(item => item.classList.remove('active'));

    const totalItems = ksyushkas.length;
    const selectedIndex = Math.floor(Math.random() * totalItems);
    const itemWidth = window.innerWidth > 600 ? 160 : 105; // 150px + 10px margin or 100px + 5px margin
    const carouselWidth = window.innerWidth > 600 ? 600 : 300;
    const spins = totalItems * 2 + selectedIndex;
    const offset = -(spins * itemWidth);

    carouselInner.style.transition = 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    carouselInner.style.transform = `translateX(${offset}px)`;

    setTimeout(() => {
        // Center the selected item
        const centerOffset = -((totalItems + selectedIndex) * itemWidth) + (carouselWidth / 2) - (itemWidth / 2);
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(${centerOffset}px)`;
        
        items[totalItems + selectedIndex].classList.add('active');
        arrow.classList.add('visible');
        result.innerHTML = `Сегодня ты: <strong>${ksyushkas[selectedIndex].name}</strong><br>${ksyushkas[selectedIndex].description}`;
        startBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
    }, 4000);
}

function resetCarousel() {
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = 'translateX(0)';
    startBtn.disabled = false;
    startBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    result.textContent = '';
    arrow.classList.remove('visible');
    const items = document.querySelectorAll('.carousel-item');
    items.forEach(item => item.classList.remove('active'));
}

startBtn.addEventListener('click', spinCarousel);
restartBtn.addEventListener('click', resetCarousel);

createCarouselItems();