import React from "react";
import { Heading } from "grommet";
import { Trans } from "react-i18next";

const Home = () => {
    return (
        <Heading level="3" margin="none">
            <Trans i18nKey="hello-world">app body</Trans>
        </Heading>
    );
};

export default Home;
