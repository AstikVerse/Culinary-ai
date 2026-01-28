
export interface Ingredient {
  name: string;
  quantity: string;
  isAvailable: boolean; // True if seen in fridge, false if needs to be bought
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string; // e.g., "15 mins"
  calories: number;
  ingredients: Ingredient[];
  instructions: string[]; // Step-by-step
  dietaryTags: string[]; // e.g., ["Vegetarian", "Keto"]
  cuisine?: string;
  youtubeQuery?: string; // Optimized search query for video guides
  beveragePairing?: {
    name: string;
    description: string;
  };
  chefsSecret?: string; // A pro tip for this specific dish
}

export type Language = "English" | "Hindi" | "Spanish" | "French" | "German";
export type Cuisine = "Global" | "Indian" | "Italian" | "Mexican" | "Asian" | "American" | "Mediterranean" | "Spanish";
export type MealType = "Any" | "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface ChefProfile {
  id: string;
  name: string;
  email: string; // Added for Admin
  mobile: string; // Added for Admin
  specialty: string;
  rating: number;
  reviews: number;
  price: string;
  hourlyRate: number;
  image: string;
  badges: string[];
  joinedDate: string;
  status: 'Active' | 'Suspended'; // Added for Admin control
}

export interface ChefApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string; // simulated
  specialty: string;
  yearsExperience: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  resumeData?: string; // Base64 string of the file
  resumeName?: string; // Original filename
}

export interface ChefBookingRequest {
  id: string;
  clientName: string;
  clientEmail?: string; // Added for Admin
  chefName?: string; // Added for Admin
  eventType?: string; // Added for Admin
  date: string;
  hours: number;
  guests: number;
  totalPayout: number;
  commission?: number; // Added for Admin
  status: 'pending' | 'confirmed' | 'completed' | 'declined' | 'cancelled';
  paymentStatus?: 'Paid' | 'Pending' | 'Refunded' | 'Failed'; // Added for Admin
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  scans: number;
  recipesGenerated: number;
  groceryPurchases: number;
  bookings: number;
  cuisine: string;
  diet: string[];
  lastActive: string;
  status: 'Active' | 'Blocked';
}

export interface Transaction {
  id: string;
  type: 'Booking Commission' | 'Grocery Affiliate' | 'Chef Payout' | 'Refund';
  party: string; 
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Payout {
  id: string;
  chefName: string;
  amount: number;
  lastPayoutDate: string;
  status: 'Pending' | 'Completed';
}

export interface AppSettings {
  appName: string;
  maintenanceMode: boolean;
  modelName: string;
  temperature: number;
  maxTokens: number;
  commissionRate: number;
  affiliatePartner: string;
  chefCommission: number;
  autoApproveChefs: boolean;
  notifications: boolean;
  emailAlerts: boolean;
}

export interface AppState {
  isLoggedIn: boolean;
  userRole: 'user' | 'admin' | 'chef'; // NEW: Track who is logged in
  username?: string;
  showChat: boolean;
  
  // Views updated to include specific chef dashboard
  view: 'upload' | 'dashboard' | 'cooking' | 'shopping' | 'favorites' | 'chef-booking' | 'admin-dashboard' | 'chef-partner-dashboard';
  
  // Navigation for Chef Dashboard
  chefDashboardTab: 'dashboard' | 'bookings' | 'earnings' | 'profile' | 'availability' | 'settings';

  analyzing: boolean;
  recipes: Recipe[];
  favorites: Recipe[];
  selectedRecipe: Recipe | null;
  shoppingList: Ingredient[];
  dietaryFilters: string[]; 
  lastImage: string | null;
  lastImageMimeType: string | null;
  
  // Search
  searchQuery: string;

  // Preferences
  language: Language;
  cuisine: Cuisine;
  mealType: MealType;
  
  // Chat
  chatHistory: ChatMessage[];

  // Chef Platform Data
  chefs: ChefProfile[];
  chefApplications: ChefApplication[];
  
  // Admin & Chef Partner Data
  chefBookings: ChefBookingRequest[];
  users: User[];
  transactions: Transaction[];
  payouts: Payout[];
  
  // Global Settings
  appSettings: AppSettings;
}

export interface DietaryFilterOption {
  id: string;
  label: string;
  description: string;
}

export const AVAILABLE_FILTERS: DietaryFilterOption[] = [
  { id: "Non-Vegetarian", label: "🍖 Non-Veg", description: "Includes meat" },
  { id: "Vegetarian", label: "🥦 Veg", description: "No meat" },
  { id: "Vegan", label: "🌱 Vegan", description: "Plant-based only" },
  { id: "Gluten-Free", label: "🌾 GF", description: "No wheat" },
];
