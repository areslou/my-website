// ─── FormSubmit + Validation Script ───────────────────────────────────────────

const form = document.querySelector("form");
const formLoadTime = Date.now(); // for time-based filtering

// ── Rate Limiting ──────────────────────────────────────────────────────────────
let submitTimes = [];

function isRateLimited() {
  const now = Date.now();
  submitTimes = submitTimes.filter(time => now - time < 60000);
  if (submitTimes.length >= 3) return true;
  submitTimes.push(now);
  return false;
}

// ── Time-Based Filtering ───────────────────────────────────────────────────────
function isTooFast() {
  return (Date.now() - formLoadTime) / 1000 < 2;
}

// ── Spam Keyword Detection ─────────────────────────────────────────────────────
const spamWords = ["free money", "buy now", "click here", "subscribe", "promo"];

function containsSpam(message) {
  const lower = message.toLowerCase();
  return spamWords.some(word => lower.includes(word));
}

// ── Email Format Validation ────────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Visual Feedback Helpers ────────────────────────────────────────────────────
function setError(inputId, message) {
  const input = document.getElementById(inputId);
  input.style.border = "2px solid #e74c3c";

  // Remove existing error msg if any
  const existing = input.parentElement.querySelector(".error-msg");
  if (existing) existing.remove();

  const msg = document.createElement("span");
  msg.className = "error-msg";
  msg.style.cssText = "color:#e74c3c; font-size:12px; margin-top:4px; display:block;";
  msg.textContent = message;
  input.parentElement.appendChild(msg);
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(el => el.remove());
  document.querySelectorAll("input, textarea").forEach(el => {
    el.style.border = "";
  });
}

// ── Main Submit Handler ────────────────────────────────────────────────────────
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const name    = document.getElementById("inputName").value.trim();
    const email   = document.getElementById("inputEmail").value.trim();
    const message = document.getElementById("inputMessage").value.trim();

    let hasError = false;

    // Required field checks
    if (name.length < 2) {
      setError("inputName", "Name must be at least 2 characters.");
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setError("inputEmail", "Please enter a valid email address.");
      hasError = true;
    }

    if (message.length < 10) {
      setError("inputMessage", "Message must be at least 10 characters.");
      hasError = true;
    }

    if (hasError) return;

    // Time-based filter
    if (isTooFast()) {
      alert("Submission was too fast. Please try again.");
      return;
    }

    // Rate limiting
    if (isRateLimited()) {
      alert("Too many submissions. Please wait a minute.");
      return;
    }

    // Spam keyword detection
    if (containsSpam(message)) {
      setError("inputMessage", "Your message contains blocked spam keywords.");
      return;
    }

    // All checks passed — submit the form to FormSubmit
    alert("Message sent! Thank you, " + name + ".");
    form.submit();
  });
}