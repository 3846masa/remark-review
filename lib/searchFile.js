"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libpath = require("path");
const findUp = require("find-up");
function searchFile(relativePath, cwd = process.cwd()) {
    if (libpath.isAbsolute(relativePath)) {
        return relativePath;
    }
    const path = findUp.sync(relativePath, { cwd });
    if (!path) {
        throw new Error(`WARN: ${relativePath} is not found.`);
    }
    return path;
}
exports.default = searchFile;
