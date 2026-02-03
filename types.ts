
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
  email: string; 
  mobile: string; 
  speciality: string; 
  rating: number;
  reviews: number;
  price: number; 
  hourlyRate: number;
  image: string;
  badges: string[];
  joinedDate: string;
  status: 'Active' | 'Suspended';
}

export interface ChefApplication {
  id: string;
  userId?: string; 
  firstName: string;
  lastName: string;
  email: string; 
  specialty: string;
  yearsExperience: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  resumeData?: string; 
  resumeName?: string; 
}

export interface ChefBookingRequest {
  id: string;
  clientName: string;
  clientEmail?: string; 
  chefName?: string; 
  eventType?: string; 
  date: string;
  hours: number;
  guests: number;
  totalPayout: number;
  commission?: number; 
  status: 'pending' | 'confirmed' | 'completed' | 'declined' | 'cancelled';
  paymentStatus?: 'Paid' | 'Pending' | 'Refunded' | 'Failed'; 
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
  role: 'user' | 'admin' | 'chef';
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
  userRole: 'user' | 'admin' | 'chef'; 
  username?: string;
  userId?: string;
  showChat: boolean;
  view: 'upload' | 'dashboard' | 'cooking' | 'shopping' | 'favorites' | 'chef-booking' | 'admin-dashboard' | 'chef-partner-dashboard';
  chefDashboardTab: 'dashboard' | 'bookings' | 'earnings' | 'profile' | 'availability' | 'settings';
  analyzing: boolean;
  recipes: Recipe[];
  favorites: Recipe[];
  selectedRecipe: Recipe | null;
  shoppingList: Ingredient[];
  dietaryFilters: string[]; 
  lastImage: string | null;
  lastImageMimeType: string | null;
  searchQuery: string;
  language: Language;
  cuisine: Cuisine;
  mealType: MealType;
  chatHistory: ChatMessage[];
  chefs: ChefProfile[];
  chefApplications: ChefApplication[];
  chefBookings: ChefBookingRequest[];
  users: User[];
  transactions: Transaction[];
  payouts: Payout[];
  appSettings: AppSettings;
}

export interface Feedback {
    id?: string;
    userId: string;
    username: string;
    rating: number;
    accuracyScore: number;
    comment: string;
    timestamp: string;
    scanId?: string;
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
