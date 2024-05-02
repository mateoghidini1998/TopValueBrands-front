import * as yup from 'yup'

const LoginScheme = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
}).required();

export default LoginScheme;