const init = () => {
	'use strict';

    let mobile_menu_button = select('.side-bar__menu-button');
    let sidebar_mask = select('.side-bar__mask');

    let nav_dropdown = select('.side-bar__nav__dropdown-trigger');

    let header_cart_button = select('.header-cart__button');
    let close_cart_button = select('.shopping-cart__close');

    let cart_triggers = [header_cart_button, close_cart_button];

    if (mobile_menu_button) mobile_menu_button.addEventListener('click', toggle_menu);
    if (sidebar_mask) sidebar_mask.addEventListener('click', toggle_menu);

    /* Add Click Event Listeners to Cart Triggers */
    if (cart_triggers && Array.isArray(cart_triggers))
    	cart_triggers.forEach(element => element.addEventListener('click', toggle_shoppingcart));

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

    let shopping_cart_quanitity_button = select('.shopping-cart__quantity-button');

    if (shopping_cart_quanitity_button) {
    	
    	shopping_cart_quanitity_button.forEach( elem => {
    		let which_quanitity_input = elem.getAttribute('data-quantity-input');
    		let quanitity_input = select('.shopping-cart__quantity-input');
    		let quanitity_minus_button = elem.classList.contains('shopping-cart__quantity-button--minus');
    		let quanitity_plus_button = elem.classList.contains('shopping-cart__quantity-button--plus');

    		elem.addEventListener('click', e => {
    			
    			if (quanitity_minus_button) {
    				if (select(`input[data-quantity-input="${which_quanitity_input}"]`).getAttribute('data-min') < (select(`input[data-quantity-input="${which_quanitity_input}"]`).value - 1)) {
    					select(`input[data-quantity-input="${which_quanitity_input}"]`).value--;
    				}
    			} 

    			if (quanitity_plus_button) {
    				if (select(`input[data-quantity-input="${which_quanitity_input}"]`).getAttribute('data-max') > (select(`input[data-quantity-input="${which_quanitity_input}"]`).value + 1)) {
    					select(`input[data-quantity-input="${which_quanitity_input}"]`).value++;
    				}
    			}

    		})
    	})
    }
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

const vLog = e => {
	console.log(e);
};

document.addEventListener('DOMContentLoaded', init)


