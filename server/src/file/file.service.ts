import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

export enum EFileType {
	AUDIO = "audio",
	IMAGE = "image",
}

@Injectable()
export class FileService {
	createFile(type: EFileType, file): { type: string; name: string; folderPath: string; filePath: string; extension: string } {
		try {
			const extension = "." + file.originalname.split(".").pop();
			const name = uuid.v4() + extension;
			const folderPath = path.resolve(__dirname, "..", "static", type);
			if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
			fs.writeFileSync(path.resolve(folderPath, name), file.buffer);
			return { type, name,  folderPath, filePath:  folderPath + "/" + name, extension };
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	removeFile() {}
}
