import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  email,
  confirmed,
  min_value as minVal,
  max_value as maxVal,
  alpha_spaces as alphaSpaces
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('email', email)
    defineRule('minVal', minVal)
    defineRule('maxVal', maxVal)
    defineRule('passwordMismatch', confirmed)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alphaSpaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          minVal: `The field ${ctx.field} is too low`,
          maxVal: `The field ${ctx.field} is too high`,
          passwordMismatch: `The passwords do not match`,
          tos: `You must accept the terms of service`
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
