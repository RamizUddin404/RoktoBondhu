const loginSection = document.getElementById('loginSection');
const adminDashboard = document.getElementById('adminDashboard');
const adminList = document.getElementById('adminList');
const stats = document.getElementById('stats');

// Login
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.onclick = async () => {
        if (!supabaseClient) {
            initSupabase();
        }
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) alert("Login failed: " + error.message);
    };
}

// Logout
async function logout() {
    await supabaseClient.auth.signOut();
}

// Load Data
async function loadDonors() {
    const { data: donors, error } = await supabaseClient
        .from('donors')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        alert("Error loading donors: " + error.message);
        return;
    }

    adminList.innerHTML = '';
    if (stats) stats.innerText = `Total Donors: ${donors ? donors.length : 0}`;
    
    if (donors) {
        donors.forEach(d => {
            const row = `
                <tr class="hover:bg-gray-50 transition">
                    <td class="p-6 font-semibold text-gray-800">${d.name}</td>
                    <td class="p-6"><span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">${d.blood_group}</span></td>
                    <td class="p-6 text-gray-500">${d.district}</td>
                    <td class="p-6 font-mono">${d.phone}</td>
                    <td class="p-6 text-center">
                        <button onclick="deleteDonor('${d.id}')" class="text-gray-400 hover:text-red-500 transition">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
            adminList.insertAdjacentHTML('beforeend', row);
        });
    }
}

// Delete Donor
async function deleteDonor(id) {
    if (confirm("Are you sure you want to delete this donor?")) {
        const { error } = await supabaseClient.from('donors').delete().eq('id', id);
        if (error) alert("Delete failed: " + error.message);
        else loadDonors();
    }
}

// Initialize on load
window.addEventListener('load', () => {
    initSupabase();
    
    // Auth Listener
    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session) {
                if (loginSection) loginSection.classList.add('hidden');
                if (adminDashboard) adminDashboard.classList.remove('hidden');
                loadDonors();
            } else {
                if (loginSection) loginSection.classList.remove('hidden');
                if (adminDashboard) adminDashboard.classList.add('hidden');
            }
        });
    }
});
