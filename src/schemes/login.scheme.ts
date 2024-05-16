import * as yup from 'yup'

const LoginScheme = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
}).required();

export default LoginScheme;