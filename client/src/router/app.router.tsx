import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App } from "../App";
import { GoogleAuthPage, HomePage, ValidateEmailPage } from "../pages";
import { ROUTE } from "./route";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.Home} element={<App />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTE.ValidateEmail} element={<ValidateEmailPage />} />
      <Route path={ROUTE.GoogleAuth} element={<GoogleAuthPage />} />
    </Route>,
  ),
);
