import * as yup from 'yup'

export const titleYup = yup.object({
  title: yup.string().required('타이틀을 입력하세요.').min(1, '타이틀을 입력하세요.'),
})
