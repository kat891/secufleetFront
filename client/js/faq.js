document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active2");
            
            if (isActive) {
                // Start closing animation
                answer.classList.add('closing');
                
                // Wait for the closing animation to finish before removing "active" class
                setTimeout(() => {
                    item.classList.remove("active2");
                    answer.classList.remove('closing');
                }, 800); // Match the animation duration
            } else {
                // Close other open items
                faqItems.forEach(i => i.classList.remove("active2"));
                
                item.classList.add("active2");
            }
        });
    });
});