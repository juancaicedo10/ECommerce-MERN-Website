const bcrypt = require('bcryptjs')


const data = {
    users: [
        {
            name: 'Juan',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'Juan',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        }
    ],

  products: [
      {
          name: 'Nike Slim shirt',
          slug: 'nike-slim-shirt',
          category: 'Shirts',
          image: '/images/p1.png',
          price: 12.99,
          rating: 4,
          numReviews: 8,
          description: "high quality shirt",
          countInStock: 5,
          brand: "nike"
      },
      {
          name: 'Adidas Slim shirt',
          slug: 'adidas-slim-shirt',
          category: 'Shirts',
          image: '/images/p2.png',
          price: 12.99,
          rating: 4,
          numReviews: 10,
          description: "high quality shirt",
          countInStock: 5,
          brand: "adidas" // Corregido
      },
      {
          name: 'Nike Slim Pant',
          slug: 'nike-slim-pant', // Corregido
          category: 'Pants',
          image: '/images/p3.png',
          price: 12.99,
          rating: 4,
          numReviews: 13,
          description: "high quality pant",
          countInStock: 6,
          brand: "nike"
      },
      {
          name: 'Adidas Fit shirt',
          slug: 'adidas-fit-shirt',
          category: 'Shirts',
          image: '/images/p4.png',
          price: 12.99,
          rating: 4,
          numReviews: 10,
          description: "high quality shirt",
          countInStock: 5,
          brand: "adidas" // Corregido
      },
  ],
};

module.exports = data;
