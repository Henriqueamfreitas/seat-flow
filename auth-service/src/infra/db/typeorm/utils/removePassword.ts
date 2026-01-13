export function removePassword<T extends { password?: string }>(entity: T) {
  const { password: _, ...clean } = entity;
  return clean as Omit<T, "password">;
}
