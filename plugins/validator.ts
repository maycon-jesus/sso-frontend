import * as yup from "yup";

export default defineNuxtPlugin(() => {
  class Validator {
    presets = {
      emailRequired: this.vuetifyValidator(
        yup
          .string()
          .email("Coloque um email válido")
          .required("Informe o seu email")
      ),
      passwordRequired: this.vuetifyValidator(
        yup.string().required("Informe a sua senha")
      ),
    };

    vuetifyValidator(schema: yup.AnySchema) {
      return (value: any) => {
        if (!schema.isValidSync(value)) {
          try {
            return schema.validateSync(value);
          } catch (err) {
            return err.message;
          }
        } else {
          return true;
        }
      };
    }
  }
  return {
    provide: {
      validator: new Validator(),
    },
  };
});
