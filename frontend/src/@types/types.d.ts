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

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  role?: string;
};

export type City = {
  id?: string;
  name: string;
  postalCode: string;
  latitude: number | string;
  longitude: number | string;
  users?: User[];
}
