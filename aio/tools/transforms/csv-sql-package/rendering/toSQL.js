module.exports = function (toSQL) {
    return {
        name: 'toSQL',
        process: function (obj) {
            return toSQL(obj);
        }
    };
};