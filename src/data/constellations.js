export const constellations = [
    {
      name: "Orion",
      meaning: "The Hunter - Symbolizing strength and adventure",
      stars: [
        { x: 0, y: 2, z: -5, size: 1.2 },  // Betelgeuse
        { x: 1.5, y: 0, z: -5, size: 1.0 }, // Bellatrix
        { x: 1.5, y: -1, z: -5, size: 0.8 }, // Alnilam
        { x: 0, y: -2, z: -5, size: 1.1 },  // Rigel
        { x: -1.5, y: 0, z: -5, size: 0.9 } // Saiph
      ],
      lines: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 3]
      ]
    },
    {
      name: "Ursa Major",
      meaning: "The Great Bear - Representing guidance and protection",
      stars: [
        { x: -2, y: 3, z: -5, size: 0.9 },
        { x: -1, y: 2, z: -5, size: 0.8 },
        { x: 0, y: 2.5, z: -5, size: 0.7 },
        { x: 1, y: 3, z: -5, size: 0.8 },
        { x: 2, y: 2, z: -5, size: 0.9 },
        { x: 3, y: 1, z: -5, size: 0.7 },
        { x: 4, y: 0, z: -5, size: 0.8 }
      ],
      lines: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
      ]
    },
    // Add other constellations similarly...
  ];