import React, { useState } from 'react';
import '../styles/SubmitWill.css';

const SubmitWill = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        alsoKnownAs: '',
        omangNumber: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        maritalStatus: '',
        spouseName: '',
        spouseAddress: '',
        spouseDateOfBirth: '',
        spouseOmangNumber: '',
        childrenInfo: '',
        moreChildren: '',
        realEstateInfo: '',
        executorName: '',
        executorAddress: '',
        executorRelationship: '',
        title: '',
        content: '',
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => {
            // If maritalStatus changes and is not Married, clear spouse fields
            if (id === 'maritalStatus' && value !== 'Married') {
                return {
                    ...prevData,
                    [id]: value,
                    spouseName: '',
                    spouseAddress: '',
                    spouseDateOfBirth: '',
                    spouseOmangNumber: '',
                };
            }
            return {
                ...prevData,
                [id]: value,
            };
        });
    };

    // Determine the next step based on marital status
    const handleNext = () => {
        if (currentStep === 1) {
            if (formData.maritalStatus === 'Married') {
                setCurrentStep(2);
            } else {
                setCurrentStep(3); // Skip spouse info if not married
            }
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    // Determine the previous step based on marital status
    const handlePrevious = () => {
        if (currentStep === 3 && formData.maritalStatus !== 'Married') {
            setCurrentStep(1); // Go back to personal info if not married
        } else {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/wills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            alert('Will submitted successfully!');
            setFormData({
                fullName: '',
                alsoKnownAs: '',
                omangNumber: '',
                address: '',
                phoneNumber: '',
                dateOfBirth: '',
                maritalStatus: '',
                spouseName: '',
                spouseAddress: '',
                spouseDateOfBirth: '',
                spouseOmangNumber: '',
                childrenInfo: '',
                moreChildren: '',
                realEstateInfo: '',
                executorName: '',
                executorAddress: '',
                executorRelationship: '',
                title: '',
                content: '',
            });
            setCurrentStep(1);
        } catch (err) {
            console.error('Submission error:', err);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="main-content">
            <h1>📝 Will Preparation Questionnaire</h1>
            <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                    <div>
                        <h2>Step 1: Personal Information</h2>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Legal Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="alsoKnownAs" className="form-label">Also Known As</label>
                            <input
                                type="text"
                                className="form-control"
                                id="alsoKnownAs"
                                value={formData.alsoKnownAs}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="omangNumber" className="form-label">Omang Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="omangNumber"
                                value={formData.omangNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Residential and Postal Address</label>
                            <textarea
                                className="form-control"
                                id="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number(s)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Marital Status</label>
                            <select
                                className="form-select"
                                id="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>
                                <option>Separated</option>
                                <option>Divorced</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {/* Step 2: Spouse Information (only if Married) */}
                {currentStep === 2 && formData.maritalStatus === 'Married' && (
                    <div>
                        <h2>Step 2: Spouse Information</h2>
                        <div className="mb-3">
                            <label htmlFor="spouseName" className="form-label">Name of Spouse</label>
                            <input
                                type="text"
                                className="form-control"
                                id="spouseName"
                                value={formData.spouseName}
                                onChange={handleChange}
                                required={formData.maritalStatus === 'Married'}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="spouseAddress" className="form-label">Spouse Address</label>
                            <textarea
                                className="form-control"
                                id="spouseAddress"
                                rows="3"
                                value={formData.spouseAddress}
                                onChange={handleChange}
                                required={formData.maritalStatus === 'Married'}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="spouseDateOfBirth" className="form-label">Spouse's Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="spouseDateOfBirth"
                                value={formData.spouseDateOfBirth}
                                onChange={handleChange}
                                required={formData.maritalStatus === 'Married'}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="spouseOmangNumber" className="form-label">Spouse's Omang Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="spouseOmangNumber"
                                value={formData.spouseOmangNumber}
                                onChange={handleChange}
                                required={formData.maritalStatus === 'Married'}
                            />
                        </div>
                        <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {/* Step 3: Children Information */}
                {currentStep === 3 && (
                    <div>
                        <h2>Step 3: Children Information</h2>
                        <div className="mb-3">
                            <label htmlFor="childrenInfo" className="form-label">Details of Children</label>
                            <textarea
                                className="form-control"
                                id="childrenInfo"
                                rows="5"
                                value={formData.childrenInfo}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Do you anticipate having more children?</label>
                            <div>
                                <input
                                    type="radio"
                                    id="moreChildrenYes"
                                    name="moreChildren"
                                    value="Yes"
                                    checked={formData.moreChildren === 'Yes'}
                                    onChange={(e) => setFormData({ ...formData, moreChildren: e.target.value })}
                                />
                                <label htmlFor="moreChildrenYes">Yes</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="moreChildrenNo"
                                    name="moreChildren"
                                    value="No"
                                    checked={formData.moreChildren === 'No'}
                                    onChange={(e) => setFormData({ ...formData, moreChildren: e.target.value })}
                                />
                                <label htmlFor="moreChildrenNo">No</label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {/* Step 4: Real Estate Information */}
                {currentStep === 4 && (
                    <div>
                        <h2>Step 4: Real Estate Information</h2>
                        <div className="mb-3">
                            <label htmlFor="realEstateInfo" className="form-label">Real Estate Details</label>
                            <textarea
                                className="form-control"
                                id="realEstateInfo"
                                rows="5"
                                value={formData.realEstateInfo}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {/* Step 5: Executor Information */}
                {currentStep === 5 && (
                    <div>
                        <h2>Step 5: Executor Information</h2>
                        <div className="mb-3">
                            <label htmlFor="executorName" className="form-label">Executor's Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="executorName"
                                value={formData.executorName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="executorAddress" className="form-label">Executor's Address</label>
                            <textarea
                                className="form-control"
                                id="executorAddress"
                                rows="3"
                                value={formData.executorAddress}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="executorRelationship" className="form-label">Relationship</label>
                            <input
                                type="text"
                                className="form-control"
                                id="executorRelationship"
                                value={formData.executorRelationship}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Will Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Will Content</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="5"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="button" className="btn btn-secondary me-2" onClick={handlePrevious}>
                            Previous
                        </button>
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SubmitWill;