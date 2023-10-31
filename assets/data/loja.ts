export const getDishById = (id: number) => {
    const meals = loja.produtos.flatMap((category) => category.meals);
    return meals.find((meal) => meal.id === id);
};

export const loja = {
    name: 'Gengar',
    rating: '4.5',
    ratings: '(100+)',
    img: require('@/assets/data/loja1d.png'),
    distance: '0.5 Metros',
    duration: '25-30',
    tags: ['Fastasma', 'Venenoso', 'gas', 'alto'],
    about: 'o mais bala',
   
    produtos: [
        {
            category: 'fantasma',
            meals: [
                {
                    id: 1,
                    name: 'Power Ability',
                    price: 17,
                    info: 'fanstama com poison',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 2',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 3',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 4',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 5',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 6',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 7',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 8',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 9',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 10',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 11',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },

                {
                    id: 2,
                    name: 'Teste 12',
                    price: 30,
                    info: 'fisico',
                    img: require('@/assets/data/loja1d.png'),
                },
            ]




        }
    ]

}