"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libpath = require("path");
const findUp = require("find-up");
function searchFile(relativePath, cwd = process.cwd()) {
    if (!relativePath || libpath.isAbsolute(relativePath)) {
        return relativePath;
    }
    const path = findUp.sync(relativePath, { cwd });
    if (!path) {
        console.warn(`WARN: ${relativePath} is not found.`);
    }
    return path;
}
exports.default = searchFile;
