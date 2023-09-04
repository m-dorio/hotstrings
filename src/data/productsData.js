const productsData = [

    {
        id: "AB001",
        name: "Ramen (Japan)",
        oldPrice: 180.00,
        price: 120.00,
        stats: "",
        quantity: 0,
        description: "Ramen is a Japanese noodle soup dish with Chinese origins. It typically consists of wheat noodles served in a flavorful broth, topped with various ingredients like sliced pork, soft-boiled egg, seaweed, and green onions.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-1.jpg"
    },
    {
        id: "AB002",
        name: "Pad Thai (Thailand)",
        oldPrice: 220.00,
        price: 130.00,
        stats: "",
        quantity: 0,
        description: "Pad Thai is a popular Thai noodle dish made with stir-fried rice noodles, eggs, tofu or shrimp, bean sprouts, crushed peanuts, and tamarind-based sauce. It offers a perfect balance of sweet, sour, and savory flavors.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-2.jpg"
    },
    {
        id: "AB003",
        name: "Pho (Vietnam)",
        oldPrice: 207.00,
        price: 217.00,
        stats: "",
        quantity: 0,
        description: "Pho is a Vietnamese noodle soup made with rice noodles and usually served with beef or chicken. The broth is rich and aromatic, flavored with herbs and spices like cinnamon, star anise, and ginger.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-3.jpg"
    },
    {
        id: "AB004",
        name: "Chow Mein (China)",
        oldPrice: 220.00,
        price: 127.00,
        stats: "",
        quantity: 0,
        description: "Chow Mein is a Chinese stir-fried noodle dish that can be found in various regional variations. The noodles are typically stir-fried with vegetables, meat, and a savory sauce.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-4.jpg"
    },
    {
        id: "AB005",
        name: "Jjajangmyeon (South Korea)",
        oldPrice: 226.00,
        price: 126.00,
        stats: "",
        quantity: 0,
        description: "Jjajangmyeon is a Korean-Chinese noodle dish made with thick, hand-made wheat noodles, topped with a black bean sauce (jjajang) that includes diced pork and vegetables.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-5.jpg"
    },
    {
        id: "AB006",
        name: "Laksa (Malaysia/Singapore)",
        oldPrice: 235.00,
        price: 135.00,
        stats: "",
        quantity: 0,
        description: "Laksa is a spicy noodle soup popular in Southeast Asia. There are different variations, but it often includes rice noodles served in a coconut-based spicy broth with prawns, fish cakes, and bean sprouts.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-6.jpg"
    },
    {
        id: "AB007",
        name: "Soba (Japan)",
        oldPrice: 152.00,
        price: 182.00,
        stats: "",
        quantity: 0,
        description: "Soba is a type of Japanese noodle made from buckwheat flour. It can be served cold with dipping sauce (zaru soba) or in a hot broth (kake soba).",
        productImg:"https://m-dorio.github.io/foodstore/images/img-7.jpg"
    },
    {
        id: "ABC01",
        name: "Pancit Canton (Manila)",
        oldPrice: 151.50,
        price: 151.50,
        stats: "",
        quantity: 0,
        description: "Stir-fried egg noodles with various vegetables, shrimp, pork, and chicken. It's a common dish during birthdays and celebrations, symbolizing long life and good luck.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C01.jpg"
    },
    {
        id: "ABC02",
        name: "Pancit Malabon (Manila)",
        oldPrice: 221.00,
        price: 121.00,
        stats: "",
        quantity: 0,
        description: "UA seafood noodle dish made with thick rice noodles, shrimp, squid, and a flavorful sauce usually enriched with achuete (annatto seeds).",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C02.jpg"
    },
    {
        id: "ABC03",
        name: "Pancit Palabok (Manila)",
        oldPrice: 221.00,
        price: 131.00,
        stats: "",
        quantity: 0,
        description: "A noodle dish made with thin rice noodles topped with a savory shrimp-based sauce, minced pork, shrimp, chicharrón (crispy pork cracklings), boiled egg, and sometimes squid.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C03.jpg"
    },
    {
        id: "ABC04",
        name: "Pancit Bihon (Manila)",
        oldPrice: 121.00,
        price: 151.00,
        stats: "",
        quantity: 0,
        description: "A simple stir-fried noodle dish made with thin rice noodles, vegetables, and often mixed with chicken and/or pork.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C04.jpg"
    },
    {
        id: "ABC05",
        name: "Pancit Miki/Pancit Lomi (Manila)",
        oldPrice: 121.00,
        price: 155.00,
        stats: "",
        quantity: 0,
        description: "These are noodle soups made with fresh egg noodles, various meats, and vegetables, usually served hot and flavorful.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C05.jpg"
    },
    {
        id: "ABC06",
        name: "Pancit Habhab (Manila)",
        oldPrice: 155.00,
        price: 155.00,
        stats: "",
        quantity: 0,
        description: "Originating from Lucban, Quezon, this dish uses dried banana leaves as a 'plate' for the noodles, which are eaten without utensils.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C06.jpg"
    },
    {
        id: "ABC07",
        name: "Bulalo Mami (Manila)",
        oldPrice: 151.00,
        price: 171.00,
        stats: "",
        quantity: 0,
        description: "A beef noodle soup made with bone marrow and shank, typically served with egg noodles and vegetables.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C07.jpg"
    },
    {
        id: "ABC08",
        name: "Sotanghon Guisado (Manila)",
        oldPrice: 131.00,
        price: 131.00,
        stats: "",
        quantity: 0,
        description: "Stir-fried cellophane noodles with vegetables, chicken, shrimp, and sometimes pork.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C08.jpg"
    },
    {
        id: "ABC09",
        name: "Mami (Manila)",
        oldPrice: 241.00,
        price: 134.00,
        stats: "",
        onOffer: true,
        quantity: 0,
        description: "A noodle soup with a Chinese influence, typically made with egg noodles and various toppings like boiled egg, sliced meat, and vegetables.",
        productImg:"https://m-dorio.github.io/foodstore/images/img-C09.jpg"
    }
]

export default productsData;
