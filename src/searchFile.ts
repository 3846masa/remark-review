import libpath from 'path';
import findUp from 'find-up';

export default function searchFile(relativePath: string, options: findUp.Options = {}) {
  if (libpath.isAbsolute(relativePath)) {
    return relativePath;
  }

  const path = findUp.sync(relativePath, { cwd: process.cwd(), ...options });
  if (!path) {
    throw new Error(`WARN: ${relativePath} is not found.`);
  }
  return path;
}
