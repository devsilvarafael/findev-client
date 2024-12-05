import { Developer } from "./Developer";

export interface Job {
  id: number;
  title: string;
  description: string;
  status: number;
  salary: number;
  expirationDate: string;
  contractType: string;
  minWeekHours: number;
  maxWeekHours: number;
  workModality: string;
  workLocation: string;
  company: {
    companyId: string;
    name: string;
    email: string;
    address: string;
    website: string;
    isActive: boolean;
    recruiters: {}[];
  };
  recruiter: {
    recruiterId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyId: string;
  };
  candidatures: Developer[];
  requirements: {
    name: string;
    experienceYears: number;
  }[]
  benefits: string[];
  companyLogo?: string;
}
