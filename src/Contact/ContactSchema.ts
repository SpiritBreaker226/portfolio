import * as Yup from 'yup'
import 'yup-phone'

export const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(50, 'First name is too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too Short!')
    .max(50, 'Last name is too Long!'),
  phone: Yup.string().phone(
    'US',
    false,
    'Required or is an invalid phone number'
  ),
  email: Yup.string().required('Email is required').email('Invalid email'),
  question: Yup.string().required('Question is required'),
})
