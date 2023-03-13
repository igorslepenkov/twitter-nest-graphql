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

interface IProps {
  id: string;
  placeholder: string;
}

export const Searchbar = ({ placeholder, id }: IProps) => {
  const searchbarStyles: SxProps<Theme> = () => ({
    margin: "20px",
    padding: "10px",
  });

  return (
    <Box sx={searchbarStyles}>
      <FormControl variant="outlined" fullWidth>
        <Input
          id={id}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <InputLabel htmlFor={id}>
                <SearchIcon />
              </InputLabel>
            </InputAdornment>
          }
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  );
};
