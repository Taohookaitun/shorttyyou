// shorten.js

document.addEventListener("DOMContentLoaded", () => {
    const urlForm = document.getElementById("url-form");
    const urlInput = document.getElementById("url-input");
    const shortenedUrl = document.getElementById("shorten");

    urlForm.addEventListener("shorten", async (e) => {
        e.preventDefault();
        
        shortenButton.addEventListener("click", function () {
            if (shortText.value.length === 0) {
                warningMessage.textContent = 'Please enter URL.';
            } else {
                window.location.href = "shorten.html";
            }
        });

        const originalUrl = urlInput.value;

        try {
            const response = await fetch(`/shorten?url=${originalUrl}`);
            const data = await response.json();

            if (response.ok) {
                shortenedUrl.innerHTML = `
                    <p>Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
                `;
            } else {
                shortenedUrl.textContent = "Error: Unable to shorten URL.";
            }
        } catch (error) {
            console.error("Error:", error);
            shortenedUrl.textContent = "Error: Something went wrong.";
        }
    });
});
