// NFTGenerator.js

// Import the necessary libraries
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const p5 = require('p5');

// Constants
const NFT_COUNT = 69; // Number of NFTs to generate
const OUTPUT_FOLDER = 'nfts'; // Folder to store the generated NFTs
const METADATA_FOLDER = 'metadata'; // Folder to store the metadata

// Create the output and metadata folders if they don't exist
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

if (!fs.existsSync(METADATA_FOLDER)) {
  fs.mkdirSync(METADATA_FOLDER);
}

// Function to generate the NFTs
const generateNFTs = () => {
  for (let i = 0; i < NFT_COUNT; i++) {
    new p5((p) => {
      const canvasWidth = 1600; // Width of the canvas (16:9 ratio)
      const canvasHeight = 900; // Height of the canvas (16:9 ratio)

      p.setup = function () {
        const canvas = createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvas-container'); // Replace 'canvas-container' with the ID of your HTML container
      };

      p.draw = function () {
        // Add your artwork drawing code here
        // Generate Mark Rothko inspired artwork

        // Save the canvas as an image
        const fileName = `nft-${i}.png`;
        const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
        const stream = canvas.createPNGStream();
        const out = fs.createWriteStream(outputPath);
        stream.pipe(out);

        // Generate and save metadata
        const metadata = {
          name: `NFT ${i}`,
          description: 'Mark Rothko inspired NFT',
          image: fileName,
          // Add more metadata attributes as needed
        };
        const metadataFileName = `metadata-${i}.json`;
        const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
        fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));

        // Check if the desired number of NFTs has been generated
        if (i >= NFT_COUNT - 1) {
          // Exit the sketch
          p.noLoop();
        }
      };
    });
  }
};

// Call the function to generate the NFTs
generateNFTs();
