// export const BASE_URL_PUBLIC = "http://localhost:4444/auth/";
// export const BASE_URL_PROTECTED = "http://localhost:4444/protected/";

// export const TEMP_URL_COURSE = "http://localhost:4444/";

console.log("🚀 ------------------------------------------------------------------------------🚀");
console.log("🚀 ~ file: config.js:10 ~ import.meta.VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("🚀 ------------------------------------------------------------------------------🚀");

export const BASE_URL_PUBLIC = import.meta.env.VITE_BASE_URL + "/auth/";
export const BASE_URL_PROTECTED = import.meta.env.VITE_BASE_URL + "/protected/";

export const TEMP_URL_COURSE = import.meta.env.VITE_BASE_URL;
