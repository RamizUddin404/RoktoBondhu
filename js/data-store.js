const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DISTRICT_DATA = {
    "Dhaka": ["Dhaka City", "Savar", "Dhamrai", "Dohar", "Nawabganj", "Keraniganj"],
    "Chattogram": ["Chattogram City", "Patiya", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
    "Gazipur": ["Gazipur City", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
    "Narayanganj": ["Narayanganj City", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
    "Sylhet": ["Sylhet City", "Balaganj", "Beanibazar", "Bishwanath", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj", "South Surma"],
    "Rajshahi": ["Rajshahi City", "Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore"],
    "Bogura": ["Bogura City", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatola"],
    "Cumilla": ["Cumilla City", "Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Monohargonj", "Meghna", "Muradnagar", "Nangalkot", "Titas"],
    "Barishal": ["Barishal City", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
    "Khulna": ["Khulna City", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada"],
    "Mymensingh": ["Mymensingh City", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal"],
    "Noakhali": ["Noakhali City", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Subarnachar", "Kabirhat", "Sonaimuri"],
    "Feni": ["Feni City", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Sonagazi", "Fulgazi"],
    "Rangpur": ["Rangpur City", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
    "Dinajpur": ["Dinajpur City", "Birampur", "Birganj", "Birol", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"]
};

// Initial donor data
let donorData = [
    {
        name: "Admin Demo",
        blood_group: "O+",
        district: "Dhaka",
        thana: "Dhaka City",
        phone: "01700000000",
        last_donation: "2024-01-01"
    }
];

// Helper to save data
function saveToLocal() {
    try {
        localStorage.setItem('rokto_donors', JSON.stringify(donorData));
    } catch (e) {
        console.error("Save failed", e);
    }
}

function loadFromLocal() {
    try {
        const saved = localStorage.getItem('rokto_donors');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                donorData = parsed;
            }
        }
    } catch (e) {
        console.error("Load failed", e);
    }
}

// Immediately load
loadFromLocal();
