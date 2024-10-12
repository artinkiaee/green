document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.count-up');
    const speed = 75;  // Adjust speed of the count up

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);  // Adjust speed of animation
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
});