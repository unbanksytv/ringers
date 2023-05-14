// pages/api/generateNFTs.ts

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

    // Add your NFT generation logic here
    // Generate the artwork using canvas API and Mark Rothko colors

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
