export interface Job {
  id: number;
  title: string;
  description: string;
  status: number;
  salary: string;
  expirationDate: string;
  company: {
    id: string;
    name: string;
    email: string;
    address: string;
    website: string;
  };
  recruiter: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  benefits: string[];
  type?: string;
  location?: string;
  companyLogo?: string;
}
