import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit {
	constructor(private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId: object) {}

	ngOnInit() {
		// is the app running in the browser?
		if (isPlatformBrowser(this.platformId)) {
			this.store.dispatch(new AuthActions.AutoLogin());
		}
	}
}
