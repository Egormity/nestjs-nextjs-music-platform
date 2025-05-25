import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from "@nestjs/common";
import * as mongoose from "mongoose";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/add-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/tracks")
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Get()
	getMany(@Query("count") count: number, @Query("offset") offset: number) {
		return this.trackService.getMany(count, offset);
	}

	@Get(":id")
	getOne(@Param("id") id: mongoose.Types.ObjectId) {
		return this.trackService.getOne(id);
	}

	@Get("/search")
	search(@Query("query") query: string) {
		return this.trackService.search(query);
	}

	@Post("upload")
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: "picture", maxCount: 1 },
			{ name: "audio", maxCount: 1 },
		])
	)
	createOne(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
		return this.trackService.createOne(dto, files);
	}

	@Delete(":id")
	deleteOne(@Param("id") id: mongoose.Types.ObjectId) {
		return this.trackService.deleteOne(id);
	}

	@Post("/comment")
	addComment(@Body() dto: CreateCommentDto) {
		return this.trackService.addComment(dto);
	}

	@Post("/listen/:id")
	listen(@Param("id") id: mongoose.Types.ObjectId) {
		return this.trackService.listen(id);
	}
}
