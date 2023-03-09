import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Searchbar } from "../Searchbar";

export const Newsline = () => {
  const newlineStyles: SxProps<Theme> = (theme: Theme) => ({
    padding: "20px 0",
    width: "100%",
    border: "1px solid silver",
    borderTop: "none",
    borderBottom: "none",
  });

  return (
    <Box sx={newlineStyles}>
      <Searchbar />
      <Typography variant="h6" sx={{ margin: "20px 10px", fontWeight: 700 }}>
        Actual news sorted for you:
      </Typography>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton>
            <ListItemText>Hello</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
