const inn = document.getElementById("input");
const blockUt = document.getElementById("block-output");
const substitutionUt = document.getElementById("substitution-output");

inn.addEventListener("input", async function () {
    // console.log(inn.value);

    const verdi = inn.value;

    const blockRes = await fetch("/api/block", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            value: verdi
        })
    });

    const substitutionRes = await fetch("/api/substitution", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            value: verdi
        })
    });

    const blockData = await blockRes.json();
    const substitutionData = await substitutionRes.json();

    blockUt.textContent = blockData.blokk;
    substitutionUt.textContent = substitutionData.substitution;
    // console.log(blockData.blokk);
});
