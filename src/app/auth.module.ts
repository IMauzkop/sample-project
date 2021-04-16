import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { SharedModule } from "./shared.module";

const routes: Routes = [
	{
		path: "auth",
		component: AuthComponent,
	},
];

@NgModule({
	declarations: [AuthComponent],
	imports: [FormsModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
