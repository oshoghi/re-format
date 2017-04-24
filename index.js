var Matchers = {
    SINGLE_CURLY: {
        regex: /(\{[^}]*\})/,
        isKey: (str) => str[0] === "{" && str[str.length - 1] === "}",
        getKey: (str) => str.substring(1, str.length - 1)
    },
    DOUBLE_CURLY: {
        regex: /(\{\{[^}]*\}\})/,
        isKey: (str) => str[0] === "{" && str[1] === "{" && str[str.length - 2] === "}" && str[str.length - 1] === "}",
        getKey: (str) => str.substring(2, str.length - 2)
    },
    COLON: {
        regex: /(:[^ :]*\b)/,
        isKey: (str) => str[0] === ":" && str[1] !== " ",
        getKey: (str) => str.slice(1)
    }
};

function interpolate (matcher, string, keys) {
    if (arguments.length > 3 || typeof(keys) !== "object") {
        keys = Array.prototype.splice.call(arguments, 2);
    }

    var parts = string.split(matcher.regex);

    for (var i = 0; i < parts.length; i++) {
        if (matcher.isKey(parts[i])) {
            var result = keys[matcher.getKey(parts[i])];

            if (typeof(result) !== "undefined") {
                parts[i] = typeof(result) === "function" ? result() : result;
            }
        }
    }

    return parts;
}

function callInterpolate (matcher, parentArgs) {
    var args = [matcher];

    for (var i = 0; i < parentArgs.length; i++) {
        args.push(parentArgs[i]);
    }

    return interpolate.apply(null, args).join("");
}

var format = function () { return callInterpolate(Matchers.SINGLE_CURLY, arguments); }

format.interpolate = interpolate;
format.Matchers = Matchers;

format.singleCurly = function () { return callInterpolate(Matchers.SINGLE_CURLY, arguments); }
format.doubleCurly = function () { return callInterpolate(Matchers.DOUBLE_CURLY, arguments); }
format.colon = function () { return callInterpolate(Matchers.COLON, arguments); }

module.exports = format;
