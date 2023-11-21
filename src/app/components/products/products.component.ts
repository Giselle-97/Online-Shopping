import { Component, OnInit } from "@angular/core";
import {
	Product,
	CreateProductDTO,
	UpdateProductDTO,
} from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { StoreService } from "src/app/services/store.service";

@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	myShoppingCart: Product[] = [];
	total = 0;
	products: Product[] = [];
	showProductDetail = false;

	productChosen: Product = {
		id: "",
		title: "",
		price: 0,
		image: "",
		description: "",
		category: "",
	};

	//inyección de dependencias
	constructor(
		private storeService: StoreService,
		private productsService: ProductsService,
	) {
		this.myShoppingCart = this.storeService.getShoppingCart();
	}
	ngOnInit(): void {
		this.productsService.getAllProducts().subscribe((data) => {
			this.products = data;
		});
	}
	onAddToShoppingCart(product: Product) {
		//this.myShoppingCart.push(product);
		this.storeService.addProduct(product);
		this.total = this.storeService.getTotal();
	}
	//cambia el estado del menu lateral
	toggleProductDetail() {
		this.showProductDetail = !this.showProductDetail;
	}

	//como recibe un atributo hay que agregar en html el $event
	onShowDetail(id: string) {
		this.productsService.getProduct(id).subscribe((data) => {
			console.log("product", data);
			this.toggleProductDetail(); //para activar el layout
			this.productChosen = data;
		});
	}
	createNewProduct() {
		const product: CreateProductDTO = {
			title: "Nuevo producto",
			description: "lalala",
			image: "",
			price: 0,
			category: "",
			id: "",
		};
		this.productsService.create(product).subscribe((data) => {
			this.products.unshift(data);
		});
	}

	updateProduct() {
		const changes: UpdateProductDTO = {
			title: "nuevo title",
		};
		const id = this.productChosen.id;
		this.productsService.update(id, changes).subscribe((data) => {
			const productIndex = this.products.findIndex(
				(item) => item.id === this.productChosen.id,
			); //para mostrar la actualización
			this.products[productIndex] = data;
		});
	}
	//
}
