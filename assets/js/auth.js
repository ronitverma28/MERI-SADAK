// Authentication and Role-Based Access Control System
// MERI SADAK - Road Management System

// Role constants
const ROLES = {
    CENTRAL_GOVERNMENT: 'central-government',
    STATE_GOVERNMENT: 'state-government', 
    USER: 'user'
};

// Demo credentials for testing
const DEMO_CREDENTIALS = {
    'central@rms.com': {
        password: 'central123',
        role: ROLES.CENTRAL_GOVERNMENT,
        name: 'Central Government Admin',
        state: null
    },
    'state@rms.com': {
        password: 'state123',
        role: ROLES.STATE_GOVERNMENT,
        name: 'State Government Officer',
        state: 'Rajasthan' // Demo state for State Government
    },
    'user@rms.com': {
        password: 'user123',
        role: ROLES.USER,
        name: 'Public User',
        state: null
    }
};

// Authentication state
let currentUser = null;
let currentRole = null;
let userState = null; // For state government users

// Initialize authentication system
function initAuth() {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('meriSadakUser');
    const storedRole = localStorage.getItem('meriSadakRole');
    const storedState = localStorage.getItem('meriSadakUserState');
    
    if (storedUser && storedRole) {
        currentUser = JSON.parse(storedUser);
        currentRole = storedRole;
        userState = storedState;
        
        // Update UI based on authentication status
        updateNavigationForAuth();
        updateRecordsAccess();
    }
}

// Login function with credential validation
function loginUser(email, password) {
    // Validate credentials
    if (!DEMO_CREDENTIALS[email]) {
        showErrorMessage('Invalid email address.');
        return false;
    }
    
    const credentials = DEMO_CREDENTIALS[email];
    if (credentials.password !== password) {
        showErrorMessage('Invalid password.');
        return false;
    }
    
    // Create user data
    const userData = {
        email: email,
        name: credentials.name,
        loginTime: new Date().toISOString()
    };
    
    // Store user data
    currentUser = userData;
    currentRole = credentials.role;
    userState = credentials.state;
    
    // Persist to localStorage
    localStorage.setItem('meriSadakUser', JSON.stringify(userData));
    localStorage.setItem('meriSadakRole', credentials.role);
    if (credentials.state) {
        localStorage.setItem('meriSadakUserState', credentials.state);
    }
    
    // Update UI
    updateNavigationForAuth();
    updateRecordsAccess();
    
    // Show success message
    showSuccessMessage(`Welcome back, ${credentials.name}!`);
    
    // Redirect to appropriate page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    return true;
}

// Legacy login function for backward compatibility
function loginUserLegacy(userData, role, state = null) {
    // Store user data
    currentUser = userData;
    currentRole = role;
    userState = state;
    
    // Persist to localStorage
    localStorage.setItem('meriSadakUser', JSON.stringify(userData));
    localStorage.setItem('meriSadakRole', role);
    if (state) {
        localStorage.setItem('meriSadakUserState', state);
    }
    
    // Update UI
    updateNavigationForAuth();
    updateRecordsAccess();
    
    // Show success message
    showSuccessMessage(`Welcome back, ${userData.name || userData.email}!`);
    
    // Redirect to appropriate page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Logout function
function logoutUser() {
    // Clear stored data
    localStorage.removeItem('meriSadakUser');
    localStorage.removeItem('meriSadakRole');
    localStorage.removeItem('meriSadakUserState');
    
    // Clear current session
    currentUser = null;
    currentRole = null;
    userState = null;
    
    // Update UI
    updateNavigationForAuth();
    updateRecordsAccess();
    
    // Show logout message
    showSuccessMessage('You have been logged out successfully.');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Check if user is authenticated
function isAuthenticated() {
    return currentUser !== null && currentRole !== null;
}

// Get current user role
function getCurrentRole() {
    return currentRole;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Get user's state (for state government users)
function getUserState() {
    return userState;
}

// Check if user has access to records
function hasRecordsAccess() {
    return isAuthenticated();
}

// Check if user can see all states
function canSeeAllStates() {
    return currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.USER;
}

// Check if user can see specific state
function canSeeState(stateName) {
    if (currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.USER) {
        return true;
    }
    
    if (currentRole === ROLES.STATE_GOVERNMENT) {
        return userState && userState.toLowerCase() === stateName.toLowerCase();
    }
    
    return false;
}

// Check if user can add new projects
function canAddProjects() {
    return currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.STATE_GOVERNMENT;
}

// Check if user can upload data
function canUploadData() {
    return currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.STATE_GOVERNMENT;
}

// Check if user can download reports
function canDownloadReports() {
    return currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.STATE_GOVERNMENT;
}

// Check if user can schedule audits
function canScheduleAudits() {
    return currentRole === ROLES.CENTRAL_GOVERNMENT || currentRole === ROLES.STATE_GOVERNMENT;
}

// Check if user can view records
function canViewRecords() {
    return isAuthenticated();
}

// Update navigation based on authentication status
function updateNavigationForAuth() {
    const recordsLink = document.querySelector('a[href="records.html"]');
    const loginButton = document.querySelector('a[href="login.html"]');
    const signupButton = document.querySelector('a[href="signup.html"]');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (isAuthenticated()) {
        // Hide login/signup buttons
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
        
        // Show/hide records link based on authentication
        if (recordsLink) {
            recordsLink.style.display = 'block';
        }
        
        // Add logout button
        addLogoutButton();
    } else {
        // Show login/signup buttons
        if (loginButton) loginButton.style.display = 'inline-block';
        if (signupButton) signupButton.style.display = 'inline-block';
        
        // Hide records link
        if (recordsLink) {
            recordsLink.style.display = 'none';
        }
        
        // Remove logout button if exists
        removeLogoutButton();
    }
}

// Add logout button to navigation
function addLogoutButton() {
    // Check if logout button already exists
    if (document.querySelector('.logout-btn')) return;
    
    const dFlex = document.querySelector('.d-flex');
    
    if (dFlex) {
        // Create logout button
        const logoutBtn = document.createElement('a');
        logoutBtn.href = '#';
        logoutBtn.className = 'btn btn-outline-danger logout-btn';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt me-1"></i>Logout';
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            logoutUser();
        };
        
        // Replace the content with logout button
        dFlex.innerHTML = '';
        dFlex.appendChild(logoutBtn);
    }
}

// Remove logout button from navigation
function removeLogoutButton() {
    const logoutBtn = document.querySelector('.logout-btn');
    const dFlex = document.querySelector('.d-flex');
    
    if (logoutBtn) {
        logoutBtn.remove();
    }
    
    // Restore original login/signup buttons
    if (dFlex) {
        dFlex.innerHTML = `
            <a href="login.html" class="btn btn-outline-primary me-2">Login</a>
            <a href="signup.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}

// Update records access and filtering
function updateRecordsAccess() {
    // This will be called when records page loads
    if (window.location.pathname.includes('records.html')) {
        applyRoleBasedFiltering();
        applyRoleBasedFeatureControl();
    }
}

// Apply role-based feature control to Records page
function applyRoleBasedFeatureControl() {
    if (!isAuthenticated()) return;
    
    // Control "New Project" button
    const newProjectBtn = document.querySelector('[data-feature="new-project"]');
    if (newProjectBtn) {
        if (canAddProjects()) {
            newProjectBtn.style.display = 'block';
            newProjectBtn.disabled = false;
        } else {
            newProjectBtn.style.display = 'none';
        }
    }
    
    // Control "Upload Data" button
    const uploadDataBtn = document.querySelector('[data-feature="upload-data"]');
    if (uploadDataBtn) {
        if (canUploadData()) {
            uploadDataBtn.style.display = 'block';
            uploadDataBtn.disabled = false;
        } else {
            uploadDataBtn.style.display = 'none';
        }
    }
    
    // Control "Download Report" button
    const downloadReportBtn = document.querySelector('[data-feature="download-report"]');
    if (downloadReportBtn) {
        if (canDownloadReports()) {
            downloadReportBtn.style.display = 'block';
            downloadReportBtn.disabled = false;
        } else {
            downloadReportBtn.style.display = 'none';
        }
    }
    
    // Control "Schedule Audit" button
    const scheduleAuditBtn = document.querySelector('[data-feature="schedule-audit"]');
    if (scheduleAuditBtn) {
        if (canScheduleAudits()) {
            scheduleAuditBtn.style.display = 'block';
            scheduleAuditBtn.disabled = false;
        } else {
            scheduleAuditBtn.style.display = 'none';
        }
    }
}

// Apply role-based filtering to records
function applyRoleBasedFiltering() {
    if (!isAuthenticated()) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    const records = document.querySelectorAll('.record-card');
    const stateFilter = document.getElementById('stateFilter');
    
    // Update state filter based on role
    if (stateFilter) {
        updateStateFilterForRole();
    }
    
    // Filter records based on role
    records.forEach(record => {
        const recordState = record.dataset.state;
        let shouldShow = true;
        
        if (currentRole === ROLES.STATE_GOVERNMENT) {
            // State government can only see their state's records
            shouldShow = canSeeState(recordState);
        }
        // Central Government and User can see all records (no filtering needed)
        
        if (shouldShow) {
            record.style.display = 'block';
            record.dataset.filtered = '1';
        } else {
            record.style.display = 'none';
            record.dataset.filtered = '0';
        }
    });
    
    // Update record count
    updateRecordCount();
    // Update pagination to reflect role-based filtering
    if (typeof updatePagination === 'function') {
        setTimeout(updatePagination, 50);
    }
}

// Update state filter dropdown based on user role
function updateStateFilterForRole() {
    const stateFilter = document.getElementById('stateFilter');
    if (!stateFilter) return;
    
    // Clear existing options
    stateFilter.innerHTML = '<option value="all">All States</option>';
    
    if (currentRole === ROLES.STATE_GOVERNMENT && userState) {
        // State government can only see their state
        const option = document.createElement('option');
        option.value = userState.toLowerCase().replace(/\s+/g, '-');
        option.textContent = userState;
        option.selected = true;
        stateFilter.appendChild(option);
        
        // Disable the filter since they can only see one state
        stateFilter.disabled = true;
    } else {
        // Central Government and User can see all states
        populateStates();
        stateFilter.disabled = false;
    }
}

// Update record count display
function updateRecordCount() {
    const allCards = Array.from(document.querySelectorAll('.record-card'));
    let count = 0;
    if (allCards.length) {
        // Prefer dataset.filtered if present
        allCards.forEach(c => {
            if (typeof c.dataset.filtered !== 'undefined') {
                if (c.dataset.filtered === '1') count++;
            } else {
                if (window.getComputedStyle(c).display !== 'none') count++;
            }
        });
    }

    const recordCountElement = document.getElementById('recordCount');
    if (recordCountElement) {
        recordCountElement.textContent = `Showing ${count} records`;
    }
}

// Enhanced filter function that respects role-based access
function filterRecordsWithRole() {
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

        // Role-based filtering (highest priority)
        if (currentRole === ROLES.STATE_GOVERNMENT) {
            const recordState = record.dataset.state;
            if (!canSeeState(recordState)) {
                showRecord = false;
            }
        }

        // Apply other filters only if record passes role check
        if (showRecord) {
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

            // Filter by date
            if (dateFilter && dateFilter.value) {
                const recordDate = new Date(record.dataset.date);
                const filterDate = new Date(dateFilter.value);
                if (recordDate < filterDate) {
                    showRecord = false;
                }
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
    // Update pagination to reflect the new filtered set
    if (typeof updatePagination === 'function') {
        setTimeout(updatePagination, 50);
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    
    // Override the original filterRecords function
    if (typeof filterRecords === 'function') {
        window.filterRecords = filterRecordsWithRole;
    }
});

// Export functions for global access
window.loginUser = loginUser;
window.loginUserLegacy = loginUserLegacy;
window.logoutUser = logoutUser;
window.isAuthenticated = isAuthenticated;
window.getCurrentRole = getCurrentRole;
window.getCurrentUser = getCurrentUser;
window.getUserState = getUserState;
window.hasRecordsAccess = hasRecordsAccess;
window.canSeeAllStates = canSeeAllStates;
window.canSeeState = canSeeState;
window.canAddProjects = canAddProjects;
window.canUploadData = canUploadData;
window.canDownloadReports = canDownloadReports;
window.canScheduleAudits = canScheduleAudits;
window.canViewRecords = canViewRecords;
window.updateRecordsAccess = updateRecordsAccess;
window.applyRoleBasedFiltering = applyRoleBasedFiltering;
window.applyRoleBasedFeatureControl = applyRoleBasedFeatureControl;
window.filterRecordsWithRole = filterRecordsWithRole;
