const initialize = () => {
    /* Initialize Nav Dropdown Event Listener */
    let nav_dropdown_trigger = document.querySelectorAll(".nav--dropdown__trigger");

    if (nav_dropdown_trigger)
        nav_dropdown_trigger.forEach(element => element.addEventListener('click', toggleDropdownMenu));

    /* Initialize Menu Trigger Event Listener */
    let menu_triggers = [document.querySelector(".menu__button"), document.querySelector(".nav__mask")];
    if (menu_triggers && Array.isArray(menu_triggers))
        menu_triggers.forEach(element => element.addEventListener('click', toggleMenu));

    /* Initialize Cart Trigger */
    let header_cart_button = document.querySelector(".cart--icon__container");
    let close_cart_button = document.querySelector(".shopping-cart__close");
    let cart_triggers = [header_cart_button, close_cart_button];

    if (cart_triggers && Array.isArray(cart_triggers))
        cart_triggers.forEach(element => element.addEventListener('click', toggleCart));

    let bounceContainer = document.querySelector(".bounce--container")

    let logoContainer = document.querySelector(".logo__container").style;
    setTimeout(() => {
        //logoContainer.position = "fixed";
        //logoContainer.top = "0";
    }, 5000)
};

const toggleDropdownMenu = ev => {
    let clicked_element = ev.target;
    let clicked_dropdown_container = ev.target.nextElementSibling;

    getAllSiblings(clicked_element.parentElement).forEach( e => {
        if (e.classList.contains('is-active')) {
            let dropdown_container = e.querySelector('.dropdown');

            if (dropdown_container) {
                dropdown_container.setAttribute('aria-expanded', 'false');
                dropdown_container.style.maxHeight = "0";
            }

            e.classList.remove('is-active');
        }
    });

    if (clicked_element.parentElement.classList.contains('is-active')) {
        clicked_dropdown_container.setAttribute('aria-expanded', 'false');
        clicked_dropdown_container.style.maxHeight = "0";
        clicked_element.parentElement.classList.remove('is-active')
    }
    else {
        clicked_dropdown_container.setAttribute('aria-expanded', 'true');
        clicked_dropdown_container.style.maxHeight = `${clicked_dropdown_container.scrollHeight}px`;
        clicked_element.parentElement.classList.add('is-active');
    }
};

const toggleMenu = ev => {
    let content = document.body;

    if (ev.type === 'resize' && content.classList.contains('side-bar--is-open'))
        content.classList.remove('side-bar--is-open');

    else content.classList[!content.classList.contains('side-bar--is-open') ? 'add' : 'remove']('side-bar--is-open');
};

const toggleCart = e => {
    let off_screen_cart = document.querySelector('.shopping-cart');
    let mainContainer = document.querySelector('.container');

    off_screen_cart.classList[!off_screen_cart.classList.contains('is-open') ? 'add' : 'remove']('is-open');

    mainContainer.style.overflow = off_screen_cart.classList.contains('is-open') ? 'hidden' : 'initial';
};

const getAllSiblings = elem => {
    let siblings = [];
    let sibling = elem.parentNode.firstChild;

    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }

    return siblings;
};

document.addEventListener('DOMContentLoaded', initialize);



