import { PropsWithChildren } from "react";

const Heading: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1>{children}</h1>;
};
export default Heading;
