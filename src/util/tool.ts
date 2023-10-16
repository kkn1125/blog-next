import markdown from "markdown-it";
import { SetStateAction } from "react";

export const convertDate = (date: string) => new Date(date.slice(0, -6));

export const slicedBundle = (gap: number, array: any[]) => {
  let temp = [];
  for (let i = 0; i < array.length; i += gap) {
    temp.push(array.slice(i, gap + i));
  }
  if (temp[temp.length - 1] && temp[temp.length - 1].length !== gap) {
    const contrast = gap - temp[temp.length - 1].length;
    for (let i = 0; i < contrast; i++) {
      temp[temp.length - 1].push(undefined);
    }
  }
  return temp;
};

export const slugToBlogTrailingSlash = (slug: string) => {
  const isTrailingSlash = slug.startsWith("/") && slug.endsWith("/");
  const trailingSlash = isTrailingSlash ? "" : "/";
  return `/blog${trailingSlash}${slug}`;
};

export const duplicateRemoveArrayFromCategory = (array: any[]) =>
  array.reduce((acc, cur) => {
    for (let category of cur.frontmatter.categories) {
      if (acc.includes(category.toLowerCase())) continue;
      acc.push(category.toLowerCase());
    }
    return acc;
  }, []);

export const duplicateRemoveArrayFromTag = (array: any[]) =>
  array.reduce((acc, cur) => {
    for (let tag of cur.frontmatter.tags) {
      if (acc.includes(tag)) continue;
      acc.push(tag);
    }
    return acc;
  }, []);

export const changeWhiteSpaceToHipen = (str: string = "") =>
  str.toLowerCase().replace(/[\s]+/g, "-");

export const changeHipenToWhiteSpace = (str: string = "") =>
  str.toLowerCase().replace(/[-]+/g, " ");

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/
export const Base64 = {
  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode: function (input: string) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }
    return output;
  },

  // public method for decoding
  decode: function (input: string) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;
  },

  // private method for UTF-8 encoding
  _utf8_encode: function (string: string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode: function (utftext: string) {
    var string = "";
    var i = 0;
    var c1, c2, c3;
    var c = (c1 = c2 = 0);

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return string;
  },
};

export const cutText = (desc: string, limit: number, ellipsis = " ...") =>
  (desc?.length || 0) < limit ? desc && desc : desc.slice(0, limit) + ellipsis;

export const objFilter = (obj: { [s: string]: unknown } | ArrayLike<unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getReponsiveImageUrl = (url: string) =>
  url.match(/^http(s)?/) ? url : url.match(/^\/assets/) ? url : "/assets" + url;

export const capitalize = (str: string) =>
  str.replace(
    /[A-Za-z]+/gm,
    ($1) => $1.charAt(0).toUpperCase() + $1.slice(1).toLowerCase()
  );

export const compareWithOrigin = (a: any, b: any) => {
  return Object.entries(a).some(([_, __]) => b[_] !== __);
};

export const validTime = 1000 * 60 * 60 * 24;

export const resConvertData = (res: { data: { contents: string } }) => {
  const body = new DOMParser().parseFromString(
    res.data.contents,
    "text/html"
  ).body;
  const table = body.querySelectorAll(
    "#main form table.table tbody tr"
  ) as unknown as any[];

  const filtered = [...table].filter((el) => el.textContent.match(/방문자/g));

  const tableEntries = filtered.map((tr) => {
    const [key, value] = tr.children;
    return [key.textContent, value.textContent];
  });
  return Object.fromEntries(tableEntries);
};

export const setAnimate = (
  setter: (value: SetStateAction<string>) => void,
  classes: string[],
  order: number,
  loader?: (value: SetStateAction<boolean>) => void
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setter(() => classes.join(" "));
      loader?.(true);
      setTimeout(() => {
        setter(() => "");
        resolve(true);
      }, 1000);
    }, order * 100);
  });
};

export const parseHeading = (content: string) => {
  const md = markdown();
  return md
    .render(content, {})
    .split(/[\n]+/gm)
    .filter((item) => item.match(/^<h[1-6]([\s\S]+)h[1-6]>$/))
    .map((item) => {
      const title = item.match(/^\<h([1-6])\>([\s\S]+)<\/h[1-6]>$/) as string[];
      return { order: title[1], head: title[2] };
    });
};

export function getWeek(year: number, month: number, day: number) {
  const baseDate = 1;
  const base1 = new Date(year, month - 1, baseDate);
  const lastDateOfFirstWeek = new Date(
    year,
    month - 1,
    6 - base1.getDay() + baseDate
  );
  return Math.ceil((day - lastDateOfFirstWeek.getDate()) / 7) + 1;
}

export const removeDuplicates = ($: string[]) =>
  $.reduce((_: string[], __) => (!_.includes(__) ? _.concat(__) : _), []);

export const orderByRepeat = (array: any[]) =>
  array.reduce((acc, cur) => {
    if (cur.repeat) {
      if (cur.tag > acc.slice(-1)[0]?.tag) {
        return [cur, ...acc];
      }
    }
    return [...acc, cur];
  }, []);

export const format = (
  time: Date | number | string,
  form: string,
  use24h: boolean = true
) =>
  form.replace(/YYYY|YY|MM|dd|HH|mm|ss|SSS|AP/g, ($1) => {
    if (typeof time === "string") {
      time = time.replace(/\+0000/g, "");
    }
    const timestamp = new Date(time);

    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1;
    const date = timestamp.getDate();
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();
    const second = timestamp.getSeconds();
    const milliseconds = timestamp.getMilliseconds();
    const isOver12 = hour > 12;
    const isLastTime = hour === 24;
    const minusHour = use24h && isOver12 && !isLastTime ? 12 : 0;

    switch ($1) {
      case "YYYY":
        return year.toString().padStart(4, "0");
      case "YY":
        return year.toString().slice(2);
      case "MM":
        return month.toString().padStart(2, "0");
      case "dd":
        return date.toString().padStart(2, "0");
      case "HH":
        return ((hour % 24) - minusHour).toString().padStart(2, "0");
      case "mm":
        return minute.toString().padStart(2, "0");
      case "ss":
        return second.toString().padStart(2, "0");
      case "SSS":
        return milliseconds.toString().padStart(3, "0");
      case "AP":
        return isOver12 ? "PM" : "AM";
      default:
        return $1;
    }
  });

export const convertIdString = (str: string) =>
  str
    .replace(/#+/gm, "")
    .trim()
    .replace(/[\s]+/gm, "-")
    .replace(/[.?/,]+/g, "")
    .toLowerCase();

export const duration = (date: string, due: number) => {
  const start = new Date(date);
  const temp = new Date(date);
  const end = new Date(temp.setDate(temp.getDate() + due - 1));

  return ` [${format(start, "YYYY-MM-dd")} ~ ${format(end, "YYYY-MM-dd")}]`;
};
