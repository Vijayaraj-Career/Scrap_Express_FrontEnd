import _ from 'lodash';
import { Tooltip } from '@mui/material';
import { Math } from 'core-js';
import { format, parse, startOfDay } from 'date-fns';
import { Workbook } from 'exceljs';
import {jwtDecode} from 'jwt-decode';
import {jwtEncode} from 'jwt-encode';

class Utils {
  fixArrayDates = (arr, fmt, gmt) => {
    return arr.map((element) => {
      const ele = { ...element };
      const keys = Object.keys(ele);
      keys.forEach((key) => {
        const value = ele[key];
        try {
          if (
            value?.toString().match(/^\d{4}-\d{2}-\d{2}T/) ||
            value instanceof Date ||
            value?.toString().match(/^\d{4}-\d{2}-\d{2}$/)
          ) {
            const date = gmt ? this.gmtDateFix(new Date(value)) : new Date(value);
            const time = date.getHours() || date.getMinutes() ? ' HH:mm' : '';
            if (fmt === 'dateTime') fmt = `dd/MM/yyyy${time}`;
            ele[key] = fmt ? format(date, fmt) : date;
          }
        } catch (e) {
          console.log('error!',e);
        }
      });
      return ele;
    });
  };

  isNumber = (n) => !Number.isNaN(Number(n));

  isInt = (n) => n % 1 === 0;

  isObjectEqual = (a, b) => _.isEqual(a, b);

  handleNumber = (n) => (n != null ? n : '');

  decimalPoint = (val, point) => Number(val).toFixed(point);

  createHeader = (id, name, value, color) => ({ id, name, value, color });

  createDataGridHeader = (
    field,
    headerName,
    width,
    flex,
    minWidth = null,
    toolTip = '',
    hyperLink = true,
    cellClassName
  ) => ({
    field,
    headerName,
    width,
    flex,
    minWidth,
    cellClassName: (param) => {
      if (typeof cellClassName === 'function') {
        return cellClassName(param);
      }

      return '';
    },
    renderCell: ({ value }) => {
      const title = typeof value !== 'object' ? value : toolTip;
      const string = hyperLink && typeof value === 'string';
      const url = string ? value.split(', ').map((u) => this.testURL(u)) : null;

      return url?.every((u) => u) ? (
        value.split(', ').map((u, i) => (
          <Tooltip key={i} title={u}>
            <span className="truncate">
              <a className="truncate" target="_blank" rel="noopener noreferrer" href={u}>
                {u}
              </a>
              ,
            </span>
          </Tooltip>
        ))
      ) : (
        <Tooltip title={title}>
          <span className="truncate w-full">{value}</span>
        </Tooltip>
      );
    },
  });

  parseDate = (val, fmt) => parse(val, fmt || 'dd/MM/yyyy', new Date());

  getDate = () => format(new Date(), 'yyyyMMddHHmmss');

  fixArrayObjProps = (arr, header) =>
    arr.map((a) =>
      Object.keys(header).reduce((c, b) => {
        const k = Object.keys(a)
          .filter((key) => this.toNoSpace(key) === this.toNoSpace(b))
          .at(0);
        const v = a[k];
        return { ...c, [header[b]]: typeof v === 'number' ? v : v || null };
      }, {})
    );

  toNoSpace = (s) => s.toLowerCase().replaceAll(/ /g, '');

  objectSlice = (arr, start, end) => Object.fromEntries(Object.entries(arr).slice(start, end));

  arrayToExcelBuffer = async (arr, name, buffer, modifySheet, formulas, sumColumns) => {
    const workbook = new Workbook();
    if (buffer) {
      await workbook.xlsx.load(buffer);
    }
    const worksheet = workbook.addWorksheet(name);

    let rowIndex = 2;
    arr.forEach((item) => {
      const row = worksheet.getRow(rowIndex);

      if (rowIndex === 2) {
        const firstRow = worksheet.getRow(1);
        Object.keys(item).forEach((k, i) => {
          const cell = firstRow.getCell(i + 1);

          cell.value = k;
          this.setBorder(cell);
        });
      }

      Object.keys(item).forEach((v, i) => {
        let value = item[v];
        const cell = row.getCell(i + 1);

        if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T/i)) {
          const newDate = this.gmtDateFix(new Date(value));
          value = newDate;
        }

        if (typeof value === 'string' && value.match(/^\d{2}\/\d{2}\/\d{4}$/i)) {
          const parts = this.swappingArray(value.split('/'), 0, 1).join('/');
          const newDate = this.gmtDateFix(parse(parts, 'MM/dd/yyyy', new Date()));
          value = newDate;
        }

        cell.value = value;
        this.setBorder(cell);
        if (v?.toLowerCase() === 'message') this.setValidation(cell, value);
      });

      rowIndex += 1;
    });

    const formulacolumns = Object.keys(formulas || []);

    arr.forEach((element, index) => {
      formulacolumns?.forEach((column) => {
        const formula = formulas[column] || ['default formula'];
        worksheet.getCell(`${column}${index + 2}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`"${formula.join(',')}"`],
        };
      });
    });

    worksheet.columns.forEach((c) => {
      const values = c.values
        .map((v) => (v instanceof Date ? 10 : `${v}`?.length) * 1.5)
        .filter((i) => i);
      c.width = Math.max(...values, 10);
    });

    if (typeof modifySheet === 'function') modifySheet(worksheet);

    if (Array.isArray(sumColumns)) {
      const headerRow = worksheet.getRow(1);
      const lastRowIndex = worksheet.rowCount + 1;

      sumColumns.forEach((colName) => {
        const colIndex = headerRow.values.indexOf(colName);
        if (colIndex > 0) {
          const columnLetter = worksheet.getColumn(colIndex).letter;
          const subtotalCell = worksheet.getCell(`${columnLetter}${lastRowIndex}`);
          subtotalCell.value = {
            formula: `SUBTOTAL(9, ${columnLetter}2:${columnLetter}${lastRowIndex - 1})`,
          };
          this.setBorder(subtotalCell);
        }
      });
    }

    const result = await workbook.xlsx.writeBuffer();

    return result;
  };

  setBorder = (cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  };

  setValidation = (cell, message) => {
    if (message.match(/successfully/i)) {
      cell.font = { color: { argb: 'ff006100' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffc6efce' },
      };

      return;
    }

    cell.font = { color: { argb: 'ff9c0006' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffffc7ce' },
    };
  };

  excelBufferToArray = async (buffer) => {
    try {
      const workbook = new Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.getWorksheet();
      const rows = worksheet._rows;
      const headers = rows[0]._cells.map(({ value, address }) => ({
        value,
        address,
        alpha: address.replace(/\d+/, ''),
      }));

      const modifiedRows = rows
        .slice(1, rows.length)
        .map(({ _cells }) =>
          _cells.reduce((prev, { value, address }) => {
            const header = headers.filter((h) => address.replace(/\d+/, '') === h.alpha).at(0);

            if (value instanceof Date) {
              value = this.gmtDateFix(value, true);
            } else if (value instanceof Object) {
              value = value.text || value.result || value.richText?.at(0)?.text;
            }

            if (typeof value === 'number') value = +value;

            return { ...prev, [header.value]: value };
          }, {})
        )
        .filter((row) => Object.values(row).some((r) => r));

      return modifiedRows;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  bufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  base64ToBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  downloadExcel = (buffer, name) => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = fileURL;
    link.download = `${name + this.getDate()}.xlsx`;
    link.click();
  };

  startDay = (d) => startOfDay(d || new Date());

  testURL = (url) => {
    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
    return urlRegex.test(url);
  };

  swappingArray = (arr, i, j) => {
    const temp = [...arr];
    [temp[i], temp[j]] = [temp[j], temp[i]];
    return temp;
  };

  gmtDateFix = (date, rev) => {
    const localDate = date;
    const gmtDate = new Date(localDate.toUTCString().replace('GMT', ''));
    const newDate = new Date(localDate);

    if (rev) {
      newDate.setMilliseconds(gmtDate.getTime() - localDate.getTime());
      return newDate;
    }

    newDate.setMilliseconds(localDate.getTime() - gmtDate.getTime());
    return newDate;
  };

  fileToBuffer = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.replace(/^data:(.*,)?/, '');
        if (encoded.length % 4 > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });

  handleFileType = (t, raw) => {
    if (raw) {
      const index = t.lastIndexOf('.');
      t = t.slice(index + 1);
    }

    if (['pdf', 'xls', 'xlsx', 'doc', 'docx', 'cvs', 'txt', 'jpg', 'jpeg', 'png'].includes(t)) {
      return t.toUpperCase();
    }
    return 'OTHERS';
  };

  openLink = (url) => {
    const link = document.createElement('a');

    link.href = url;
    link.target = '_blank';

    link.click();
  };

  getDynamicFields = (response, user, agency, prefix) =>
    response.data
      .map((key) => {
        const {
          [`${prefix}_PID`]: id,
          [`${prefix}_TYPE`]: type,
          [`${prefix}_DEFAULT_VALUE`]: dv,
          [`${prefix}_DEFAULT_ID`]: di,
        } = key;

        let defaultValue = dv || null;

        if (type === 'M') defaultValue = [];

        if (type === 'T' && !dv) defaultValue = '';

        if (['A', 'C'].includes(type)) {
          defaultValue = dv && { VALUE: dv, ID: di };
        }

        if (dv?.match('@USER')) {
          defaultValue = { VALUE: user.user_name, ID: user.user_id };
        }

        if (dv?.match('@CP_ID')) {
          defaultValue = { VALUE: agency.cp_name, ID: agency.cp_id };
        }

        if (dv?.match('@DATE')) {
          defaultValue = format(new Date(), 'yyyy-MM-dd');
        }

        if (dv?.match('@DATETIME')) {
          defaultValue = format(new Date(), 'yyyy-MM-dd HH:mm');
        }

        return {
          id,
          type,
          defaultValue,
          label: key[`${prefix}_LABEL`],
          name: `field_${id}`,
          order: key[`${prefix}_ORDER`],
          required: key[`${prefix}_MANDATORY`],
          disabled: key[`${prefix}_DISABLED`],
          change: key[`${prefix}_CHANGE`],
          param: key[`${prefix}_PARAMETER`],
          span: key[`${prefix}_SPAN`],
          query: key[`${prefix}_QUERY`],
          groupId: key[`${prefix}_GROUP_ID`],
          groupName: key[`${prefix}_GROUP_NAME`],
          getId: key[`${prefix}_GET_ID`],
          getValue: key[`${prefix}_GET_VALUE`],
          isDrawer: !key[`${prefix}_NOT_DRAWER`],
        };
      })
      .sort((a, b) => a.groupId - b.groupId || a.order - b.order);

  getDynamicJSON = (prefix, dynamicFields, data, agency, user) => {
    const init = {};

    if (agency) init[`${prefix}_CP_ID`] = agency.cp_id;
    if (user) init[`${prefix}_CREATED_BY`] = user.data.user_id;

    return dynamicFields
      .filter((field) => ['DT', 'D', 'A', 'C', 'M', 'T', 'G'].includes(field.type))
      .reduce((prev, field) => {
        const id = field.param.match(/_\d+/)?.pop();
        const value = data[field.name];
        const val = {};

        const i = field.param;
        const d = id && `${prefix}_FIELD_DESC${id}`;

        const getValue = (desc) => {
          if (field.type === 'G') return value;
          if (value instanceof Date) return format(value, 'yyyy-MM-dd HH:mm');
          if (value instanceof Array && !id) return value.map((v) => v.ID).toString() || null;
          if (value instanceof Array) return JSON.stringify(value);
          if (value instanceof Object && desc) return value.VALUE;
          if (value instanceof Object) return value.ID;
          return value;
        };

        val[i] = getValue();
        if (id) val[d] = getValue(true);

        return { ...prev, ...val };
      }, init);
  };

  filterMenus = (arr) =>
    arr.filter((a) => {
      if (a.id && a.title && a.type) {
        if (a.children instanceof Array) {
          a.children = this.filterMenus(a.children);
        }
        return true;
      }
      return false;
    });

  roundOff = (amt, type, fraction) => {
    if (type === 'R') {
      return +amt?.toFixed(fraction);
    }
    if (type === 'C') {
      return Math.ceil(amt);
    }
    if (type === 'T') {
      return Math.trunc(amt);
    }
    if (!type || !fraction) {
      return +amt;
    }
    return +amt.toFixed(2);
  };

  emailExp = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // or use your own

  menuFlattenArray = (array, url, title) => {
    const resu = [];

    const recurse = (items) => {
      items.forEach((item) => {
        resu.push({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || '',
          type: item.type,
          icon: item.icon || '',
          url: item.url || '',
          pg_id: item.pg_id || null,
        });

        if (item.children && item.children.length > 0) {
          recurse(item.children);
        }
      });
    };

    recurse(array);
    let titleRes;
    const res = resu.filter((i) => i.type === 'item' && i.url === url);
    if (title) titleRes = res.filter((i) => i.title === title);

    return title ? titleRes[0] : res[0];
  };

  encodedId = (id) => jwtEncode(id, '');

  decodedId = (id, location) => {
    const check = location.search ? location.search.startsWith('?') : false;
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get(id);
    return check && jwtDecode(encodedId);
  };

  convertStringToNumber = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (value === undefined) return [key, null];
        return [key, Number.isNaN(value) ? value : Number(value)];
      })
    );
  };

  handleNumKeyDown = (e) => {
    const keys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab'];
    if (/[0-9]/.test(e.key) || keys.includes(e.key)) return;
    e.preventDefault();
  };

  handleAlphaNumKeyDown = (e) => {
    // const regex = /^[a-zA-Z0-9\s]+$/;
    const regex = /^[a-zA-Z0-9]+$/; // Alphanumeric without spaces
    const key = e.key || String.fromCharCode(e.which || e.keyCode);
    if (!regex.test(key)) e.preventDefault();
  };

  mainColors = [
    '#89ee7d',
    '#9ab011',
    '#9e6c0c',
    '#0f3395',
    '#000ae6',
    '#8d0a9d',
    '#006394',
    '#5c0000',
    '#F13F19',
    '#E8F119',
    '#808000',
    '#008080',
    '#6495ED',
    '#FF7F50',
  ];
}

const instance = new Utils();

export default instance;