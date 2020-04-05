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
  },

  afterInstall() {
    if (this.extension !== 'none') {
      this.moveFiles(this.extension);
      this.writeImport(this.extension);
    }
  },

  moveFiles(extension) {
    const inputDir = path.join('node_modules', 'swiper');
    const outputDir = path.join('app', 'styles');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const files = [`swiper.${extension}`];

    files.forEach((file) => {
      fs.copyFileSync(path.join(inputDir, file), path.join(outputDir, file));
    });

    fs.renameSync(path.join(outputDir, `swiper.${extension}`), path.join(outputDir, `ember-swiper5.${extension}`));

    const folders = ['components', `${extension}`];

    folders.forEach((folder) => {
      copyFolderSync(path.join(inputDir, folder), path.join(outputDir, folder), extension);
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
        this.copyFolderSync(path.join(from, element), path.join(to, element), extension);
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

      return fs.writeFile(file, importStatement);
    }
  },
};
