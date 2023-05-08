// export const BASE_URL_PUBLIC = "http://localhost:4444/auth/";
// export const BASE_URL_PROTECTED = "http://localhost:4444/protected/";
// export const TEMP_URL_COURSE = "http://localhost:4444/";

let BASE = import.meta.env.VITE_BASE_URL

if (process.env.NODE_ENV === 'development') {
    BASE = 'http://localhost:4444'
}

export const BASE_URL_PUBLIC = BASE + "/auth/";
export const BASE_URL_PROTECTED = BASE + "/protected/";

export const TEMP_URL_COURSE = BASE;

