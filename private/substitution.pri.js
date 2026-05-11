function substitution(verdi) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzæøå";
    let respons = "";

    for (const tegn of verdi) {
        const lowerTegn = tegn.toLowerCase();
        const index = alphabet.indexOf(lowerTegn);

        if (index === -1) {
            respons += tegn;
            continue;
        }

        const nextIndex = (index + 1) % alphabet.length;
        const nextTegn = alphabet[nextIndex];

        if (tegn === tegn.toUpperCase() && tegn !== lowerTegn) {
            respons += nextTegn.toUpperCase();
        } else {
            respons += nextTegn;
        }
    }

    return respons;
}

module.exports = { substitution };
