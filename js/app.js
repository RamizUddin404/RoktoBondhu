// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const toast = document.getElementById('toast');

// Navigation Logic
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    mobileMenu.classList.add('hidden');
    window.scrollTo(0, 0);
}

if (menuBtn) menuBtn.onclick = () => mobileMenu.classList.remove('hidden');
if (closeMenu) closeMenu.onclick = () => mobileMenu.classList.add('hidden');

// Populate Dropdowns
function populateDropdowns() {
    console.log("Populating dropdowns...");
    const bloodSelects = [document.getElementById('searchBlood'), document.getElementById('regBlood')];
    const districtSelects = [document.getElementById('searchDistrict'), document.getElementById('regDistrict')];

    BLOOD_GROUPS.forEach(bg => {
        bloodSelects.forEach(select => {
            if (!select) return;
            const opt = document.createElement('option');
            opt.value = bg; opt.innerText = bg;
            select.appendChild(opt);
        });
    });

    Object.keys(DISTRICT_DATA).forEach(d => {
        districtSelects.forEach(select => {
            if (!select) return;
            const opt = document.createElement('option');
            opt.value = d; opt.innerText = d;
            select.appendChild(opt);
        });
    });
}

// Dependent Dropdown Logic
function updateThanas(type) {
    const district = document.getElementById(type === 'search' ? 'searchDistrict' : 'regDistrict').value;
    const thanaSelect = document.getElementById(type === 'search' ? 'searchThana' : 'regThana');
    
    if (!thanaSelect) return;

    thanaSelect.innerHTML = type === 'search' ? '<option value="">সব থানা</option>' : '<option value="">নির্বাচন করুন</option>';
    
    if (district && DISTRICT_DATA[district]) {
        DISTRICT_DATA[district].forEach(t => {
            const opt = document.createElement('option');
            opt.value = t; opt.innerText = t;
            thanaSelect.appendChild(opt);
        });
    }
}

// Show Toast
function showMessage(msg, duration = 3000) {
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration);
}

// Registration Logic
const regForm = document.getElementById('regForm');
if (regForm) {
    regForm.onsubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById('regName').value;
        const blood = document.getElementById('regBlood').value;
        const district = document.getElementById('regDistrict').value;
        const thana = document.getElementById('regThana').value;
        const phone = document.getElementById('regPhone').value;
        const lastDate = document.getElementById('regDate').value;

        const newDonor = { name, blood_group: blood, district, thana, phone, last_donation: lastDate };
        donorData.push(newDonor);
        saveToLocal();

        showMessage("রেজিস্ট্রেশন সফল হয়েছে!");
        e.target.reset();
        showTab('home');
    };
}

// Search Logic
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.onclick = () => {
        const blood = document.getElementById('searchBlood').value;
        const district = document.getElementById('searchDistrict').value;
        const thana = document.getElementById('searchThana').value;
        const resultsDiv = document.getElementById('searchResults');
        resultsDiv.innerHTML = '<div class="text-center py-10"><i class="fas fa-spinner fa-spin text-3xl text-red-500"></i></div>';

        setTimeout(() => {
            resultsDiv.innerHTML = '';
            
            const filtered = donorData.filter(d => {
                return (!blood || d.blood_group === blood) && 
                       (!district || d.district === district) && 
                       (!thana || d.thana === thana);
            });

            if (filtered.length === 0) {
                resultsDiv.innerHTML = '<p class="text-center py-10 text-gray-500">কোনো ডোনার পাওয়া যায়নি।</p>';
                return;
            }

            filtered.forEach(donor => {
                const card = `
                    <div class="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex justify-between items-center border-l-4 border-l-red-500">
                        <div>
                            <h4 class="text-xl font-bold text-white">${donor.name} (${donor.blood_group})</h4>
                            <p class="text-gray-400 text-sm"><i class="fas fa-map-marker-alt mr-1"></i> ${donor.district}, ${donor.thana}</p>
                        </div>
                        <a href="tel:${donor.phone}" class="bg-green-600 text-white p-4 rounded-full hover:bg-green-700 transition">
                            <i class="fas fa-phone"></i>
                        </a>
                    </div>
                `;
                resultsDiv.insertAdjacentHTML('beforeend', card);
            });
        }, 300);
    };
}

// Initialize
window.addEventListener('load', () => {
    populateDropdowns();
});
