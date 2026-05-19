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

menuBtn.onclick = () => mobileMenu.classList.remove('hidden');
closeMenu.onclick = () => mobileMenu.classList.add('hidden');

// Populate Dropdowns
function populateDropdowns() {
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
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), duration);
}

// Registration Logic
document.getElementById('regForm').onsubmit = async (e) => {
    e.preventDefault();
    if (SUPABASE_URL === "YOUR_SUPABASE_URL") {
        showMessage("Supabase configuration missing!");
        return;
    }

    const name = document.getElementById('regName').value;
    const blood = document.getElementById('regBlood').value;
    const district = document.getElementById('regDistrict').value;
    const thana = document.getElementById('regThana').value;
    const phone = document.getElementById('regPhone').value;
    const lastDate = document.getElementById('regDate').value;

    try {
        const { error } = await supabaseClient
            .from('donors')
            .insert([{ name, blood_group: blood, district, thana, phone, last_donation: lastDate }]);

        if (error) throw error;

        showMessage("রেজিস্ট্রেশন সফল হয়েছে!");
        e.target.reset();
        showTab('home');
    } catch (err) {
        showMessage("ভুল হয়েছে: " + err.message);
    }
};

// Search Logic
document.getElementById('searchBtn').onclick = async () => {
    const blood = document.getElementById('searchBlood').value;
    const district = document.getElementById('searchDistrict').value;
    const thana = document.getElementById('searchThana').value;
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<div class="text-center py-10"><i class="fas fa-spinner fa-spin text-3xl text-red-500"></i></div>';

    try {
        let query = supabaseClient.from('donors').select('*');
        if (blood) query = query.eq('blood_group', blood);
        if (district) query = query.eq('district', district);
        if (thana) query = query.eq('thana', thana);

        const { data: donors, error } = await query;
        if (error) throw error;

        resultsDiv.innerHTML = '';
        if (!donors || donors.length === 0) {
            resultsDiv.innerHTML = '<p class="text-center py-10 text-gray-500">কোনো ডোনার পাওয়া যায়নি।</p>';
            return;
        }

        donors.forEach(donor => {
            const card = `
                <div class="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center border-l-8 border-red-500">
                    <div>
                        <h4 class="text-xl font-bold text-gray-800">${donor.name} (${donor.blood_group})</h4>
                        <p class="text-gray-500 text-sm"><i class="fas fa-map-marker-alt mr-1"></i> ${donor.district}, ${donor.thana}</p>
                        ${donor.last_donation ? `<p class="text-xs text-gray-400 mt-1">শেষ রক্তদান: ${donor.last_donation}</p>` : ''}
                    </div>
                    <a href="tel:${donor.phone}" class="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition shadow-lg">
                        <i class="fas fa-phone"></i>
                    </a>
                </div>
            `;
            resultsDiv.insertAdjacentHTML('beforeend', card);
        });
    } catch (err) {
        showMessage("সার্চে ভুল হয়েছে: " + err.message);
    }
};

window.onload = populateDropdowns;
