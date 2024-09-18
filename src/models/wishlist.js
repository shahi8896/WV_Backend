import mongoose, { Schema } from 'mongoose';
// Define schema for wishlist item
const wishlistItemSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['vendor', 'venue'], required: true },
    selected: { type: Boolean, default: false } // Default to unselected
});
// Define schema for wishlist document
const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: { type: [wishlistItemSchema], default: [] }
});
// Create model for Wishlist
const WishlistModel = mongoose.model('Wishlist', wishlistSchema);
export default WishlistModel;
