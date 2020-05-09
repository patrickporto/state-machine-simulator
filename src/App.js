import React, { useState } from "react";
import {
    Box,
    Button,
    Collapsible,
    Heading,
    Layer,
    ResponsiveContext,
} from "grommet";
import { FormClose, Notification } from "grommet-icons";
import "./App.css";

const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <ResponsiveContext.Consumer>
            {(size) => (
                <Box fill>
                    <Box
                        tag="header"
                        direction="row"
                        align="center"
                        justify="between"
                        background="light-2"
                        pad={{ vertical: "small", horizontal: "medium" }}
                        elevation="medium"
                    >
                        <Heading level="3" margin="none">
                            My App
                        </Heading>
                        <Button
                            icon={<Notification />}
                            onClick={() => setShowSidebar(!showSidebar)}
                        />
                    </Box>
                    <Box
                        direction="row"
                        flex
                        overflow={{ horizontal: "hidden" }}
                    >
                        <Box flex align="center" justify="center">
                            app body
                        </Box>
                        {!showSidebar || size !== "small" ? (
                            <Collapsible
                                direction="horizontal"
                                open={showSidebar}
                            >
                                <Box
                                    flex
                                    width="medium"
                                    background="light-2"
                                    elevation="small"
                                    align="center"
                                    justify="center"
                                >
                                    sidebar
                                </Box>
                            </Collapsible>
                        ) : (
                            <Layer>
                                <Box
                                    background="light-2"
                                    tag="header"
                                    justify="end"
                                    align="center"
                                    direction="row"
                                >
                                    <Button
                                        icon={<FormClose />}
                                        onClick={() => setShowSidebar(false)}
                                    />
                                </Box>
                                <Box
                                    fill
                                    background="light-2"
                                    align="center"
                                    justify="center"
                                >
                                    sidebar
                                </Box>
                            </Layer>
                        )}
                    </Box>
                </Box>
            )}
        </ResponsiveContext.Consumer>
    );
};

export default App;
