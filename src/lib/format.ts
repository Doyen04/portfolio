export function formatProjectName(name: string) {
    return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
