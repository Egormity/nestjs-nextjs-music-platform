import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb+srv://kotlaregor9:w2FMKoDLPffHQgAV@cluster0.ebgvoh1.mongodb.net/"),
		TrackModule,
	],
})
export class AppModule {}
