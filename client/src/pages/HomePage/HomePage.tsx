import {
  Page,
  Toolsbar,
  Authwindow,
  Newsline,
  LoginModal,
  Trendsbar,
  RegistrationModal,
} from "../../components";
import { useLocalStorageState, useToggle } from "../../hooks";
import { LocalStorageEndpoint } from "../../services/LocalStorage";
import { IAuthSuccessfull } from "../../types";

export const HomePage = () => {
  const [isAuthModalOpen, toggleAuthModal] = useToggle();
  const [isRegisterModalOpen, toggleRegisterModal] = useToggle();

  const { value: authData } = useLocalStorageState<IAuthSuccessfull>(
    LocalStorageEndpoint.Auth,
  );

  const thirdNode = authData ? (
    <Trendsbar />
  ) : (
    <Authwindow
      handleLoginModal={toggleAuthModal}
      handleRegisterModal={toggleRegisterModal}
    />
  );

  return (
    <Page nodes={[<Toolsbar />, <Newsline />, thirdNode]}>
      <LoginModal open={isAuthModalOpen} handleClose={toggleAuthModal} />
      <RegistrationModal
        open={isRegisterModalOpen}
        handleClose={toggleRegisterModal}
      />
    </Page>
  );
};
