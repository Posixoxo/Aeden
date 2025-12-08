        // Restart animation when it completes
        function restartAnimation() {
            // Reload the entire container to restart all animations
            const container = document.querySelector('.ballers');
            const clone = container.cloneNode(true);
            container.parentNode.replaceChild(clone, container);
        }

        // Loop the animation every 7 seconds
        setInterval(restartAnimation, 7000);