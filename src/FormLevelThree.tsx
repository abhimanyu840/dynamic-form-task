import React, { useState, useEffect } from 'react';

interface FormData {
    fullName: string;
    email: string;
    surveyTopic: string;
    favoriteProgrammingLanguage?: string;
    yearsOfExperience?: string;
    exerciseFrequency?: string;
    dietPreference?: string;
    highestQualification?: string;
    fieldOfStudy?: string;
    feedback: string;
}

const initialFormData: FormData = {
    fullName: '',
    email: '',
    surveyTopic: '',
    feedback: ''
};

const surveyTopics = ['Technology', 'Health', 'Education'];
const programmingLanguages = ['JavaScript', 'Python', 'Java', 'C#'];
const exerciseFrequencies = ['Daily', 'Weekly', 'Monthly', 'Rarely'];
const dietPreferences = ['Vegetarian', 'Vegan', 'Non-Vegetarian'];
const qualifications = ['High School', "Bachelor's", "Master's", 'PhD'];

const FormLevelThree: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [additionalQuestions, setAdditionalQuestions] = useState<any[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formData.surveyTopic) {
            fetchAdditionalQuestions(formData.surveyTopic);
        }
    }, [formData.surveyTopic]);

    const fetchAdditionalQuestions = async (topic: string) => {
        try {
            const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
            const data = await response.json();
            setAdditionalQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching additional questions:', error);
        }
    };

    const validate = (): boolean => {
        const errors: Partial<FormData> = {};
        if (!formData.fullName) errors.fullName = 'Full Name is required';
        if (!formData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.surveyTopic) errors.surveyTopic = 'Survey Topic is required';
        if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
            if (!formData.yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
        }
        if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
            if (!formData.dietPreference) errors.dietPreference = 'Diet Preference is required';
        }
        if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) errors.highestQualification = 'Highest Qualification is required';
            if (!formData.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
        }
        if (!formData.feedback) errors.feedback = 'Feedback is required';
        else if (formData.feedback.length < 50) errors.feedback = 'Feedback must be at least 50 characters';

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
                    <label className="block mb-1" htmlFor="surveyTopic">Survey Topic:</label>
                    <select
                        name="surveyTopic"
                        id="surveyTopic"
                        value={formData.surveyTopic}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a topic</option>
                        {surveyTopics.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                    {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
                </div>

                {formData.surveyTopic === 'Technology' && (
                    <div>
                        <label className="block mb-1" htmlFor="favoriteProgrammingLanguage">Favorite Programming Language:</label>
                        <select
                            name="favoriteProgrammingLanguage"
                            id="favoriteProgrammingLanguage"
                            value={formData.favoriteProgrammingLanguage}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select a language</option>
                            {programmingLanguages.map(language => (
                                <option key={language} value={language}>{language}</option>
                            ))}
                        </select>
                        {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
                    </div>
                )}

                {formData.surveyTopic === 'Technology' && (
                    <div>
                        <label className="block mb-1" htmlFor="yearsOfExperience">Years of Experience:</label>
                        <input
                            type="number"
                            name="yearsOfExperience"
                            id="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
                    </div>
                )}

                {formData.surveyTopic === 'Health' && (
                    <div>
                        <label className="block mb-1" htmlFor="exerciseFrequency">Exercise Frequency:</label>
                        <select
                            name="exerciseFrequency"
                            id="exerciseFrequency"
                            value={formData.exerciseFrequency}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select frequency</option>
                            {exerciseFrequencies.map(frequency => (
                                <option key={frequency} value={frequency}>{frequency}</option>
                            ))}
                        </select>
                        {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
                    </div>
                )}

                {formData.surveyTopic === 'Health' && (
                    <div>
                        <label className="block mb-1" htmlFor="dietPreference">Diet Preference:</label>
                        <select
                            name="dietPreference"
                            id="dietPreference"
                            value={formData.dietPreference}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select diet</option>
                            {dietPreferences.map(diet => (
                                <option key={diet} value={diet}>{diet}</option>
                            ))}
                        </select>
                        {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
                    </div>
                )}

                {formData.surveyTopic === 'Education' && (
                    <div>
                        <label className="block mb-1" htmlFor="highestQualification">Highest Qualification:</label>
                        <select
                            name="highestQualification"
                            id="highestQualification"
                            value={formData.highestQualification}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select qualification</option>
                            {qualifications.map(qualification => (
                                <option key={qualification} value={qualification}>{qualification}</option>
                            ))}
                        </select>
                        {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
                    </div>
                )}

                {formData.surveyTopic === 'Education' && (
                    <div>
                        <label className="block mb-1" htmlFor="fieldOfStudy">Field of Study:</label>
                        <input
                            type="text"
                            name="fieldOfStudy"
                            id="fieldOfStudy"
                            value={formData.fieldOfStudy}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
                    </div>
                )}

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

                <button type="submit" className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Form Submission Summary:</h3>
                    <p>Full Name: {submittedData.fullName}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Survey Topic: {submittedData.surveyTopic}</p>
                    {submittedData.surveyTopic === 'Technology' && (
                        <>
                            <p>Favorite Programming Language: {submittedData.favoriteProgrammingLanguage}</p>
                            <p>Years of Experience: {submittedData.yearsOfExperience}</p>
                        </>
                    )}
                    {submittedData.surveyTopic === 'Health' && (
                        <>
                            <p>Exercise Frequency: {submittedData.exerciseFrequency}</p>
                            <p>Diet Preference: {submittedData.dietPreference}</p>
                        </>
                    )}
                    {submittedData.surveyTopic === 'Education' && (
                        <>
                            <p>Highest Qualification: {submittedData.highestQualification}</p>
                            <p>Field of Study: {submittedData.fieldOfStudy}</p>
                        </>
                    )}
                    <p>Feedback: {submittedData.feedback}</p>

                    <h4 className="text-md font-semibold mt-4">Additional Questions:</h4>
                    {additionalQuestions.length > 0 ? (
                        additionalQuestions.map((question, index) => (
                            <p key={index}>{question}</p>
                        ))
                    ) : (
                        <p>No additional questions.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormLevelThree;
