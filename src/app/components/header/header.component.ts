import { Component, OnInit } from "@angular/core";
import { StoreService } from "src/app/services/store.service";
import { AuthService } from "src/app/services/auth.service";
import { User } from "../../models/user.model";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	title = "CreArte";
	imgMenu = "./assets/images/menu.png";
	imgLogo = "./assets/images/logo.png";
	imgShoppingCar = "./assets/images/car-menu.png";
	token = "";
	profile: User | null = null;

	activeMenu = false;
	counter = 0;

	constructor(
		private storeServices: StoreService,
		private authService: AuthService,
	) {}
	ngOnInit(): void {
		this.storeServices.myCart$.subscribe((products) => {
			this.counter = products.length;
		});
	}

	toggleMenu() {
		this.activeMenu = !this.activeMenu;
	}

	login() {
		// this.authService.login('sebas@mail.com', '1212')
		// .subscribe(rta => {
		//   this.token = rta.access_token;
		//   console.log(this.token);
		//   this.getProfile();
		// });
		this.authService
			.loginAndGet("sebas@mail.com", "1212")
			.subscribe((user) => {
				this.profile = user;
				this.token = "---";
			});
	}

	getProfile() {
		this.authService.getProfile(this.token).subscribe((user) => {
			this.profile = user;
		});
	}
}
