function handleFormSubmit() {
    // 1. Retrieve the values from the HTML input fields using the IDs we added
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let message = document.getElementById('inputMessage').value;

    // 2. Print the values to the browser Console (This is the lab requirement)
    console.log("--- Form Submission Captured ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // 3. Show an alert so you know it worked
    alert("Check the Console (Right-click > Inspect > Console) to see the printed values!");

    // 4. PREVENT actual submission.
    // We return 'false' so the page does NOT reload.
    // If the page reloads, the console clears instantly and you can't take your screenshot.
    return false;
}