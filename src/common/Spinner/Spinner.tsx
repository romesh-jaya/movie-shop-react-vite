import React from "react";

const Spinner: React.FC = () => {
  return (
    <div class="flex h-full justify-center items-center flex-1">
      <div class="pointer-events-none w-10 h-10 border-4 border-solid border-transparent border-gray-200 border-t-header-start rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
