import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    age: string;
    attendingWithGuest: string;
    guestName: string;
}

const FormLevelOne: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: 'No',
        guestName: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = (): boolean => {
        const errors: Partial<FormData> = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.age) errors.age = 'Age is required';
        else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) errors.age = 'Age must be a number greater than 0';
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) errors.guestName = 'Guest Name is required';

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
                    <label className="block mb-1" htmlFor='name'>Name:</label>
                    <input
                        type="text"
                        name="name"
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                    <label className="block mb-1" htmlFor='age'>Age:</label>
                    <input
                        type="number"
                        name="age"
                        id='age'
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div>
                    <label className="block mb-1" htmlFor='attendingWithGuest'>Are you attending with a guest?</label>
                    <select
                        name="attendingWithGuest"
                        id='attendingWithGuest'
                        value={formData.attendingWithGuest}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
                {formData.attendingWithGuest === 'Yes' && (
                    <div>
                        <label className="block mb-1" htmlFor='guestName'>Guest Name:</label>
                        <input
                            type="text"
                            name="guestName"
                            id='guestName'
                            value={formData.guestName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
                    </div>
                )}
                <button type="submit" className="w-full py-2 px-4 bg-violet-500 text-white rounded hover:bg-violet-600">
                    Submit
                </button>
            </form>

            {submittedData && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Form Submission Summary:</h3>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <p>Age: {submittedData.age}</p>
                    <p>Attending with Guest: {submittedData.attendingWithGuest}</p>
                    {submittedData.attendingWithGuest === 'Yes' && <p>Guest Name: {submittedData.guestName}</p>}
                </div>
            )}
        </div>
    );
};

export default FormLevelOne;
