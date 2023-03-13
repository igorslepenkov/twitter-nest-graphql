import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useEffect } from "react";
import { signOutMutation } from "../../graphql/mutations";
import { currentUserQuery } from "../../graphql/queries";
import { useLocalStorageState } from "../../hooks";
import { LocalStorageEndpoint, localStorageRepository } from "../../services";
import { IUserWithoutPassword } from "../../types";

export const UserBadge = () => {
  const { value: authData, clearTrigger: clearStorageTrigger } =
    useLocalStorageState(LocalStorageEndpoint.Auth);

  const [execQuery, { data: userData }] = useLazyQuery<{
    currentUser: IUserWithoutPassword;
  }>(currentUserQuery);

  const [signOut] = useMutation(signOutMutation);

  const onsSignOutClick = () => {
    signOut().then((data) => {
      if (data) {
        localStorageRepository.forget(LocalStorageEndpoint.Auth);
        clearStorageTrigger();
      }
    });
  };

  useEffect(() => {
    if (authData) {
      execQuery();
    }
  }, [authData, execQuery]);

  if (authData && userData) {
    const badgeStyles: SxProps<Theme> = () => ({
      padding: "10px",
      backgroundColor: "rgb(211, 226, 226)",
      borderRadius: "30px",
      wordBreak: "break-word",
      textAlign: "center",
    });
    return (
      <Box sx={badgeStyles}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          User: {userData.currentUser.email}
        </Typography>
        <Button
          color="error"
          sx={{ borderRadius: "30px" }}
          onClick={onsSignOutClick}
        >
          Sign Out
        </Button>
      </Box>
    );
  }

  return null;
};
