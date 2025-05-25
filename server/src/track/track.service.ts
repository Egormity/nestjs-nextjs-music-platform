import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/add-comment.dto";
import { EFileType, FileService } from "src/file/file.service";

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: mongoose.Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModal: mongoose.Model<CommentDocument>,
		private fileService: FileService
	) {}

	async getOne(id: mongoose.Types.ObjectId): Promise<Track> {
		return await this.trackModel.findById(id).populate("comments");
	}

	async getMany(count = 10, offset = 0): Promise<Track[]> {
		return await this.trackModel
			.find()
			.skip(+offset)
			.limit(+count);
	}

	async search(query: string): Promise<Track[]> {
		return await this.trackModel.find({
			name: { $regex: new RegExp(query, "i") },
		});
	}

	async createOne(dto: CreateTrackDto, files): Promise<Track> {
		const pictureFile = this.fileService.createFile(EFileType.IMAGE, files.picture[0]);
		const audioFile = this.fileService.createFile(EFileType.AUDIO, files.audio[0]);
		return await this.trackModel.create({
			...dto,
			listens: 0,
			audio: audioFile.filePath,
			picture: pictureFile.filePath,
		});
	}

	async deleteOne(id: mongoose.Types.ObjectId): Promise<Track> {
		return await this.trackModel.findByIdAndDelete(id);
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		const track = await this.trackModel.findById(dto.trackId);
		const comment = await this.commentModal.create({ ...dto });
		track.comments.push(comment._id);
		await track.save();
		return comment;
	}

	async listen(id: mongoose.Types.ObjectId): Promise<boolean> {
		const track = await this.trackModel.findById(id);
		const incremented = track.listens + 1;
		track.listens = incremented;
		const value = await track.save();
		return value.listens === incremented;
	}
}
