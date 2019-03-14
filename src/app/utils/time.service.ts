function getLocale(): string {
    if (navigator.languages != undefined)
        return navigator.languages[0];
    else
        return navigator.language;
}

export function printTime(epoch: number): string {
    const date = new Date(epoch * 1000);
    return date.toLocaleString(getLocale(), { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}