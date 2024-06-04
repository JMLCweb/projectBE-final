ROUTES

LoginUser - POST
http://localhost:3000/users/login

LoginAdmin - POST
http://localhost:3000/godmode/login

RegisterAdmin - POST
http://localhost:3000/users/register

RegisterAdmin - POST
http://localhost:3000/godmode/register

AddProduct - POST
http://localhost:3000/products
need auth and token

ClearCart - POST
http://localhost:3000/cart/clear/id

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
http://localhost:3000/products/664a5bd7838be939477a2d33

GetUserID - GET
http://localhost:3000/users/6650e05d901b1bc685ff4cdc
need auth and token

GetCartUserId - GET
http://localhost:3000/cart/6650d363b64114cdd2e53e6e
need auth and token


——————————

UpdateUser - PUT
http://localhost:3000/users/update/6650e05d901b1bc685ff4cdc
need auth and token

UpdateProduct - PUT
http://localhost:3000/products/66551d7d918ae50cf6599958
need auth and token

——————————

deleteUserId - DEL
http://localhost:3000/users/delete/664d439aac2c119a3e01456f
need auth and token

deleteProductId - DEL
http://localhost:3000/products/6641773cbd0af8105f8239bf
need auth and token

deleteCartProduct - DEL
http://localhost:3000/cart/remove
{
	"userId":"",
	"productId":""
}
need auth and token
