import { FunctionComponent, ReactElement } from "react";
import Spinner from "../../common/Spinner/Spinner";

interface IProps {
  loading?: boolean;
  errorText?: string;
}

// Shows the loading spinner and errorText if applicable, Children if not
const Layout: FunctionComponent<IProps> = ({
  loading,
  errorText,
  children,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (errorText) {
    return <p class="text-red text-center">{errorText}</p>;
  }

  return children as ReactElement;
};

export default Layout;
