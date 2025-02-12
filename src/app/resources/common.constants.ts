import { ResourceType } from "../types/api.respsonse.types";

export const RESOURCES_COLUMNS = [
    { columnDef: "name", header: "Name", cell: (element: ResourceType) => `${element.name}`, disableSort: true },
    { columnDef: "address", header: "Address", cell: (element: ResourceType) => `${element.address}`, disableSort: true },
    { columnDef: "role", header: "Role", cell: (element: ResourceType) => `${element.role}`, disableSort: true },
    { columnDef: "projectName", header: "Project Name", cell: (element: ResourceType) => `${element.projectName}`, disableSort: true },
    { columnDef: "projectDescription", header: "Project Description", cell: (element: ResourceType) => `${element.projectDescription}`, disableSort: true }
];
