// clock.js — Exercise 2
// Handles time-based greeting (dialog box) and live digital clock.

function showGreeting() {
    let hour = new Date().getHours();
    let greeting, icon;

   if      (hour >= 5  && hour < 12) { greeting = "Good Morning";   icon = "✦"; }
else if (hour >= 12 && hour < 17) { greeting = "Good Afternoon"; icon = "☼"; }
else if (hour >= 17 && hour < 21) { greeting = "Good Evening";   icon = "☾"; }
else                              { greeting = "Good Night";     icon = "★"; }

    alert(greeting + "!");

    
    document.getElementById('greeting-icon').textContent = icon;
    document.getElementById('greeting-text').textContent = greeting;
}

function updateClock() {
    let now    = new Date();
    let h      = now.getHours();
    let m      = now.getMinutes();
    let s      = now.getSeconds();
    let period = h >= 12 ? 'PM' : 'AM';

    h = h % 12 || 12;

    let hh = String(h).padStart(2, '0');
    let mm = String(m).padStart(2, '0');
    let ss = String(s).padStart(2, '0');

    document.getElementById('clock').innerHTML =
        hh + '<span class="colon">:</span>' + mm + '<span class="colon">:</span>' + ss;

    document.getElementById('period').textContent = period;

    let opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent =
        now.toLocaleDateString('en-US', opts);
}

window.onload = function () {
    showGreeting();
    updateClock();
    setInterval(updateClock, 1000);
};