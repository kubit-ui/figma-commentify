export function cleanBreaklineAndSpaces(code: string) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .join("");
}
