import { FC } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
} from "@/components/ui/drawer";
import { Job } from "@/types/Job";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { FaMoneyBillWave, FaClock, FaFileContract, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface JobDetailsDrawerProps {
    job: Job;
    isOpen: boolean;
    onClose: () => void;
}

const JobDetailsDrawer: FC<JobDetailsDrawerProps> = ({ job, isOpen, onClose }) => {
    return (
        <Drawer open={isOpen} onOpenChange={onClose} direction="right">
            <DrawerContent className="flex flex-col justify-between h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[500px] rounded-none p-4">
                <div className="h-full">
                    <DrawerHeader className="flex justify-between items-center">
                        <div>
                            <DrawerTitle className="text-xl font-semibold">{job.title}</DrawerTitle>
                            <DrawerDescription className="text-sm text-muted-foreground">{job.description}</DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                                ✕
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center space-x-2">
                            <FaBuilding className="text-gray-500" />
                            <span className="text-sm">{job.company.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="text-sm">{job.workLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMoneyBillWave className="text-green-500" />
                            <span className="text-sm">{currencyFormatter(job.salary)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-500" />
                            <span className="text-sm">{job.minWeekHours} - {job.maxWeekHours} hrs/week</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaFileContract className="text-purple-500" />
                            <span className="text-sm">{job.contractType}</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium">Requirements:</h3>
                            <ul className="list-disc list-inside text-sm">
                                {job.requirements.map((req, index) => (
                                    <li key={index}>{req.name} ({req.experienceYears} anos)</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <Button className="w-full">Candidatar agora</Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default JobDetailsDrawer;
