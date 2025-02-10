let sliders = document.querySelectorAll('.slider');

sliders.forEach((slider) => {
    let list = slider.querySelector('.list');
    let items = slider.querySelectorAll('.list .item');
    let next = slider.querySelector('#next');
    let prev = slider.querySelector('#prev');
    let dots = slider.querySelectorAll('.dots li');

    let lengthItems = items.length - 1;
    let active = 0;
    let refreshInterval;

    // Function to move to the next slide
    next.onclick = function () {
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    }

    // Function to move to the previous slide
    prev.onclick = function () {
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }

    // Auto-slide every 3 seconds
    refreshInterval = setInterval(() => { next.click() }, 3000);

    // Function to reload the slider and update the active item
    function reloadSlider() {
        list.style.left = -items[active].offsetLeft + 'px';

        // Update the active dot
        let last_active_dot = slider.querySelector('.dots li.active');
        if (last_active_dot) last_active_dot.classList.remove('active');
        dots[active].classList.add('active');

        // Clear and restart the interval
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => { next.click() }, 3000);
    }

    // Handle dot click events
    dots.forEach((li, key) => {
        li.addEventListener('click', () => {
            active = key;
            reloadSlider();
        });
    });

    // Handle window resize to adjust the slider
    window.onresize = function () {
        reloadSlider();
    };
});


function toggleContent(id) {
    const content = document.getElementById(`content${id}`);
    const image = document.querySelector(`#content${id}`).parentNode;

    // Toggle visibility of the content
    content.style.display = content.style.display === 'flex' ? 'none' : 'flex';
    
    // Optional: Add or remove the active class for the image
    if (content.style.display === 'flex') {
        image.classList.add('active');
    } else {
        image.classList.remove('active');
    }
}
