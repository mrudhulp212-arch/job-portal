import { useForm } from 'react-hook-form';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { toast } from '@/hooks/use-toast';

function EmployerJobEdit(props) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, loading, error] = useFetchDataDetail(`jobs/${id}`);
    
    const onSubmit = async (data) => {
        await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${job._id}`, data, { withCredentials: true })
            .then(response => {
                // console.log('response?.data?.data:', response?.data?.data);
                toast({
                    description: "Changes saved",
                    style: { backgroundColor: '#90ee90', color: 'black' },
                });
                setTimeout(() => {
                    navigate(`/employer/employer_job_detail/${job._id}`)
                }, 1200);
            })
            .catch(error => {
                // console.log('error:', error);
                toast({
                    description: "Unable to save changes, please reload the page",
                    style: { backgroundColor: '#ff5151', color: 'black' },
                });
            })
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-4">Edit Job</h1>
            <div className="border shadow-md p-4 rounded-lg bg-white">
                {loading ?
                    <SkeletonCard />
                    :
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1  gap-4">
                            <div>
                                <label htmlFor="" className='text-gray-500'>title</label>
                                <input
                                    type="text"
                                    placeholder={"Title"}
                                    defaultValue={job.title}
                                    {...register("title", { required: "Title is required" })}
                                    className="border p-2 rounded w-full"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            {/* <div>
                                    <label htmlFor="" className='text-gray-500'>company</label>
                                    <select
                                        {...register("company", { required: "Company selection is required" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue={sampleJobDetails.company}
                                    >
                                        <option value="">Company</option>
                                        <option value={sampleJobDetails.company}>{sampleJobDetails.company}</option>
                                        {companyNames.map((company) => (
                                            (company.name !== sampleJobDetails.company) &&
                                            <option key={company.id} value={company.name}>{company.name}</option>
                                        ))}
                                    </select>
                                    {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                                </div> */}
                        </div>
                        <div>
                            <label htmlFor="" className='text-gray-500'>headline</label>
                            <input
                                type="text"
                                placeholder="Headline"
                                defaultValue={job.headline}
                                {...register("headline", { required: "Headline is required" })}
                                className="border p-2 rounded w-full"
                            />
                            {errors.headline && <p className="text-red-500 text-sm">{errors.headline.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="" className='text-gray-500'>job type</label>
                                <select
                                    {...register("jobType", { required: "Job type is required" })}
                                    className="border p-2 rounded w-full"
                                    defaultValue={job.jobType}
                                >
                                    <option value="">Work type</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="full-time">Full-time</option>
                                </select>
                                {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="" className='text-gray-500'>hiring</label>
                                <select
                                    {...register("hiring", { required: "Hiring selection is required" })}
                                    className="border p-2 rounded w-full"
                                    defaultValue={job.hiring}
                                >
                                    <option value="">Hiring</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No now</option>
                                </select>
                                {errors.hiring && <p className="text-red-500 text-sm">{errors.hiring.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="" className='text-gray-500'>salary</label>
                                <input
                                    type="number"
                                    placeholder="Salary"
                                    defaultValue={job.salary}
                                    {...register("salary", { required: "Salary is required", min: { value: 0, message: "Salary must be a positive number" } })}
                                    className="border p-2 rounded w-full"
                                />
                                {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className='text-gray-500'>location</label>
                            <input
                                type="text"
                                placeholder="Location"
                                defaultValue={job.location}
                                {...register("location", { required: "Location is required" })}
                                className="border p-2 rounded w-full"
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="" className='text-gray-500'>description</label>
                            <textarea
                                placeholder="Description"
                                {...register("description", { required: "Description is required" })}
                                className="border p-2 rounded w-full"
                                defaultValue={job.description}
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
                }
            </div>
        </div>
    );
}

export default EmployerJobEdit;