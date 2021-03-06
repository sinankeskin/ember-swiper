/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Adds style imports for the ember-swiper5 addon.',

  normalizeEntityName() {},

  beforeInstall() {
    let dependencies = this.project.dependencies();

    if ('ember-cli-sass' in dependencies) {
      this.extension = 'scss';
    } else if ('ember-cli-less' in dependencies) {
      this.extension = 'less';
    } else {
      this.extension = 'none';
    }

    return;
  },

  afterInstall() {
    if (this.extension !== 'none') {
      this.moveFiles(this.extension);

      return this.writeImport(this.extension);
    }

    return;
  },

  moveFiles(extension) {
    const inputDir = path.join('node_modules', 'swiper');
    const outputDir = path.join('app', 'styles');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const folders = ['components', `${extension}`];

    folders.forEach((folder) => {
      this.copyFolderSync(
        path.join(inputDir, folder),
        path.join(outputDir, folder),
        extension
      );
    });

    const files = [
      {
        src: `swiper.${extension}`,
        dst: `ember-swiper5.${extension}`,
      },
    ];

    if (extension === 'less') {
      files.push({
        src: 'src/less/plugin.js',
        dst: 'less/plugin.js',
      });
    }

    files.forEach(({ src, dst }) => {
      fs.copyFileSync(path.join(inputDir, src), path.join(outputDir, dst));
    });
  },

  copyFolderSync(from, to, extension) {
    if (!fs.existsSync(to) && !to.endsWith(`.${extension}`)) {
      fs.mkdirSync(to);
    }

    fs.readdirSync(from).forEach((element) => {
      if (fs.lstatSync(path.join(from, element)).isFile()) {
        if (element.endsWith(`.${extension}`)) {
          fs.copyFileSync(path.join(from, element), path.join(to, element));
        }
      } else {
        this.copyFolderSync(
          path.join(from, element),
          path.join(to, element),
          extension
        );
      }
    });
  },

  writeImport(extension) {
    const importStatement = '\n@import "ember-swiper5";\n';

    const stylePath = path.join('app', 'styles');

    const file = path.join(stylePath, `app.${extension}`);

    if (fs.existsSync(file)) {
      this.ui.writeLine(`Added import statement to ${file}`);

      return this.insertIntoFile(file, importStatement);
    } else {
      this.ui.writeLine(`Created ${file}`);

      return fs.writeFileSync(file, importStatement);
    }
  },
};
