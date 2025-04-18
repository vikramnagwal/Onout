export interface UserProps {
	id: string;
	email: string;
	password: string;
	name: string;
}

export interface Workspace {
	id: string;
	slug: string;
	plan: string;
	type: "public" | "private";

	user: {
		email: string;
		emailVerified: boolean;	
	};
}
