import React, { useEffect } from 'react';

import { jobs } from '@/fakeUtilities/myUtils';
import AppliedJobCard from '@/myComponents/appliedJobCard';
import { useFetchList } from '@/myHooks/fetchList';

function AppliedJobs(props) {

    const [appliedJobs, loading, error] = useFetchList('applications/applied_jobs')
    useEffect(() => {
        if(appliedJobs ) console.log(appliedJobs)
    }, [appliedJobs, loading, error]);
    return (
        <div className='m-2'>
            <h3 className='font-bold text-2xl  p-5 text-center'>Applied Jobs</h3>
            <div className='flex flex-col justify-center items-center gap-1'>
                {appliedJobs ?
                    appliedJobs.map(job => <AppliedJobCard key={job._ic} job={job.jobId} />)
                    :
                    <div>not any applied jobs</div>
                }
            </div>
        </div>
    );
}

export default AppliedJobs;