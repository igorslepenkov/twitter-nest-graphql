import ClipLoader from "react-spinners/ClipLoader";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { registerMutation } from "../../graphql/mutations";
import { emailRegex } from "../../regexp";
import { IRegisterSuccessfull, IUsersInput } from "../../types";
import { useMutation } from "@apollo/client";

interface IProps {
  handleCloseModal: () => void;
}

type RegistrationFields = IUsersInput & { confirm: string };

export const RegistrationForm = ({ handleCloseModal }: IProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<RegistrationFields>();
  const [executeQuery, { loading, data: registerData }] = useMutation<{
    register: IRegisterSuccessfull;
  }>(registerMutation);

  const onSubmit = async (data: RegistrationFields) => {
    if (data.password !== data.confirm) {
      return setError("confirm", {
        message: "Password does not match the confirmation",
      });
    }

    const { email, password } = data;

    executeQuery({ variables: { input: { email, password } } })
      .then(() => {
        reset();
      })
      .catch((error) => {
        setError("root", { message: error.message });
      });
  };

  if (registerData) {
    return (
      <>
        <Typography variant="h6" color="primary">
          {registerData.register.message}
        </Typography>
        <Button
          variant="outlined"
          type="button"
          color="error"
          fullWidth
          sx={{ marginTop: "20px", borderRadius: "30px" }}
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </>
    );
  }

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
      {errors.root && (
        <Typography variant="subtitle2" color="error">
          {errors.root.message}
        </Typography>
      )}

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

      <Controller
        control={control}
        name="confirm"
        defaultValue=""
        rules={{
          required: "Please confirm your password",
        }}
        render={({ field }) => {
          return (
            <TextField
              label="Password confirmation"
              placeholder="Confirm your password"
              variant="outlined"
              type="password"
              error={!!errors.confirm}
              helperText={errors.confirm?.message}
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
        Register
      </Button>
    </Box>
  );
};
