export type Category = {
	id: string;
	name: string;
	description?: string;
	color: string;
};

export type City = {
	id: string;
	name: string;
	postalCode: string;
	latitude: number;
	longitude: number;
	users?: User[];
};

export type InterestPoint = {
	id: string;
	name: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
	link_url: string;
	city: {
		id: string;
		name: string;
		postalCode: string;
	};
	category: Category;
	pictures: Picture[];
};

export type Picture = {
	id: string;
	name: string;
	description: string;
	url: string;
};

export interface APIResult {
	fulltext: string;
	names: string[];
	zipcode?: string;
	x: number;
	y: number;
}

export interface AddressAPIResult {
	x: number;
	y: number;
	country: string;
	city: string;
	oldcity: string;
	kind: string;
	zipcode: string;
	street: string;
	metropole: boolean;
	fulltext: string;
	classification: number;
}
