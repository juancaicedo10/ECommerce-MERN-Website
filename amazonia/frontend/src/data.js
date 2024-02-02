import nikeShirt from './images/p1.png';
import adidasShirt from './images/p2.png';
import adidasPants from './images/p3.png';
import adidasFitPants from './images/p4.png'

export const data = {
    products: [
        {
            name: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: nikeShirt,
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality shirt'
        },
        {
            name: 'Adidas Slim shirt',
            slug: 'adidas-slim-shirt',
            category: 'Shirts',
            image: adidasShirt,
            price: 120,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product'
        },
        {
            name: 'Nike Slim Pant',
            slug: 'nike-slim-pantt',
            categorgy: 'Pants',
            image: adidasPants,
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality pant'
        },
        {
            name: 'Adidas Slim shirt',
            slug: 'adidas-fit-shirt',
            category: 'Shirts',
            image: adidasFitPants,
            price: 120,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'Hight quality product'
        },
    ]
}