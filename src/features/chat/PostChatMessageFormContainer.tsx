import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  PostChatMessageForm,
  PostChatMessageFormData,
} from "./PostChatMessageForm";
import { createChatMessage } from "./chatSlice";
import { FormikHelpers } from "formik";
import { RegistrationFormData } from "../auth-modal/RegistrationForm";

export interface PostChatMessageFormContainerProps {
  gameId: number;
}

export const PostChatMessageFormContainer: FC<PostChatMessageFormContainerProps> = ({
  gameId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = useCallback(
    (
      values: PostChatMessageFormData,
      formikHelpers: FormikHelpers<PostChatMessageFormData>
    ) => {
      const text = values.text;

      formikHelpers.resetForm();

      return dispatch(createChatMessage(gameId, values.text));
    },
    [dispatch, gameId]
  );

  return <PostChatMessageForm onSubmit={handleSubmit} />;
};
