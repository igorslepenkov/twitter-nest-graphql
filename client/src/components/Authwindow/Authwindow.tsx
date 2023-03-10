import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

interface IProps {
  handleLoginModal: () => void;
}

export const Authwindow = ({ handleLoginModal }: IProps) => {
  const windowStyles: SxProps<Theme> = (theme: Theme) => ({
    margin: "15px auto",
    padding: "30px 12px",
    widows: "348px",
    height: "336px",
    border: "1px solid silver",
    borderRadius: "20px",
  });
  return (
    <Box sx={windowStyles}>
      <Typography variant="h5" ml={2} mb={2} sx={{ fontWeight: 700 }}>
        Are you new here?
      </Typography>
      <Typography variant="body1" mb={2} sx={{ fontWeight: 300 }}>
        Register right now to configure your newsline
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Button
          fullWidth
          variant="outlined"
          sx={{ borderRadius: "20px" }}
          onClick={handleLoginModal}
        >
          Log In
        </Button>

        <Button fullWidth variant="outlined" sx={{ borderRadius: "20px" }}>
          <GoogleIcon sx={{ marginRight: "10px" }} />
          Log In with Google
        </Button>

        <Button fullWidth variant="outlined" sx={{ borderRadius: "20px" }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};
