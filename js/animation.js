const rolesText = "Financial Risk & Analytics / Activities & Events Management / Scholar Services";
const rolesEl   = document.getElementById('roles');
let charIndex   = 0;

function typeRoles() {
    if (charIndex < rolesText.length) {
        rolesEl.textContent += rolesText[charIndex];
        charIndex++;
        setTimeout(typeRoles, 28);
    }
}

setTimeout(typeRoles, 900);

const symbols = ['✦', '☼', '✧', '⊙', '✺', '☾', '⋆'];

function spawnParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left              = Math.random() * 100 + 'vw';
    p.style.bottom            = '-20px';
    p.style.fontSize          = (10 + Math.random() * 8) + 'px';
    const dur                 = 10 + Math.random() * 14;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay   = Math.random() * 4 + 's';
    document.querySelector('.home-layout').appendChild(p);
    setTimeout(() => p.remove(), (dur + 4) * 1000);
}

for (let i = 0; i < 8; i++) spawnParticle();
setInterval(spawnParticle, 2200);

const trailCount = 6;
const dots = [];

for (let i = 0; i < trailCount; i++) {
    const d = document.createElement('div');
    d.className    = 'cursor-dot';
    d.style.opacity = (1 - i / trailCount) * 0.6;
    d.style.width  = (5 - i * 0.5) + 'px';
    d.style.height = (5 - i * 0.5) + 'px';
    document.body.appendChild(d);
    dots.push({ el: d, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let px = mouseX, py = mouseY;
    dots.forEach((dot, i) => {
        dot.x += (px - dot.x) * (0.35 - i * 0.04);
        dot.y += (py - dot.y) * (0.35 - i * 0.04);
        dot.el.style.left    = dot.x + 'px';
        dot.el.style.top     = dot.y + 'px';
        dot.el.style.opacity = Math.max(0, 0.6 - i * 0.08);
        px = dot.x;
        py = dot.y;
    });
    requestAnimationFrame(animateTrail);
}

animateTrail();
