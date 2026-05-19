const loginSection = document.getElementById('loginSection');
const adminDashboard = document.getElementById('adminDashboard');
const adminList = document.getElementById('adminList');
const stats = document.getElementById('stats');

let isAdmin = false;

// Login (Static Demo for GitHub Pages)
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.onclick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        
        if (email === "admin@rokto.com" && password === "123456") {
            isAdmin = true;
            loginSection.classList.add('hidden');
            adminDashboard.classList.remove('hidden');
            loadDonors();
        } else {
            alert("Login failed! Default: admin@rokto.com / 123456");
        }
    };
}

// Logout
function logout() {
    isAdmin = false;
    loginSection.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
}

// Load Data
function loadDonors() {
    adminList.innerHTML = '';
    if (stats) stats.innerText = `Total Donors: ${donorData.length}`;
    
    donorData.forEach((d, index) => {
        const row = `
            <tr class="hover:bg-gray-800 transition border-b border-gray-700">
                <td class="p-6 font-semibold text-gray-200">${d.name}</td>
                <td class="p-6"><span class="bg-red-900/30 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20">${d.blood_group}</span></td>
                <td class="p-6 text-gray-400">${d.district}, ${d.thana}</td>
                <td class="p-6 font-mono text-gray-300">${d.phone}</td>
                <td class="p-6 text-center">
                    <button onclick="deleteDonor(${index})" class="text-gray-500 hover:text-red-500 transition">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        adminList.insertAdjacentHTML('beforeend', row);
    });
}

// Delete Donor
function deleteDonor(index) {
    if (confirm("Are you sure?")) {
        donorData.splice(index, 1);
        saveToLocal();
        loadDonors();
    }
}
