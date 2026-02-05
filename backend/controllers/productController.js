import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModels.js";

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = async (file) => {
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "image",
        folder: "cartiva/products"
    });
    return result.secure_url;
};

// function for add product 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, Sizes, bestSeller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(
            (item) => item !== undefined
        );

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                return await uploadToCloudinary(item);
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            Sizes: JSON.parse(Sizes),
            images: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in adding product" });
    }
};

// function for list product 
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.log("Error in removing product", error);
        res.json({ success: false, message: "Error in removing product" });
    }
};

// function for single product 
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log("Error in fetching single product", error);
        res.json({ success: false, message: "Error in fetching single product" });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct };
