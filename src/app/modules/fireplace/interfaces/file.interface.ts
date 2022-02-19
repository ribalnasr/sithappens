
export interface File {
    id: string;
    data: FileData;
}

export interface FileData {
    url: string;
    name: string;
    size: number;
    type: string;
}