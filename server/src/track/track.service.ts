import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/add-comment.dto";

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: mongoose.Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModal: mongoose.Model<CommentDocument>
	) {}

	async getOne(id: mongoose.Types.ObjectId): Promise<Track> {
		return await this.trackModel.findById(id).populate("comments");
	}

	async getMany(): Promise<Track[]> {
		return await this.trackModel.find();
	}

	async createOne(dto: CreateTrackDto): Promise<Track> {
		return await this.trackModel.create({ ...dto, listens: 0 });
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
}
