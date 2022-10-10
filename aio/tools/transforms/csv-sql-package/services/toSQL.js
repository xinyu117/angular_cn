module.exports = function toSQL() {
    return (obj) => {
   
        return  Object.values(obj).join(',');
    };
  };