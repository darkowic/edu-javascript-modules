// Import the main ProfileManager (ES Module)
import ProfileManager from './modules/core/ProfileManager';

// Import individual modules directly to show their types
// These are already used by ProfileManager internally
import userValidator from './modules/validation/userValidator'; // CommonJS
import textFormatter from './modules/formatting/textFormatter'; // UMD
import helpers from './modules/utils/helpers'; // AMD

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Create an instance of our ProfileManager
  const profileManager = new ProfileManager();
  
  // DOM elements
  const profileForm = document.getElementById('profile-form');
  const profilesList = document.getElementById('profiles-list');
  const moduleInfo = document.getElementById('module-info');
  
  // Display module information
  moduleInfo.innerHTML = `
    <h3>Module Information</h3>
    <ul>
      <li><strong>Core:</strong> ${profileManager.name}</li>
      <li><strong>Validation:</strong> ${userValidator.name}</li>
      <li><strong>Formatting:</strong> ${textFormatter.name}</li>
      <li><strong>Utils:</strong> ${helpers.name}</li>
    </ul>
    <p>All these modules are imported and used together to create a single application!</p>
  `;
  
  // Sample data for demonstration
  const sampleProfiles = [
    { name: 'john doe', email: 'john@example.com', age: 32, joinDate: '2023-01-15' },
    { name: 'JANE SMITH', email: 'jane@example.com', age: 28, joinDate: '2023-03-22' },
    { name: 'robert johnson', email: 'robert@example.com', age: 45, joinDate: '2022-11-05' }
  ];
  
  // Create sample profiles
  const createdProfiles = sampleProfiles.map(profile => {
    try {
      return profileManager.createProfile(profile);
    } catch (error) {
      console.error(`Error creating profile: ${error.message}`);
      return null;
    }
  }).filter(Boolean);

  // Function to render profiles
  const renderProfiles = () => {
    const profiles = profileManager.getAllProfiles();
    
    profilesList.innerHTML = '';
    
    if (profiles.length === 0) {
      profilesList.innerHTML = '<p>No profiles available.</p>';
      return;
    }
    
    profiles.forEach(profile => {
      const profileCard = document.createElement('div');
      profileCard.className = 'profile-card';
      profileCard.innerHTML = `
        <h3>${profile.name}</h3>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Age:</strong> ${profile.age}</p>
        <p><strong>Joined:</strong> ${profile.joinDate}</p>
        <div class="profile-actions">
          <button class="edit-btn" data-id="${profile.id}">Edit</button>
          <button class="delete-btn" data-id="${profile.id}">Delete</button>
        </div>
      `;
      profilesList.appendChild(profileCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const profile = profileManager.getProfile(id);
        
        if (profile) {
          document.getElementById('profile-id').value = profile.id;
          document.getElementById('name').value = profile.name;
          document.getElementById('email').value = profile.email;
          document.getElementById('age').value = profile.age;
          document.getElementById('submit-btn').textContent = 'Update Profile';
        }
      });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this profile?')) {
          profileManager.deleteProfile(id);
          renderProfiles();
        }
      });
    });
  };
  
  // Handle form submission with debounce (from AMD module)
  const handleSubmit = helpers.debounce(function(event) {
    event.preventDefault();
    
    const profileId = document.getElementById('profile-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = parseInt(document.getElementById('age').value, 10);
    
    try {
      if (profileId) {
        // Update existing profile
        profileManager.updateProfile(profileId, { name, email, age });
      } else {
        // Create new profile
        profileManager.createProfile({ name, email, age });
      }
      
      // Reset form
      profileForm.reset();
      document.getElementById('profile-id').value = '';
      document.getElementById('submit-btn').textContent = 'Create Profile';
      
      // Update UI
      renderProfiles();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }, 300);
  
  // Add form submit event listener
  profileForm.addEventListener('submit', handleSubmit);
  
  // Initial render
  renderProfiles();
  
  // Add module interaction examples
  document.getElementById('module-examples').innerHTML = `
    <h3>Module Interaction Examples</h3>
    <div class="example">
      <h4>Validation (CommonJS)</h4>
      <p>Email validation: test@example.com is ${userValidator.validateEmail('test@example.com') ? 'valid' : 'invalid'}</p>
      <p>Email validation: invalid-email is ${userValidator.validateEmail('invalid-email') ? 'valid' : 'invalid'}</p>
    </div>
    
    <div class="example">
      <h4>Formatting (UMD)</h4>
      <p>Name formatting: "john doe" → "${textFormatter.formatName('john doe')}"</p>
      <p>Date formatting: Today → "${textFormatter.formatDate(new Date())}"</p>
    </div>
    
    <div class="example">
      <h4>Utilities (AMD)</h4>
      <p>Generated ID: ${helpers.generateId()}</p>
    </div>
  `;
});
