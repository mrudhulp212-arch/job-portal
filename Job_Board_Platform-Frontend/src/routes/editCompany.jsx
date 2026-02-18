import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';

function EditCompany(props) {
    const { register, handleSubmit, setValue } = useForm();
    const [editField, setEditField] = useState(null);
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { id } = useParams();
    let [myCompanyData, loading, error] = useFetchDataDetail(`companies/${id}`);
    const [isEditing, setIsEditing] = useState({
        name: false, location: false, industry: false, website: false, description: false, logo: false
    });

    React.useEffect(() => {
        if (!loading) {
            setValue("name", myCompanyData.name);
            setValue("location", myCompanyData.location);
            setValue("industry", myCompanyData.industry);
            setValue("website", myCompanyData.website);
            setValue("description", myCompanyData.description);
        }
    }, [myCompanyData, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("location", data.location);
        formData.append("industry", data.industry);
        formData.append("website", data.website);
        formData.append("description", data.description);
        formData.append("createdBy", user.id);

        if (data?.logo?.[0]) {
            formData.append("companyIconImage", data.logo[0]);
        }

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }


        const url = `${import.meta.env.VITE_API_BASE_URL}/companies/${myCompanyData._id}`;
        try {
            toast({
                description: `${myCompanyData.name} info is saving...`,
                style: {
                    backgroundColor: '#00fff2',
                    color: 'black'
                }
            })
            await axios.patch(url, formData,{ 
                headers: { "Content-Type": "multipart/form-data" }, 
                withCredentials: true }
            )
            .then(response => {
                // console.log("Company updated:", response);
                toast({
                    description: "Changes saved successfully",
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
                setTimeout(() => {
                    navigate(`/employer/companies/${response?.data?.data?._id}`)
                }, 1200);
            })
        } catch (error) {
            console.error("Error updating company:", error);
            toast({
                description: "Unable to save update, please reload the page",
                style: { backgroundColor: '#ff5151', color: 'black' },
            });
        }
        setIsEditing({
            name: false, location: false, industry: false, website: false, description: false, logo: false
        });
    };

    const enableEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    return (
        <main className='mx-2 mt-2'>
            <h2 className="text-2xl font-semibold mb-4 text-center">Click the Fields to Edit</h2>
            <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg flex flex-col justify-center items-center">
                {loading ?
                    <SkeletonCard />
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            className="flex justify-center mb-4"
                            onClick={() => enableEdit("logo")}
                        >
                            {isEditing.logo === true ? (
                                <div className="ml-4 rounded">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("logo")}
                                        className="mt-2 text-black"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={myCompanyData.logo}
                                    alt="Company Logo"
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                            )}
                        </div>

                        <div
                            className="mb-4"
                            onClick={() => enableEdit("name")}
                        >
                            {isEditing.name === true ? (
                                <input
                                    type="text"
                                    {...register("name")}
                                    className="border p-2 w-full  rounded"
                                />
                            ) : (
                                <h2 className="text-lg text-black font-bold border-b">
                                    {myCompanyData.name}
                                </h2>
                            )}
                        </div>

                        <div
                            className="mb-4"
                            onClick={() => enableEdit("industry")}
                        >
                            {isEditing.industry === true ? (
                                <input
                                    type="text"
                                    {...register("industry")}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <p className="text-sm text-gray-500 border-b">{myCompanyData.industry}</p>
                            )}
                        </div>

                        <div
                            className="mb-4"
                            onClick={() => enableEdit("location")}
                        >
                            {isEditing.location === true ? (
                                <input
                                    type="text"
                                    {...register("location")}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <p className="text-sm text-gray-500 border-b">{myCompanyData.location}</p>
                            )}
                        </div>

                        <div
                            className="mb-4"
                            onClick={() => enableEdit("website")}
                        >
                            {isEditing.website === true ? (
                                <input
                                    type="text"
                                    {...register("website")}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <div className=' border-b'>
                                    <a
                                        // href={myCompanyData.website}
                                        className="text-blue-500 underline "
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {myCompanyData.website}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div
                            className="mb-4 border-b"
                            onClick={() => enableEdit("description")}
                        >
                            {isEditing.description === true ? (
                                <textarea
                                    {...register("description")}
                                    className="border p-2 w-full rounded"
                                />
                            ) : (
                                <p className='text-black'>{myCompanyData.description}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Update Company
                        </button>
                    </form>
                }
            </div>
        </main>
    );
}

export default EditCompany;
