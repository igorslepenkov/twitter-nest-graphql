import {
  Modal,
  Theme,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import { SxProps } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { RegistrationForm } from "../RegistrationForm";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

export const RegistrationModal = ({ open, handleClose }: IProps) => {
  const boxStyles: SxProps<Theme> = () => ({
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 650,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "30px",
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={boxStyles}>
        <Grid container>
          <Grid item xs={2}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid item xs={10}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                transform: "translate(-35px, 0px)",
              }}
            >
              <TwitterIcon
                color="primary"
                fontSize="large"
                sx={{ marginBottom: "30px" }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Register new account
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                sx={{ borderRadius: "20px" }}
              >
                <GoogleIcon sx={{ marginRight: "10px" }} />
                Proceed with Google
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                or
              </Typography>

              <RegistrationForm handleCloseModal={handleClose} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
