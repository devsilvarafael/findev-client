"use client"

import { FC, Fragment, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaMoneyBillWave, FaClock, FaFileContract } from "react-icons/fa";
import { Job } from "@/types/Job";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { IoLocation } from "react-icons/io5";
import { Button } from "../ui/button";
import JobDetailsDrawer from "./JobDetailsDrawer";

interface JobCardItemProps {
    job: Job
}

const JobCardItem: FC<JobCardItemProps> = ({ job }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    return (
        <Fragment>
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center space-x-4 flex-row pt-2">
                    <Avatar >
                        <AvatarImage src={job.company.companyLogo} alt={`${job.company.name} Logo`} className="w-full h-full object-fill" />
                        <AvatarFallback>{job.company.name[0]} {job.company.name[1]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-semibold font-inter">{job.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground flex-wrap flex flex-row gap-x-1">
                            {job.requirements.map((requirement: any) => (
                                <div className="bg-blue-200 rounded-md py-1 px-2 w-fit">
                                    <p className="text-blue-700 text-center text-xs">
                                        {requirement.name}
                                    </p>
                                </div>
                            ))}
                        </CardDescription>
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
                <CardFooter className="py-0 pb-2 px-4">
                    <Button className="w-full h-7 text-sm" onClick={handleDrawerOpen}>
                        Visualizar vaga
                    </Button>
                </CardFooter>
            </Card>
            <JobDetailsDrawer job={job} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        </Fragment>
    );
};

export default JobCardItem;
