import fetch from 'node-fetch';
import fs from 'fs';

const filePath = 'file.txt';
const searchString = '';

const Wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const downloadFile = async (url, path) => {
    const response = await fetch(url);
    const fileStream = fs.createWriteStream(path);

    await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", reject);
        fileStream.on("finish", resolve);
    });
};

fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    const foundStrings = [];

    lines.forEach(line => {
        let startIndex = line.indexOf(searchString);

        while (startIndex !== -1) {
            startIndex += searchString.length;
            const endIndex = line.indexOf(')', startIndex);

            if (endIndex !== -1) {
                const foundString = line.substring(startIndex, endIndex);
                foundStrings.push(foundString);
                startIndex = line.indexOf(searchString, endIndex);
            } else {
                break;
            }
        }
    });

    const postStr = ''
    for (const item of foundStrings) {
        await Wait(100);
        downloadFile(postStr + item, 'file/' + item)
    }
});


