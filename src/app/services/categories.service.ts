import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Category } from "../models/category.model";
import { environment } from "./../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class CategoriesService {
	private apiUrl = `${environment.API_URL}/products/categories`;

	constructor(private http: HttpClient) {}

	getAll(limit?: number, offset?: number) {
		let params = new HttpParams();
		if (limit && offset) {
			params = params.set("limit", limit.toString());
			params = params.set("offset", offset.toString());
		}
		return this.http.get<Category[]>(this.apiUrl, { params });
	}
}
