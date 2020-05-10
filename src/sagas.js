import { take } from "redux-saga/effects";

function fetchUser(action) {
    console.log("CONNECTED");
}

function* saga() {
    yield take("USER_FETCH_REQUESTED", fetchUser);
}

export default saga;
