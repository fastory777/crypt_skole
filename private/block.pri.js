function block(verdi) {
    let respons = "";
    let l = verdi.length;
    verdi = verdi.toLowerCase();
    if (l < 4) {
        respons = "Need at least 4 characters";
    } else {
        let i = 0;
        while (i < Math.floor(l/4)) {
            let a = verdi.substring(0, 2);
            let b = verdi.substring(2, 4);
            respons += b + a;
            verdi = verdi.slice(4);
            i++;
        }
        respons += verdi;
    }
    return respons;
}

module.exports = { block };