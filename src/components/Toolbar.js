import React from "react";
import { Box } from "grommet";

const Toolbar = ({ children }) => (
    <Box
        fill="horizontal"
        tag="section"
        direction="row-responsive"
        align="center"
        justify="between"
        background="light-2"
        elevation="medium"
        pad={{ horizontal: "medium", vertical: "small" }}
    >
        {children}
    </Box>
);

export default Toolbar;
