import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import * as mongoose from "mongoose";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { CreateCommentDto } from "./dto/add-comment.dto";

@Controller("/tracks")
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Get()
	getMany() {
		return this.trackService.getMany();
	}

	@Get(":id")
	getOne(@Param("id") id: mongoose.Types.ObjectId) {
		return this.trackService.getOne(id);
	}

	@Post()
	createOne(@Body() dto: CreateTrackDto) {
		return this.trackService.createOne(dto);
	}

	@Delete(":id")
	deleteOne(@Param("id") id: mongoose.Types.ObjectId) {
		return this.trackService.deleteOne(id);
	}

	@Post("/comment")
	addComment(@Body() dto: CreateCommentDto) {
		return this.trackService.addComment(dto);
	}
}
