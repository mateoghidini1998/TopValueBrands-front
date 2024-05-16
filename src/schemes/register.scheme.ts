import * as yup from 'yup'

const RegisterScheme = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().min(8).required(),
  role: yup.string().required(),
});
export default RegisterScheme;