import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CytoscapeRenderer as Renderer } from "../components";
import {
    currentStateSelector,
    initialStateSelector,
    stateMachineActions,
} from "../ducks";

const Home = () => {
    const dispatch = useDispatch();
    const currentState = useSelector(currentStateSelector);
    const initialState = useSelector(initialStateSelector);
    const handleTransact = useCallback((state) => {
        dispatch(stateMachineActions.transact(state));
    }, []);

    return (
        <React.Fragment>
            <Renderer
                currentState={currentState}
                initialState={initialState}
                onTransact={handleTransact}
            />
        </React.Fragment>
    );
};

export default Home;
