import { FunctionComponent } from "react";

interface IProps {
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FunctionComponent<IProps> = (props) => {
  const { children, onClick, disabled = false } = props;
  return (
    <button
      class="rounded-xl border-solid border-2 border-red-200 bg-black hover-hover:hover:bg-header-start active:bg-header-start py-1 px-4"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
