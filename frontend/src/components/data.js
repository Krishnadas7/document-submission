import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .max(50, 'Too Long!'),
    lastName: Yup.string()
      .required('Last Name is required')
      .max(50, 'Too Long!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    gender: Yup.string()
      .required('Gender selection is required'),
    documents: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().required('Document type is required'),
          file: Yup.mixed().required('File is required')
        })
      )
      .min(2, 'At least 2 documents are required')
  });

  export const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    documents: [
      { type: '', file: null },
      { type: '', file: null }
    ]
  };

  export const documentTypes = ['Aadhar', 'PAN', 'Passport', 'Voter ID'];