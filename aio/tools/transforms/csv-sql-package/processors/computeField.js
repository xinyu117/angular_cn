const moment = require('moment');
module.exports = function computeField(toCamelCase, toPascalCase, tsvToJson, propertyToJson) {

  function createBeanProperty(item, i, property) {
    const obj = {};
    Object.assign(obj, item);
    // obj.property = toCamelCase(item.name);
    if (obj.search_label_2 != undefined) {
      const chartList = obj.search_label_2.split('');
      chartList.shift();
      chartList.pop();
      obj.search_label_2 = '\'' + chartList.join('') + String(i).padStart(6, '0') + '\'';
    }
    if (obj.search_label_1 != undefined) {
      const chartList = obj.search_label_1.split('');
      chartList.shift();
      chartList.pop();
      obj.search_label_1 = '\'' + chartList.join('') + String(i).padStart(6, '0') + '\'';
    }

    if (obj.project_id != undefined) {
      //obj.project_id = obj.project_id + i;
    }

    return obj;
  }

  function createMonths(item, i, property, monthCount) {
    const months = [];
    for (let k = 0; k <= monthCount; k++) {
      const newObj = createBeanProperty(item, i, property);
      const date = moment(property.report_date, 'YYYYMM').add(k, 'months').format('YYYYMM');
      newObj.report_date = date;
      const newValues = Object.values(newObj).join(',');

      months.push(newValues);
    }
    return months;
  }

  function addObj(item, property) {
    const obj = {};
    Object.assign(obj, item);
    obj.project_id = '\'' + property.project_id + '\'';
    return obj;
  }


  function createBaseObj(doc) {
    const rowList = doc.data;
    const newDoc = {
      docType: 'csv-bean',
      fileInfo: doc.fileInfo,
      // className: toPascalCase(doc.fileInfo.baseName),
      data: []
    };
    const baseObj = rowList[0];
    const keys = Object.keys(baseObj).join(',');
    const values = Object.values(baseObj).join(',');
    newDoc.keys = keys;
    newDoc.values = values;
    newDoc.baseObj = baseObj;
    return newDoc;
  }
  function listObj2ValueList(objList) {
    return objList.map(obj => Object.values(obj).join(','));
  }
  function deleteStartEnd(str) {
    const chartList = str.split('');
    chartList.shift();
    chartList.pop();
    return chartList.join('');
  }
  function expandReport_date(obj, monthCount, reportDate) {
    const months = [];
    for (let k = 0; k <= monthCount; k++) {
      const date = moment(reportDate, 'YYYYMM').add(k, 'months').format('YYYYMM');
      obj.report_date = date;
      const newObj = {};
      Object.assign(newObj, obj);
      // const newValues = Object.values(obj).join(',');
      //months.push(newValues);
      months.push(newObj);
    }
    return months;
  }
  function expandUser_id(obj, userCount) {
    const months = [];
    const baseUserId = deleteStartEnd(obj.user_id);
    const baseLabel1 = deleteStartEnd(obj.search_label_1);
    for (let k = 0; k <= userCount; k++) {
      const user_id = '\'' + baseLabel1 + '_' + baseUserId + String(k).padStart(6, '0') + '\'';
      obj.user_id = user_id;
      // const newValues = Object.values(obj).join(',');

      // months.push(newValues);
      const newObj = {};
      Object.assign(newObj, obj);
      months.push(newObj);
    }
    return months;
  }
  function changeSearch_label_2(obj, index) {
    const chartList = obj.search_label_2.split('');
    chartList.shift();
    chartList.pop();
    obj.search_label_2 = '\'' + chartList.join('') + String(index).padStart(6, '0') + '\'';
  }
  function changeSearch_label_1(obj, index) {
    const chartList = obj.search_label_1.split('');
    chartList.shift();
    chartList.pop();
    obj.search_label_1 = '\'' + chartList.join('') + String(index).padStart(6, '0') + '\'';
  }

  function generateReport_common_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    ///  const count = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;

    // for (let i = 0; i < count; i++) {
    const addedRow = addObj(baseObj, property);
    //   changeSearch_label_2(addedRow, i);
    const newValues = listObj2ValueList(expandReport_date(addedRow, monthCount, reportDate));
    newDoc.data.push(...newValues);
    //  }
    return newDoc;
  }

  function generateEsg_report_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    ///  const count = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;

    // for (let i = 0; i < count; i++) {
    const addedRow = addObj(baseObj, property);
    //   changeSearch_label_2(addedRow, i);
    const newValues = listObj2ValueList(expandReport_date(addedRow, monthCount, reportDate));
    newDoc.data.push(...newValues);
    //  }
    return newDoc;
  }

  function generateEsg_office_report_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    const count = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;

    for (let i = 0; i < count; i++) {
      const addedRow = addObj(baseObj, property);
      changeSearch_label_2(addedRow, i);
      const newValues = listObj2ValueList(expandReport_date(addedRow, monthCount, reportDate));
      newDoc.data.push(...newValues);
    }
    return newDoc;
  }

  function generatePrint_monitor_report_common_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    ///  const count = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;

    // for (let i = 0; i < count; i++) {
    const addedRow = addObj(baseObj, property);
    //   changeSearch_label_2(addedRow, i);
    const newValues = listObj2ValueList(expandReport_date(addedRow, monthCount, reportDate));
    newDoc.data.push(...newValues);
    //  }
    return newDoc;
  }


  function generatePrint_monitor_office_report_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    const count = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;

    for (let i = 0; i < count; i++) {
      const addedRow = addObj(baseObj, property);
      changeSearch_label_1(addedRow, i);
      const newValues = listObj2ValueList(expandReport_date(addedRow, monthCount, reportDate));
      newDoc.data.push(...newValues);
    }
    return newDoc;
  }
  function generatePrint_monitor_user_report_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const reportDate = property.report_date;
    const officeCount = property[doc.fileInfo.baseName].count;
    const monthCount = property[doc.fileInfo.baseName].monthCount;
    const userCount = property[doc.fileInfo.baseName].userCount;

    for (let i = 0; i < officeCount; i++) {
      const addedRow = addObj(baseObj, property);
      changeSearch_label_1(addedRow, i);
      const monthList = expandReport_date(addedRow, monthCount, reportDate);
      for (let obj of monthList) {
        const newValues = listObj2ValueList(expandUser_id(obj, userCount));
        newDoc.data.push(...newValues);
      }


    }
    return newDoc;
  }

  function generateEsg_user_info(doc, property) {
    const newDoc = createBaseObj(doc);
    const baseObj = newDoc.baseObj;
    const count = property[doc.fileInfo.baseName].count;
    const userCount = property[doc.fileInfo.baseName].userCount;

    for (let i = 0; i < count; i++) {
      const addedRow = addObj(baseObj, property);
      changeSearch_label_1(addedRow, i);
      const newValues = listObj2ValueList(expandUser_id(addedRow, userCount));
      newDoc.data.push(...newValues);
    }
    return newDoc;
  }


  return {
    $runAfter: ['readFilesProcessor'],
    $runBefore: ['computeIdsProcessor'],
    fieldMapping: {

    },
    $process(docs) {
      const newDocs = [];
      // this.fieldMapping = tsvToJson(docs.find(doc => doc.docType === 'dict-tsv').data);
      this.fieldMapping2 = propertyToJson(docs.find(doc => doc.docType === 'dict-property').data);
      docs.filter(doc => {
        if (doc.docType !== 'csv') return true;


        if (doc.fileInfo.baseName == 'report_common_info') {
          const newDoc = generateReport_common_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'esg_report_info') {
          const newDoc = generateEsg_report_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'esg_office_report_info') {
          const newDoc = generateEsg_office_report_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'print_monitor_report_common_info') {
          const newDoc = generatePrint_monitor_report_common_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'print_monitor_office_report_info') {
          const newDoc = generatePrint_monitor_office_report_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'print_monitor_user_report_info') {
          const newDoc = generatePrint_monitor_user_report_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }
        if (doc.fileInfo.baseName == 'esg_user_info') {
          const newDoc = generateEsg_user_info(doc, this.fieldMapping2);
          newDocs.push(newDoc);
        }





      });
      return docs.concat(newDocs);
    }
  };

};

  // function findKey(obj, fn) {
  //   const key = Object.keys(obj).find(key => fn(obj[key], key, obj));
  //   return obj[key];
  // }

