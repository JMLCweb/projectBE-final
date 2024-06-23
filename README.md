# API Routes Documentation

## Admin Routes

### Get Admin By ID

- **Method:** GET
- **URL:** `http://localhost:3000/godmode/{adminId}`
- **Description:** Fetches the admin details by ID.
- **Authorization:** Requires admin authentication and token.

### Get All Admins

- **Method:** GET
- **URL:** `http://localhost:3000/godmode/`
- **Description:** Fetches the list of all admins.
- **Authorization:** Requires admin authentication and token.

### Register Admin

- **Method:** POST
- **URL:** `http://localhost:3000/godmode/register`
- **Description:** Registers a new admin.
- **Payload:**
  ```json
  {
    "name": "exemplo",
    "email": "exemplo@exemplo.com",
    "password": "password"
  }
  ```

### LoginAdmin

- **Method:** POST
- **URL:** `http://localhost:3000/godmode/login`
- **Description:** Login admin.
- **Payload:**
  ```json
  {
    "email": "exemplo@exemplo.com",
    "password": "password"
  }
  ```

### UpdateAdmin

- **Method:** PUT
- **URL:** `http://localhost:3000/godmode/update/{adminId}`
- **Authorization:** Requires admin authentication and token.
  ```json
  {
    "name": "password",
    "password": "exemplo",
    "...": "..."
  }
  ```

### DeleteAdmin

- **Method:** DELETE
- **URL:** `http://localhost:3000/godmode/delete/{adminId}`
- **Authorization:** Requires admin authentication and token.

## Users

### RegisterUser

- **Method:** POST
- **URL:** `http://localhost:3000/users/register`
- **Description:** Registers a new user.
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

### LoginUser

- **Method:** POST
- **URL:** `http://localhost:3000/users/login`
  ```json
  {
    "email": "1@21.com",
    "password": "123"
  }
  ```

### GetUserID

- **Method:** GET
- **URL:** `http://localhost:3000/users/{userId}`
- **Authorization:** Requires user/admin authentication and token.

### GetAllUsers

- **Method:** GET
- **URL:** `http://localhost:3000/users`
- **Authorization:** Requires admin authentication and token.

### UpdateUserWithVerification

- **Method:** PUT
- **URL:** `http://localhost:3000/users/update/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "password": "new Password",
    "oldPassword": "old Password"
  }
  ```

### UpdateUserWithAdmin

- **Method:** PUT
- **URL:** `http://localhost:3000/users/update/admin/{userId}`
- **Authorization:** Requires admin authentication and token.
  ```json
  {
    "name": "new Name",
    "password": "new Password"
  }
  ```

### deleteUserId

- **Method:** DELETE
- **URL:** `http://localhost:3000/users/delete/{userId}`
- **Authorization:** Requires admin authentication and token.

## Products

### GetProducts

- **Method:** GET
- **URL:** `http://localhost:3000/products`
- **Authorization:** No Auth needed.

### GetProductId

- **Method:** GET
- **URL:** `http://localhost:3000/products/{productId}`
- **Authorization:** No Auth needed.

### AddProduct

- **Method:** POST
- **URL:** `http://localhost:3000/products`
- **Authorization:** Requires admin authentication and token.
  ```json
  {
    "name": "name",
    "price": "price",
    "category": "category",
    "description": "description"
  }
  ```

### AddProductReview

- **Method:** POST
- **URL:** `http://localhost:3000/products/review/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId",
    "rating": "rating",
    "comment": "comment"
  }
  ```

### AddToFavorites

- **Method:** POST
- **URL:** `http://localhost:3000/products/favorites/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId"
  }
  ```

### editProductReview

- **Method:** PUT
- **URL:** `http://localhost:3000/products/review/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId",
    "reviewId": "reviewId",
    "rating": "new rating",
    "comment": "new comment"
  }
  ```

### UpdateProduct

- **Method:** PUT
- **URL:** `http://localhost:3000/products/{productId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "name": "new name",
    "stock": "new stock"
  }
  ```

### deleteProductReview

- **Method:** DELETE
- **URL:** `http://localhost:3000/products/review/delete`
- **Authorization:** Requires admin authentication and token.

  ```json
  {
    "reviewId": "reviewId",
    "productId": "productId"
  }
  ```

  ### deleteFavorite

- **Method:** DELETE
- **URL:** `http://localhost:3000/products/favorites/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId"
  }
  ```

### deleteProductId

- **Method:** DELETE
- **URL:** `http://localhost:3000/products/{productId}`
- **Authorization:** Requires admin authentication and token.

## Cart

### GetCartUserId

- **Method:** GET
- **URL:** `http://localhost:3000/cart/{userId}`
- **Authorization:** Requires user/admin authentication and token.

### AddCartProduct

- **Method:** POST
- **URL:** `http://localhost:3000/cart/add`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId",
    "quantity": "1"
  }
  ```

### UpdateCartUserId

- **Method:** PUT
- **URL:** `http://localhost:3000/cart/update/{userId}`
- **Authorization:** Requires user authentication and token.
  ```json
  {
    "productId": "productId",
    "quantity": "new quantity"
  }
  ```

### deleteCartProduct - DEL

- **Method:** DELETE
- **URL:** `http://localhost:3000/cart/remove/{userId}`
- **Authorization:** Requires user/admin authentication and token.

```json
{
  "productId": "productId"
}
```

### ClearCart

- **Method:** POST
- **URL:** `http://localhost:3000/cart/clear/{userId}`
- **Authorization:** Requires user/admin authentication and token.

## Orders

### Checkout

- **Method:** POST
- **URL:** `http://localhost:3000/orders/checkout/{userId}`
- **Authorization:** Requires user authentication and token.

### GetAllOrders

- **Method:** GET
- **URL:** `http://localhost:3000/orders`
- **Authorization:** Requires admin authentication and token.

### GetOrderById

- **Method:** GET
- **URL:** `http://localhost:3000/orders/{orderId}`
- **Authorization:** Requires admin authentication and token.

### UpdateOrder

- **Method:** POST
- **URL:** `http://localhost:3000/orders/update/{orderId}`
- **Authorization:** Requires admin authentication and token.

```json
{
  "status": "new status",
  "notes": "order note"
}
```
