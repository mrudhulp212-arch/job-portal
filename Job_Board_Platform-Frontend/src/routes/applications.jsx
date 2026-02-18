import ApplicationCard from '@/myComponents/applicationCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';
import useThemeStyle from '@/myHooks/useThemeStyle';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Applications({ job }) {
    const { user } = useSelector(state => state.user);
    const themeStyle = useThemeStyle();
    const [applications, applicationLoading, applicationError] = useFetchList(`applications?jobId=${job._id}`);

    useEffect(() => {
        console.log("applications: ", applications)
    }, [applications]);

    return (
        <div className={``}>
            {applicationLoading ?
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className=" p-4 rounded-lg shadow-sm flex flex-row justify-center">
                            <SkeletonCard key={index} />
                        </div>
                    ))}
                </div>
                :
                applications &&
                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto pt-5 `}>
                    {applications?.map(item => (<ApplicationCard key={item._id} application={item} />))}
                </div>
            }
        </div>
    );
}

export default Applications;