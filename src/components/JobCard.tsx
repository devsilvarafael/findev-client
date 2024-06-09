import { FC } from "react";
import { BookmarkIcon, MapPin, TrashIcon, Edit3Icon } from "lucide-react";
import { Job } from "@/types/Job";

interface JobCardProps extends Job {
  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
}

export const JobCard: FC<JobCardProps> = ({
  id,
  title,
  type,
  salary,
  company,
  location,
  companyLogo,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-inter font-medium text-[#18191C] mb-1">
          {title}
        </h3>
        <div className="flex items-center mb-2">
          <span className="text-xs uppercase font-semibold text-green-700 font-inter bg-green-100 px-2 py-1 rounded-sm">
            {type || "TEMPO INTEGRAL"}
          </span>
          <span className="ml-2 text-sm text-gray-500">Salário: {salary}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={companyLogo}
              alt={`${company.name} logo`}
              className="w-10 h-10 rounded-sm p-1 mr-2 bg-red-100"
            />
            <div>
              <p className="text-sm font-medium">{company.name}</p>
              <div className="flex items-center space-x-1">
                <MapPin width={18} height={18} className="text-gray-500 " />
                <p className="text-sm text-gray-500 flex items-center">
                  {location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Edit3Icon
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() =>
                onEdit({
                  id,
                  title,
                  type,
                  salary,
                  company,
                  location,
                  companyLogo,
                })
              }
            />
            <TrashIcon
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => onDelete(id)}
            />
            <BookmarkIcon className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
