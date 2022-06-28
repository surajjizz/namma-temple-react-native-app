import APIDetails from "../defaults/APIDetails";
import HttpClient from "./HttpClient";

const AuthService = (url = `${APIDetails.BASE_URL}/api/account/`) => new HttpClient(url);
const ResourceService = (url = `${APIDetails.BASE_URL}/api/`) => new HttpClient(url);

export { AuthService, ResourceService };
