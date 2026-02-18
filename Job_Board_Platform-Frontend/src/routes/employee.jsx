import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import useThemeStyle from '@/myHooks/useThemeStyle';

function Employee(props) {
    const { id } = useParams()
    const [user, loading, error] = useFetchDataDetail(`users/${id}`);
    const themeStyle = useThemeStyle();

    return (
        <div className="flex flex-col w-full h-full p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Employee Information</h1>

            {loading !== false ?
                <div className={`flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12 ${themeStyle}`}>
                    <SkeletonCard />
                </div>
                :
                <div className={`flex flex-col md:flex-row items-center justify-center border p-6 rounded-lg shadow-sm space-y-6 md:space-y-0 md:space-x-12 ${themeStyle}`}>
                    <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col justify-center items-center">
                        <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-52 h-52 rounded-full object-cover"
                        />
                        <h2 className="text-lg font-medium mb-4">{user.name}</h2>
                        <p className="text-lg font-semibold text-gray-500">{user.email}</p>
                        <p className="text-lg font-semibold text-gray-500">{user.experienced} year experience</p>
                    </div>
                    <div className="flex flex-col items-center text-center md:text-left  w-1/2 p-4">
                        <h3 className="text-lg font-semibold mb-2">{user.profession}</h3>
                        <p className="text-lg font-semibold text-gray-500">{user.bio}</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Employee;