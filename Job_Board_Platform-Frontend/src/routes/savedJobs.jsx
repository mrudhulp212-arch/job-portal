import { useFetchList } from "@/myHooks/fetchList";
import JobCard from '../myComponents/JobCard';
import { useEffect, useState } from "react";
import { SkeletonCard } from "@/myComponents/SkeletonCard";

function SavedJobs(props) {
    const [savedJobs, loading, error] = useFetchList("saveJob");
    const [jobs, setJobs] = useState([]);
    const [jobsCount, setJobsCount] = useState([]);

    useEffect(() => {
        if (!loading && savedJobs) {
            setJobs(savedJobs || []);
            setJobsCount(savedJobs.totalJobSaved || 0);

            jobs.map(job => console.log("job:", job.jobId))
            console.log("jobsCount:", jobs);
        }
    }, [loading, savedJobs]);


    return (
        <main>
            <div className='flex justify-center items-center p-6 '>
                    <h1 className='font-bold text-2xl'>Your Saved Jobs</h1>
            </div>
            {loading ?
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    <SkeletonCard />
                </div>
                :
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    {
                        jobs.length === 0 ? <div className="flex justify-center items-center h-[65vh]">not any saved jobs</div> :
                    jobs.map(job => (<JobCard key={job.jobId._id} job={job.jobId} />))
                    }
                </div>
            }
        </main>
    );
}

export default SavedJobs;