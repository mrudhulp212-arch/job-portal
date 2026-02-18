
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function EmployerJobDetail(props) {
    const { user, isLoggedIn } = useSelector(state => state.user);
    const {id} = useParams()
    const [job, loading, error] = useFetchDataDetail(`jobs/${id}`);

    return (
        <div className=" mx-auto mt-10 sm:mx-3 flex flex-col justify-center items-center">
            <h2 className="text-center text-2xl font-bold mb-6">Job Details</h2>
            { loading ? <div className="flex flex-col md:flex-row justify-between border border-gray-300 rounded-lg p-4">
                <SkeletonCard />
            </div> :
            <div className="flex flex-col md:flex-row justify-between border border-gray-300 rounded-lg p-4">

                <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                    <p className="text-gray-700">{job.company.name}</p>
                    <p className="text-gray-600">Location: {job.location}</p>
                    <p className="text-gray-600">Job type: {job.jobType}</p>
                    <p className="text-gray-600 mb-4">Salary: {job.salary}</p>
                    <hr />
                    <div className='flex flex-col justify-start items-start h-2/4 p-2'>
                        <Link to={`/employer/employer_job_edit/${job._id}`} className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 px-6 rounded">
                            Edit Job Information
                        </Link>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-lg font-bold mb-4">
                        {job.headline}
                    </h3>
                    <p className="text-gray-700">
                        {job.description}
                    </p>
                </div>
            </div>}
        </div>
    );
}

export default EmployerJobDetail;