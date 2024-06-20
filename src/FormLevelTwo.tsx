import React, { useState } from 'react';

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    position: string;
    relevantExperience: string;
    portfolioURL: string;
    managementExperience: string;
    additionalSkills: string[];
    interviewTime: string;
}

const initialFormData: FormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: 'Developer',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: ''
};

const FormLevelTwo: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prevFormData => ({
                ...prevFormData,
                additionalSkills: checked
                    ? [...prevFormData.additionalSkills, value]
                    : prevFormData.additionalSkills.filter(skill => skill !== value)
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = (): boolean => {
        const errors: Partial<FormData> = {};
        if (!formData.fullName) errors.fullName = 'Full Name is required';
        if (!formData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
        else if (isNaN(Number(formData.phoneNumber))) errors.phoneNumber = 'Phone Number must be a valid number';
        if (formData.position === 'Developer' || formData.position === 'Designer') {
            if (!formData.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
            else if (isNaN(Number(formData.relevantExperience)) || Number(formData.relevantExperience) <= 0) errors.relevantExperience = 'Experience must be a number greater than 0';
        }
        if (formData.position === 'Designer' && !formData.portfolioURL) errors.portfolioURL = 'Portfolio URL is required';
        if (formData.position === 'Manager' && !formData.managementExperience) errors.managementExperience = 'Management Experience is required';
        if (formData.additionalSkills.length == 0) errors.additionalSkills = ['At least one skill must be selected'];
        if (!formData.interviewTime) errors.interviewTime = 'Preferred Interview Time is required'
        else if(formData.interviewTime)
            //TODO: show error if date is in pasth 

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setSubmittedData(formData);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1" htmlFor='fullName'>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        id='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        name="email"
                        id='email'
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor='phoneNumber'>Phone Number:</label>
                    <input
                        type="text"
                        id='phoneNumber'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor='position'> Applying for Position:</label>
                    <select
                        name="position"
                        id='position'
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                {(formData.position === 'Developer' || formData.position === 'Designer') && (
                    <div>
                        <label className="block mb-1" htmlFor='relevantExperience'>Relevant Experience (years):</label>
                        <input
                            type="number"
                            id='relevantExperience'
                            name="relevantExperience"
                            value={formData.relevantExperience}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.relevantExperience && <p className="text-red-500 text-sm">{errors.relevantExperience}</p>}
                    </div>
                )}
                {formData.position === 'Designer' && (
                    <div>
                        <label className="block mb-1" htmlFor='portfolioURL'>Portfolio URL:</label>
                        <input
                            type="url"
                            id='portfolioURL'
                            name="portfolioURL"
                            value={formData.portfolioURL}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.portfolioURL && <p className="text-red-500 text-sm">{errors.portfolioURL}</p>}
                    </div>
                )}
                {formData.position === 'Manager' && (
                    <div>
                        <label className="block mb-1" htmlFor='managementExperience'>Management Experience:</label>
                        <input
                            type="text"
                            id='managementExperience'
                            name="managementExperience"
                            value={formData.managementExperience}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.managementExperience && <p className="text-red-500 text-sm">{errors.managementExperience}</p>}
                    </div>
                )}
                <div>
                    <label className="block mb-1">Additional Skills:</label>
                    <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'CSS', 'Python'].map(skill => (
                            <label key={skill} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="additionalSkills"
                                    value={skill}
                                    onChange={handleChange}
                                    checked={formData.additionalSkills.includes(skill)}
                                    className="mr-2"
                                />
                                {skill}
                            </label>
                        ))}
                    </div>
                    {errors.additionalSkills && <p className="text-red-500 text-sm">{errors.additionalSkills}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor='interviewTime'>Preferred Interview Time:</label>
                    <input
                        type="datetime-local"
                        id='interviewTime'
                        name="interviewTime"
                        value={formData.interviewTime}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.interviewTime && <p className="text-red-500 text-sm">{errors.interviewTime}</p>}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600">
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Form Submission Summary:</h3>
                    <p>Full Name: {submittedData.fullName}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Phone Number: {submittedData.phoneNumber}</p>
                    <p>Position: {submittedData.position}</p>
                    {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && (
                        <p>Relevant Experience: {submittedData.relevantExperience}</p>
                    )}
                    {submittedData.position === 'Designer' && (
                        <p>Portfolio URL: {submittedData.portfolioURL}</p>
                    )}
                    {submittedData.position === 'Manager' && (
                        <p>Management Experience: {submittedData.managementExperience}</p>
                    )}
                    <p>Additional Skills: {submittedData.additionalSkills.join(', ')}</p>
                    <p>Preferred Interview Time: {submittedData.interviewTime}</p>
                </div>
            )}
        </div>
    );
};

export default FormLevelTwo;
