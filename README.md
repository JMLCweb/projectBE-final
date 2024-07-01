# API Documentation

### O backend desta aplicação Node.js utiliza a framework Express para definir rotas e middleware, JWT para autenticação, e separa responsabilidades de usuário/admin. Abaixo estão as rotas disponíveis na API, junto com seus métodos, URLs, descrições e requisitos de autorização.

## -- -- -- -- -- -- -- -- Routes -- -- -- -- -- -- -- --

### -- Admin Routes --

#### Get Admin By ID

- **Method:** GET
- **URL:** `/godmode/{adminId}`
- **Description:** Fetch the admin details by ID.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `404 Not Found`: `Admin not found`
  - `500 Internal Server Error`: `Error getting admin`

#### Get All Admins

- **Method:** GET
- **URL:** `/godmode/`
- **Description:** Fetch the list of all admins.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `500 Internal Server Error`: `Error getting Admins`

#### Register Admin

- **Method:** POST
- **URL:** `godmode/register`
- **Description:** Register a new admin.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "password": "password"
  }
  ```
- **Responses:**
  - `400 Bad Request`: `Email already in use`
  - `500 Internal Server Error`: `Error on Register Admin`

#### Login Admin

- **Method:** POST
- **URL:** `/godmode/login`
- **Description:** Login admin.
- **Authorization:** No Auth needed.
- **Payload:**
  ```json
  {
    "email": "exemplo@exemplo.com",
    "password": "password"
  }
  ```
- **Responses:**
  - `400 Bad Request`: `Admin not found`
  - `404 Not Found`: `Wrong password`
  - `500 Internal Server Error`: `Login Failed`

#### Update Admin

- **Method:** PUT
- **URL:** `/godmode/update/{adminId}`
- **Description:** Update admin details.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "name": "password",
    "password": "exemplo",
    "...": "..."
  }
  ```
- **Responses:**
  - `404 Not Found`: `Admin not found`
  - `500 Internal Server Error`: `Update failed`

#### Delete Admin

- **Method:** DELETE
- **URL:** `/godmode/delete/{adminId}`
- **Description:** Delete an admin by ID.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `404 Not Found`: `Admin not found`
  - `500 Internal Server Error`: `Delete Failed`

### -- Users --

#### Register User

- **Method:** POST
- **URL:** `/users/register`
- **Description:** Register a new user.
- **Authorization:** No Auth needed.
- **Payload:**
  ```json
  {
    "name": "name",
    "email": "email@email.com",
    "password": "password",
    "country": "Portugal",
    "address": "Rua de teste,8",
    "zipcode": "1111-222"
  }
  ```
- **Responses:**
  - `400 Bad Request`: `Email already in use`
  - `500 Internal Server Error`: `Error Register User`

#### Login User

- **Method:** POST
- **URL:** `/users/login`
- **Description:** Login an admin.
- **Authorization:** No Auth needed.
- **Payload:**
  ```json
  {
    "email": "1@21.com",
    "password": "123"
  }
  ```
- **Responses:**
  - `401 Unauthorized`: `Wrong password`
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `Login failed`

#### Get User By ID

- **Method:** GET
- **URL:** `/users/{userId}`
- **Description:** Fetch user details by ID.
- **Authorization:** Requires user/admin authentication and token.
- **Responses:**
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `Error getting User`

#### Get All Users

- **Method:** GET
- **URL:** `/users`
- **Description:** Fetch a list of all users.
- **Authorization:** Requires admin authentication and token.
- **Respostas:**
  - `500 Internal Server Error`: `Error getting users`

#### Update User With Verification

- **Method:** PUT
- **URL:** `/users/update/{userId}`
- **Description:** Update user details with password verification.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "password": "new Password",
    "oldPassword": "old Password"
  }
  ```
- **Responses:**
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `User Update Error`

#### Update User With Admin

- **Method:** PUT
- **URL:** `/users/update/admin/{userId}`
- **Description:** Update user details by an admin.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "name": "new Name",
    "password": "new Password"
  }
  ```
- **Responses:**
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `User Update Error`

#### Delete User By ID

- **Method:** DELETE
- **URL:** `/users/delete/{userId}`
- **Description:** Delete a user by ID.
- **Authorization:** Requires admin authentication and token.
- **Respostas:**
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `Delete failed`

### -- Products --

#### Get Products

- **Method:** GET
- **URL:** `/products`
- **Description:** Fetch a list of all products.
- **Authorization:** No Auth needed.
- **Responses:**
  - `200 OK`: `Products retrieved successfully`
  - `500 Internal Server Error`: `Error getting products`

#### Get Product By ID

- **Method:** GET
- **URL:** `/products/{productId}`
- **Description:** Fetch a list of all products.
- **Authorization:** No Auth needed.
- **Responses:**
  - `200 OK`: `Product retrieved successfully`
  - `404 Not Found`: `Product not found`
  - `500 Internal Server Error`: `Error getting product`

#### Add Product

- **Method:** POST
- **URL:** `/products`
- **Description:** Add a new product.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "name": "name",
    "price": "price",
    "category": "category",
    "description": "description"
  }
  ```
- **Responses:**
  - `201 Created`: `Product created successfully`
  - `500 Internal Server Error`: `Error adding product`

#### Add Product Review

- **Method:** POST
- **URL:** `/products/review/{userId}`
- **Description:** Add a review to a product.
- **Authorization:** Requires user authentication and token.
  - **Payload:**
  ```json
  {
    "productId": "productId",
    "rating": "rating",
    "comment": "comment"
  }
  ```
- **Responses:**
  - `200 OK`: `Review added successfully`
  - `404 Not Found`: `Product not found`
  - `500 Internal Server Error`: `Error adding review`

#### Add To Favorites

- **Method:** POST
- **URL:** `/products/favorites/{userId}`
- **Description:** Add product to user's favorites.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId"
  }
  ```
- **Responses:**
  - `200 OK`: `Product added to favorites`
  - `409 Conflict`: `Product already in favorites`
  - `500 Internal Server Error`: `Error adding product to favorites`

#### Edit Product Review

- **Method:** PUT
- **URL:** `/products/review/{userId}`
- **Description:** Edit a review for a product.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId",
    "reviewId": "reviewId",
    "rating": "new rating",
    "comment": "new comment"
  }
  ```
- **Responses:**
  - `200 OK`: `Review edited successfully`
  - `404 Not Found`: `Review not found or user not authorized`
  - `500 Internal Server Error`: `Error editing review`

#### Update Product

- **Method:** PUT
- **URL:** `/products/{productId}`
- **Description:** Update product details.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "name": "new name",
    "stock": "new stock"
  }
  ```
  - **Responses:**
  - `200 OK`: `Product updated successfully`
  - `404 Not Found`: `Product not found`
  - `500 Internal Server Error`: `Error updating product`

#### Delete Product Review

- **Method:** DELETE
- **URL:** `/products/review/delete`
- **Description:** Delete a product review.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "reviewId": "reviewId",
    "productId": "productId"
  }
  ```
- **Responses:**
  - `200 OK`: `Review removed successfully`
  - `404 Not Found`: `Review not found`
  - `500 Internal Server Error`: `Error removing review`

#### Delete Favorite

- **Method:** DELETE
- **URL:** `/products/favorites/{userId}`
- **Description:** Remove a product from user's favorites.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId"
  }
  ```
- **Responses:**
  - `200 OK`: `Product removed from favorites`
  - `404 Not Found`: `User not found`
  - `500 Internal Server Error`: `Error removing product from favorites`

#### Delete Product By ID

- **Method:** DELETE
- **URL:** `/products/{productId}`
- **Description:** Delete a product by ID.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `200 OK`: `Product deleted successfully`
  - `400 Bad Request`: `Invalid product ID`
  - `404 Not Found`: `Product not found`
  - `500 Internal Server Error`: `Error deleting product`

### -- Cart --

#### Get Cart By User ID

- **Method:** GET
- **URL:** `/cart/{userId}`
- **Description:** Fetch cart details for a user.
- **Authorization:** Requires user/admin authentication and token.
- **Responses:**
  - `200 OK`: `Cart retrieved successfully`
  - `500 Internal Server Error`: `Error getting cart`

#### Add Product To Cart

- **Method:** POST
- **URL:** `/cart/add`
- **Description:** Add a product to the user's cart.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId",
    "quantity": "1"
  }
  ```
- **Responses:**
  - `200 OK`: `Product added to cart successfully`
  - `500 Internal Server Error`: `Error adding product`

#### Update Cart User ID

- **Method:** PUT
- **URL:** `/cart/update/{userId}`
- **Description:** Update the cart for a user.
- **Authorization:** Requires user authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId",
    "quantity": "new quantity"
  }
  ```
- **Responses:**
  - `200 OK`: `Cart updated successfully`
  - `500 Internal Server Error`: `Update failed`

#### Delete Product From Cart

- **Method:** DELETE
- **URL:** `/cart/remove/{userId}`
- **Description:** Remove a product from the cart.
- **Authorization:** Requires user/admin authentication and token.
- **Payload:**
  ```json
  {
    "productId": "productId"
  }
  ```
- **Responses:**
  - `200 OK`: `Product removed from cart successfully`
  - `500 Internal Server Error`: `Delete failed`

#### Clean Cart

- **Method:** POST
- **URL:** `/cart/clear/{userId}`
- **Description:** Clear the cart for a user.
- **Authorization:** Requires user/admin authentication and token.
- **Responses:**
  - `200 OK`: `Cart emptied successfully`
  - `500 Internal Server Error`: `Empty cart failed`

### -- Orders --

#### Checkout

- **Method:** POST
- **URL:** `/orders/checkout/{userId}`
- **Description:** Check out the cart for a user.
- **Authorization:** Requires user authentication and token.
- **Responses:**
  - `200 OK`: `Checkout completed successfully`
  - `500 Internal Server Error`: `Checkout failed`

#### Get All Orders

- **Method:** GET
- **URL:** `/orders`
- **Description:** Fetch a list of all orders.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `200 OK`: `Orders retrieved successfully`
  - `500 Internal Server Error`: `Error getting orders`

#### Get Order By ID

- **Method:** GET
- **URL:** `/orders/{orderId}`
- **Description:** Fetch order details by ID.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `200 OK`: `Order retrieved successfully`
  - `404 Not Found`: `Order not found`
  - `500 Internal Server Error`: `Error getting order`

#### Update Order

- **Method:** POST
- **URL:** `/orders/update/{orderId}`
- **Description:** Update the status of an order.
- **Authorization:** Requires admin authentication and token.
- **Payload:**
  ```json
  {
    "status": "new status",
    "notes": "order note"
  }
  ```
- **Responses:**
  - `200 OK`: `Order status completed and moved to history`
  - `404 Not Found`: `Order not found`
  - `500 Internal Server Error`: `Update failed`

#### Delete Order

- **Method:** POST
- **URL:** `/orders/delete/{orderId}`
- **Description:** Delete order.
- **Authorization:** Requires admin authentication and token.
- **Responses:**
  - `200 OK`: `Order deleted successfully`
  - `404 Not Found`: `Order not found or could not be deleted`
  - `500 Internal Server Error`: `Delete failed`
