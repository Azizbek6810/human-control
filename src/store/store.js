import {configureStore} from '@reduxjs/toolkit'
import api from "./middleware/api";
import auth from "./auth/auth";
import location from "./location/location"
import language from "./language/language";
import user from "./user/user";

export default configureStore({
    reducer: {auth, location, language, user},
    middleware: [api]
})