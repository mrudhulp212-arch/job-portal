import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import { useFetchList } from '@/myHooks/fetchList';
import { useSelector } from 'react-redux';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { TooltipDemo } from '@/myComponents/HoverToolTip';
import JobCard from '@/myComponents/JobCard';
import EmployerJobCard from '@/myComponents/employerJobCard';

function EmployerJobListed(props) {
    const { user } = useSelector(state => state.user)
    const [jobs, loading, error] = useFetchList(`jobs?jobCreatedBy=${user.id}`)
    return (
        <main>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '>
                <div>
                    <h1 className='font-bold text-2xl'>Emploer Job listings</h1>
                </div>
                <div className='flex flex-row justify-center items-center gap-3'>
                    
                    <div className='flex justify-center items-center'>
                        <TooltipDemo add={'job'} />
                    </div>
                </div>
            </div>

            {loading === true ?
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                    {jobs ?
                        jobs.map(job =>  (<EmployerJobCard key={job._id} job={job} />))
                        :
                        <div>
                            no jobs found
                        </div>
                    }
                </div>
            }
        </main>
    );
}

export default EmployerJobListed;