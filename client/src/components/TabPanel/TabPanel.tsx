import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  index: number;
  activeIndex: number;
}

export const TabPanel = ({ children, index, activeIndex }: IProps) => {
  if (index === activeIndex) {
    return <>{children}</>;
  }

  return null;
};
