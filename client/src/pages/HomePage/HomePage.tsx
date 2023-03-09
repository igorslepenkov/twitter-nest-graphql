import { Page, Toolsbar, Authwindow, Newsline } from "../../components";

export const HomePage = () => {
  return <Page nodes={[<Toolsbar />, <Newsline />, <Authwindow />]} />;
};
