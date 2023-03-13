import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmailMutation } from "../../graphql/mutations";
import { useLocalStorageState } from "../../hooks";
import { ROUTE } from "../../router";
import { LocalStorageEndpoint, localStorageRepository } from "../../services";

export const ValidateEmailPage = () => {
  const { token } = useParams();
  const { setTrigger } = useLocalStorageState(LocalStorageEndpoint.Auth);

  const [validate, { data }] = useMutation(validateEmailMutation);

  const navigate = useNavigate();
  const navidateToHomePage = () => {
    navigate(ROUTE.Home);
  };
  const validateEmail = () => {
    if (token) {
      validate({ variables: { input: { token } } }).then(({ data }) => {
        localStorageRepository.set(
          LocalStorageEndpoint.Auth,
          data.validateEmail,
        );
        setTrigger();
      });
    }
  };

  if (data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5" color="primary">
          Your email has been validated successfully!
        </Typography>
        <Button
          type="button"
          variant="contained"
          color="success"
          onClick={navidateToHomePage}
        >
          Back to the home page
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" color="primary">
        Please click the link below to validate your email
      </Typography>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={validateEmail}
      >
        Validate email
      </Button>
    </Box>
  );
};
