export interface Book {
    id: number;
    title: string;
    year: string;
    genre: string;
    desc: string;
    synopsis: string;
    buyLink: string;
    readLink: string;
    coverImage: string; // Added coverImage field
    sampleText: string[]; // Array of paragraphs for the reader
}

const commonSampleText = [
    "The door opened with the kind of silence that screams.",
    "It wasn't a physical sound, but a pressure drop in the room, popping my ears. I looked up from my coffee, expecting to see the waiter, or perhaps a lost tourist looking for the museum. Instead, I saw nothing but the empty frame of the door, and the hallway stretching out beyond it, longer than it should be.",
    "I had lived in this apartment for three years. I knew that hallway. It ended five meters down at the elevator. But now, it seemed to stretch into a vanishing point that made my eyes water just trying to focus on it. The carpet pattern—a garish 70s floral—repeated ad nauseam, a fractal of bad taste spiraling into infinity.",
    "I put my cup down. The porcelain clinked against the saucer, a sharp, singular note that hung in the air too long, refusing to fade. That was the second sign.",
    "Standing up felt heavy, like moving through water. The air was thick, syrupy with static. I took a step towards the door. My shadow didn't follow me. It stayed seated at the table, darker than it should be, its edges crisp and unmoving.",
    "'Hello?' I called out. My voice sounded flat, dead, like I was speaking into a pillow.",
    "No answer from the hallway. Just the hum of the fluorescent lights, which flickered in a rhythm that felt almost like a code. Dash-dot-dot-dash. I tried to decipher it, but my brain felt sluggish.",
    "I reached the threshold. The air in the hallway was colder, smelling of ozone and old paper. I looked left, towards where the stairs should be. Wall. Just a blank, beige wall.",
    "I looked right, towards the impossible distance. And there, way down in the perspective point, something moved. A figure. Small, like a child, or something crouching.",
    "It stood up. It wasn't a child.",
    "I tried to step back, to slam the door, but the doorframe was gone. I was standing in the open, the apartment behind me dissolving into mist. The table, the coffee, my stubborn shadow—all fading into a grey fog.",
    "The figure began to walk towards me. It moved with a jerky, stop-motion gait, omitting frames of reality. One moment it was hundred meters away, the next fifty. It wore a suit that looked too large, the fabric shifting like oil on water.",
    "I turned to run, but my feet were heavy, rooted. The floral carpet seemed to be growing, the vines twisting around my ankles. I looked down. They weren't vines. They were fingers.",
    "Thousands of woven fingers, reaching up from the floor loom, grasping at my shoes. I kicked out, tearing free with a sound like ripping canvas.",
    "The figure was closer now. I could see its face. Or rather, the lack of one. Smooth, pale skin where features should be. No eyes, no nose. Just a mouth. A vertical slit that seemed stitched shut.",
    "It stopped ten paces from me. The static in the air grew so intense I could taste metal.",
    "The mouth slit tore open.",
    "'You are late,' it said. The voice didn't come from the figure. It came from inside my own head, resonating in my skull like a bell.",
    "'Late for what?' I screamed, the panic finally breaking through the sluggishness.",
    "'The reading,' it said. 'The story cannot continue without the observer.'",
    "And then the world snapped to black.",
    "When I opened my eyes, I was back at the table. Coffee steam rising in a perfect spiral. The door was closed. My shadow was back on the floor, where it belonged.",
    "But on the table, next to my cup, was a book I had never bought. Bound in grey fabric. No title.",
    "I reached out to touch it. The cover was warm.",
    "And then the heard it. A knock at the door. Three sharp raps.",
    "I didn't answer. I knew who it was. Or rather, what it was.",
    "I opened the book instead. Chapter one.",
    "'The door opened with the kind of silence that screams...'"
];

export const books: Book[] = [
    {
        id: 1,
        title: "The Silent Echo",
        year: "2024",
        genre: "Thriller",
        desc: "In a room that doesn't exist, a voice answers back.",
        synopsis: "Elara finds a door in her apartment that wasn't there yesterday. Behind it lies a perfect replica of her childhood bedroom, but with one subtle difference: someone else is already sleeping in the bed. As she investigates, she discovers that the echo in the room answers questions she hasn't asked yet.",
        buyLink: "https://example.com/buy/silent-echo",
        readLink: "/books/1/read", // Updated to internal route
        coverImage: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=800&auto=format&fit=crop", // Dark room/corridor
        sampleText: commonSampleText
    },
    {
        id: 2,
        title: "Paper Mornings",
        year: "2023",
        genre: "Slice of Life",
        desc: "The quiet art of brewing coffee while the world sleeps.",
        synopsis: "A collection of interconnected short stories revolving around a small, 24-hour cafe in Tokyo. From the overworked salaryman to the insomniac artist, everyone leaves a piece of themselves behind with their coffee order.",
        buyLink: "https://example.com/buy/paper-mornings",
        readLink: "/books/2/read",
        coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", // Coffee cup/morning
        sampleText: commonSampleText
    },
    {
        id: 3,
        title: "Fractured Glass",
        year: "2023",
        genre: "Thriller",
        desc: "Memories that cut when you try to hold them.",
        synopsis: "After a car accident, Mark loses his ability to recognize faces. But he starts seeing a recurring figure in every reflection—a man who claims to know why Mark survived the crash, and why he shouldn't have.",
        buyLink: "https://example.com/buy/fractured-glass",
        readLink: "/books/3/read",
        coverImage: "https://images.unsplash.com/photo-1542259682-1d547d636015?q=80&w=800&auto=format&fit=crop", // Broken glass/reflection
        sampleText: commonSampleText
    },
    {
        id: 4,
        title: "August Rain",
        year: "2022",
        genre: "Slice of Life",
        desc: "A summer that lasted a decade.",
        synopsis: "Two childhood friends reunite in their hometown to clean out an old attic. As they sort through dusty boxes, they uncover letters that rewrite the history of their friendship.",
        buyLink: "https://example.com/buy/august-rain",
        readLink: "/books/4/read",
        coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop", // Rain on window
        sampleText: commonSampleText
    },
    {
        id: 5,
        title: "The Clockwork Heart",
        year: "2022",
        genre: "Fantasy",
        desc: "Love in the time of gears and steam.",
        synopsis: "In a city powered by clockwork, an automaton falls in love with its creator. A tragedy about consciousness, free will, and the price of distinctiveness.",
        buyLink: "https://example.com/buy/clockwork-heart",
        readLink: "/books/5/read",
        coverImage: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=800&auto=format&fit=crop", // Gears/abstract
        sampleText: commonSampleText
    },
    {
        id: 6,
        title: "Midnight Station",
        year: "2021",
        genre: "Mystery",
        desc: "The train arrives, but nobody ever leaves.",
        synopsis: "Passengers board the 12:00 AM train at Central Station, expecting to go home. Instead, they arrive at a station that doesn't appear on any map, where the conductor demands a ticket paid in secrets.",
        buyLink: "https://example.com/buy/midnight-station",
        readLink: "/books/6/read",
        coverImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800&auto=format&fit=crop", // Train station/dark
        sampleText: commonSampleText
    },
    {
        id: 7,
        title: "Letters to Nobody",
        year: "2021",
        genre: "Drama",
        desc: "Unsent envelopes piling up in the attic.",
        synopsis: "An epistolary novel composed entirely of letters written but never sent. It explores the things we are too afraid to say to the people we love the most.",
        buyLink: "https://example.com/buy/letters-to-nobody",
        readLink: "/books/7/read",
        coverImage: "https://images.unsplash.com/photo-1579402518429-232d18408f6d?q=80&w=800&auto=format&fit=crop", // Envelopes/letters
        sampleText: commonSampleText
    },
    {
        id: 8,
        title: "Shadows of Red",
        year: "2020",
        genre: "Thriller",
        desc: "Some colors are darker than black.",
        synopsis: "A colorblind painter suddenly starts seeing the color red. It appears only on people who differ from the crowd—people who are about to die.",
        buyLink: "https://example.com/buy/shadows-of-red",
        readLink: "/books/8/read",
        coverImage: "https://images.unsplash.com/photo-1503525148065-d749a02d456a?q=80&w=800&auto=format&fit=crop", // Red/Dark Abstract
        sampleText: commonSampleText
    },
    {
        id: 9,
        title: "The Coffee Shop",
        year: "2020",
        genre: "Slice of Life",
        desc: "Conversations overheard at table four.",
        synopsis: "A deep dive into the mundanity of life, observing the fleeting interactions of strangers in a busy metropolitan coffee shop.",
        buyLink: "https://example.com/buy/the-coffee-shop",
        readLink: "/books/9/read",
        coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop", // Cafe interior
        sampleText: commonSampleText
    },
    {
        id: 10,
        title: "Winter's Breath",
        year: "2019",
        genre: "Poetry",
        desc: "Frost patterns on a warm windowpane.",
        synopsis: "A collection of poems exploring isolation, warmth, and the quiet beauty of winter landscapes.",
        buyLink: "https://example.com/buy/winters-breath",
        readLink: "/books/10/read",
        coverImage: "https://images.unsplash.com/photo-1483664852095-d6cc6870705d?q=80&w=800&auto=format&fit=crop", // Winter/Snow
        sampleText: commonSampleText
    },
    {
        id: 11,
        title: "The Last Chapter",
        year: "2019",
        genre: "Meta-Fiction",
        desc: "When the protagonist realizes they are being written.",
        synopsis: "A character in a novel becomes self-aware and attempts to communicate with the author to change their tragic ending.",
        buyLink: "https://example.com/buy/last-chapter",
        readLink: "/books/11/read",
        coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop", // Writing/Typewriter
        sampleText: commonSampleText
    },
];
