## <span style="font-size: 24px;">Introduction</span>

This is a backend for a Car Renting System where user can rent cars and admin can manage reservation cars.

Live URL
https://backend-car-rental-reservation.vercel.app

## <span style="font-size: 24px;">Features</span>

#### <span style="font-size: 24px;">Authentication</span>

- Sign Up (One user can sign up only one time, here are two rules one is user and another is admin)
- Sign In (After login based on email and password, JWT token will be generated to use authorized user);

#### <span style="font-size: 24px;">Cars Added </span>

- Create a Car (only admin can add the cars for the bookings, Authorized by JWT token)
- Get All Cars (Everybody can see all the cars)
- Get A Car (Also can see the single cars details by searching based on the car id and available date)

#### <span style="font-size: 24px;">Booking Management</span>

- Get All Bookings (Only An admin can see all bookings and maintain the booking cars.)
- Book a Car ( When a user books a car, It's unavailable for others until he/she returns the car. user is authorized by JWT token)
- Get User's Bookings (Users also can see their booking cars Along with searching functionality.);

#### <span style="font-size: 24px;">Cars Management</span>

- Update A Car (Only Accessible to the Admin, Authorized by JWT token)
- Delete A Car (Only Accessible to the Admin, Authorized by JWT token)
- Return The Car (When users return the rental car, a payable amount will be added by the admin based on the hours and this car again available for others.)

## <span style="font-size: 24px;">Technologies Used</span>

- JavaScript
- Node.js
- Express.js
- Mongoose
- TypeScript
- npm Packages

## <span>Validation</span>

- MongoDB: Use Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.
- Zod: It's preferred for its type-safe and declarative approach to data validation in TypeScript applications, ensuring robust error handling and code reliability.

## <span style="font-size: 24px;">Installation</span>

To get a local copy up and running, follow these steps.

Prerequisites
Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## <span style="font-size: 24px;">Setup</span>

1. Clone the repository:

   ```bash
   git clone https://github.com/mhrafi21/backend-car-rental-reservation.git

   ```

2. Navigate to the project directory:

   ```bash
   cd project-name

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Running the Server:

   Make sure MongoDB is running.

5. Start the server:

   ```bash
   npm run start:dev
   ```

### <span style="font-size: 20px;">Contact</span>

- [LinkedIn](www.linkedin.com/in/mahdi-hasan-rafi-7215a42a0)
- For inquiries, email Mahdi Hasan Rafi at [mahdi71078rafi@gmail.com](mailto:mahdi71078rafi@gmail.com)
