const fs = require('fs');

const input = process.argv[2];
const output = process.argv[3];

if (!input || !output) {
  let message = 'Missing: ';
  if (!input) {
    message = message.concat('input txt file');
  }
  if (!output) {
    if (message.includes('input')) {
      message = message.concat(', output filename');
    } else {
      message = message.concat('output filename');
    }
  }
  throw Error(message);
}

fs.readFile(input, 'utf-8', function(err, res) {
  const iconMap = res.split('\n');

  const tuples = iconMap.map(icon => {
    const tuple = icon.split(': ');
    return tuple;
  });
  const dictionary = {};
  for (const [icon, label] of tuples) {
    const parts = icon.split('-');
    const id = parts[parts.length - 1];
    const iconify = parts
      .reduce((acc, curr) => {
        if (curr === 'wi') {
          return acc;
        } else {
          return [...acc, curr];
        }
      }, [])
      .join('-');

    dictionary[id] = {
      icon,
      iconify,
      label,
    };
  }

  fs.writeFile(output, JSON.stringify(dictionary), function(err, _) {
    if (err) {
      throw Error(err);
    }
    console.log(`created file: ${output}`);
    return 0;
  });
});
