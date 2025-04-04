import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Spotlight from '../reactcomp/SpotlightBox';

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        gender: '',
        bio: '',
        age: ''
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const [missingDetailsError, setMissingDetailsError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['username', 'password', 'name', 'email', 'gender', 'age'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setMissingDetailsError('Please fill in all required fields.');
            return;
        }

        try {
            const formDataWithFile = new FormData();
            for (const key in formData) {
                formDataWithFile.append(key, formData[key]);
            }
            if (profilePicture) {
                formDataWithFile.append('profilePicture', profilePicture);
            }

            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                body: formDataWithFile,
            });

            if (response.status === 409) {
                const data = await response.json();
                setError(data.msg);
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: '',
            password: '',
            name: '',
            email: '',
            gender: '',
            bio: '',
            age: ''
        });
        setProfilePicture(null);
        setError('');
        setMissingDetailsError('');
    };

    const closeModal = () => {
        setError('');
        setMissingDetailsError('');
    };

    return (
        <div className="relative isolate px-6 pt-7 lg:px-8">
        <div
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
        </div>
        <div className="flex h-auto flex-1 flex-col justify-center px-6 py-12 lg:px-8">
           
            {(error || missingDetailsError) && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div className="bg-black rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-red-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V7a1 1 0 112 0v3a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Error</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{error || missingDetailsError}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-screen mt-20">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto  rounded-lg overflow-hidden shadow-md" >
                    <Spotlight>
                    <div className="px-8 py-6">
                        <h2 className="text-3xl font-extrabold text-pink-300 mb-4 text-center font-serif">Signup</h2>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 col-span-full">
                                    <div className="col-span-full">
                                        <label htmlFor="profilePicture" className="block text-blue-300 text-base font-semibold mb-2">
                                            Profile Picture
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10  border-blue-400  w-full ">
                                            {profilePicture ? (
                                                <div className="text-center">
                                                    {profilePicture.type.startsWith('image/') ? (
                                                        <img
                                                            src={URL.createObjectURL(profilePicture)}
                                                            alt="Uploaded Preview"
                                                            className="mx-auto h-24 w-24 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-600">{profilePicture.name}</p>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfilePicture(null)}
                                                        className="mt-4 text-sm font-semibold text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input
                                                                id="file-upload"
                                                                name="profilePicture"
                                                                type="file"
                                                                onChange={handleFileChange}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-blue-300 text-base font-semibold mb-2">
                                            Username <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                                    placeholder="janesmith"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="password" className="block text-blue-300 text-base font-semibold mb-2">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="bio" className="block text-blue-300 text-base font-semibold mb-2">
                                            About
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                rows={3}
                                                value={formData.bio}
                                                onChange={handleChange}
                                                className="block w-full rounded-md appearance-none border border-blue-400  py-3 px-4 text-pink-400 placeholder-gray-400 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-pink-300">Write a few sentences about yourself.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-pink-400">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-blue-300 text-base font-semibold mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="given-name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-500 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-blue-300 text-base font-semibold mb-2">
                                            Email address <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-500 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="gender" className="block text-blue-300 text-base font-semibold mb-2">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="gender"
                                                name="gender"
                                                autoComplete="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className=" border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-500 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Non Binary">Non Binary</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="age" className="block text-blue-300 text-base font-semibold mb-2">
                                            Age <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="age"
                                                id="age"
                                                autoComplete="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="appearance-none border border-blue-400 rounded w-full py-3 px-4 text-pink-400 placeholder-gray-500 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-300 focus:shadow-outline transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-center gap-x-100">
                        <button onClick={handleCancel} type="button" className=" text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-110 hover:bg-pink-500 duration-500">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-pink-600 transition-transform transform hover:scale-110  duration-500">
                            Save
                        </button>
                    </div>
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Already a member?{' '}
                            <a href="/login"className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                                login Now
                            </a>
                    </p>
                    <p className="text-center text-sm text-gray-500">
                         Go back to Homepage?{' '}
                            <a href="/" className="font-semibold leading-6 text-pink-300 hover:text-pink-400">
                            Go back
                            </a>
                    </p>
                    </Spotlight>
                </form>
            </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        </div>
    );
}