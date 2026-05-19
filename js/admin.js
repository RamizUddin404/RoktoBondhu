const loginSection = document.getElementById('loginSection');
const adminDashboard = document.getElementById('adminDashboard');
const adminList = document.getElementById('adminList');
const stats = document.getElementById('stats');

// Login Function
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.onclick = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        
        // Simple hardcoded check
        if (email === "admin@rokto.com" && password === "123456") {
            loginSection.classList.add('hidden');
            adminDashboard.classList.remove('hidden');
            loadDonors();
        } else {
            alert("ভুল তথ্য! সঠিক ইমেইল ও পাসওয়ার্ড দিন।");
        }
    };
}

// Logout
function logout() {
    loginSection.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
}

// Load Data into Table
function loadDonors() {
    adminList.innerHTML = '';
    if (stats) stats.innerText = `${donorData.length} Donors found`;
    
    donorData.forEach((d, index) => {
        const row = `
            <tr class="hover:bg-white/[0.02] transition">
                <td class="p-8">
                    <p class="font-bold text-white text-lg">${d.name}</p>
                    <p class="text-gray-500 text-xs mt-1">Joined: ${new Date().toLocaleDateString()}</p>
                </td>
                <td class="p-8 text-center">
                    <span class="bg-red-600/10 text-red-500 px-4 py-2 rounded-xl text-sm font-black border border-red-500/20">${d.blood_group}</span>
                </td>
                <td class="p-8">
                    <p class="text-gray-300 font-medium">${d.district}</p>
                    <p class="text-gray-500 text-sm">${d.thana}</p>
                </td>
                <td class="p-8 font-mono text-gray-300">${d.phone}</td>
                <td class="p-8 text-right">
                    <button onclick="deleteDonor(${index})" class="p-4 bg-gray-900/50 text-gray-500 hover:text-red-500 rounded-2xl border border-gray-700 hover:border-red-500/30 transition">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
        adminList.insertAdjacentHTML('beforeend', row);
    });
}

// Delete Entry
function deleteDonor(index) {
    if (confirm("আপনি কি নিশ্চিতভাবে এই ডোনারকে ডিলিট করতে চান?")) {
        donorData.splice(index, 1);
        saveToLocal();
        loadDonors();
    }
}
