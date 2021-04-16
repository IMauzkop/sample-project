import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlertComponent } from "./components/alert/alert.component";
import { HeaderComponent } from "./components/header/header.component";
import { DropdownDirective } from "./directives/dropdown.directive";
import { PlaceholderDirective } from "./directives/placeholder.directive";

@NgModule({
	declarations: [AlertComponent, DropdownDirective, HeaderComponent, PlaceholderDirective],
	imports: [CommonModule, RouterModule],
	exports: [CommonModule, AlertComponent, DropdownDirective, HeaderComponent, PlaceholderDirective],
})
export class SharedModule {}
