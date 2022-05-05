/**
 * Gets the name of the file this function is called from.
 * @param separator OS-dependent path separator (defaults to '/')
 * @returns The name of the current file
 */
export function currentFileName(separator = "/"): string {
  return require.main.filename.split(separator).slice(-1).join(separator);
}
