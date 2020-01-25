import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  CardBody,
  FormActions,
  FormControlPassword,
  FormControlText,
  FormGroup,
  Spinner
} from "@pqt/components";
import gql from "graphql-tag";
import React, { Fragment, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import * as yup from "yup";
import { Redirect } from "react-router-dom";

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required()
    .test(
      "matchConfirmPassword",
      "Password is not the same as the confirmation password",
      function() {
        return this.parent.password === this.parent.confirmPassword;
      }
    )
});

export const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [createUser] = useMutation(mutation);
  const {
    errors,
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset
  } = useForm({ mode: "onChange", validationSchema });
  const onSubmit = handleSubmit(async ({ email, password }) => {
    await createUser({ variables: { email, password } });
    reset();
    setRedirect(true);
  });

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Card title="Register">
          <CardBody>
            <FormGroup
              label="Email"
              control={
                <FormControlText
                  placeholder="john.doe@company.com"
                  name="email"
                  disabled={isSubmitting}
                  ref={register({
                    required: {
                      value: true,
                      message: "Email Address is required"
                    }
                  })}
                />
              }
              note={(errors?.email as FieldError)?.message}
            />
            <FormGroup
              label="Password"
              control={
                <FormControlPassword
                  name="password"
                  disabled={isSubmitting}
                  ref={register({
                    required: { value: true, message: "Password is required" }
                  })}
                />
              }
              note={(errors?.password as FieldError)?.message}
            />
            <FormGroup
              label="Confirm Password"
              control={
                <FormControlPassword
                  name="confirmPassword"
                  disabled={isSubmitting}
                  ref={register({
                    required: {
                      value: true,
                      message: "Password Confirmation is required"
                    }
                  })}
                />
              }
              note={(errors?.confirmPassword as FieldError)?.message}
            />
            <FormActions>
              <Button
                variant="primary"
                fill
                text="Sign up"
                size="medium"
                disabled={isSubmitting || !isValid}
                iconRight={
                  isSubmitting && <Spinner fill="currentColor" size="20" />
                }
              />
            </FormActions>
          </CardBody>
        </Card>
      </form>
    </Fragment>
  );
};
