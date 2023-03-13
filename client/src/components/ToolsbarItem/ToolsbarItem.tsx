import { ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { useWindowSize } from "../../hooks";
import { MediaBreakpoints } from "../../ui";

interface IProps {
  icon: ReactNode;
  text: string;
  twitter?: boolean;
}

export const ToolsbarItem = ({ text, icon, twitter }: IProps) => {
  const { width: screenWidth } = useWindowSize();

  const buttonStyles = (theme: Theme) => ({
    borderRadius: "50%",
    [theme.breakpoints.up("md")]: {
      borderRadius: 0,
    },
  });

  const iconStyles = (theme: Theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <ListItem>
      <ListItemButton sx={buttonStyles}>
        <ListItemIcon sx={iconStyles}>{icon}</ListItemIcon>
        {!twitter && (
          <>
            {screenWidth > MediaBreakpoints.MD && (
              <ListItemText>{text}</ListItemText>
            )}
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};
