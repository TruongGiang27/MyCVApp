export class CreateJobDto {
  readonly userId: string;
  readonly title: string;
  readonly companyName: string;
  readonly location: string;
  readonly salary: string;
  readonly jobType: string;
  readonly jobDescription: string;
  readonly requirements: string;
  readonly benefits: string;
  readonly status: 'Mở' | 'Tạm dừng' | 'Đã Đóng'; // Trạng thái của đơn tuyển dụng
  readonly additionalInfo: {
      deadline: string;
      experience: string;
      education: string;
      quantity: number;
      gender: string;
  };
}
