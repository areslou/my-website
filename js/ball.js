let x       = 0;
let y       = 156;
let dx      = 4; 
let dy      = 3;
let bounces = 0;
let paused  = false;

const ball  = document.getElementById('ball');
const arena = document.getElementById('arena');
const statX = document.getElementById('statX');
const statY = document.getElementById('statY');
const statB = document.getElementById('statB');
const pauseBtn = document.getElementById('pauseBtn');

function update() {
    if (!paused) {
        // Update positions
        x += dx;
        y += dy;

        // CALCULATE BOUNDARIES
        // We use clientWidth/Height to get the INNER size (excluding borders)
        const maxX = arena.clientWidth - ball.offsetWidth;
        const maxY = arena.clientHeight - ball.offsetHeight;

        // BOUNCE LOGIC (Wall Collision)
        // Right Wall
        if (x >= maxX) { 
            x = maxX; 
            dx = -Math.abs(dx); 
            bounces++; 
        }
        // Left Wall
        if (x <= 0) { 
            x = 0;    
            dx = Math.abs(dx);  
            bounces++; 
        }
        // Bottom Wall
        if (y >= maxY) { 
            y = maxY; 
            dy = -Math.abs(dy); 
            bounces++; 
        }
        // Top Wall
        if (y <= 0) { 
            y = 0;    
            dy = Math.abs(dy);  
            bounces++; 
        }

        // Apply new position
        ball.style.transform = `translate(${x}px, ${y}px)`;

        // Update Stats
        if(statX) statX.textContent = Math.round(x);
        if(statY) statY.textContent = Math.round(y);
        if(statB) statB.textContent = bounces;
    }

    requestAnimationFrame(update);
}

function togglePause() {
    paused = !paused;
    if(pauseBtn) {
        pauseBtn.textContent = paused ? 'Resume' : 'Pause';
        // Toggle the styling class for the "active" look
        if (paused) {
            pauseBtn.classList.remove('primary');
        } else {
            pauseBtn.classList.add('primary');
        }
    }
}

function resetBall() {
    x = 0; 
    y = 156; 
    dx = 4; 
    dy = 3; 
    bounces = 0; 
    paused = false;
    
    // Reset visual position immediately
    ball.style.transform = `translate(${x}px, ${y}px)`;
    
    // Reset stats
    if(statX) statX.textContent = 0;
    if(statY) statY.textContent = 156;
    if(statB) statB.textContent = 0;
    
    // Reset button state
    if(pauseBtn) {
        pauseBtn.textContent = 'Pause';
        pauseBtn.classList.add('primary');
    }
}

// Start the loop
requestAnimationFrame(update);