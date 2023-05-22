export default function getHoursAndMinutes(milliseconds) {
    let hours = Math.floor(milliseconds / (60 * 60 * 1000));
    let minutes = Math.floor(milliseconds / (60 * 1000)) % 60;
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} Std.`;
    return `${hours} Std. und ${minutes} min`;
}
