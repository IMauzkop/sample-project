import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingEditComponent } from "./components/shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { SharedModule } from "./shared.module";

const routes: Routes = [
	{
		path: "",
		component: ShoppingListComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
	declarations: [ShoppingEditComponent, ShoppingListComponent],
	imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
})
export class ShoppingListModule {}
