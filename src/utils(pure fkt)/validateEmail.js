import tld from "tld-list";

export default function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    const [local, domain] = email.split("@");

    if (local.length < 2 || local.length > 64) {
        return false;
    }

    const domainParts = domain.split(".");
    if (domainParts.length < 2 || domainParts.length > 4) {
        return false;
    }

    for (const part of domainParts) {
        if (part.length < 2 || part.length > 63) {
            return false;
        }
    }

    const topLevelDomain = domainParts[domainParts.length - 1];
    if (!tld.includes(topLevelDomain)) {
        return false;
    }

    return true;
}
