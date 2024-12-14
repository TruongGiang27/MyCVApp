import { IsString, IsNotEmpty } from "class-validator";

export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
   
    @IsNotEmpty()
    @IsString()
    jobId: string;

    @IsNotEmpty()
    @IsString()
    jobName: string;

    @IsNotEmpty()
    @IsString()
    cvId: string;

    @IsNotEmpty()
    @IsString()
    CVfullNameUser: string;

    @IsNotEmpty()
    @IsString()
    CVEmailUser: string;

    @IsNotEmpty()
    @IsString()
    status: string;


}
