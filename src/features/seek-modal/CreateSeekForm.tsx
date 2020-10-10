import { FormikHelpers } from "formik";
import { FC } from "react";
import { CreateSeekData } from "../../interfaces/CreateSeekData";

export interface CreateSeekFormProps {
  onSubmit?(
    values: CreateSeekData,
    formikHelpers: FormikHelpers<CreateSeekData>
  ): void | Promise<any>;
}

export const CreateSeekForm: FC<CreateSeekFormProps> = () => {
  return null;
};
