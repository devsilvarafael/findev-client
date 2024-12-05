import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoneyBillWave, FaClock, FaFileContract } from "react-icons/fa";
import { Job } from "@/types/Job";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { IoLocation } from "react-icons/io5";

interface JobCardItemProps {
    job: Job
}

const JobCardItem: FC<JobCardItemProps> = ({ job }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <CardHeader className="flex items-center space-x-4 flex-row pt-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Company Logo" />
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg font-semibold font-inter">{job.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{job.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="mt-2 mb-0 my-0 pb-4 flex flex-row items-baseline justify-between px-4">
                <div className="flex items-center justify-end space-x-2">
                    <FaClock className="text-blue-500" />
                    <p className="text-xs">{job.minWeekHours} hrs/sem</p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaFileContract className="text-purple-500" />
                    <p className="text-xs">{job.contractType}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className="text-green-500" />
                    <p className="text-xs">{currencyFormatter(job.salary)}</p>
                </div>
            </CardContent>

        </Card>
    );
};

export default JobCardItem;
