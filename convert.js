import sharp from 'sharp';
sharp('src/assets/images/hero-bg.png')
    .webp({ quality: 60 })
    .toFile('src/assets/images/hero-bg.webp')
    .then(() => console.log('Converted hero-bg.png to webp'))
    .catch(err => console.error(err));
