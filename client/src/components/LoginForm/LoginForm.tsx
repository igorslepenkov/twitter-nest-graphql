import ClipLoader from "react-spinners/ClipLoader";
import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { loginQuery } from "../../graphql/queries";
import { emailRegex } from "../../regexp";
import { IAuthSuccessfull, IUsersInput } from "../../types";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  LocalStorageEndpoint,
  localStorageRepository,
} from "../../services/LocalStorage";
import { useLocalStorageState } from "../../hooks";

interface IProps {
  handleCloseModal: () => void;
}

export const LoginForm = ({ handleCloseModal }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IUsersInput>();
  const [executeQuery, { loading, error, data: authData }] = useLazyQuery<{
    login: IAuthSuccessfull;
  }>(loginQuery);

  const [_, triggerStorageEvent] = useLocalStorageState(
    LocalStorageEndpoint.Auth,
  );

  const onSubmit = async (data: IUsersInput) => {
    await executeQuery({ variables: { input: data } });

    if (error) setError("root", { message: error.message });

    if (!error) {
      reset();
    }
  };

  useEffect(() => {
    if (authData) {
      const { accessToken, refreshToken } = authData.login;
      localStorageRepository.set<IAuthSuccessfull>(LocalStorageEndpoint.Auth, {
        accessToken,
        refreshToken,
      });
      triggerStorageEvent();
      handleCloseModal();
    }
  }, [authData, handleCloseModal]);

  if (loading) {
    return <ClipLoader loading={loading} color="#f00909" />;
  }

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{
          required: "Please enter your email",
          pattern: {
            value: emailRegex,
            message: "It seems that you have entered wrong email",
          },
        }}
        render={({ field }) => {
          return (
            <TextField
              label="Email"
              placeholder="Enter your email"
              variant="outlined"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: "Please enter your password",
          minLength: {
            value: 6,
            message: "Your password must me at least 6 characters old",
          },
        }}
        render={({ field }) => {
          return (
            <TextField
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...field}
            />
          );
        }}
      />

      <Button
        type="submit"
        variant="outlined"
        sx={{ borderRadius: "30px" }}
        fullWidth
        color="primary"
      >
        Submit
      </Button>

      <Button
        type="button"
        variant="outlined"
        sx={{ borderRadius: "30px" }}
        fullWidth
        color="warning"
      >
        Forgot Password ?
      </Button>
    </Box>
  );
};
