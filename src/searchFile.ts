import libpath from 'path';
import findUp from 'find-up';

export default function searchFile(relativePath: string, cwd: string = process.cwd()) {
  if (libpath.isAbsolute(relativePath)) {
    return relativePath;
  }

  const path = findUp.sync(relativePath, { cwd });
  if (!path) {
    throw new Error(`WARN: ${relativePath} is not found.`);
  }
  return path;
}
