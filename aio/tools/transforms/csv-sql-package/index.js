const Package = require('dgeni').Package;
const basePackage = require('../csv-base-package');


const { CONTENTS_PATH, TEMPLATES_PATH, DOCS_OUTPUT_PATH, requireFolder } = require('../config');


module.exports = new Package('csv-sql', [basePackage])

    .processor(require('./processors/computeField'))
    .factory(require('./services/toSQL'))

    .config(function (readFilesProcessor, csvFileReader, tsvFileReader, propertyFileReader) {
        readFilesProcessor.fileReaders.push(csvFileReader);
        readFilesProcessor.fileReaders.push(tsvFileReader);
        readFilesProcessor.fileReaders.push(propertyFileReader);
        readFilesProcessor.sourceFiles = readFilesProcessor.sourceFiles.concat([
            {
                basePath: CONTENTS_PATH,
                include: CONTENTS_PATH + '/csvSql/*.csv',
                fileReader: 'csvFileReader'
            },
            {
                basePath: CONTENTS_PATH,
                include: CONTENTS_PATH + '/csvSql/dict.property',
                fileReader: 'propertyFileReader'
            }
        ]);

    })

    // Where do we write the output files?
    .config(function (writeFilesProcessor) { writeFilesProcessor.outputFolder = DOCS_OUTPUT_PATH; })


    // Configure nunjucks rendering of docs via templates
    .config(function (templateFinder, templateEngine, getInjectables) {

        // Where to find the templates for the doc rendering
        templateFinder.templateFolders = [TEMPLATES_PATH];

        // Standard patterns for matching docs to templates
        templateFinder.templatePatterns = [
          //  'bean.template.java', // Ebean用的DTO
            'sql.template.js'   // 标准Java Bean
        ];

        // Nunjucks and Angular conflict in their template bindings so change Nunjucks
        templateEngine.config.tags = { variableStart: '{$', variableEnd: '$}' };

        templateEngine.filters =
            templateEngine.filters.concat(getInjectables(requireFolder(__dirname, './rendering')));
    })
    .config(function(computePathsProcessor) {
        computePathsProcessor.pathTemplates.push({
          docTypes: ['csv-bean'],
          pathTemplate: '${id}',
          outputPathTemplate: '${path}.sql'
        });
      })




    ;
