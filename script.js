// ========================================
// DATA LAPORAN
// ========================================

let laporan =
    JSON.parse(localStorage.getItem("laporanSekolah")) || [];


// ========================================
// PINDAH HALAMAN
// ========================================

function bukaHalaman(namaHalaman) {

    const halaman =
        document.querySelectorAll(".page");

    halaman.forEach(function(page) {
        page.classList.remove("active");
    });


    document
        .getElementById(namaHalaman)
        .classList.add("active");


    const tombol =
        document.querySelectorAll(".nav-btn");

    tombol.forEach(function(btn) {
        btn.classList.remove("active");
    });


    const tombolAktif =
        document.querySelector(
            `.nav-btn[onclick="bukaHalaman('${namaHalaman}')"]`
        );

    if (tombolAktif) {
        tombolAktif.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// PREVIEW FOTO
// ========================================

document
    .getElementById("fotoKerusakan")
    .addEventListener("change", function() {

        const file = this.files[0];

        const preview =
            document.getElementById("previewFoto");


        if (!file) {

            preview.innerHTML = "";

            return;
        }


        const reader =
            new FileReader();


        reader.onload = function(event) {

            preview.innerHTML = `

                <p>
                    <strong>Preview Foto:</strong>
                </p>

                <img
                    src="${event.target.result}"
                    alt="Preview kerusakan"
                >

            `;
        };


        reader.readAsDataURL(file);

    });


// ========================================
// KIRIM LAPORAN
// ========================================

document
    .getElementById("formLaporan")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const namaFasilitas =
            document.getElementById(
                "namaFasilitas"
            ).value;


        const lokasi =
            document.getElementById(
                "lokasi"
            ).value;


        const jenisKerusakan =
            document.getElementById(
                "jenisKerusakan"
            ).value;


        const keterangan =
            document.getElementById(
                "keterangan"
            ).value;


        const fileFoto =
            document.getElementById(
                "fotoKerusakan"
            ).files[0];


        const tanggal =
            new Date().toLocaleDateString(
                "id-ID",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        // Kalau pengguna memasukkan foto

        if (fileFoto) {

            const reader =
                new FileReader();


            reader.onload = function(event) {

                simpanLaporan(

                    namaFasilitas,

                    lokasi,

                    jenisKerusakan,

                    keterangan,

                    tanggal,

                    event.target.result

                );

            };


            reader.readAsDataURL(fileFoto);

        }

        // Kalau tidak memasukkan foto

        else {

            simpanLaporan(

                namaFasilitas,

                lokasi,

                jenisKerusakan,

                keterangan,

                tanggal,

                ""

            );

        }

    });


// ========================================
// SIMPAN LAPORAN
// ========================================

function simpanLaporan(

    namaFasilitas,

    lokasi,

    jenisKerusakan,

    keterangan,

    tanggal,

    foto

) {

    const dataBaru = {

        fasilitas: namaFasilitas,

        lokasi: lokasi,

        jenis: jenisKerusakan,

        keterangan: keterangan,

        tanggal: tanggal,

        foto: foto

    };


    laporan.push(dataBaru);


    localStorage.setItem(

        "laporanSekolah",

        JSON.stringify(laporan)

    );


    document
        .getElementById("formLaporan")
        .reset();


    document
        .getElementById("previewFoto")
        .innerHTML = "";


    tampilkanRiwayat();


    alert(
        "✅ Laporan berhasil dikirim!"
    );


    bukaHalaman("riwayat");

}


// ========================================
// TAMPILKAN RIWAYAT
// ========================================

function tampilkanRiwayat() {

    const container =
        document.getElementById(
            "daftarRiwayat"
        );


    const jumlah =
        document.getElementById(
            "jumlahLaporan"
        );


    jumlah.textContent =
        laporan.length + " laporan";


    // Belum ada laporan

    if (laporan.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <span>📭</span>

                <p>
                    Belum ada laporan.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = "";


    // Laporan terbaru di atas

    const dataTerbaru =
        [...laporan].reverse();


    dataTerbaru.forEach(function(item) {

        const div =
            document.createElement("div");


        div.className = "report";


        div.innerHTML = `

            <h3>
                🛠️ ${item.fasilitas}
            </h3>


            <p>
                <strong>📍 Lokasi:</strong>
                ${item.lokasi}
            </p>


            <p>
                <strong>⚠️ Kerusakan:</strong>
                ${item.jenis}
            </p>


            <p>
                <strong>📝 Keterangan:</strong>
                ${item.keterangan}
            </p>


            <p>
                <strong>📅 Tanggal:</strong>
                ${item.tanggal}
            </p>


            ${
                item.foto

                ?

                `

                <p>
                    <strong>
                        📷 Bukti Kerusakan:
                    </strong>
                </p>

                <img
                    src="${item.foto}"
                    alt="Bukti kerusakan"
                >

                `

                :

                `

                <p>
                    📷 Tidak ada foto
                </p>

                `
            }


            <span class="status">
                Menunggu perawatan
            </span>

        `;


        container.appendChild(div);

    });

}


// ========================================
// JALANKAN SAAT APLIKASI DIBUKA
// ========================================

tampilkanRiwayat();