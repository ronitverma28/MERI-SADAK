// MERI SADAK - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initForms();
    initAnimations();
    initTooltips();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Add scroll effect to navbar
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Form validation and enhancement
function initForms() {
    // Add form validation styles
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });

            // Real-time validation
            input.addEventListener('input', function () {
                validateField(this);
            });
        });

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm(this)) {
                showSuccessMessage('Form submitted successfully!');
                // Here you would normally send data to server
            }
        });
    });
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('is-invalid');
    const existingError = field.parentElement.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }

    // Required field validation
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Password validation
    if (fieldType === 'password' && value) {
        if (value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters long.';
        }
    }

    // Confirm password validation
    if (field.name === 'confirmPassword' && value) {
        const password = document.querySelector('input[name="password"]').value;
        if (value !== password) {
            isValid = false;
            errorMessage = 'Passwords do not match.';
        }
    }

    // Show validation result
    if (!isValid) {
        field.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    }

    return isValid;
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    return isFormValid;
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.card, .section, .hero-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Utility functions
function showSuccessMessage(message) {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    // Create error alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// State-District mapping data
const stateDistricts = {
    "andhra-pradesh": ["anatapur", "chittoor", "east-godavari", "guntur", "krishna", "kurnool", "nellore", "prakasam", "srikakulam", "visakhapatnam", "vizianagaram", "west-godavari", "ysr-kadapa"],
    "arunachal-pradesh": ["tawang", "west-kameng", "east-kameng", "papum-pare", "kurung-kumey", "kra-daadi", "lower-subansiri", "upper-subansiri", "west-siang", "east-siang", "upper-siang", "lower-siang", "siang", "changlang", "tirap", "longding", "namsai", "lower-dibang-valley", "dibang-valley", "anjaw", "lohit"],
    "assam": ["baksa", "barpeta", "biswanath", "bongaigaon", "cachar", "charaideo", "chirang", "darrang", "dhemaji", "dhubri", "dibrugarh", "goalpara", "golaghat", "hailakandi", "hojai", "jorhat", "kamrup", "kamrup-metro", "karbi-anglong", "karimganj", "kokrajhar", "lakhimpur", "majuli", "morigaon", "nagaon", "nalbari", "sivasagar", "sonitpur", "south-salmara", "tinsukia", "udalguri", "west-karbi-anglong"],
    "bihar": ["araria", "arwal", "aurangabad", "banka", "begusarai", "bhagalpur", "bhojpur", "buxar", "darbhanga", "east-champaran", "gaya", "gopalganj", "jamui", "jehanabad", "kaimur", "katihar", "khagaria", "kishanganj", "lakhisarai", "madhepura", "madhubani", "munger", "muzaffarpur", "nalanda", "nawada", "patna", "purnia", "rohtas", "saharsa", "samastipur", "saran", "sheikhpura", "sheohar", "sitamarhi", "siwan", "supaul", "vaishali", "west-champaran"],
    "chhattisgarh": ["balod", "baloda-bazar", "balrampur", "bastar", "bemetara", "bijapur", "bilaspur", "dantewada", "dhamtari", "durg", "gariaband", "janjgir-champa", "jashpur", "kabirdham", "kanker", "kondagaon", "korba", "koriya", "mahasamund", "mungeli", "narayanpur", "raigarh", "raipur", "rajnandgaon", "sukma", "surajpur", "surguja"],
    "goa": ["north-goa", "south-goa"],
    "gujarat": ["ahmedabad", "amreli", "anand", "aravalli", "banaskantha", "bharuch", "bhavnagar", "botad", "chhota-udepur", "dahod", "dang", "devbhoomi-dwarka", "gandhinagar", "gir-somnath", "jamnagar", "junagadh", "kachchh", "kheda", "mahesana", "morbi", "narmada", "navsari", "panchmahal", "patan", "porbandar", "rajkot", "sabarkantha", "surat", "surendranagar", "tapi", "vadodara", "valsad"],
    "haryana": ["ambala", "bhiwani", "charkhi-dadri", "faridabad", "fatehabad", "gurugram", "hisar", "jhajjar", "jind", "kaithal", "karnal", "kurukshetra", "mahendragarh", "nuh", "palwal", "panchkula", "panipat", "rewari", "rohtak", "sirsa", "sonipat", "yamunanagar"],
    "himachal-pradesh": ["bilaspur", "chamba", "hamirpur", "kangra", "kinnaur", "kullu", "lahul-spiti", "mandi", "shimla", "sirmaur", "solan", "una"],
    "jharkhand": ["bokaro", "chatra", "deoghar", "dhanbad", "dumka", "east-singhbhum", "garhwa", "giridih", "godda", "gumla", "hazaribagh", "jamtara", "khunti", "koderma", "latehar", "lohardaga", "pakur", "palamu", "ramgarh", "ranchi", "sahibganj", "saraikela-kharsawan", "simdega", "west-singhbhum"],
    "karnataka": ["bagalkot", "ballari", "belagavi", "bengaluru-rural", "bengaluru-urban", "bidar", "chamarajanagar", "chikkaballapur", "chikkamagaluru", "chitradurga", "dakshina-kannada", "davanagere", "dharwad", "gadag", "hassan", "haveri", "kalaburagi", "kodagu", "kolar", "koppal", "mandya", "mysuru", "raichur", "ramanagara", "shivamogga", "tumakuru", "udupi", "uttara-kannada", "vijayapura", "yadgir"],
    "kerala": ["alappuzha", "ernakulam", "idukki", "kannur", "kasaragod", "kollam", "kottayam", "kozhikode", "malappuram", "palakkad", "pathanamthitta", "thiruvananthapuram", "thrissur", "wayanad"],
    "madhya-pradesh": ["agar-malwa", "alirajpur", "anuppur", "ashoknagar", "balaghat", "barwani", "betul", "bhind", "bhopal", "burhanpur", "chhatarpur", "chhindwara", "damoh", "datia", "dewas", "dhar", "dindori", "guna", "gwalior", "harda", "hoshangabad", "indore", "jabalpur", "jhabua", "katni", "khandwa", "khargone", "mandla", "mandsaur", "morena", "narsinghpur", "neemuch", "panna", "raisen", "rajgarh", "ratlam", "rewa", "sagar", "satna", "sehore", "seoni", "shahdol", "shajapur", "sheopur", "shivpuri", "sidhi", "singrauli", "tikamgarh", "ujjain", "umaria", "vidisha"],
    "maharashtra": ["ahmednagar", "akola", "amravati", "aurangabad", "beed", "bhandara", "buldhana", "chandrapur", "dhule", "gadchiroli", "gondia", "hingoli", "jalgaon", "jalna", "kolhapur", "latur", "mumbai-city", "mumbai-suburban", "nagpur", "nanded", "nandurbar", "nashik", "osmanabad", "palghar", "parbhani", "pune", "raigad", "ratnagiri", "sangli", "satara", "sindhudurg", "solapur", "thane", "wardha", "washim", "yavatmal"],
    "manipur": ["bishnupur", "chandel", "churachandpur", "imphal-east", "imphal-west", "jiribam", "kakching", "kamjong", "kangpokpi", "noney", "pherzawl", "senapati", "tamenglong", "tengnoupal", "thoubal", "ukhrul"],
    "meghalaya": ["east-garo-hills", "east-jaintia-hills", "east-khasi-hills", "north-garo-hills", "ri-bhoi", "south-garo-hills", "south-west-garo-hills", "south-west-jaintia-hills", "west-garo-hills", "west-jaintia-hills", "west-khasi-hills"],
    "mizoram": ["aizawl", "champhai", "kolasib", "lawngtlai", "lunglei", "mamit", "saiha", "serchhip", "hnahthial", "khawzawl", "saitual"],
    "nagaland": ["dimapur", "kiphire", "kohima", "longleng", "mokokchung", "mon", "peren", "phek", "tuensang", "wokha", "zunheboto"],
    "odisha": ["angul", "boudh", "bhadrak", "balangir", "balasore", "bargarh", "deogarh", "dhenkanal", "gajapati", "ganjam", "jagatsinghpur", "jajpur", "jharsuguda", "kalahandi", "kandhamal", "kendrapara", "keonjhar", "khordha", "koraput", "malkangiri", "mayurbhanj", "nabarangpur", "nayagarh", "nuapada", "puri", "rayagada", "sambalpur", "sonepur", "sundargarh"],
    "punjab": ["amritsar", "barnala", "bathinda", "faridkot", "fatehgarh-sahib", "fazilka", "ferozepur", "gurdaspur", "hoshiarpur", "jalandhar", "kapurthala", "ludhiana", "mansa", "moga", "muktsar", "nawanshahr", "pathankot", "patiala", "rupnagar", "sangrur", "sas-nagar", "tarn-taran"],
    "rajasthan": ["ajmer", "alwar", "banswara", "baran", "barmer", "bharatpur", "bhilwara", "bikaner", "bundi", "chittorgarh", "churu", "dausa", "dholpur", "dungarpur", "hanumangarh", "jaipur", "jaisalmer", "jalore", "jhalawar", "jhunjhunu", "jodhpur", "karauli", "kota", "nagaur", "pali", "pratapgarh", "rajsamand", "sawai-madhopur", "sikar", "sirohi", "tonk", "udaipur"],
    "sikkim": ["east-sikkim", "north-sikkim", "south-sikkim", "west-sikkim"],
    "tamil-nadu": ["ariyalur", "chengalpattu", "chennai", "coimbatore", "cuddalore", "dharmapuri", "dindigul", "erode", "kallakurichi", "kancheepuram", "karur", "krishnagiri", "madurai", "nagapattinam", "namakkal", "nilgiris", "perambalur", "pudukkottai", "ramanathapuram", "ranipet", "salem", "sivaganga", "tenkasi", "thanjavur", "theni", "thoothukudi", "tiruchirappalli", "tirunelveli", "tirupathur", "tiruppur", "tiruvallur", "tiruvannamalai", "tiruvarur", "vellore", "viluppuram", "virudhunagar"],
    "telangana": ["adilabad", "bhadradri-kothagudem", "hyderabad", "jagtial", "jangaon", "jayashankar-bhupalpally", "jogulamba-gadwal", "kamareddy", "karimnagar", "khammam", "komaram-bheem", "mahabubabad", "mahabubnagar", "mancherial", "medak", "medchal-malkajgiri", "mulugu", "nagarkurnool", "nalgonda", "narayanpet", "nirmal", "nizamabad", "peddapalli", "rajanna-sircilla", "rangareddy", "sangareddy", "siddipet", "suryapet", "vikarabad", "wanaparthy", "warangal-rural", "warangal-urban", "yadadri-bhongir"],
    "tripura": ["dhalai", "gomati", "khowai", "north-tripura", "sepahijala", "south-tripura", "unokoti", "west-tripura"],
    "uttar-pradesh": ["agra", "aligarh", "allahabad", "ambedkar-nagar", "amethi", "amroha", "auraiya", "azamgarh", "baghpat", "bahraich", "ballia", "balrampur", "banda", "bara-banki", "bareilly", "basti", "bhadohi", "bijnor", "budaun", "bulandshahr", "chandauli", "chitrakoot", "deoria", "etah", "etawah", "faizabad", "farrukhabad", "fatehpur", "firozabad", "gautam-budh-nagar", "ghaziabad", "ghazipur", "gonda", "gorakhpur", "hamirpur", "hardoi", "hathras", "jalaun", "jaunpur", "jhansi", "kannauj", "kanpur-dehat", "kanpur-nagar", "kasganj", "kaushambi", "kushinagar", "lalitpur", "lucknow", "maharajganj", "mahoba", "mainpuri", "mathura", "mau", "meerut", "mirzapur", "moradabad", "muzaffarnagar", "pilibhit", "pratapgarh", "rae-bareli", "rampur", "saharanpur", "sambhal", "sant-kabir-nagar", "shahjahanpur", "shamli", "shravasti", "siddharthnagar", "sitapur", "sonbhadra", "sultanpur", "unnao", "varanasi"],
    "uttarakhand": ["almora", "bageshwar", "chamoli", "champawat", "dehradun", "haridwar", "nainital", "pauri-garhwal", "pithoragarh", "rudraprayag", "tehri-garhwal", "udham-singh-nagar", "uttarkashi"],
    "west-bengal": ["alipurduar", "bankura", "birbhum", "cooch-behar", "dakshin-dinajpur", "darjeeling", "hooghly", "howrah", "jalpaiguri", "jhargram", "kalimpong", "kolkata", "malda", "murshidabad", "nadia", "north-24-parganas", "paschim-bardhaman", "paschim-medinipur", "purba-bardhaman", "purba-medinipur", "purulia", "south-24-parganas", "uttar-dinajpur"],
    // Union Territories
    "andaman-nicobar": ["nicobar", "north-and-middle-andaman", "south-andaman"],
    "chandigarh": ["chandigarh"],
    "dadra-nagar-haveli-daman-diu": ["dadra-nagar-haveli", "daman", "diu"],
    "delhi": ["new-delhi", "central-delhi", "east-delhi", "north-delhi", "north-east-delhi", "north-west-delhi", "shahdara", "south-delhi", "south-east-delhi", "south-west-delhi", "west-delhi"],
    "jammu-kashmir": ["anantnag", "bandipora", "baramulla", "budgam", "doda", "ganderbal", "jammu", "kathua", "kishtwar", "kulgam", "kupwara", "poonch", "pulwama", "rajouri", "ramban", "reasi", "samba", "shopian", "srinagar", "udhampur"],
    "ladakh": ["kargil", "leh"],
    "lakshadweep": ["agatti", "amini", "andrott", "bitra", "chethlath", "kadmat", "kalpeni", "kavaratti", "kilthan", "minicoy"],
    "puducherry": ["karaikal", "mahe", "puducherry", "yanam"]
};

function populateStates() {
    const stateFilter = document.getElementById('stateFilter');
    stateFilter.innerHTML = '<option value="all">All States</option>'; // reset

    Object.keys(stateDistricts).forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        // Convert "uttar-pradesh" → "Uttar Pradesh"
        option.textContent = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        stateFilter.appendChild(option);
    });
}

// Update districts based on selected state
function updateDistricts() {
    const stateFilter = document.getElementById('stateFilter');
    const districtFilter = document.getElementById('districtFilter');

    // Clear existing options except "All Districts"
    districtFilter.innerHTML = '<option value="all">All Districts</option>';

    // Add districts for selected state
    if (stateFilter && stateFilter.value !== 'all' && stateDistricts[stateFilter.value]) {
        const districts = stateDistricts[stateFilter.value];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district.charAt(0).toUpperCase() + district.slice(1).replace('-', ' ');
            districtFilter.appendChild(option);
        });
    }
}

// Filter functionality for records page
function filterRecords() {
    // Use the enhanced filter function if authentication is available
    if (typeof filterRecordsWithRole === 'function') {
        filterRecordsWithRole();
    } else {
        // Fallback to original filtering logic
        filterRecordsOriginal();
    }
}

// Original filter function (fallback)
function filterRecordsOriginal() {
    const stateFilter = document.getElementById('stateFilter');
    const districtFilter = document.getElementById('districtFilter');
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const records = document.querySelectorAll('.record-card');

    let visibleCount = 0;

    records.forEach(record => {
        let showRecord = true;

        // Filter by state
        if (stateFilter && stateFilter.value !== 'all') {
            const recordState = record.dataset.state;
            if (recordState !== stateFilter.value) {
                showRecord = false;
            }
        }

        // Filter by district
        if (districtFilter && districtFilter.value !== 'all') {
            const recordDistrict = record.dataset.district;
            if (recordDistrict !== districtFilter.value) {
                showRecord = false;
            }
        }

        // Filter by type
        if (typeFilter && typeFilter.value !== 'all') {
            const recordType = record.dataset.type;
            if (recordType !== typeFilter.value) {
                showRecord = false;
            }
        }

        // Filter by status
        if (statusFilter && statusFilter.value !== 'all') {
            const recordStatus = record.dataset.status;
            if (recordStatus !== statusFilter.value) {
                showRecord = false;
            }
        }

        // Filter by priority
        if (priorityFilter && priorityFilter.value !== 'all') {
            const recordPriority = record.dataset.priority;
            if (recordPriority !== priorityFilter.value) {
                showRecord = false;
            }
        }

        // Filter by date (simplified)
        if (dateFilter && dateFilter.value) {
            const recordDate = new Date(record.dataset.date);
            const filterDate = new Date(dateFilter.value);
            if (recordDate < filterDate) {
                showRecord = false;
            }
        }

        // Show/hide record and mark filtered state for pagination
        if (showRecord) {
            record.style.display = 'block';
            record.dataset.filtered = '1';
            visibleCount++;
        } else {
            record.style.display = 'none';
            record.dataset.filtered = '0';
        }
    });

    // Update record count display
    const recordCountElement = document.getElementById('recordCount');
    if (recordCountElement) {
        recordCountElement.textContent = `Showing ${visibleCount} records`;
    }
    // Update pagination to reflect filters
    if (typeof updatePagination === 'function') {
        setTimeout(updatePagination, 50);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image preview for file uploads
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('imagePreview');
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    // updateDistricts();
});

// Fetch records from JSON and render on the Records page
function fetchAndRenderRecords() {
    const container = document.getElementById('recordsContainer');
    if (!container) return; // not on records page

    // show loading placeholder
    container.innerHTML = '<div class="col-12 text-center py-4">Loading records...</div>';
    // Use localStorage as primary source for records. If not present, fetch records.json and save to localStorage.
    const localKey = 'merisadak_records';
    let localRecords = [];
    try {
        localRecords = JSON.parse(localStorage.getItem(localKey) || '[]');
        if (!Array.isArray(localRecords)) localRecords = [];
    } catch (e) {
        console.warn('Invalid local records in localStorage, clearing key.');
        localRecords = [];
        localStorage.removeItem(localKey);
    }

    if (localRecords && localRecords.length) {
        // Primary: render local records
        renderRecords(localRecords);
        filterRecords();
        setTimeout(function() { if (typeof updatePagination === 'function') updatePagination(); }, 60);
        return;
    }

    // If no local records, fetch remote and store locally
    fetch('assets/data/records.json')
        .then(resp => {
            if (!resp.ok) throw new Error('Failed to load records.json');
            return resp.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Invalid records format');
            try {
                localStorage.setItem(localKey, JSON.stringify(data));
            } catch (e) {
                console.warn('Unable to save fetched records to localStorage', e);
            }
            renderRecords(data);
            filterRecords();
            setTimeout(function() { if (typeof updatePagination === 'function') updatePagination(); }, 60);
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = '<div class="col-12 text-center text-danger py-4">Unable to load records.</div>';
            showErrorMessage('Unable to load records. Please try again later.');
        });
}

function renderRecords(records) {
    const container = document.getElementById('recordsContainer');
    if (!container) return;

    container.innerHTML = '';

    records.forEach(record => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4 record-card';
        col.dataset.type = record.type || 'other';
        col.dataset.status = record.status || 'open';
        col.dataset.priority = record.priority || 'low';
        col.dataset.date = record.date || '';
        col.dataset.state = record.state || '';
        col.dataset.district = record.district || '';
        // mark as filtered by default; filter functions will update this
        col.dataset.filtered = '1';

        // Header badge text
        let badgeClass = 'badge-open';
        let badgeText = (record.status || '').replace(/-/g, ' ');
        if (record.status === 'in-progress') badgeClass = 'badge-progress';
        if (record.status === 'closed') badgeClass = 'badge-closed';

        col.innerHTML = `
            <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span class="badge ${badgeClass}">${badgeText.charAt(0).toUpperCase() + badgeText.slice(1)}</span>
                    <small class="text-muted">#${record.id}</small>
                </div>
                <div class="card-body">
                    <h6 class="card-title">${escapeHtml(record.title)}</h6>
                    <p class="card-text text-muted small">${escapeHtml(record.description)}</p>
                    <div class="mb-2">
                        <span class="badge bg-secondary me-1">${escapeHtml(formatType(record.type))}</span>
                        <span class="badge ${priorityBadgeClass(record.priority)}">${escapeHtml(formatPriority(record.priority))}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted"><i class="fas fa-map-marker-alt me-1"></i>${escapeHtml(formatDistrict(record.district))}${record.state ? ', ' + escapeHtml(formatState(record.state)) : ''}</small>
                        <small class="text-muted">${formatDate(record.date)}</small>
                    </div>
                    <div class="mt-1 d-flex justify-content-between align-items-center">
                        <small class="text-muted">${escapeHtml(record.location || '')}</small>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// Helpers
function formatDate(d) {
    if (!d) return '';
    try {
        const dt = new Date(d);
        return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return d;
    }
}

function formatType(t) {
    if (!t) return '';
    return t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatPriority(p) {
    if (!p) return '';
    return p.charAt(0).toUpperCase() + p.slice(1);
}

function priorityBadgeClass(p) {
    if (!p) return 'bg-secondary';
    if (p === 'urgent' || p === 'high') return 'bg-danger';
    if (p === 'medium') return 'bg-warning';
    if (p === 'low') return 'bg-info';
    return 'bg-secondary';
}

function formatState(stateKey) {
    if (!stateKey) return '';
    return stateKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDistrict(districtKey) {
    if (!districtKey) return '';
    return districtKey.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Very small HTML escape helper to avoid HTML injection when rendering JSON
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// If on records page, fetch and render records after initial state population
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderRecords();
});

// --- Pagination (client-side) ---
let recordsPerPage = 9;
let currentPage = 1;

function updatePagination() {
    const allCards = Array.from(document.querySelectorAll('.record-card'));
    if (!allCards.length) return;
    // Determine currently filtered cards (set by filter functions)
    // Fallback to computed style if dataset.filtered not present
    const visibleCards = allCards.filter(card => {
        if (typeof card.dataset.filtered !== 'undefined') {
            return card.dataset.filtered === '1';
        }
        return window.getComputedStyle(card).display !== 'none';
    });
    const total = visibleCards.length;
    const totalPages = Math.max(1, Math.ceil(total / recordsPerPage));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // Hide all cards first
    allCards.forEach(card => card.style.display = 'none');

    // Show only current page items
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const pageItems = visibleCards.slice(start, end);
    pageItems.forEach(card => card.style.display = 'block');

    // Update record count
    const recordCountElement = document.getElementById('recordCount');
    if (recordCountElement) {
        recordCountElement.textContent = `Showing ${total} records`;
    }

    renderPaginationControls(totalPages, currentPage);
}

function renderPaginationControls(totalPages, activePage) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;

    // Build simple pagination (limit page buttons to reasonable amount)
    const maxButtons = 9;
    let start = 1;
    let end = totalPages;
    if (totalPages > maxButtons) {
        const side = Math.floor(maxButtons / 2);
        start = Math.max(1, activePage - side);
        end = Math.min(totalPages, start + maxButtons - 1);
        if (end - start < maxButtons - 1) {
            start = Math.max(1, end - maxButtons + 1);
        }
    }

    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center';

    // Prev
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item' + (activePage === 1 ? ' disabled' : '');
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    prevLi.addEventListener('click', (e) => { e.preventDefault(); if (activePage > 1) { currentPage = activePage - 1; updatePagination(); } });
    ul.appendChild(prevLi);

    for (let i = start; i <= end; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === activePage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', (e) => { e.preventDefault(); currentPage = i; updatePagination(); });
        ul.appendChild(li);
    }

    // Next
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item' + (activePage === totalPages ? ' disabled' : '');
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    nextLi.addEventListener('click', (e) => { e.preventDefault(); if (activePage < totalPages) { currentPage = activePage + 1; updatePagination(); } });
    ul.appendChild(nextLi);

    // Replace container content
    container.innerHTML = '';
    container.appendChild(ul);
}

// Ensure pagination updates after filters change
document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('change', () => {
            currentPage = 1;
            // allow existing filterRecords() to run first (inline onchange may run), then update pagination
            setTimeout(updatePagination, 50);
        });
    }
});