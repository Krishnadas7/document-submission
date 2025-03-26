/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema,documentTypes,initialValues } from './data';
import { FileText, Upload, Eye, X } from 'lucide-react';
import axios from "axios"
import FilePreviewModal from './FilePreviewModal';
import UserModal from './UserModal';

const UserSubmissionForm = () => {
  const [previews, setPreviews] = useState({});
  const [modalPreview, setModalPreview] = useState(null);
  const [usermodal,setUserModal] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    error: null,
    success: false
  });
  

  const handleFilePreview = (event, setFieldValue, index) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setFieldValue(`documents.${index}.file`, file);
  
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          [`document-${index}`]: {
            dataUrl: reader.result,
            fileName: file.name,
            fileType: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      const pdfUrl = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [`document-${index}`]: {
          fileUrl: pdfUrl, 
          fileName: file.name,
          fileType: file.type
        }
      }));
    }
  };
  
  
  const openModalPreview = (preview) => {
    if (!preview) return;
  
    if (preview.fileType.startsWith("image/")) {
      setModalPreview({
        type: "image",
        content: preview.dataUrl,
        fileName: preview.fileName
      });
    } else if (preview.fileType === "application/pdf") {
      window.open(preview.fileUrl, "_blank");
    } else {
      alert("This file type cannot be previewed directly.");
    }
  };
  
  

  const closeModalPreview = () => {
    setModalPreview(null);
  };

  
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("mobile", values.mobile);
    formData.append("gender", values.gender);
    console.log('===============',values)
    values.documents.forEach((doc) => {
      formData.append("documentTypes", doc.type); 
      if (doc.file) {
        formData.append("documents", doc.file); 
      }
    });
    console.log('form=====',formData);
    
    try {
      setSubmissionStatus({ loading: true, error: null, success: false });
console.log('dcc');

      const response = await axios.post('http://localhost:3000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setSubmissionStatus({ 
        loading: false, 
        error: null, 
        success: true 
      });

      console.log('Submission successful:', response.data);
      alert('Registration Completed Successfully!');
    } catch (error) {
      setSubmissionStatus({ 
        loading: false, 
        error: error.response?.data?.message || 'Submission failed', 
        success: false 
      });

      console.error('Submission Error:', error);
      alert('Registration Failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
  <div>
    <h1 className="text-2xl font-bold">User Registration Form</h1>
    <p className="text-blue-100">Complete your profile with detailed information</p>
  </div>
  <div>
    <button onClick={()=>setUserModal(true)} className="bg-white px-4 py-2 rounded-md text-blue-700 font-bold shadow-md hover:bg-blue-100 transition">
      Show All Users
    </button>
  </div>
</div>
  {usermodal && (<UserModal onClose={() => setUserModal(false)}/>)}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="firstName" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                <div>
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="lastName" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="email" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                <div>
                  <Field
                    name="mobile"
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage 
                    name="mobile" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>
              </div>

              <div>
                <div role="group" className="flex justify-center space-x-6">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <Field
                        type="radio"
                        name="gender"
                        value={gender}
                        className="mr-2"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
                <ErrorMessage 
                  name="gender" 
                  component="div" 
                  className="text-red-500 text-sm mt-1 text-center" 
                />
              </div>

              {values.documents.map((_, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-1/2">
                    <Field
                      as="select"
                      name={`documents.${index}.type`}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Document Type</option>
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Field>
                    <ErrorMessage 
                      name={`documents.${index}.type`} 
                      component="div" 
                      className="text-red-500 text-sm mt-1" 
                    />
                  </div>

                  <div className="w-1/2 flex items-center space-x-2">
                    <div className="flex-grow relative">
                      <input
                        type="file"
                        onChange={(e) => handleFilePreview(e, setFieldValue, index)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div className="w-full px-4 py-3 border rounded-lg flex items-center justify-center">
                        <Upload className="mr-2" size={20} />
                        {values.documents[index].file 
                          ? values.documents[index].file.name 
                          : 'Upload Document'}
                      </div>
                    </div>
                    
                    {previews[`document-${index}`] && (
                        <button
                          type="button"
                          onClick={() => openModalPreview(previews[`document-${index}`])}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                          <Eye size={20} />
                        </button>
                      )}


                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                  transition duration-300 flex items-center justify-center"
              >
                <FileText className="mr-2" />
                Complete Registration
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {modalPreview && (
        <FilePreviewModal 
          preview={modalPreview} 
          onClose={closeModalPreview} 
        />
      )}
    </div>
  );
};

export default UserSubmissionForm;