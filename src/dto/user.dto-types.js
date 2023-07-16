import { Type } from "@sinclair/typebox"; // Sirve para schemas más rápido a través de funciones

// Como voy a utilizar estás propiedas multiple veces en distintos esquemas las creo por separado y las importo donde las necesite
export const usernameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 100,
  errorMessage: {
    type: "Debe ser un String",
    minLength: "El nombre debe tener un mínimo de 2 carácteres.",
    maxLength: "El nombre debe tener un máximo de 25 carácteres.",
  },
});

export const emailDTOSchema = Type.String({
  format: "email",
  errorMessage: {
    type: "Debe ser un String.",
    format: "El formato del email no es válido.",
  },
});

export const passDTOSchema = Type.String({
  format: "password",
  minLength: 5,
  maxLength: 25,
  errorMessage: {
    type: "Debe ser un String",
    format:
      "El formato del password debe contener una mayúscula, una minúcula y un número.",
    minLength: "El password debe tener mínimo de 5 carácteres.",
    maxLength: "El password debe tener un máximo de 25 carácteres.",
  },
});
