function interpolate (string, keys) {
    if (arguments.length > 2 || typeof(keys) !== "object") {
        keys = Array.prototype.splice.call(arguments, 1);
    }

    var parts = string.split(/(\{[^}]*\})/);

    for (var i = 0; i < parts.length; i++) {
        if (parts[i][0] === "{") {
            var result = keys[parts[i].substring(1, parts[i].length - 1)];

            if (typeof(result) !== "undefined") {
                parts[i] = typeof(result) === "function" ? result() : result;
            }
        }
    }

    return parts;
}

function format () {
    return interpolate.apply(null, arguments).join("");
}

format.interpolate = interpolate;

module.exports = format;
