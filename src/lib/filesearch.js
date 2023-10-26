'use strict';
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require){
    const fs = require('fs');
    const path = require('path')

    const filesearch = {
        findLessImportsInFile: function(f){
            if (fs.statSync(f) && fs.statSync(f).isFile() === false) 
                return []
            else{
                let m, files = [];
                const fileContent = fs.readFileSync(f, 'utf8');
                const re = /@import (\(reference\) )?['"](.*?)['"];/g;
                while (m = re.exec(fileContent)){
                    let [ , , filename ] = m;
                    // console.log('found import ' + filename);

                    if (path.extname(filename).length < 1) {
                        // console.log("The imported file does not have an explicit extension, we will assume it's .less", filename);
                        filename = filename + ".less";
                    }

                    if (m) files.push(filename);
                }
                return files;
            }
        },
        isHiddenFile: function (filename) {
            filename = path.basename(filename)
            return filename.substr(0, 1) === '_' || filename.substr(0, 1) === '.';
        }
    }
    return filesearch;
});