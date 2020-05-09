import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    Box,
    Button,
    Collapsible,
    Heading,
    Layer,
    ResponsiveContext,
} from "grommet";
import { FormClose, Notification } from "grommet-icons";
import Home from "./Home";
import "./App.css";

const App = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <Router>
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
                                <Switch>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                </Switch>
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
                                            onClick={() =>
                                                setShowSidebar(false)
                                            }
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
        </Router>
    );
};

export default App;
