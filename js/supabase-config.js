// Replace with your Supabase project configuration
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    // Add more as needed, but this covers major areas for now.
};
