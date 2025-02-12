export interface ResourceType {
    name: string;
    address: string;
    projectName: string;
    projectDescription: string;
    projectId: string;
    role: string;
    roleId: string;
    id: string;
    status: "assigned" | "unassigned";
    skills?: string[] | null;
}

export interface HTTPData<T> {
    status: number;
    error: Error | null;
    data: T;
}
