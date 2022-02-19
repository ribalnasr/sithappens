export interface UserProfile {
    id: string;
    persmissions: Record<string, UserPermissionsGroup>
}

export type UserPermissions = Record<string, UserPermissionsGroup>;

export interface UserPermissionsGroup {
    read?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
}