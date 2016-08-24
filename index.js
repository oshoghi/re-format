module.exports = function (string, keys) {
    if (arguments.length > 2 || typeof(keys) !== "object") {
        keys = Array.prototype.splice.call(arguments, 1);
    }

    var parts = string.split(/(?=[{])|}/);
    var l = parts.length;

    for (var i = 0; i < l; i += 1) {
        if (parts[i][0] === "{") {
            var result = keys[parts[i].slice(1)];

            if (typeof(result) !== "undefined") {
                parts[i] = typeof(result) === "function" ? result() : result;
            } else {
                parts[i] = parts[i] + "}";
            }
        }
    }

    return parts.join("");
};