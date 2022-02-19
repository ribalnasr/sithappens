export namespace Storage {

    export interface Media {
        id: string;
        name: string;
        size: number;
        type: string;
        url: string;
        fullPath: string;
        metadata?: Record<string, any>;
    }

    export interface UploadOptions {
        file: File;
        path: string;
        metadata?: Record<string, any>;
    }

    export interface DeleteOptions {
        id: string;
    }

}