import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import useThemeStyle from '@/myHooks/useThemeStyle';
import { authenticatUser } from '@/redux/slices/userSlice';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AccountEdit(props) {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myUserType = user.userType;
    let [myAccountData, loading, error] = useFetchDataDetail(myUserType === 'employee' ? `users/${user.id}` : `employers/${user.id}`);

    const themeStyle = useThemeStyle();

    const { register, handleSubmit, setValue } = useForm();
    const [isEditing, setIsEditing] = useState({
        name: false, email: false, profession: false, experienced: false, bio: false,
    });

    const handleFormSubmit = async (data) => {
        const formData = new FormData();
        const updatedData = { ...myAccountData, ...data };

        formData.append('name', updatedData.name);
        formData.append('email', updatedData.email);
        formData.append('profession', updatedData.profession);
        formData.append('experienced', updatedData.experienced);
        formData.append('bio', updatedData.bio);
        console.log(formData);


        if (data.profileImage?.[0]) {
            formData.append('profileImage', data.profileImage[0]);
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/${myUserType === 'employee' ? 'users' : 'employers'}/${user.id}`;
        try {
            toast({
                description: `Your info is saving...`,
                style: {
                    backgroundColor: '#00fff2',
                    color: 'black'
                }
            })
            await axios.patch(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            }).then((response) => {
                console.log(response?.data);
                dispatch(authenticatUser(response?.data?.data));
                toast({
                    description: "Changes saved, reload page",
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
            });
        } catch (error) {
            console.error(error);
            toast({
                description: "Unable to save update, please reload the page",
                style: { backgroundColor: '#ff5151', color: 'black' },
            });
        }
        setIsEditing({
            name: false, email: false, profession: false, experienced: false, bio: false, profileImage: false,
        });
        setTimeout(() => {
            window.location.reload();
        }, 1200);
    };

    const enableEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`max-w-3xl mx-auto p-6 pt-10 mt-10 shadow-xl border-t rounded-lg ${themeStyle}`} >
            <Toaster />
            {
                loading ?
                    <div className='flex flex-col items-center'>
                        < h2 className="text-2xl font-semibold mb-4 text-center" > Edit Fields Are Loading</h2>
                        <SkeletonCard />
                    </div >
                    :
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-center">Click the Fields to Edit</h2>

                        <div className="flex items-start justify-between space-x-8">
                            <div className="w-1/3">
                                {isEditing.profileImage ? (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            // onChange={(e) => uploadImage(e.target.files[0])}
                                            {...register("profileImage")}  // Register it as 'profileImage' in react-hook-form
                                            className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                        />

                                    </>
                                ) : (
                                    <img
                                        src={myAccountData.profileImage}
                                        alt="User profile"
                                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                        onClick={() => enableEdit('profileImage')}
                                    />
                                )}

                                {isEditing.name ? (
                                    <input
                                        {...register('name')}
                                        defaultValue={myAccountData.name}
                                        className="block w-full px-3 py-2 border  rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                ) : (
                                    <p className={`text-center  text-2xl font-normal`} onClick={() => enableEdit('name')}>
                                        {myAccountData.name}
                                    </p>
                                )}

                                {isEditing.email ? (
                                    <input
                                        {...register('email')}
                                        defaultValue={myAccountData.email}
                                        className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                ) : (
                                    <p className="text-center text-gray-500 text-lg font-semibold" onClick={() => enableEdit('email')}>
                                        {myAccountData.email}
                                    </p>
                                )}

                                {isEditing.experienced ? (
                                    <input
                                        {...register('experienced')}
                                        defaultValue={myAccountData.experienced}
                                        className="block w-full mt-2 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                ) : (
                                    <p className="text-center text-gray-v mt-2 text-md" onClick={() => enableEdit('experienced')}>
                                        {myAccountData.experienced} year experienced
                                    </p>
                                )}
                            </div>

                            <div className="w-2/3">
                                {isEditing.profession ? (
                                    <input
                                        {...register('profession')}
                                        defaultValue={myAccountData.profession}
                                        className="block mb-3 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                ) : (
                                    <h3 className="font-semibold mb-2 " onClick={() => enableEdit('profession')}>{myAccountData.profession}</h3>

                                )}
                                {isEditing.bio ? (
                                    <textarea
                                        {...register('bio')}
                                        defaultValue={myAccountData.bio}
                                        className="block w-full h-48 px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
                                    />
                                ) : (
                                    <p className="text-gray-500 text-lg font-semibold" onClick={() => enableEdit('bio')}>
                                        {myAccountData.bio}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
                                >
                                    Update Changes
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </form >
    );
}

export default AccountEdit;
