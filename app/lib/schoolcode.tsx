const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChars(length: number) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  return result;
}

export function generateSchoolCode(schoolName: string) {
  const words = schoolName.trim().split(" ");

  const prefix =
    words.length >= 2
      ? `${words[0][0]}${words[1][0]}`
      : schoolName.slice(0, 2);

  return `${prefix.toUpperCase()}${randomChars(4)}`;
}