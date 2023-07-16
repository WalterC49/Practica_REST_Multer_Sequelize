import Ajv from "ajv"; // Sirve para validar schemas
import addErrors from "ajv-errors"; // Agrega errorMessages a la instancia de Ajv
import addFormats from "ajv-formats"; // Permite validar distinos formatos a Ajv
import { Type } from "@sinclair/typebox";
import { emailDTOSchema, passDTOSchema } from "./user.dto-types.js";
import { AjvError } from "../utils/AppError.js";

// Creo el esquema que quiero validar
const LoginDTOSchema = Type.Object(
  {
    email: emailDTOSchema,
    pass: passDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
      required: {
        email: "Debe tener una propiedad 'email'",
        pass: "Debe tener una propiedad 'pass'",
      },
    },
  },
);

const ajv = new Ajv({ allErrors: true });
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/); // le agrego un formato personalizado para 'password'
addErrors(ajv); // le agrego los errors a ajv
addFormats(ajv, ["email"]); // si el 2do parametro está vacío, agrega todos los formatos por defecto

const validateSchema = ajv.compile(LoginDTOSchema); // compile crea un validador teniendo en cuenta el schema que se la pasa

// Creo un middleware para validar el objecto/schema que recibo a través del body
const userLoginDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);

  if (!isDTOValid) {
    const errors = validateSchema.errors.map(error => error.message);
    next(new AjvError(errors, 400));
  }

  next();
};

export default userLoginDTO;
