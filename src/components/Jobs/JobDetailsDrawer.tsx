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
import { FaMoneyBillWave, FaClock, FaFileContract, FaMapMarkerAlt, FaBuilding, FaUserTie } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useUserContext } from "@/contexts/UserContext";
import { toast } from "sonner";
import { getModalityIcon } from "./utils/modalityIcon";

interface JobDetailsDrawerProps {
    job: Job;
    isOpen: boolean;
    onClose: () => void;
}

const JobDetailsDrawer: FC<JobDetailsDrawerProps> = ({ job, isOpen, onClose }) => {
    const { simpleUserJson } = useUserContext();

    const applyToJob = async () => {
        try {
            const response = await api.post(`/jobs/${job.id}/apply`, {
                developerId: simpleUserJson.id,
            });

            toast.success("Candidatura enviada com sucesso!", {
                position: "top-center",
            });

            return response.data;
        } catch (err: any) {
            toast.error(err.response.data, {
                position: "top-center",
            });
        }
    };

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
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <span className="text-sm">{job.minWeekHours} - {job.maxWeekHours} hrs/sem</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaFileContract className="text-purple-500" />
                            <span className="text-sm">{job.contractType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {getModalityIcon(job.workModality)}
                            <span className="text-sm">{job.workModality}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaUserTie className="text-purple-500" />
                            <span className="text-sm">{job.recruiter.firstName} {job.recruiter.lastName}</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-sm font-medium">Requisitos:</h3>
                        <ul className="list-disc list-inside text-sm flex flex-row flex-wrap gap-1 mt-2">
                            {job.requirements.map((requirement: any) => (
                                <div className="bg-blue-200 rounded-md py-1 px-2 w-fit">
                                    <p className="text-blue-700 text-center text-xs">
                                        {requirement.name} - {requirement.experienceYears} anos
                                    </p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6">
                    <Button className="w-full" onClick={() => applyToJob()}>
                        Candidatar agora
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default JobDetailsDrawer;
