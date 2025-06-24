import React from "react";

const layoutStyle = {
  minHeight: "100vh",
  padding: "2rem",
  backgroundColor: "#f4f6f8",
  fontFamily: "Arial, sans-serif",
};

const Layout = ({ children }) => {
  return <div style={layoutStyle}>{children}</div>;
};

export default Layout;
