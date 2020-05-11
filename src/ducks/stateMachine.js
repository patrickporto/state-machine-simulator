import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    initial: "idle",
    current: "idle",
};

const RESET = "@STATE_MACHINE/RESET";
const TRANSACT = "@STATE_MACHINE/TRANSACT";

export const stateMachineActions = {
    reset: createAction(RESET),
    transact: createAction(TRANSACT),
};

//#region selectors
export const stateMachineSelector = (state) => state.stateMachine;

export const currentStateSelector = createSelector(
    stateMachineSelector,
    (stateMachine) => stateMachine.current
);

export const initialStateSelector = createSelector(
    stateMachineSelector,
    (stateMachine) => stateMachine.initial
);
//#endregion

export const stateMachineReducer = createReducer(INITIAL_STATE, {
    [RESET]: (state, action) => {
        return {
            ...state,
            current: state.initial,
        };
    },
    [TRANSACT]: (state, action) => {
        return {
            ...state,
            current: action.payload,
        };
    },
});
