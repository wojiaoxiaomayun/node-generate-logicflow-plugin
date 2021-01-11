var gen = {
    install: function (lf) {
        console.log("aa");
        lf.genNode = function () {
            return "";
        };
    }
};
export default gen;
export { gen };
