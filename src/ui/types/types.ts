export interface User {
    active: boolean;
    created_at: string;
    district: number;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    middle_initial?: string;
    verified: boolean;
}

export interface District {
    id: number;
    name: string;
    city: string;
}
