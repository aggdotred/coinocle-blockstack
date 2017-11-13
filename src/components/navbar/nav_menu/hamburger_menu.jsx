import React from 'react';
import HamburgerDropdown from './hamburger_dropdown';
import $ from 'jquery';

const dropdown = () => {
    let hamburgerDropdown = $('#hamburger-dropdown-container');
    hamburgerDropdown.fadeIn();
    hamburgerDropdown.mouseleave( () => hamburgerDropdown.fadeOut() );
};

const HamburgerMenu = () => (
    <HamburgerDropdown />
);

export default HamburgerMenu;
