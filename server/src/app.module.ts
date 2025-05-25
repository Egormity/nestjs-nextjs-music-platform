import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { TrackModule } from "./track/track.module";

@Module({
	imports: [
		ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") }),
		MongooseModule.forRoot("mongodb+srv://kotlaregor9:w2FMKoDLPffHQgAV@cluster0.ebgvoh1.mongodb.net/"),
		TrackModule,
	],
})
export class AppModule {}
