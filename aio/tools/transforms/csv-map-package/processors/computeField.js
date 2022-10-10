module.exports = function computeField(toCamelCase, toPascalCase, tsvToJson) {


  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['computeIdsProcessor'],
    $process(docs) {
      const sourceFile = docs.find(doc => doc.docType === 'source-tsv');
      this.source = tsvToJson(sourceFile.data);
      this.message = tsvToJson(docs.find(doc => doc.docType === 'message-tsv').data);
      this.message1 = tsvToJson(docs.find(doc => doc.docType === 'message1-tsv').data);
      this.message2 = tsvToJson(docs.find(doc => doc.docType === 'message2-tsv').data);

       const newObj = {
          docType: 'csv-bean',
          name: sourceFile.fileInfo.baseName,
          data: []
        };
        const lostObj = {
          docType: 'csv-bean',
          name: sourceFile.fileInfo.baseName + '.lost',
          data: []
        };
      Object.keys(this.source).map(key => {
        const retObj = {};
        retObj.key= key;
        retObj.value = this.message[this.source[key]] || this.message1[this.source[key]] || this.message2[this.source[key]];
        if (!retObj.value) {
          lostObj.data.push({key:key, value:this.source[key]});
        }
        newObj.data.push(retObj);
      });

      return [newObj, lostObj];
    }
  };

};
