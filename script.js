async function loadMembers() {
    const response = await fetch('members.json');
    return await response.json();
}

async function searchMember() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    const members = await loadMembers();

    if (keyword === "") {
        resultDiv.innerHTML = `<p class="text-red-500">Silakan masukkan kata pencarian.</p>`;
        return;
    }

    const found = members.filter(m =>
        m.nis.toLowerCase() === keyword ||
        m.nama.toLowerCase().includes(keyword)
    );

    if (found.length === 0) {
        resultDiv.innerHTML = `<p class="text-red-500 font-bold">Anggota tidak ditemukan.</p>`;
    } else {
        resultDiv.innerHTML = found.map(m => `
            <div class="bg-green-100 p-4 rounded mt-2 border">
                <p><strong>Nama:</strong> ${m.nama}</p>
                <p><strong>NIS:</strong> ${m.nis}</p>
                <p><strong>Kelas:</strong> ${m.kelas}</p>
                <p><strong>Status BTQ:</strong> 
                   <span class="font-bold ${m.status === 'Lulus' ? 'text-green-600' : 'text-yellow-600'}">
                   ${m.status}</span>
                </p>
            </div>
        `).join("");
    }
}
