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

export interface ProjectType {
    id: string;
    name: string;
    description: string;
    contactInformation: string;
    servicesProvided: string;
    status: string;
    startDate: string;
    endDate: string;
    billingStatus: string;
    resources: any[];
}

