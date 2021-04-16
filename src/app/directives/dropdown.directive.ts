import { Directive, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
	selector: "[appDropdown]",
})
export class DropdownDirective {
	constructor(private renderer2: Renderer2) {}

	/**
	 * The CSS class to used for opening and closing
	 * the dropdown-menu.
	 *
	 * @private
	 * @memberof DropdownDirective
	 */
	private openCSSClass = "dropdown-menu-open";

	/**
	 * A reference to the dropdown-menu container element.
	 *
	 * @type {HTMLElement}
	 * @memberof DropdownDirective
	 */
	@Input("appDropdown")
	private dropdownMenu: HTMLElement;

	@HostListener("click")
	onClick() {
		const isOpened = this.dropdownMenu.classList.contains(this.openCSSClass);

		if (!isOpened) {
			this.renderer2.addClass(this.dropdownMenu, this.openCSSClass);
		} else {
			this.renderer2.removeClass(this.dropdownMenu, this.openCSSClass);
		}
	}
}
