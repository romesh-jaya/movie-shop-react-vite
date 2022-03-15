interface IProps {
  inline?: boolean;
}

const Spinner = (props: IProps) => {
  const { inline } = props;

  const getDimensionStyles = () => {
    return inline ? "w-6 h-6 border-2" : "w-10 h-10 border-4";
  };

  return (
    <div class="flex h-full justify-center items-center flex-1">
      <div
        class={`pointer-events-none border-solid border-transparent border-gray-200 border-t-header-start rounded-full animate-spin ${getDimensionStyles()}`}
      />
    </div>
  );
};

export default Spinner;
