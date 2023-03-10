import {
  Page,
  Toolsbar,
  Authwindow,
  Newsline,
  LoginModal,
  Trendsbar,
} from "../../components";
import { useLocalStorageState, useToggle } from "../../hooks";
import { LocalStorageEndpoint } from "../../services/LocalStorage";
import { IAuthSuccessfull } from "../../types";

export const HomePage = () => {
  const [isAuthModalOpen, toggleAuthModal] = useToggle();

  const [authData] = useLocalStorageState<IAuthSuccessfull>(
    LocalStorageEndpoint.Auth,
  );

  const thirdNode = authData ? (
    <Trendsbar />
  ) : (
    <Authwindow handleLoginModal={toggleAuthModal} />
  );

  return (
    <Page nodes={[<Toolsbar />, <Newsline />, thirdNode]}>
      <LoginModal open={isAuthModalOpen} handleClose={toggleAuthModal} />
    </Page>
  );
};
