import { post } from "utils/Fetch";

export const login = (body) => post("/auth/login", body)
export const register = (body) => post("/auth/register", body)

export const lockResource = (body) => post("/items/lock", body)

export const unLockResource = (body) => post("/items/unlock", body)