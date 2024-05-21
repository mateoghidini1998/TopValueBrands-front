export enum UserRole  {
    ADMIN = "admin",
    USER = "user",
    EMPLOYEE = "employee"
}

export type UserType = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: UserRole
}