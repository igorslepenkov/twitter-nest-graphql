import { useLazyQuery } from "@apollo/client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useEffect } from "react";
import { currentUserQuery } from "../../graphql/queries";
import { useLocalStorageState } from "../../hooks";
import { LocalStorageEndpoint } from "../../services";
import { IUserWithoutPassword } from "../../types";

export const UserBadge = () => {
  const [authData] = useLocalStorageState(LocalStorageEndpoint.Auth);

  const [execQuery, { data: userData }] = useLazyQuery<{
    currentUser: IUserWithoutPassword;
  }>(currentUserQuery);

  useEffect(() => {
    if (authData) {
      execQuery();
    }
  }, [authData]);

  if (userData) {
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
        <Button color="error" sx={{ borderRadius: "30px" }}>
          Sign Out
        </Button>
      </Box>
    );
  }

  return null;
};
