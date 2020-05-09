import RemoteStorage from "remotestoragejs";
import { REMOTE_STORAGE } from "./settings";

const remoteStorage = new RemoteStorage();

remoteStorage.setApiKeys({
    dropbox: REMOTE_STORAGE.DROPBOX_KEY,
    googledrive: REMOTE_STORAGE.GOOGLEDRIVE_KEY,
});

//#region claim access
remoteStorage.access.claim("*", "rw");
//#endregion

// For debugging, create easy to access reference
window.remoteStorage = remoteStorage;

export default remoteStorage;
