import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "grommet";
import { ClearOption } from "grommet-icons";
import { CytoscapeRenderer as Renderer, Toolbar } from "../components";
import {
    currentStateSelector,
    initialStateSelector,
    stateMachineActions,
} from "../ducks";

const Main = styled.main`
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #543d96;
    background-image: linear-gradient(#5f479f 2px, transparent 2px),
        linear-gradient(90deg, #5f479f 2px, transparent 2px),
        linear-gradient(#674ea7 1px, transparent 1px),
        linear-gradient(90deg, #674ea7 1px, transparent 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
`;

const Home = () => {
    const dispatch = useDispatch();
    const currentState = useSelector(currentStateSelector);
    const initialState = useSelector(initialStateSelector);
    const handleTransact = useCallback((state) => {
        dispatch(stateMachineActions.transact(state));
    }, []);
    const handleReset = useCallback((state) => {
        dispatch(stateMachineActions.reset());
    }, []);

    return (
        <Main>
            <Toolbar>
                <Button icon={<ClearOption />} onClick={handleReset} />
            </Toolbar>
            <Renderer
                currentState={currentState}
                initialState={initialState}
                onTransact={handleTransact}
            />
        </Main>
    );
};

export default Home;
