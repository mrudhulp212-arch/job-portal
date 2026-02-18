// src/components/NewJobCreate.js

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { companyNames } from '@/fakeUtilities/myUtils';
import { useSelector } from 'react-redux';
import { useFetchList } from '@/myHooks/fetchList';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import useThemeStyle from '@/myHooks/useThemeStyle';

function NewJobCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, isLoaggedIn } = useSelector(state => state.user)
    const [companies, loading, error] = useFetchList(`companies?createdBy=${user.id}`)
    const navigate = useNavigate();

    const themeStyle = useThemeStyle();

    // if (!loading) {
    //     console.log(companies);

    // }
    const onSubmit = async (data) => {
        data = { ...data, jobCreatedBy: user.id }
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/jobs`, data, { withCredentials: true })
            .then(response => {
                console.log(response?.data?.data)
                console.log(response?.data?.data?._id)
                toast({
                    description: "Job created successfull",
                    style: {
                        backgroundColor: '#90ee90',
                        color: 'black'
                    }
                })
                setTimeout(() => {
                    navigate(`/employer/employer_job_detail/${response?.data?.data?._id}`);
                }, 1500);
            })
            .catch(error => {
                console.log(error?.response?.data?.message)
                toast({
                    description: error?.response?.data?.message,
                    style: {
                        backgroundColor: '#ff5151',
                        color: 'black'
                    }
                })
            })
    };

    useEffect(() => {
        companies && companies.map((company) => company.verifiedCompany === "approved" && console.log(company))
        console.log('----------------------------------------------------')
    }, [companies]);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">Create a new job</h1>
            <div className={`border shadow-md p-4 rounded-lg ${themeStyle}`}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                {...register("title", { required: "Title is required" })}
                                className="border p-2 rounded w-full"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        {loading ?
                            <div>
                                <select
                                    {...register("company", { required: "Company selection is required" })}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Company</option>
                                    {companyNames.map((company) => ( <option key={company.id} value={company.name}>{company.name}</option>) )}
                                </select>
                                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                            </div>
                            :
                            <div>
                                <select
                                    {...register("company", { required: "Company selection is required" })}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Company</option>
                                    {companies.map((company) => (
                                       company.verifiedCompany === "approved" && <option key={company.id} value={company._id}>{company.name}</option>
                                    ))}
                                </select>
                                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                            </div>
                        }
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Headline"
                            {...register("headline", { required: "Headline is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.headline && <p className="text-red-500 text-sm">{errors.headline.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <select
                                {...register("jobType", { required: "Job type is required" })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Work type</option>
                                <option value="part-time">Part-time</option>
                                <option value="full-time">Full-time</option>
                            </select>
                            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
                        </div>

                        <div>
                            <select
                                {...register("hiring", { required: "Hiring selection is required" })}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Hiring</option>
                                <option value="true">Yes</option>
                                <option value="false">No now</option>
                            </select>
                            {errors.hiring && <p className="text-red-500 text-sm">{errors.hiring.message}</p>}
                        </div>

                        <div>
                            <input
                                type="number"
                                placeholder="Salary"
                                {...register("salary", { required: "Salary is required", min: { value: 0, message: "Salary must be a positive number" } })}
                                className="border p-2 rounded w-full"
                                defaultValue={0}
                            />
                            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Location"
                            {...register("location", { required: "Location is required" })}
                            className="border p-2 rounded w-full"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    <div>
                        <textarea
                            placeholder="Description"
                            {...register("description", { required: "Description is required" })}
                            className="border p-2 rounded w-full"
                            rows="5"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewJobCreate;
