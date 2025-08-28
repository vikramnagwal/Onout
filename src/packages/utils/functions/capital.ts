export function CapitalChar(characters: string) {
   return characters[0].toUpperCase() + characters.slice(1)
}
console.log(CapitalChar("there"))