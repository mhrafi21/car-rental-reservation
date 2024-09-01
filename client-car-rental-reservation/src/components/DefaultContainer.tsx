import React from "react";

type DefaultContainerProps = {
  children: React.ReactNode;
};

const DefaultContainer: React.FC<DefaultContainerProps> = ({ children }) => {
  return <div className="max-w-[1280px] mx-auto px-6 lg:px-8 ">{children}</div>;
};

export default DefaultContainer;
