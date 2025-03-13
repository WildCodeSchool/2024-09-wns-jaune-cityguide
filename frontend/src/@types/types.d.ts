export type Category = {
	id: string;
	name: string;
	description?: string;
	color: string;
	// interestPoints: InterestPoint[];
};

export type City = {
	id: string;
	name: string;
	postalCode: string;
	latitude: number;
	longitude: number;
	interestPoints: InterestPoint[];
	users: User[];
};

export type InterestPoint = {
	id: string;
	name: string;
	description: string;
	address: string;
	latitude: number;
	longitude: number;
	link_url: string;
	category: Category; // TODO: replace by category id as string
	// city: string; // city id
	// pictures: Picture[];
};

export type Picture = {
	id: string;
	name: string;
	description: string;
	url: string;
	interestPoint: InterestPoint;
};
