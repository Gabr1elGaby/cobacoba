//class active

const navbarNav = document.querySelector('.navbar-nav');
const menuBox = document.querySelector('#menu-box');


//saat di klik
document.querySelector('#menu-box').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault();
};



//luar sidebar agar hilang 

document.addEventListener('click', function(e) {
    if (!menuBox.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});



$(document).ready(function() {
    // Toggle sub-menu
    $('.sub-btn').click(function(event) {
        event.preventDefault(); // Mencegah scroll ke atas
        event.stopPropagation(); // Mencegah klik pada tombol menyebar ke document

        // Menutup semua sub-menu yang terbuka kecuali yang diklik
        $('.sub-menu').not($(this).next('.sub-menu')).slideUp();
        $(this).next('.sub-menu').slideToggle(function() {
            // Jika sub-menu ditutup, sub-menu-menu di dalamnya juga ditutup
            if (!$(this).is(':visible')) {
                $(this).find('.sub-menu-menu').slideUp();
            }
        });
    });

    // Toggle sub-menu-menu
    $('.struktur').click(function(event) {
        event.preventDefault(); // Mencegah scroll ke atas
        event.stopPropagation(); // Mencegah klik pada tombol menyebar ke document

        // Menutup semua sub-menu-menu yang terbuka kecuali yang diklik
        $('.sub-menu-menu').not($(this).next('.sub-menu-menu')).slideUp();
        $(this).next('.sub-menu-menu').slideToggle();
    });

    // Klik di luar menu untuk menutup semua menu
    $(document).click(function(event) {
        // Jika target klik bukan sub-menu atau sub-btn, maka semua menu ditutup
        if (!$(event.target).closest('.sub-btn, .sub-menu, .struktur, .sub-menu-menu').length) {
            $('.sub-menu').slideUp(); // Tutup semua sub-menu
            $('.sub-menu-menu').slideUp(); // Tutup semua sub-menu-menu
        }
    });
});






  // Function to toggle visibility of the wrapper when calendar icon is clicked
  function toggleWrapper() {
    var wrapper = document.getElementById('wrapper');
    wrapper.style.display = wrapper.style.display === 'none' || wrapper.style.display === '' ? 'flex' : 'none';
}

// Function to toggle the display of ACARA and BERITA content
function toggleContent(openAberId, closeAberId) {
    var openAber = document.getElementById(openAberId);
    var closeAber = document.getElementById(closeAberId);

    // Open the selected content if it's not already open
    if (openAber.style.display === "none" || openAber.style.display === "") {
        openAber.style.display = "block";
        closeAber.style.display = "none";
    } else {
        // Close the content if it's already open
        openAber.style.display = "none";
    }
}

// Function to close the wrapper if clicked outside
document.addEventListener('click', function(event) {
    var wrapper = document.getElementById('wrapper');
    var calendarIcon = document.querySelector('.calendar-icon');

    // Check if the click was outside the wrapper and not on the calendar icon
    if (!wrapper.contains(event.target) && event.target !== calendarIcon) {
        wrapper.style.display = 'none';
    }
});




// Data structures for events and news
let events = [
    { title: "Sosialisasi KPU", date: "Jumat, 15 Nov 2024 <br> 01:47 WIB", img: "politik.png" }
];

let news = [
    { title: "Sosialisasi KPU", date: "Jumat, 15 Nov 2024 <br> 01:47 WIB", img: "politik.png" }
];

// Render function for ACARA section
function renderAcara() {
    const acaraContainer = document.getElementById("acaraAber");
    acaraContainer.innerHTML = events.map(event => `
        <div class="event">
            <img src="${event.img}" alt="Event Image">
            <div>
                <p><a href="#">${event.title}</a></p>
                <span>${event.date}</span>
            </div>
        </div>
    `).join('') + `<div class="more"><a href="#">SELENGKAPNYA</a></div>`;
}

// Render function for BERITA section
function renderBerita() {
    const beritaContainer = document.getElementById("beritaAber");
    beritaContainer.innerHTML = news.map(news => `
        <div class="news">
            <img src="${news.img}" alt="News Image">
            <div>
                <p><a href="#">${news.title}</a></p>
                <span>${news.date}</span>
            </div>
        </div>
    `).join('') + `<div class="more"><a href="#">SELENGKAPNYA</a></div>`;
}

// Initial rendering
renderAcara();
renderBerita();

// Function to add a new event
function addEvent(title, date, img) {
    events.push({ title, date, img });
    renderAcara();
    renderBerita();
}

// Function to add a new news item
function addNews(title, date, img, link) {
    news.push({ title, date, img, link });
    renderAcara();
    renderBerita();
}

// Function to remove an event by index
function removeEvent(index) {
    events.splice(index, 1);
    renderAcara();
    renderBerita();
}

// Function to remove a news item by index
function removeNews(index) {
    news.splice(index, 1);
    renderAcara();
    renderBerita();
}

// Function to update an event by index
function updateEvent(index, title, date, img) {
    if (events[index]) {
        events[index] = { title, date, img };
        renderAcara();
        renderBerita();
    }
}

// Function to update a news item by index
function updateNews(index, title, date, img, link) {
    if (news[index]) {
        news[index] = { title, date, img, link };
        renderAcara();
        renderBerita();
    }
}











        // Inisialisasi EmailJS dengan User ID Anda
        (function() {
            emailjs.init("YOUR_USER_ID");
        })();

        // Menangani pengiriman form
        document.getElementById("contact-form").addEventListener("submit", function(event) {
            event.preventDefault();

            // Ambil data dari form
            const templateParams = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                service: document.getElementById("service").value,
                message: document.getElementById("message").value
            };

            // Kirim email menggunakan EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                .then(function(response) {
                    alert("Pesan berhasil dikirim!");
                    document.getElementById("contact-form").reset(); // Reset form
                }, function(error) {
                    alert("Pesan gagal dikirim. Silakan coba lagi.");
                    console.log("FAILED...", error);
                });
        });