const inn = document.getElementById("input");
const ut = document.getElementById("output");

inn.addEventListener("input", async function () {
    // console.log(inn.value);

    const verdi = inn.value;

    const res = await fetch("/api/block", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            value: verdi
        })
    });

    const data = await res.json();
    ut.innerHTML = data.blokk;
//    console.log(data.blokk);
});