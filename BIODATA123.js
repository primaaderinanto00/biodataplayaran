// Navigasi hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Menutup menu saat mengklik link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Form submission
document.getElementById('biodataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mengumpulkan data form
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Validasi NISN (10 digit)
    if (data.nisn.length !== 10 || isNaN(data.nisn)) {
        alert('NISN harus terdiri dari 10 digit angka');
        return;
    }
    
    // Validasi nomor telepon
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(data.telepon)) {
        alert('Nomor telepon tidak valid');
        return;
    }
    
    // Menampilkan data (bisa diganti dengan pengiriman ke server)
    console.log('Data Biodata Siswa:', data);
    
    // Tampilkan pesan sukses
    alert('Biodata berhasil disimpan!');
    
    // Reset form
    this.reset();
});

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Validasi real-time untuk input tertentu
document.getElementById('nisn').addEventListener('input', function() {
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
    
    // Hanya angka yang diizinkan
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('telepon').addEventListener('input', function() {
    // Format nomor telepon
    let value = this.value.replace(/[^0-9]/g, '');
    
    if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1-$2');
    } else if (value.length > 6 && value.length <= 10) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
    }
    
    this.value = value;
});

// Menambahkan tahun saat ini di footer
document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} SekolahKu. Semua hak dilindungi.`;