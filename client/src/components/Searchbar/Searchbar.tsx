import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  SxProps,
  Theme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export const Searchbar = () => {
  const searchbarStyles: SxProps<Theme> = (theme: Theme) => ({
    margin: "20px",
    padding: "10px",
  });

  return (
    <Box sx={searchbarStyles}>
      <FormControl variant="outlined" fullWidth>
        <Input
          id="newsline-search"
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <InputLabel htmlFor="newsline-search">
                <SearchIcon />
              </InputLabel>
            </InputAdornment>
          }
          placeholder="Search news"
        />
      </FormControl>
    </Box>
  );
};
