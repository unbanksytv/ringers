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

      function draw() {
        let e = ps.sampleRate * width / 800;
        let s = ps.useSecForFill ? ps.secCol : ps.hlCol;
        let r = ps.useSecBg ? ps.secCol : ps.bgcol;
        background(r);
      
        let n = width * ps.padding * 0.08;
        let p = width - 2 * n;
        let l = height - 2 * n;
        let c = p / ps.gridD;
        let a = [];
      
        if (ps.pAlg === G_ALG) {
          pOnGrid(a, n, c);
        } else if (ps.pAlg === R_G_ALG) {
          pOnRGrid(a, n, n, p, l);
        }
      
        let h = !!ps.forceCentroid && [rng(0, 2 * c), rng(height / 2, height)];
      
        if (ps.vRad !== C_RAD) {
          let e = ps.vRad === BIGGER_NEAR_RAD;
          a.forEach((t, s) => {
            let r = distance(width / 2, height / 2, t.cx, t.cy);
            let n = 1 / (1 + r / (width / 5));
            let p = (1 + r + c) / distance(width / 2, height / 2, 0, 0);
            let l = rng(0.8, 1) * (e ? n : p);
            t.r *= l;
          });
        }
      
        let { samples: f, leftOver: d } = sampleSize(a, parseInt(ps.max * a.length));
        let u = new Ring(f);
        u.generate(ps.wrapped, h);
        noStroke();
      
        if (ps.fill) {
          let col = ps.useSecForFill ? ps.secCol : ps.fCCol ? ps.hlCol : ps.sCol;
          fill(col);
        } else {
          noFill();
        }
      
        stroke(ps.sCol);
        strokeWeight(e);
        u.draw();
      
        let g = rngFloor(0, f.length);
      
        if (f.length > 1) {
          f.forEach((s, r) => {
            let p = s.isConcave ? ps.hlCol : ps.sCol;
            let l = r === g ? ps.hlCol : p;
            stroke(ps.sCol);
            fill(l);
            let a = 2 * s.r;
      
            if (ps.shrinkConcavePegs && s.isConcave && s.r >= 2 * e) {
              a *= 0.4;
            }
      
            circle(s.cx, s.cy, a);
      
            if (ps.drawAllPoints) {
              noStroke();
              let t, c = 0;
              for (t = ps.concentric ? r % 2 == 0 ? 4 : 2 : s.id % 2 != 0 ? 4 : 2; a > e && a - t * e > e; ) {
                a -= t * e;
                let r, n = r === g && ps.useSecBg && ps.useSecBg !== r;
                r = c % 2 == 0 ? n ? ps.secCol : ps.sCol : n ? ps.sCol : n ? ps.secCol : ps.bgcol;
                fill(r);
                circle(s.cx, s.cy,a);
                  c++;
                  }
                  }
                  });
                  }
                  
                  if (ps.drawAllPoints) {
                  g = rngFloor(0, d.length);
                  
                  
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
