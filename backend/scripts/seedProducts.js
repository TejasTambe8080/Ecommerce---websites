import mongoose from "mongoose";
import "dotenv/config";

// Sample product data with placeholder images
const sampleProducts = [
    {
        name: "Men's Classic Cotton T-Shirt",
        description: "A comfortable and stylish cotton t-shirt perfect for everyday wear. Made with 100% premium cotton for breathability and softness.",
        price: 499,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
        ],
        category: "Men",
        subCategory: "TopWear",
        Sizes: ["S", "M", "L", "XL"],
        bestSeller: true,
        date: Date.now()
    },
    {
        name: "Women's Floral Summer Dress",
        description: "Beautiful floral print dress perfect for summer outings. Lightweight fabric with elegant design.",
        price: 1299,
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"
        ],
        category: "Women",
        subCategory: "TopWear",
        Sizes: ["S", "M", "L"],
        bestSeller: true,
        date: Date.now()
    },
    {
        name: "Men's Slim Fit Jeans",
        description: "Premium quality slim fit jeans with stretch fabric for comfort. Perfect for casual and semi-formal occasions.",
        price: 1499,
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
            "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500"
        ],
        category: "Men",
        subCategory: "BottomWear",
        Sizes: ["M", "L", "XL", "XXL"],
        bestSeller: false,
        date: Date.now()
    },
    {
        name: "Women's Yoga Pants",
        description: "High-waist yoga pants with moisture-wicking fabric. Perfect for workouts and casual wear.",
        price: 899,
        images: [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
            "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=500"
        ],
        category: "Women",
        subCategory: "BottomWear",
        Sizes: ["S", "M", "L", "XL"],
        bestSeller: true,
        date: Date.now()
    },
    {
        name: "Kids' Colorful Hoodie",
        description: "Soft and warm hoodie for kids with fun colors. Perfect for cooler weather.",
        price: 699,
        images: [
            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
        ],
        category: "Kids",
        subCategory: "Winterwear",
        Sizes: ["S", "M", "L"],
        bestSeller: false,
        date: Date.now()
    },
    {
        name: "Men's Winter Jacket",
        description: "Warm and stylish winter jacket with water-resistant outer shell. Perfect for cold weather.",
        price: 2999,
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
            "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=500"
        ],
        category: "Men",
        subCategory: "Winterwear",
        Sizes: ["M", "L", "XL", "XXL"],
        bestSeller: true,
        date: Date.now()
    },
    {
        name: "Women's Cardigan Sweater",
        description: "Soft knit cardigan perfect for layering. Available in multiple colors.",
        price: 1199,
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500"
        ],
        category: "Women",
        subCategory: "Winterwear",
        Sizes: ["S", "M", "L"],
        bestSeller: false,
        date: Date.now()
    },
    {
        name: "Kids' Summer Shorts",
        description: "Comfortable cotton shorts for kids. Perfect for summer activities.",
        price: 399,
        images: [
            "https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?w=500"
        ],
        category: "Kids",
        subCategory: "BottomWear",
        Sizes: ["S", "M", "L"],
        bestSeller: false,
        date: Date.now()
    },
    {
        name: "Men's Polo Shirt",
        description: "Classic polo shirt made with premium cotton. Great for casual and business casual occasions.",
        price: 799,
        images: [
            "https://images.unsplash.com/photo-1625910513413-5fc64a587a8c?w=500",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
        ],
        category: "Men",
        subCategory: "TopWear",
        Sizes: ["S", "M", "L", "XL", "XXL"],
        bestSeller: true,
        date: Date.now()
    },
    {
        name: "Women's Casual Blouse",
        description: "Elegant casual blouse perfect for office or weekend wear. Comfortable and stylish.",
        price: 899,
        images: [
            "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=500"
        ],
        category: "Women",
        subCategory: "TopWear",
        Sizes: ["S", "M", "L", "XL"],
        bestSeller: false,
        date: Date.now()
    }
];

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        // Get the product collection
        const Product = mongoose.model("product", new mongoose.Schema({
            name: String,
            description: String,
            price: Number,
            images: Array,
            category: String,
            subCategory: String,
            Sizes: Array,
            bestSeller: Boolean,
            date: Date
        }));

        // Clear existing products (optional - remove this if you want to keep existing products)
        // await Product.deleteMany({});
        // console.log("🗑️ Cleared existing products");

        // Insert sample products
        const result = await Product.insertMany(sampleProducts);
        console.log(`✅ Successfully added ${result.length} sample products`);

        // Close connection
        await mongoose.connection.close();
        console.log("✅ Database connection closed");
        
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding products:", error);
        process.exit(1);
    }
};

// Run the seed function
seedProducts();
