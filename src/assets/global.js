const init = () => {
	'use strict';

    let nav_dropdown = select('.side-bar__nav__dropdown-trigger');

    let header_cart_button = select('.header-cart__button');
    let close_cart_button = select('.shopping-cart__close');

    let cart_triggers = [header_cart_button, close_cart_button];

    if (nav_dropdown && Array.isArray(nav_dropdown)) {
        nav_dropdown.forEach( element => element.addEventListener('click', toggle_dropdown));
    }

    if (nav_dropdown && !Array.isArray(nav_dropdown)) {
        nav_dropdown.addEventListener('click', toggle_dropdown);
    }

    window.addEventListener('resize', e => {
    	let window_width = window.innerWidth;

    	if (window_width >= 736) {
    		toggle_menu(e);
    	}
    });


};

const select = (selector, parent = document) => {
    let found_el = [...parent.querySelectorAll(selector)];
    return (found_el.length === 1) ? found_el[0] : found_el;
};

const getSiblings = elem => {
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

const toggle_menu = e => {
	let content = select('body');

	if (e.type === 'resize') {
		if (content.classList.contains('side-bar--is-open')) {
			content.classList.remove('side-bar--is-open');
		}
	} else {
		content.classList[!content.classList.contains('side-bar--is-open') ? 'add' : 'remove']('side-bar--is-open');
	}
	
}

const toggle_shoppingcart = e => {
	let off_screen_cart = select('.shopping-cart');
	let mainContainer = select('.container');

	off_screen_cart.classList[!off_screen_cart.classList.contains('is-open') ? 'add' : 'remove']('is-open');

	mainContainer.style.overflow = off_screen_cart.classList.contains('is-open') ? 'hidden' : 'initial';
};

const toggle_dropdown = e => {
	let clicked_element = e.target;
	let clicked_dropdown_container = e.target.nextElementSibling;

	getSiblings(clicked_element.parentElement).forEach( e => { 
		if (e.classList.contains('is-active')) {
			let children = [...e.children];

			children.forEach( child => {
				let dropdown_container = child.classList.contains('side-bar__nav__dropdown-container');
				if (dropdown_container) {
					child.setAttribute('aria-expanded', 'false');
					child.style.maxHeight = 0;
				}
			});
			e.classList.remove('is-active');
		}
	})

	if (clicked_element.parentElement.classList.contains('is-active')) {
		clicked_dropdown_container.setAttribute('aria-expanded', 'false');
		clicked_dropdown_container.style.maxHeight = 0;
		clicked_element.parentElement.classList.remove('is-active')
	} else {
		clicked_dropdown_container.setAttribute('aria-expanded', 'true');
		clicked_dropdown_container.style.maxHeight = `${clicked_dropdown_container.scrollHeight}px`;
		clicked_element.parentElement.classList.add('is-active');
	}
}

document.addEventListener('DOMContentLoaded', init)


