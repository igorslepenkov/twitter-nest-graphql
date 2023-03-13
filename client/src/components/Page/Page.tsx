import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { useWindowSize } from "../../hooks";
import { MediaBreakpoints } from "../../ui";
import { SxProps, Theme } from "@mui/material";

interface IProps {
  nodes: ReactNode[];
  children?: ReactNode;
}

export const Page = ({ nodes, children }: IProps) => {
  const [firstColumn, secondColumn, thirdColumn] = nodes;

  const { width } = useWindowSize();

  const gridCommonStyles: SxProps<Theme> = () => ({
    display: "flex",
    justifyContent: "center",
    alignContent: "stretch",
  });

  return (
    <>
      <Grid container sx={{ minHeight: "100vh" }}>
        {width > MediaBreakpoints.MD ? (
          <>
            <Grid item lg={4} md={3} sx={gridCommonStyles}>
              {firstColumn}
            </Grid>
            <Grid item lg={4} md={5} sx={gridCommonStyles}>
              {secondColumn}
            </Grid>
            <Grid item lg={4} md={4} sx={gridCommonStyles}>
              {thirdColumn}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={5} sm={5} sx={gridCommonStyles}>
              {firstColumn}
            </Grid>
            <Grid item xs={7} sm={7} sx={gridCommonStyles}>
              {secondColumn}
            </Grid>
          </>
        )}
      </Grid>
      <>{children}</>
    </>
  );
};
