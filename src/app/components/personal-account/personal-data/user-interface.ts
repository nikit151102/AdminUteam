export interface District {
    id: number;
    name: string | null;
}

export interface Region {
    id: number;
    name: string | null;
    district: District | null;
}

export interface CityOfResidence {
    id: number;
    name: string | null;
    region: Region | null;
}

export interface User {
    id: number;
    firstName: string | null;
    lastName: string | null;
    gender: 'MALE' | 'FEMALE'; 
    age: number | null;
    freeLink: string | null;
    ownLink: string | null;
    aboutMe: string | null;
    email: string | null;
    telegram: string | null;
    dateOfRegistration: string | null; 
    cityOfResidence: CityOfResidence;
    imageLink: string | null;
    nickname: string | null;
    role: 'ROOT' | 'USER' | 'ADMIN'; 
}