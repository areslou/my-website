document.addEventListener("DOMContentLoaded", function () {

    // 1. SELECT ELEMENTS
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("inputName");
    const emailInput = document.getElementById("inputEmail");
    const messageInput = document.getElementById("inputMessage");
    const honeyInput = document.getElementsByName("_honey")[0];

    // 2. DEFINE SPAM WORDS & CONFIG
    const spamWords = [
        "free money", "buy now", "click here", "subscribe", "promo",
        "crypto", "bitcoin", "investment", "winner"
    ];
    const formLoadTime = Date.now();
    let submitTimes = [];

    // 3. GUARD: Make sure the form actually exists
    if (!form) {
        console.error("Form element with ID 'contactForm' not found!");
        return;
    }

    // 4. MAIN SUBMIT LISTENER
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submission caught by JavaScript.");

        // ─── CHECK A: Honeypot (Bot Trap) ───
        if (honeyInput && honeyInput.value !== "") {
            console.log("Bot detected via honeypot.");
            return; // Stop silently
        }

        // ─── CHECK B: Time-Based Filtering (Too Fast) ───
        if (Date.now() - formLoadTime < 2000) {
            alert("Submission was too fast. Are you human?");
            return;
        }

        // ─── CHECK C: Rate Limiting (Too Many Requests) ───
        const now = Date.now();
        submitTimes = submitTimes.filter(t => now - t < 60000); // Keep submissions in last 60s
        if (submitTimes.length >= 3) {
            alert("Too many submissions. Please wait a minute.");
            return;
        }
        submitTimes.push(now);

        // ─── CHECK D: Spam Keywords ───
        // FIXED: Added null-check for messageInput before accessing .value
        if (!messageInput) {
            console.error("Message textarea with ID 'inputMessage' not found!");
            alert("An unexpected error occurred. Please refresh and try again.");
            return;
        }
        const messageValue = messageInput.value.toLowerCase().trim();
        console.log("Checking message for spam:", messageValue);

        const foundSpam = spamWords.find(word => messageValue.includes(word));
        if (foundSpam) {
            alert(`Your message contains a blocked spam keyword: "${foundSpam}"`);
            console.log("Spam keyword detected:", foundSpam);
            return;
        }

        // ─── CHECK E: Email Validation ───
        // FIXED: Added null-check for emailInput before accessing .value
        if (!emailInput) {
            console.error("Email input with ID 'inputEmail' not found!");
            alert("An unexpected error occurred. Please refresh and try again.");
            return;
        }
        const emailValue = emailInput.value.trim();
        if (!emailValue.includes("@") || !emailValue.includes(".")) {
            alert("Please enter a valid email address.");
            return;
        }

        // ─── CHECK F: Name Field Not Empty ───
        // FIXED: Added an extra safety check for the name field
        if (!nameInput || nameInput.value.trim() === "") {
            alert("Please enter your name.");
            return;
        }

        // ─── ALL CHECKS PASSED ───
        console.log("All validation passed. Submitting form...");
        form.submit();
    });

});