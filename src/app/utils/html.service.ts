export function getElementTop(el: any) {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
}