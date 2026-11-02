const allImages = import.meta.glob(["/src/img/example/**/*.webp", "/src/img/comment/**/*.webp" ], {
  eager: true,
  import: "default"
});

export function getValidImagePath(jsonPath) {
  if(!jsonPath) return "";
  if (allImages[jsonPath]) {
    return allImages[jsonPath];
  }

  const fileName = jsonPath.split("/").pop();
  const foundKey = Object.keys(allImages).find(key => key.endsWith(fileName));
  return foundKey ? allImages[foundKey] : jsonPath;
}