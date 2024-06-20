# ROUTES

# Admin

GetAdminById - GET
http://localhost:3000/godmode/{id}
need auth and Token

GetAllAdmins - GET
http://localhost:3000/godmode/
need auth and token

RegisterAdmin - POST
http://localhost:3000/godmode/register
{JSON}

LoginAdmin - POST
http://localhost:3000/godmode/login
{JSON}

RegisterUser - POST
http://localhost:3000/users/register
{JSON}

UpdateAdmin - PUT
http://localhost:3000/godmode/update/{id}
{JSON}
need auth and token
nao é de ti
deleteAdmin - DEL
http://localhost:3000/godmode/delete/%7Bid%7D
need auth and token

# Users

LoginUser - POST
http://localhost:3000/users/login
{JSON}

GetUserID - GET
http://localhost:3000/users/{id}
need auth and token

GetAllUsers - GET
http://localhost:3000/users
need auth and token

UpdateUser - PUT
http://localhost:3000/users/update/{id}
{JSON}
need auth and token

deleteUserId - DEL
http://localhost:3000/users/delete/{id}
need auth and token

# Products

GetAllProducts - GET
http://localhost:3000/products

GetProductsId - GET
http://localhost:3000/products/{id}

AddProduct - POST
http://localhost:3000/products
{JSON}
need auth and token

UpdateProduct - PUT
http://localhost:3000/products/{id}
{JSON}
need auth and token

deleteProductId - DEL
http://localhost:3000/products/{id}
need auth and token

# Orders

# Cart

GetCartUserId - GET
http://localhost:3000/cart/{id}
need auth and token

AddCartProduct - POST
http://localhost:3000/cart/add
{JSON}
"userId":"",
"ProductId":"",
"quantity":""
login an token

ClearCart - POST
http://localhost:3000/cart/clear/{id}

deleteCartProduct - DEL
http://localhost:3000/cart/remove
login and token
