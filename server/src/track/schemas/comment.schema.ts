import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
	@Prop()
	username: string;

	@Prop()
	text: string;

	@Prop({ type: mongoose.Types.ObjectId, ref: "Track" })
	comments: Comment[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
