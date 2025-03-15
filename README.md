# E-Commerce Backend API

This is a backend API for an e-commerce platform built with Node.js and Express. The API provides endpoints for users, managers, customers, and administrators to manage products, categories, subcategories, and user profiles.

## Features

- **User Management**: Users can update their profile, change their password, and delete their account.
- **Product Management**: Managers can add, update, and delete products, as well as manage product images.
- **Category Management**: Administrators can add, update, and delete categories and subcategories.
- **Wishlist & Cart**: Customers can manage their wishlist and shopping cart.

## API Endpoints

### User Routes
- `GET /profile` - Get user profile
- `PATCH /` - Update user profile
- `PATCH /image` - Update user profile image
- `PATCH /password` - Update user password
- `DELETE /` - Delete user account

### Manager Routes
- `GET /products` - Get manager's products
- `POST /products` - Add a new product
- `PATCH /product/:id` - Update a product
- `DELETE /product/:id` - Delete a product

### Customer Routes
- `GET /wishlist` - Get customer's wishlist
- `GET /card` - Get customer's shopping cart
- `DELETE /wishlist/:id` - Remove item from wishlist
- `DELETE /card/:id` - Remove item from cart

### Admin Routes
- `POST /categories` - Add a new category
- `POST /subcategories` - Add a new subcategory
- `PATCH /categories/:id` - Update a category
- `PATCH /subcategories/:id` - Update a subcategory
- `DELETE /categories/:id` - Delete a category
- `DELETE /subcategories/:id` - Delete a subcategory

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git