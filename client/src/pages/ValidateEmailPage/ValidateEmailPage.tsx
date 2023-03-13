import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { validateEmailMutation } from "../../graphql/mutations";
import { useLocalStorageState } from "../../hooks";
import { ROUTE } from "../../router";
import { LocalStorageEndpoint, localStorageRepository } from "../../services";

export const ValidateEmailPage = () => {
  const { token } = useParams();
  const { setTrigger } = useLocalStorageState(LocalStorageEndpoint.Auth);

  const [validate] = useMutation(validateEmailMutation);

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
        navidateToHomePage();
      });
    }
  };

  useEffect(() => {
    if (token) {
      validateEmail();
    }
  }, []);

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
      <ClipLoader color="#f10c0c" />
    </Box>
  );
};
