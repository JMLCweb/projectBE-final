# API Documentation

### O backend desta aplicação Node.js utiliza a framework Express para definir rotas e middleware, JWT para autenticação, e separa responsabilidades de usuário/admin. Abaixo estão as rotas disponíveis na API, junto com seus métodos, URLs, descrições e requisitos de autorização.

## -- -- -- -- -- -- -- -- Routes -- -- -- -- -- -- -- --

### -- Admin Routes --

#### Get Admin By ID

- **Method:** GET
- **URL:** `/godmode/{adminId}`
- **Description:** Fetch the admin details by ID.
- **Authorization:** Requires admin authentication and token.

#### Get All Admins

- **Method:** GET
- **URL:** `/godmode/`
- **Description:** Fetch the list of all admins.
- **Authorization:** Requires admin authentication and token.

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

#### Delete Admin

- **Method:** DELETE
- **URL:** `/godmode/delete/{adminId}`
- **Description:** Delete an admin by ID.
- **Authorization:** Requires admin authentication and token.

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

#### Get User By ID

- **Method:** GET
- **URL:** `/users/{userId}`
- **Description:** Fetch user details by ID.
- **Authorization:** Requires user/admin authentication and token.

#### Get All Users

- **Method:** GET
- **URL:** `/users`
- **Description:** Fetch a list of all users.
- **Authorization:** Requires admin authentication and token.

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

#### Delete User By ID

- **Method:** DELETE
- **URL:** `/users/delete/{userId}`
- **Description:** Delete a user by ID.
- **Authorization:** Requires admin authentication and token.

### -- Products --

#### Get Products

- **Method:** GET
- **URL:** `/products`
- **Description:** Fetch a list of all products.
- **Authorization:** No Auth needed.

#### Get Product By ID

- **Method:** GET
- **URL:** `/products/{productId}`
- **Description:** Fetch a list of all products.
- **Authorization:** No Auth needed.

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

#### Delete Product By ID

- **Method:** DELETE
- **URL:** `/products/{productId}`
- **Description:** Delete a product by ID.
- **Authorization:** Requires admin authentication and token.

### -- Cart --

#### Get Cart By User ID

- **Method:** GET
- **URL:** `/cart/{userId}`
- **Description:** Fetch cart details for a user.
- **Authorization:** Requires user/admin authentication and token.

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

#### Clear Cart

- **Method:** POST
- **URL:** `/cart/clear/{userId}`
- **Description:** Clear the cart for a user.
- **Authorization:** Requires user/admin authentication and token.

### -- Orders --

#### Checkout

- **Method:** POST
- **URL:** `/orders/checkout/{userId}`
- **Description:** Check out the cart for a user.
- **Authorization:** Requires user authentication and token.

#### Get All Orders

- **Method:** GET
- **URL:** `/orders`
- **Description:** Fetch a list of all orders.
- **Authorization:** Requires admin authentication and token.

#### Get Order By ID

- **Method:** GET
- **URL:** `/orders/{orderId}`
- **Description:** Fetch order details by ID.
- **Authorization:** Requires admin authentication and token.

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

#### Delete Order

- **Method:** POST
- **URL:** `/orders/delete/{orderId}`
- **Description:** Delete order.
- **Authorization:** Requires admin authentication and token.
