enum UserRole  {
    ADMIN = "admin",
    USER = "user",
    EMPLOYEE = "employee"
}

export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole
}