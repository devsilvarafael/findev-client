import { ICompanyProps } from "./Company";
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
  company: ICompanyProps;
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
}
