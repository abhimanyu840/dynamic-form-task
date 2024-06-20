import React, { useState, useEffect } from 'react';
import useFetchQuestions from './hook/useFetchQuestion';


const FormLevelThree: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        topic: '',
        technology: {
            favoriteLanguage: '',
            experience: '',
        },
        health: {
            exerciseFrequency: '',
            dietPreference: '',
        },
        education: {
            qualification: '',
            fieldOfStudy: '',
        },
        feedback: '',
    });
    const [errors, setErrors] = useState<any>({});
    const { questions, loading, error } = useFetchQuestions(formData.topic);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');
        if (section && field) {
            setFormData((prevData: any) => ({
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [field]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = (): boolean => {
        const newErrors: any = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.topic) newErrors.topic = 'Survey Topic is required';

        if (formData.topic === 'Technology') {
            if (!formData.technology.favoriteLanguage) newErrors.favoriteLanguage = 'Favorite Programming Language is required';
            if (!formData.technology.experience) newErrors.experience = 'Years of Experience is required';
        }

        if (formData.topic === 'Health') {
            if (!formData.health.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
            if (!formData.health.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
        }

        if (formData.topic === 'Education') {
            if (!formData.education.qualification) newErrors.qualification = 'Highest Qualification is required';
            if (!formData.education.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
        }

        if (!formData.feedback) newErrors.feedback = 'Feedback is required';
        else if (formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters long';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Submit the form data
            console.log(formData);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1" htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor="topic">Survey Topic:</label>
                    <select
                        name="topic"
                        id="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a topic</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                    </select>
                    {errors.topic && <p className="text-red-500 text-sm">{errors.topic}</p>}
                </div>

                {formData.topic === 'Technology' && (
                    <div>
                        <div>
                            <label className="block mb-1" htmlFor="technology.favoriteLanguage">Favorite Programming Language:</label>
                            <select
                                name="technology.favoriteLanguage"
                                id="technology.favoriteLanguage"
                                value={formData.technology.favoriteLanguage}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a language</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C#">C#</option>
                            </select>
                            {errors.favoriteLanguage && <p className="text-red-500 text-sm">{errors.favoriteLanguage}</p>}
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="technology.experience">Years of Experience:</label>
                            <input
                                type="number"
                                name="technology.experience"
                                id="technology.experience"
                                value={formData.technology.experience}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
                        </div>
                    </div>
                )}

                {formData.topic === 'Health' && (
                    <div>
                        <div>
                            <label className="block mb-1" htmlFor="health.exerciseFrequency">Exercise Frequency:</label>
                            <select
                                name="health.exerciseFrequency"
                                id="health.exerciseFrequency"
                                value={formData.health.exerciseFrequency}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a frequency</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Rarely">Rarely</option>
                            </select>
                            {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="health.dietPreference">Diet Preference:</label>
                            <select
                                name="health.dietPreference"
                                id="health.dietPreference"
                                value={formData.health.dietPreference}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a preference</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                            {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
                        </div>
                    </div>
                )}

                {formData.topic === 'Education' && (
                    <div>
                        <div>
                            <label className="block mb-1" htmlFor="education.qualification">Highest Qualification:</label>
                            <select
                                name="education.qualification"
                                id="education.qualification"
                                value={formData.education.qualification}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a qualification</option>
                                <option value="High School">High School</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                            </select>
                            {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
                        </div>
                        <div>
                            <label className="block mb-1" htmlFor="education.fieldOfStudy">Field of Study:</label>
                            <input
                                type="text"
                                name="education.fieldOfStudy"
                                id="education.fieldOfStudy"
                                value={formData.education.fieldOfStudy}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
                        </div>
                    </div>
                )}

                {loading && <p>Loading additional questions...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {questions && questions.map((question: any, index: number) => (
                    <div key={index} className="space-y-2">
                        <label className="block mb-1">{question.question}</label>
                        {question.type === 'dropdown' && (
                            <select
                                name={`question-${index}`}
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleChange}
                            >
                                {question.options.map((option: string, i: number) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                        {question.type === 'number' && (
                            <input
                                type="number"
                                name={`question-${index}`}
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleChange}
                            />
                        )}
                        {question.type === 'text' && (
                            <input
                                type="text"
                                name={`question-${index}`}
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}

                <div>
                    <label className="block mb-1" htmlFor="feedback">Feedback:</label>
                    <textarea
                        name="feedback"
                        id="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
                </div>

                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormLevelThree;
