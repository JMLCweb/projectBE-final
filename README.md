ROUTES

LoginUser - POST
http://localhost:3000/users/login
{JSON}

LoginAdmin - POST
http://localhost:3000/godmode/login
{JSON}

RegisterAdmin - POST
http://localhost:3000/users/register
{JSON}

RegisterAdmin - POST
http://localhost:3000/godmode/register
{JSON}

AddProduct - POST
http://localhost:3000/products
{JSON}
need auth and token

ClearCart - POST
http://localhost:3000/cart/clear/{id}

—————————

GetAllProducts - GET
http://localhost:3000/products

GetAllUsers - GET
http://localhost:3000/users
need auth and token

GetAllAdmins - GET
http://localhost:3000/godmode/
need auth and token

GetProductsId - GET
http://localhost:3000/products/{id}

GetUserID - GET
http://localhost:3000/users/{id}
need auth and token

GetCartUserId - GET
http://localhost:3000/cart/{id}
need auth and token


——————————

UpdateUser - PUT
http://localhost:3000/users/update/{id}
{JSON}
need auth and token

UpdateProduct - PUT
http://localhost:3000/products/{id}
{JSON}
need auth and token

——————————

deleteUserId - DEL
http://localhost:3000/users/delete/{id}
need auth and token

deleteProductId - DEL
http://localhost:3000/products/{id}
need auth and token

deleteCartProduct - DEL
http://localhost:3000/cart/remove
{JSON}
"userId":"",
"productId":""
 
need auth and token
