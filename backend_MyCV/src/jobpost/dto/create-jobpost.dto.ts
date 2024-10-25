export class CreateJobpostDto {
    readonly jobTitle: string; // e.g. Software Engineer, Data Analyst, etc.
    readonly jobType: string; // full-time, part-time, contract, internship
    readonly location: string; // e.g. HoChiMinh City, Hanoi, etc.
    readonly jobDescription: string; // e.g. Job Description
    readonly jobRequirement: string; // e.g. Job Requirement
    readonly numberOfPositions: number; // e.g. 1, 2, 3, etc.
    readonly deadline: Date; // e.g. 2022-01-01
    readonly salary: String; // e.g. 1000-2000 USD
}
