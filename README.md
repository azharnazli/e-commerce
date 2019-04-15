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
|/users/googleLogin  |POST  |none|email: String (**required**), password: Stringi (**required**) |**Success**: Login as a user via Google, **Error**: Internal server error (Validation)|Login as a user via Google|

