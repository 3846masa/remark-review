"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("querystring");
const lodash_1 = require("lodash");
function image(node, parent) {
    const caption = this.all(this.parse(node.title || node.alt || '')).join('');
    let label = '';
    let options = lodash_1.cloneDeep(this.options.imageConfigs || {});
    const nextNodeIdx = node.index + 1;
    const nextNode = parent.children[nextNodeIdx];
    if (nextNode && nextNode.type === 'crossReferenceLabel') {
        const crNode = nextNode;
        label += this.convert(nextNode);
        options = lodash_1.defaultsDeep(crNode.options || {}, options);
        Object.assign(crNode, { type: 'ignore' });
    }
    return lodash_1.defaultsDeep({
        label,
        caption: caption.trim(),
        config: options,
        utils: {
            parse(str) {
                return qs.parse(str, ',', '=', {
                    decodeURIComponent: (str) => str.replace(/\\,/g, ','),
                });
            },
            stringify(opt) {
                return qs.stringify(opt, ',', '=', {
                    encodeURIComponent: (str) => str.replace(/,/g, '\\,'),
                });
            },
        },
    }, node);
}
exports.default = image;
