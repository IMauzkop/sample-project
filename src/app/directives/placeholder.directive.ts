import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
	selector: "[appPlaceholder]",
})
export class PlaceholderDirective {
	/*
		ViewContainerRef - an object managed internally by Angular,
		which gives Angular a reference (a pointer) to a place in
		the DOM.
	*/
	constructor(public viewContainerRef: ViewContainerRef) {}
}
