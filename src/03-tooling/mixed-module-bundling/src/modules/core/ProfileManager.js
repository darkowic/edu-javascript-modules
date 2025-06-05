// ES Module - Core Profile Manager
import { validateEmail, validateName, validateAge } from '../validation/userValidator';
import { formatName, formatDate } from '../formatting/textFormatter';
import { generateId, deepClone } from '../utils/helpers';

// Profile Manager class
export class ProfileManager {
  constructor() {
    this.profiles = [];
    this.name = "Profile Manager (ES Module)";
  }

  // Create a new user profile
  createProfile(userData) {
    // Validate user data using CommonJS validator
    if (!validateName(userData.name)) {
      throw new Error('Invalid name format');
    }
    
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!validateAge(userData.age)) {
      throw new Error('Invalid age');
    }
    
    // Format data using UMD formatter
    const formattedName = formatName(userData.name);
    const formattedJoinDate = formatDate(userData.joinDate || new Date());
    
    // Create profile with utility functions from ES Module
    const profile = {
      id: generateId(),
      name: formattedName,
      email: userData.email.toLowerCase(),
      age: userData.age,
      joinDate: formattedJoinDate,
      createdAt: new Date()
    };
    
    this.profiles.push(profile);
    return deepClone(profile); // Return a clone to prevent direct mutation
  }
  
  // Get a profile by ID
  getProfile(id) {
    const profile = this.profiles.find(p => p.id === id);
    return profile ? deepClone(profile) : null;
  }
  
  // Get all profiles
  getAllProfiles() {
    return deepClone(this.profiles);
  }
  
  // Update a profile
  updateProfile(id, updates) {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedProfile = { ...this.profiles[index] };
    
    // Validate and update fields
    if (updates.name !== undefined) {
      if (!validateName(updates.name)) {
        throw new Error('Invalid name format');
      }
      updatedProfile.name = formatName(updates.name);
    }
    
    if (updates.email !== undefined) {
      if (!validateEmail(updates.email)) {
        throw new Error('Invalid email format');
      }
      updatedProfile.email = updates.email.toLowerCase();
    }
    
    if (updates.age !== undefined) {
      if (!validateAge(updates.age)) {
        throw new Error('Invalid age');
      }
      updatedProfile.age = updates.age;
    }
    
    this.profiles[index] = updatedProfile;
    return deepClone(updatedProfile);
  }
  
  // Delete a profile
  deleteProfile(id) {
    const index = this.profiles.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.profiles.splice(index, 1);
    return true;
  }
}

// Default export
export default ProfileManager;
