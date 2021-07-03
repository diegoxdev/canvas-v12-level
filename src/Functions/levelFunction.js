class func{

static async selam_ben_diego(num) {

if (!num || isNaN(num)) return "0";
    if (typeof num === "string") num = parseInt(num);
    let decPlaces = Math.pow(10, 1);
    var diego = ["K", "M", "B", "T"];
    for (var i = diego.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= num) {
            num = Math.round((num * decPlaces) / size) / decPlaces;
            if (num == 1000 && i < diego.length - 1) {
                num = 1;
                i++;
            }
            num += diego[i];
            break;
        }
    
    return num;
};

}

}

module.exports = func;
