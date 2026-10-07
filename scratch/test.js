import https from 'https';

https.get('https://cdn.assets.salla.network/themes/default/temporary/form-builder-3.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let pos = 0;
    while ((pos = data.indexOf('selected', pos)) !== -1) {
      if (data.substring(pos - 50, pos + 50).includes('dropdown-list') || data.substring(pos - 50, pos + 50).includes('multichoice')) {
        console.log('--- MATCH at', pos, '---');
        console.log(data.substring(pos - 100, pos + 250));
      }
      pos += 8;
    }
  });
});
