import { useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { googleAuthMutation } from "../../graphql/mutations";
import { useLocalStorageState } from "../../hooks";
import { ROUTE } from "../../router";
import { LocalStorageEndpoint, localStorageRepository } from "../../services";

export const GoogleAuthPage = () => {
  const [searchParams] = useSearchParams();

  const { setTrigger } = useLocalStorageState(LocalStorageEndpoint.Auth);

  const code = searchParams.get("code");

  const [authenticate] = useMutation(googleAuthMutation);

  const navigate = useNavigate();
  const navidateToHomePage = () => {
    navigate(ROUTE.Home);
  };

  const googleAuth = () => {
    authenticate({ variables: { input: { code } } }).then(({ data }) => {
      localStorageRepository.set(LocalStorageEndpoint.Auth, data.googleAuth);
      setTrigger();
      navidateToHomePage();
    });
  };

  useEffect(() => {
    if (code) {
      googleAuth();
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
