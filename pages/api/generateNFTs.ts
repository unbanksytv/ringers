import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

const NFT_COUNT = 69;
const OUTPUT_FOLDER = 'nfts';
const METADATA_FOLDER = 'metadata';

export default async function generateNFTs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create the output and metadata folders if they don't exist
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER);
  }

  if (!fs.existsSync(METADATA_FOLDER)) {
    fs.mkdirSync(METADATA_FOLDER);
  }

  for (let i = 0; i < NFT_COUNT; i++) {
    const canvasWidth = 1600;
    const canvasHeight = 900;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext('2d');

    // Generate the artwork using canvas API and "ringers" style
    const backgroundColor = getRandomColor();
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    // Draw the background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the rectangles (rings)
    const numRectangles = getRandomInt(3, 6);
    const rectangleWidth = canvasWidth / numRectangles;

    for (let j = 0; j < numRectangles; j++) {
      const x = j * rectangleWidth;
      const rectangleHeight = canvasHeight / getRandomInt(2, 5);
      const y = (canvasHeight - rectangleHeight) / 2;
      const rectangleColor = j % 2 === 0 ? color1 : color2;

      context.fillStyle = rectangleColor;
      context.fillRect(x, y, rectangleWidth, rectangleHeight);
    }

    // Save the canvas as an image
    const fileName = `nft-${i}.png`;
    const outputPath = `${OUTPUT_FOLDER}/${fileName}`;
    const stream = canvas.createPNGStream();
    const out = fs.createWriteStream(outputPath);
    stream.pipe(out);

    // Generate and save metadata
    const metadata = {
      title: `NFT ${i}`,
      description: 'Living the Dream Life',
      edition: `Edition ${i}`,
      artist: 'Your Name',
      // Add more metadata attributes as needed
    };
    const metadataFileName = `metadata-${i}.json`;
    const metadataOutputPath = `${METADATA_FOLDER}/${metadataFileName}`;
    fs.writeFileSync(metadataOutputPath, JSON.stringify(metadata, null, 2));
  }

  res.status(200).json({ message: 'NFTs generated successfully' });
}

// Helper function to generate a random color
function getRandomColor() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to generate a random integer within a range
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
