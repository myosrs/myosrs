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
import React, { Fragment } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        id
        email
      }
    }
  }
`;

export const Login = () => {
  const [createUserSession] = useMutation(mutation);
  const {
    errors,
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await createUserSession({
      variables: { email, password }
    });

    console.log(result);
  });

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <Card title="Login">
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
            <FormActions>
              <Button
                variant="primary"
                fill
                text="Sign in"
                size="medium"
                disabled={isSubmitting}
                iconRight={isSubmitting && <Spinner size="20" />}
              ></Button>
            </FormActions>
          </CardBody>
        </Card>
      </form>
    </Fragment>
  );
};
