export interface Job {
  id: number;
  title: string;
  type: string;
  salary: string;
  company: {
    name: string;
  };
  location: string;
  companyLogo: string;
}
