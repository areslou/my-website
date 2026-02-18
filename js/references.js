

const SPAM_WORDS = [
    "free money", "buy now", "click here", "subscribe", "promo",
    "crypto", "bitcoin", "investment", "winner"
];

const FORM_LOAD_TIME = Date.now();
let submitTimes = [];

window.addEventListener("load", function () {

    console.log("✅ references.js loaded and running.");

    var form         = document.getElementById("contactForm");
    var nameInput    = document.getElementById("inputName");
    var emailInput   = document.getElementById("inputEmail");
    var messageInput = document.getElementById("inputMessage");
    var honeyInputs  = document.getElementsByName("_honey");
    var honeyInput   = honeyInputs.length > 0 ? honeyInputs[0] : null;

    console.log("form:",         form);
    console.log("nameInput:",    nameInput);
    console.log("emailInput:",   emailInput);
    console.log("messageInput:", messageInput);
    console.log("honeyInput:",   honeyInput);

    if (!form) {
        console.error("❌ #contactForm not found. Validation disabled.");
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        console.log("🔵 Submit triggered. Running checks...");

    
        if (honeyInput && honeyInput.value !== "") {
            console.warn("🚫 Honeypot filled – likely a bot.");
            return;
        }
        console.log("✔ Check A (honeypot) passed.");

    
        var elapsed = Date.now() - FORM_LOAD_TIME;
        console.log("Elapsed time since page load:", elapsed, "ms");
        if (elapsed < 2000) {
            alert("Submission was too fast. Are you human?");
            return;
        }
        console.log("✔ Check B (speed) passed.");


        var now = Date.now();
        submitTimes = submitTimes.filter(function (t) { return now - t < 60000; });
        if (submitTimes.length >= 3) {
            alert("Too many submissions. Please wait a minute.");
            return;
        }
        submitTimes.push(now);
        console.log("✔ Check C (rate limit) passed.");

      
        if (!messageInput) {
            console.error("❌ #inputMessage textarea not found!");
            alert("Unexpected error: message field missing.");
            return;
        }

        var messageValue = messageInput.value.toLowerCase().trim();
        console.log("Message value being checked:", JSON.stringify(messageValue));

        var foundSpam = null;
        for (var i = 0; i < SPAM_WORDS.length; i++) {
            if (messageValue.indexOf(SPAM_WORDS[i]) !== -1) {
                foundSpam = SPAM_WORDS[i];
                break;
            }
        }

        console.log("Spam word found:", foundSpam);

        if (foundSpam !== null) {
            alert('Your message contains a blocked spam keyword: "' + foundSpam + '"');
            console.warn("🚫 Blocked – spam keyword:", foundSpam);
            return;
        }
        console.log("✔ Check D (spam) passed.");

      
        if (!emailInput) {
            console.error("❌ #inputEmail not found!");
            alert("Unexpected error: email field missing.");
            return;
        }

        var emailValue = emailInput.value.trim();
        console.log("Email value:", emailValue);

        if (emailValue.indexOf("@") === -1 || emailValue.lastIndexOf(".") <= emailValue.indexOf("@")) {
            alert("Please enter a valid email address.");
            return;
        }
        console.log("✔ Check E (email) passed.");

        
        if (!nameInput || nameInput.value.trim() === "") {
            alert("Please enter your name.");
            return;
        }
        console.log("✔ Check F (name) passed.");

        
        console.log("🟢 All checks passed. Submitting form to FormSubmit...");
        form.submit();
    });

    console.log("✅ Submit listener attached to #contactForm.");
}); 