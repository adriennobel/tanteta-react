const StudioShootingDetails = [
    {
        id: "SSSF",
        name: "Solo Shooting (Woman)",
        nameId: "solo-shooting-woman",
        numPeople: 1,
        startprice: 5000,
        desc: "Studio shooting for one lady",
        category: "Studio Shooting",
        categoryId: "studio-shooting",
        pricepacks: [
            {
                price: 5000,
                desc: "One person, One outfit, 15 mins, Two edited photos",
            },
            {
                price: 10000,
                desc: "One person, Two outfits, 30 mins, Five edited photos",
            },
            {
                price: 15000,
                desc: "One person, Three outfits, 45 mins, Eight edited photos",
            },
        ],
        images: [
            {
                src: "/images/TAN_9651.jpg",
                alt: " ",
            },
            {
                src: "/images/TAN_2761.jpg",
                alt: " ",
            },
            {
                src: "/images/TAN_9745.jpg",
                alt: " ",
            },
            {
                src: "/images/TAN_1894.jpg",
                alt: " ",
            },
            {
                src: "/images/TAN_9628.jpg",
                alt: " ",
            },
        ],
        calculator: "yes",
    },
    {
        id: "SSSM",
        name: "Solo Shooting (Man)",
        nameId: "solo-shooting-man",
        numPeople: 1,
        startprice: 5000,
        desc: "Studio shooting for one gentleman",
        category: "Studio Shooting",
        categoryId: "studio-shooting",
        pricepack1: {
            price: 5000,
            pricedesc: "One person, One outfit, 15 mins, Two edited photos",
        },
        pricepack2: {
            price: 10000,
            pricedesc: "One person, Two outfits, 30 mins, Five edited photos",
        },
        pricepack3: {
            price: 15000,
            pricedesc: "One person, Three outfits, 45 mins, Eight edited photos",
        },
    },
    {
        id: "SSC",
        name: "Duo Shooting",
        nameId: "duo-shooting",
        numPeople: 2,
        startprice: 9000,
        desc: "Studio shooting for two people",
        category: "Studio Shooting",
        categoryId: "studio-shooting",
    },
    {
        id: "SSG",
        name: "Group Shooting",
        nameId: "group-shooting",
        numPeople: 3,
        startprice: 12000,
        desc: "Studio shooting for a group of people",
        category: "Studio Shooting",
        categoryId: "studio-shooting",
    },
];

export default StudioShootingDetails;

/*
-----
ID KEY
SS: Studio Shooting
OS: Outdoor Shooting
HS: Home Shooting
EH: Event Coverage Per Hour
EP: Event Coverage Per Package
PF: Prints & Frames

Sub-category to Studio
    S: Single
        F: Female
        M: Male
    C: Duo
    G: Group
    P: Preggy
    B: Baby
    N: Newborn
    A: Artistic
Sub-category to Outdoor
    S: Single
    C: Duo
    G: Group
    P: Preggy
    A: Artistic
Sub-category to Home
    S: Single
    C: Duo
    G: Group
    P: Preggy
    A: Artistic
-----
*/