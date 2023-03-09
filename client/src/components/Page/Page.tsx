import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { useWindowSize } from "../../hooks";
import { MediaBreakpoints } from "../../ui";

interface IProps {
  nodes: ReactNode[];
}

export const Page = ({ nodes }: IProps) => {
  const [firstColumn, secondColumn, thirdColumn] = nodes;

  const { width } = useWindowSize();

  return (
    <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
      {width > MediaBreakpoints.MD ? (
        <>
          <Grid item xs={2} sx={{ display: "flex", justifyContent: "center" }}>
            {firstColumn}
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
            {secondColumn}
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            {thirdColumn}
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
            {firstColumn}
          </Grid>
          <Grid item xs={9} sx={{ display: "flex", justifyContent: "center" }}>
            {secondColumn}
          </Grid>
        </>
      )}
    </Grid>
  );
};
