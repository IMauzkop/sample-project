import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { AuthModule } from "./auth.module";
import { AppComponent } from "./components/app-root/app.component";
import { AuthEffects } from "./components/auth/store/auth.effects";
import { RecipeEffects } from "./components/recipes/store/recipe.effects";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { SharedModule } from "./shared.module";
import * as fromApp from "./store/app.reducer";

const routes: Routes = [
	{
		path: "recipes",
		loadChildren: () => import("./recipes.module").then((module) => module.RecipesModule),
	},
	{
		path: "shopping-list",
		loadChildren: () => import("./shopping-list.module").then((module) => module.ShoppingListModule),
	},
	{
		path: "",
		redirectTo: "/recipes",
		pathMatch: "full",
	},
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		// Angular modules
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		HttpClientModule,
		RouterModule.forRoot(routes, {
			initialNavigation: "enabled",
		}),
		StoreModule.forRoot(fromApp.reducers),
		EffectsModule.forRoot([AuthEffects, RecipeEffects]),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),

		// Dev-defined modules
		AuthModule,
		SharedModule,
	],
	bootstrap: [AppComponent],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AppModule {}
