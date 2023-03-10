import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocalStorageState } from "../../hooks";
import { LocalStorageEndpoint } from "../../services/LocalStorage";
import { IAuthSuccessfull } from "../../types";
import { Searchbar } from "../Searchbar";
import { TabPanel } from "../TabPanel";

export const Newsline = () => {
  const [authData] = useLocalStorageState<IAuthSuccessfull>(
    LocalStorageEndpoint.Auth,
  );

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const newlineStyles: SxProps<Theme> = (theme: Theme) => ({
    padding: "20px 0",
    width: "100%",
    border: "1px solid silver",
    borderTop: "none",
    borderBottom: "none",
  });

  if (authData) {
    return (
      <Box sx={newlineStyles}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="For You" />
          <Tab label="Following" />
        </Tabs>
        <TabPanel activeIndex={tabIndex} index={0}>
          <Typography
            variant="h6"
            sx={{ margin: "20px 10px", fontWeight: 700 }}
          >
            Actual news sorted for you
          </Typography>
          <List>
            <ListItem sx={{ padding: 0 }}>
              <ListItemButton>
                <ListItemText>Hello</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel activeIndex={tabIndex} index={1}>
          <Typography
            variant="h6"
            sx={{ margin: "20px 10px", fontWeight: 700 }}
          >
            Actual news from people you follow
          </Typography>
        </TabPanel>
      </Box>
    );
  }

  return (
    <Box sx={newlineStyles}>
      <Searchbar id="newsline__searchbar" placeholder="Search news" />
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
