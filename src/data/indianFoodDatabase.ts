// Comprehensive Indian Food Nutrition Database
// All values are approximate and based on standard serving sizes

export const indianFoodDatabase = [
    // ==================== STAPLES & GRAINS ====================
    { name: "Rice (Cooked White)", unit: "cup", calories: 205, protein: 4.3, carbs: 44.5, fat: 0.4 },
    { name: "Rice (Cooked Brown)", unit: "cup", calories: 218, protein: 5, carbs: 46, fat: 1.6 },
    { name: "Jeera Rice", unit: "cup", calories: 230, protein: 4.5, carbs: 45, fat: 4 },
    { name: "Roti / Chapati", unit: "piece", calories: 104, protein: 3.1, carbs: 17, fat: 3.7 },
    { name: "Paratha (Plain)", unit: "piece", calories: 210, protein: 4, carbs: 26, fat: 10 },
    { name: "Aloo Paratha", unit: "piece", calories: 290, protein: 6, carbs: 38, fat: 13 },
    { name: "Gobi Paratha", unit: "piece", calories: 250, protein: 5, carbs: 32, fat: 11 },
    { name: "Paneer Paratha", unit: "piece", calories: 320, protein: 12, carbs: 35, fat: 15 },
    { name: "Naan", unit: "piece", calories: 262, protein: 9, carbs: 45, fat: 5 },
    { name: "Garlic Naan", unit: "piece", calories: 280, protein: 9, carbs: 46, fat: 6 },
    { name: "Butter Naan", unit: "piece", calories: 310, protein: 9, carbs: 45, fat: 10 },
    { name: "Puri", unit: "piece", calories: 112, protein: 2, carbs: 13, fat: 6 },
    { name: "Bhatura", unit: "piece", calories: 250, protein: 5, carbs: 30, fat: 12 },
    { name: "Kulcha", unit: "piece", calories: 200, protein: 5, carbs: 35, fat: 4 },

    // ==================== RICE DISHES ====================
    { name: "Biryani (Chicken)", unit: "cup", calories: 290, protein: 18, carbs: 38, fat: 8 },
    { name: "Biryani (Mutton)", unit: "cup", calories: 310, protein: 20, carbs: 38, fat: 10 },
    { name: "Biryani (Veg)", unit: "cup", calories: 220, protein: 6, carbs: 42, fat: 5 },
    { name: "Pulao (Veg)", unit: "cup", calories: 195, protein: 4, carbs: 35, fat: 4 },
    { name: "Khichdi", unit: "cup", calories: 168, protein: 6, carbs: 30, fat: 3 },
    { name: "Curd Rice", unit: "cup", calories: 180, protein: 5, carbs: 32, fat: 4 },
    { name: "Lemon Rice", unit: "cup", calories: 210, protein: 4, carbs: 40, fat: 5 },
    { name: "Tamarind Rice", unit: "cup", calories: 225, protein: 4, carbs: 42, fat: 6 },

    // ==================== DALS & LENTILS ====================
    { name: "Dal (Cooked)", unit: "cup", calories: 198, protein: 12, carbs: 28, fat: 4 },
    { name: "Dal Tadka", unit: "cup", calories: 215, protein: 12, carbs: 28, fat: 7 },
    { name: "Dal Makhani", unit: "cup", calories: 280, protein: 14, carbs: 30, fat: 12 },
    { name: "Dal Fry", unit: "cup", calories: 220, protein: 12, carbs: 28, fat: 8 },
    { name: "Moong Dal", unit: "cup", calories: 190, protein: 11, carbs: 26, fat: 4 },
    { name: "Masoor Dal", unit: "cup", calories: 200, protein: 13, carbs: 27, fat: 4 },
    { name: "Toor Dal", unit: "cup", calories: 195, protein: 12, carbs: 26, fat: 4 },
    { name: "Sambar", unit: "cup", calories: 120, protein: 6, carbs: 18, fat: 3 },
    { name: "Rajma", unit: "cup", calories: 225, protein: 15, carbs: 40, fat: 1 },
    { name: "Chole / Chana Masala", unit: "cup", calories: 240, protein: 12, carbs: 35, fat: 7 },

    // ==================== VEGETABLE CURRIES ====================
    { name: "Aloo Gobi", unit: "cup", calories: 140, protein: 3, carbs: 22, fat: 5 },
    { name: "Aloo Matar", unit: "cup", calories: 160, protein: 4, carbs: 24, fat: 6 },
    { name: "Baingan Bharta", unit: "cup", calories: 135, protein: 3, carbs: 18, fat: 6 },
    { name: "Bhindi Masala", unit: "cup", calories: 95, protein: 2, carbs: 12, fat: 5 },
    { name: "Mix Veg Curry", unit: "cup", calories: 150, protein: 4, carbs: 20, fat: 6 },
    { name: "Matar Paneer", unit: "cup", calories: 290, protein: 14, carbs: 16, fat: 20 },
    { name: "Shahi Paneer", unit: "cup", calories: 340, protein: 15, carbs: 18, fat: 24 },
    { name: "Kadai Paneer", unit: "cup", calories: 310, protein: 15, carbs: 14, fat: 22 },
    { name: "Paneer Butter Masala", unit: "cup", calories: 350, protein: 16, carbs: 15, fat: 26 },
    { name: "Palak Paneer", unit: "cup", calories: 280, protein: 14, carbs: 12, fat: 20 },
    { name: "Paneer Tikka Masala", unit: "cup", calories: 330, protein: 16, carbs: 14, fat: 24 },

    // ==================== NON-VEG CURRIES ====================
    { name: "Chicken Curry", unit: "cup", calories: 243, protein: 22, carbs: 8, fat: 14 },
    { name: "Butter Chicken", unit: "cup", calories: 320, protein: 24, carbs: 12, fat: 20 },
    { name: "Chicken Tikka Masala", unit: "cup", calories: 300, protein: 26, carbs: 10, fat: 18 },
    { name: "Kadai Chicken", unit: "cup", calories: 280, protein: 24, carbs: 9, fat: 16 },
    { name: "Chicken Korma", unit: "cup", calories: 310, protein: 22, carbs: 14, fat: 19 },
    { name: "Chicken Vindaloo", unit: "cup", calories: 270, protein: 23, carbs: 10, fat: 15 },
    { name: "Mutton Curry", unit: "cup", calories: 290, protein: 20, carbs: 8, fat: 20 },
    { name: "Mutton Rogan Josh", unit: "cup", calories: 310, protein: 22, carbs: 10, fat: 21 },
    { name: "Fish Curry", unit: "cup", calories: 200, protein: 20, carbs: 8, fat: 10 },
    { name: "Prawn Curry", unit: "cup", calories: 180, protein: 22, carbs: 6, fat: 8 },
    { name: "Egg Curry", unit: "serving", calories: 210, protein: 14, carbs: 8, fat: 14 },

    // ==================== TANDOORI & GRILLED ====================
    { name: "Chicken Tikka", unit: "100g", calories: 150, protein: 25, carbs: 2, fat: 5 },
    { name: "Tandoori Chicken", unit: "piece", calories: 180, protein: 28, carbs: 3, fat: 6 },
    { name: "Chicken Malai Tikka", unit: "100g", calories: 200, protein: 22, carbs: 3, fat: 11 },
    { name: "Paneer Tikka", unit: "100g", calories: 220, protein: 16, carbs: 4, fat: 16 },
    { name: "Seekh Kebab", unit: "piece", calories: 180, protein: 15, carbs: 3, fat: 12 },
    { name: "Tandoori Roti", unit: "piece", calories: 120, protein: 3.5, carbs: 20, fat: 3 },

    // ==================== SOUTH INDIAN ====================
    { name: "Idli", unit: "piece", calories: 39, protein: 2, carbs: 8, fat: 0.1 },
    { name: "Dosa (Plain)", unit: "piece", calories: 133, protein: 4, carbs: 23, fat: 3 },
    { name: "Masala Dosa", unit: "piece", calories: 220, protein: 6, carbs: 35, fat: 6 },
    { name: "Rava Dosa", unit: "piece", calories: 180, protein: 5, carbs: 28, fat: 5 },
    { name: "Uttapam", unit: "piece", calories: 180, protein: 5, carbs: 30, fat: 4 },
    { name: "Vada (Medu)", unit: "piece", calories: 90, protein: 3, carbs: 10, fat: 4 },
    { name: "Upma", unit: "cup", calories: 190, protein: 4, carbs: 32, fat: 5 },
    { name: "Pongal", unit: "cup", calories: 210, protein: 6, carbs: 35, fat: 6 },
    { name: "Rasam", unit: "cup", calories: 45, protein: 1, carbs: 8, fat: 1 },
    { name: "Appam", unit: "piece", calories: 120, protein: 2, carbs: 24, fat: 2 },
    { name: "Puttu", unit: "cup", calories: 130, protein: 3, carbs: 27, fat: 1 },

    // ==================== SNACKS & STREET FOOD ====================
    { name: "Samosa", unit: "piece", calories: 252, protein: 5, carbs: 30, fat: 13 },
    { name: "Pakora / Bhajji", unit: "piece", calories: 75, protein: 2, carbs: 8, fat: 4 },
    { name: "Kachori", unit: "piece", calories: 180, protein: 4, carbs: 22, fat: 9 },
    { name: "Dhokla", unit: "piece", calories: 160, protein: 4, carbs: 28, fat: 3 },
    { name: "Pav Bhaji", unit: "serving", calories: 400, protein: 10, carbs: 55, fat: 16 },
    { name: "Vada Pav", unit: "piece", calories: 286, protein: 6, carbs: 40, fat: 12 },
    { name: "Chaat (Mixed)", unit: "cup", calories: 250, protein: 6, carbs: 35, fat: 10 },
    { name: "Pani Puri", unit: "6 pieces", calories: 150, protein: 3, carbs: 28, fat: 4 },
    { name: "Aloo Tikki", unit: "piece", calories: 150, protein: 3, carbs: 20, fat: 7 },
    { name: "Bhel Puri", unit: "cup", calories: 180, protein: 4, carbs: 30, fat: 6 },
    { name: "Sev Puri", unit: "serving", calories: 220, protein: 5, carbs: 32, fat: 9 },
    { name: "Dahi Puri", unit: "6 pieces", calories: 200, protein: 5, carbs: 30, fat: 7 },
    { name: "Papdi Chaat", unit: "cup", calories: 240, protein: 6, carbs: 34, fat: 10 },
    { name: "Aloo Chaat", unit: "cup", calories: 200, protein: 4, carbs: 32, fat: 7 },
    { name: "Momos (Veg)", unit: "piece", calories: 35, protein: 1, carbs: 6, fat: 1 },
    { name: "Momos (Chicken)", unit: "piece", calories: 45, protein: 3, carbs: 5, fat: 2 },
    { name: "Spring Roll", unit: "piece", calories: 140, protein: 3, carbs: 18, fat: 6 },

    // ==================== DAIRY & PANEER ====================
    { name: "Paneer (Raw)", unit: "100g", calories: 265, protein: 18, carbs: 1.2, fat: 20.8 },
    { name: "Curd / Yogurt (Plain)", unit: "cup", calories: 142, protein: 11, carbs: 15, fat: 4 },
    { name: "Raita (Cucumber)", unit: "cup", calories: 80, protein: 4, carbs: 8, fat: 3 },
    { name: "Raita (Boondi)", unit: "cup", calories: 120, protein: 5, carbs: 14, fat: 5 },
    { name: "Lassi (Sweet)", unit: "glass", calories: 180, protein: 6, carbs: 28, fat: 5 },
    { name: "Lassi (Salted)", unit: "glass", calories: 120, protein: 6, carbs: 12, fat: 5 },
    { name: "Lassi (Mango)", unit: "glass", calories: 220, protein: 6, carbs: 38, fat: 5 },
    { name: "Buttermilk", unit: "glass", calories: 40, protein: 2, carbs: 5, fat: 1 },
    { name: "Milk (Whole)", unit: "cup", calories: 149, protein: 8, carbs: 12, fat: 8 },
    { name: "Milk (Toned)", unit: "cup", calories: 120, protein: 8, carbs: 12, fat: 4 },

    // ==================== EGGS ====================
    { name: "Egg (Boiled)", unit: "piece", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
    { name: "Egg (Fried)", unit: "piece", calories: 90, protein: 6.3, carbs: 0.4, fat: 7 },
    { name: "Omelette (2 eggs)", unit: "serving", calories: 180, protein: 13, carbs: 1, fat: 14 },
    { name: "Egg Bhurji", unit: "serving", calories: 220, protein: 14, carbs: 4, fat: 16 },

    // ==================== SWEETS & DESSERTS ====================
    { name: "Gulab Jamun", unit: "piece", calories: 175, protein: 2, carbs: 28, fat: 7 },
    { name: "Rasgulla", unit: "piece", calories: 106, protein: 3, carbs: 20, fat: 1 },
    { name: "Jalebi", unit: "piece", calories: 150, protein: 1, carbs: 30, fat: 4 },
    { name: "Ladoo (Besan)", unit: "piece", calories: 180, protein: 3, carbs: 25, fat: 8 },
    { name: "Ladoo (Motichoor)", unit: "piece", calories: 160, protein: 2, carbs: 26, fat: 6 },
    { name: "Barfi (Milk)", unit: "piece", calories: 130, protein: 3, carbs: 18, fat: 6 },
    { name: "Kheer (Rice)", unit: "cup", calories: 200, protein: 6, carbs: 32, fat: 6 },
    { name: "Halwa (Sooji)", unit: "cup", calories: 320, protein: 4, carbs: 50, fat: 12 },
    { name: "Halwa (Gajar)", unit: "cup", calories: 280, protein: 5, carbs: 42, fat: 11 },
    { name: "Kulfi", unit: "piece", calories: 112, protein: 3, carbs: 14, fat: 5 },
    { name: "Rabri", unit: "cup", calories: 250, protein: 8, carbs: 35, fat: 10 },
    { name: "Shrikhand", unit: "cup", calories: 220, protein: 10, carbs: 32, fat: 7 },
    { name: "Mysore Pak", unit: "piece", calories: 200, protein: 2, carbs: 24, fat: 11 },
    { name: "Peda", unit: "piece", calories: 140, protein: 3, carbs: 20, fat: 6 },
    { name: "Sandesh", unit: "piece", calories: 120, protein: 4, carbs: 18, fat: 4 },

    // ==================== FRUITS ====================
    { name: "Banana", unit: "piece", calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { name: "Apple", unit: "piece", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: "Mango", unit: "piece", calories: 135, protein: 1, carbs: 35, fat: 0.6 },
    { name: "Orange", unit: "piece", calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
    { name: "Papaya", unit: "cup", calories: 55, protein: 0.9, carbs: 14, fat: 0.2 },
    { name: "Watermelon", unit: "cup", calories: 46, protein: 0.9, carbs: 11, fat: 0.2 },
    { name: "Grapes", unit: "cup", calories: 104, protein: 1.1, carbs: 27, fat: 0.2 },
    { name: "Pomegranate", unit: "cup", calories: 144, protein: 3, carbs: 33, fat: 2 },
    { name: "Guava", unit: "piece", calories: 68, protein: 2.6, carbs: 14, fat: 1 },
    { name: "Chikoo", unit: "piece", calories: 83, protein: 0.4, carbs: 20, fat: 1.1 },

    // ==================== VEGETABLES ====================
    { name: "Potato (Boiled)", unit: "medium", calories: 163, protein: 4, carbs: 37, fat: 0.2 },
    { name: "Sweet Potato", unit: "medium", calories: 112, protein: 2, carbs: 26, fat: 0.1 },
    { name: "Tomato", unit: "medium", calories: 22, protein: 1, carbs: 5, fat: 0.2 },
    { name: "Onion", unit: "medium", calories: 44, protein: 1.2, carbs: 10, fat: 0.1 },
    { name: "Carrot", unit: "medium", calories: 25, protein: 0.6, carbs: 6, fat: 0.1 },
    { name: "Cucumber", unit: "cup", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },

    // ==================== BEVERAGES ====================
    { name: "Tea (with sugar/milk)", unit: "cup", calories: 45, protein: 1, carbs: 8, fat: 1 },
    { name: "Tea (Black, no sugar)", unit: "cup", calories: 2, protein: 0, carbs: 0, fat: 0 },
    { name: "Coffee (with sugar/milk)", unit: "cup", calories: 50, protein: 1, carbs: 9, fat: 1 },
    { name: "Masala Chai", unit: "cup", calories: 60, protein: 2, carbs: 10, fat: 2 },
    { name: "Coconut Water", unit: "cup", calories: 46, protein: 2, carbs: 9, fat: 0.5 },
    { name: "Sugarcane Juice", unit: "glass", calories: 180, protein: 0.5, carbs: 45, fat: 0 },
    { name: "Nimbu Pani (Lemonade)", unit: "glass", calories: 60, protein: 0.2, carbs: 16, fat: 0 },
    { name: "Jaljeera", unit: "glass", calories: 50, protein: 0.5, carbs: 12, fat: 0 },
    { name: "Aam Panna", unit: "glass", calories: 80, protein: 0.5, carbs: 20, fat: 0 },
    { name: "Thandai", unit: "glass", calories: 200, protein: 6, carbs: 28, fat: 8 },

    // ==================== BREAD & BAKERY ====================
    { name: "Bread (White)", unit: "slice", calories: 79, protein: 2.7, carbs: 15, fat: 1 },
    { name: "Brown Bread", unit: "slice", calories: 69, protein: 3.5, carbs: 12, fat: 1 },
    { name: "Bun", unit: "piece", calories: 120, protein: 4, carbs: 22, fat: 2 },
    { name: "Pav", unit: "piece", calories: 110, protein: 3.5, carbs: 20, fat: 2 },
    { name: "Toast", unit: "slice", calories: 85, protein: 3, carbs: 16, fat: 1 },

    // ==================== DRY FRUITS & NUTS ====================
    { name: "Almonds", unit: "10 pieces", calories: 70, protein: 2.5, carbs: 2.5, fat: 6 },
    { name: "Cashews", unit: "10 pieces", calories: 90, protein: 2, carbs: 5, fat: 7 },
    { name: "Walnuts", unit: "10 halves", calories: 130, protein: 3, carbs: 3, fat: 13 },
    { name: "Pistachios", unit: "10 pieces", calories: 40, protein: 1.5, carbs: 2, fat: 3.5 },
    { name: "Raisins", unit: "small box", calories: 130, protein: 1, carbs: 34, fat: 0 },
    { name: "Dates", unit: "2 pieces", calories: 66, protein: 0.4, carbs: 18, fat: 0 },
];

export default indianFoodDatabase;
