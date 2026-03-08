import { NextRequest, NextResponse } from "next/server";

// This content lives ONLY on the server — it is never bundled into client JavaScript.
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

// Valid book IDs (1–11)
const VALID_BOOK_IDS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (!id || !VALID_BOOK_IDS.has(id)) {
        return NextResponse.json(
            { error: "Book not found" },
            { status: 404 }
        );
    }

    // In the future, each book could have unique content.
    // For now, all books share the same sample text.
    return NextResponse.json({ paragraphs: commonSampleText });
}
