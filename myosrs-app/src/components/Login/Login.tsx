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
import React, { Fragment } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSession } from "../../store/reducers/session";

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
  const dispatch = useDispatch();
  const [createUserSession] = useMutation(mutation);
  const {
    errors,
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm();
  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: { createUserSession: createdSession }
    } = await createUserSession({
      variables: { email, password }
    });

    dispatch(setSession(createdSession));
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
                  autoFocus
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
                iconRight={
                  isSubmitting && <Spinner fill="currentColor" size="20" />
                }
              ></Button>
            </FormActions>
          </CardBody>
        </Card>
      </form>
    </Fragment>
  );
};
