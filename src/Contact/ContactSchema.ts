import * as Yup from 'yup'

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
export const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(50, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!'),
  phone: Yup.string().matches(phoneRegex, 'Phone number is an invalid'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  question: Yup.string().required('Question is required'),
})
