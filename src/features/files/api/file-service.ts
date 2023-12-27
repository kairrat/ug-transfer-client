import AbstractApiRepository from "../../../app/api/ApiRepository";
import { FileApi } from "./file-api";

export class FileService extends AbstractApiRepository {
    api: FileApi;

    constructor() {
        super();
        this.api = new FileApi();
    }

    uploadFiles = async (files: FormData) => {
        try {
            const { data } = await this.api.uploadFiles(files);
            return data;
        } catch (err) {
            console.error('Upload file error: ', err);
        }
    }
}

export const fileService = new FileService();