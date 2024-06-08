import { BookmarkIcon, MapPin } from "lucide-react";
import { FC } from "react";

interface JobCardProps {
  title: string;
  type: string;
  salary: string;
  company: string;
  location: string;
  companyLogo: string;
}

export const JobCard: FC<JobCardProps> = ({
  title,
  type,
  salary,
  company,
  location,
  companyLogo,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-inter font-medium text-[#18191C] mb-1">
          {title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-xs font-semibold text-green-700 font-inter bg-green-100 px-2 py-1 rounded-sm">
            {type}
          </span>
          <span className="ml-2 text-sm text-gray-500">Salário: {salary}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={"/findev-medium-logo.svg"}
              alt={`${company} logo`}
              className="w-10 h-10 rounded-sm p-1 mr-2 bg-red-100"
            />
            <div>
              <p className="text-sm font-medium">{company}</p>
              <div className="flex items-center space-x-1">
                <MapPin width={18} height={18} className="text-gray-500 " />
                <p className="text-sm text-gray-500 flex items-center">
                  {location}
                </p>
              </div>
            </div>
          </div>
          <div>
            <BookmarkIcon className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
