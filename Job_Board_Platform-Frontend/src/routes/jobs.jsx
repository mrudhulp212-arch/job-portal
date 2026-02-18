import React, { useEffect, useState } from 'react';

import { jobs } from "../fakeUtilities/myUtils"
import JobCard from '../myComponents/JobCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';
import { useSelector } from 'react-redux';
import SearchBar from '@/myComponents/searchBar';


function Jobs(props) {
    const { user } = useSelector(state => state.user);
    const [urlParam, setUrlParam] = useState('')

    const bringData = async (jobsVerificaion) => {
        if (jobsVerificaion === 'approved') {
            setUrlParam("?verifiedJob=approved");
        } else if (jobsVerificaion === 'pending') {
            setUrlParam("?verifiedJob=pending");
        } else if (jobsVerificaion === 'rejected') {
            setUrlParam("?verifiedJob=rejected");
        } else {
            setUrlParam("");
        }
    }

    useEffect(() => {
        console.log("urlParam: ", urlParam)
    }, [urlParam]);

    const finalUrl = user?.userType === 'admin' ? urlParam : `?verifiedJob=approved${urlParam ? `&${urlParam.slice(1)}` : ''}`;
    const [jobs, loading, error] = useFetchList(`jobs${finalUrl}`);


    return (
        <>
            <main className='flex flex-col w-full h-full p-6'>
                <div>
                    <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
                        <div>
                            <h1 className='font-bold text-2xl  p-3 sm:p-0'>Available Job listings</h1>
                        </div>
                        <div>
                            <SearchBar field='Job' setUrlParam={setUrlParam} />
                        </div>
                    </div>
                    {user?.userType === 'admin' && <div className='flex flex-row justify-center md:justify-end py-5'>
                        <button onClick={() => bringData("all")} className="bg-gray-200 w-20 hover:shadow-md rounded-l text-black">all</button>
                        <button onClick={() => bringData("approved")} className="bg-green-200 w-20 hover:shadow-md text-green-700">approved</button>
                        <button onClick={() => bringData("pending")} className="bg-yellow-200 w-20 hover:shadow-md text-yellow-600">pending</button>
                        <button onClick={() => bringData("rejected")} className="bg-red-200 w-20 hover:shadow-md rounded-r text-red-600">regected</button>
                    </div>}
                </div>
                {loading === true ?
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>
                    :
                    <div className='flex flex-col justify-center items-center gap-1 flex-wrap'>
                        {error === 'Jobs not found' ?
                            <div className='flex flex-col sm:flex-row justify-between items-center p-4 '> not any jobs </div>
                            :
                            jobs?.map(item => (<JobCard key={item._id} job={item} />))
                        }
                    </div>}
            </main>
        </>
    );
}

export default Jobs;

