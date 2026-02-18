import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

function ResumeAttachCard({ job }) {
    const { user, isLoading } = useSelector(state => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [fileName, setFileName] = useState("No file chosen");
    const [resumeFile, setResumeFile] = useState(null);
    const [allowedApply, setAllowedApply] = useState(false);

    useEffect(() => {
        async function appliedJob(params) {
            if (user && job) {
                const url = `${import.meta.env.VITE_API_BASE_URL}/applications/applicable`
                await axios.post(url, { jobId: job._id }, { withCredentials: true })
                    .then(response => setAllowedApply(true))
                    .catch(error => setAllowedApply(false))/*console.log(error, "|| Unable to fetch list");*/
            }
        }
        appliedJob();
    }, [job]);

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("jobId", job._id);
        if (resumeFile) formData.append("resume", resumeFile);
        else {
            console.error("No resume attached");
            return;
        }

        try {
            toast({
                description: "Your application is uploading",
                style: {
                    backgroundColor: '#00fff2',
                    color: 'black'
                }
            })
            const url = `${import.meta.env.VITE_API_BASE_URL}/applications`;
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            console.log("Application submitted successfully:", response.data);
            toast({
                description: "Your application has successfull uploaded",
                style: {
                    backgroundColor: '#90ee90',
                    color: 'black'
                }
            })
            setTimeout(() => {
                window.location.href = '/employee/applied_jobs';
            }, 1300);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast({
                description: error?.response?.data?.message,
                style: {
                    backgroundColor: '#ff5151',
                    color: 'black'
                }
            })
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setResumeFile(file); // Store the selected file in state
        setFileName(file ? file.name : "No file chosen");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {allowedApply ?
                <div className='flex flex-col justify-center items-center h-2/4'>
                    <p className='mb-5'>Apply for the job by attaching your resume</p>
                    <div className='flex flex-row justify-center gap-2 w-10/12'>
                        <div className='relative grow bg-gray-500 flex justify-between items-center rounded-full '>
                            <input
                                type="file"
                                {...register('resume', { required: true })}
                                className="hidden"
                                id="resume-upload"
                                onChange={handleFileChange}
                            />
                            {errors.resume && <span className='absolute top-14 text-xs text-red-600'>Please upload your resume before sending</span>}

                            <label
                                htmlFor="resume-upload"
                                className="bg-white text-gray-700 py-2 px-4 m-1 cursor-pointer hover:bg-gray-200 rounded-full"
                            >
                                Choose file
                            </label>

                            <span className="ml-2 pr-1 text-white text-xs">{fileName}</span>
                        </div>

                        <button type="submit" className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 px-6 rounded">
                            Send
                        </button>
                    </div>
                </div>
                :
                <div>
                    <h3>You have already applied for this job</h3>
                </div>
            }
        </form>
    );
}

export default ResumeAttachCard;

