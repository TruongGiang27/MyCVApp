export class CreateCvDto {
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    address: {
        country: string;
        address: string;
        city: string;
        zipCode: string;
    };
    education: {
        educationLevel: string;
        fieldOfStudy: string;
        schoolName: string;
        educationCountry: string;
        educationCity: string;
        educationStartDate: string;
        educationEndDate: string;
        educationDescription: string;
        highestEducationLevel: string;
    };
    experience: {
        jobTitle: string;
        companyName: string;
        workCountry: string;
        workCity: string;
        workStartDate: string;
        workEndDate: string;
        workExperience: string;
        highestJobLevel: string;
    };
    certifications: string;
    birthDate: string;
    summary: string;
    jobPreferences: {
        desiredJobTitle: string;
        jobType: string;
        minimumSalary: number;
    };
    skills: string[];
}
