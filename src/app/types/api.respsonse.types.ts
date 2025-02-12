export interface ResourceType {
    name: string;
    address: string;
    projectName: string;
    projectDescription: string;
    role: string;
    id: string;
}

export interface HTTPData<T> {
    status: number;
    error: Error | null;
    data: T;
}
