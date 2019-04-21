# e-commerce

### USAGE
```javascript
npm install
npm run dev
```

#### Routes
### USER
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|
/users/verify  |POST  |none|token: String (**required**)|**Success**: verify token , **Error**: Internal server error | verified user|

### PRODUCT
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
/products/  | GET  |none| |**Success**: Get All Product , **Error**: Internal server error | Get All Product From Store
/products/  | POST  | token | name: String(**required**) price: Number (**required**) stock: number (**required**) description : String  (**required**) image: String (**required**)|**Success**: Create New Product , **Error**: Internal server error | Create New Product 
/products/:productId  | PUT  | token | name: String(**required**) price: Number (**required**) stock: number (**required**) description : String  (**required**) image: String (**required**) |**Success**: Edit Product , **Error**: Internal server error | Edit Product 
/products/:productId  | GET  | token | |**Success**: GET A Product , **Error**: Internal server error | GET A Product
/products/:productId  | DELETE  | token | |**Success**: DELETE A Product , **Error**: Internal server error | DELETE A Product

### PRODUCT
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
/cart/  | POST  | token | productId:String (**required**) Quantity:number(**required**) |**Success**: Create New Cart , **Error**: Internal server error | Add new Cart
/cart/  | PATCH  | token | productId:String (**required**) Quantity:number(**required**) |**Success**: Edit Quantity Cart , **Error**: Internal server error | inc/dec Quantity From Cart
/cart/  | DELETE  | token | userId: String (**required**) |**Success**: Delete User Cart , **Error**: Internal server error | Delete All Cart From User
/cart/checkout  | POST  | token | none |**Success**: Delete User Cart And edit product stock, **Error**: Internal server error | Buy All Product
/cart | GET | token | none | **Success**: Show User Cart, **Error**: Internal server error | Show All user cart

