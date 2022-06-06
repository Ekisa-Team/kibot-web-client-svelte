var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.348_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m3 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m3) {
    return;
  }
  const match2 = m3[2] || m3[3] || "";
  let filename = match2.slice(match2.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m4, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m3 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m3) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m3[1] || m3[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m4 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m4) {
        entryName = m4[2] || m4[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.348_svelte@3.48.0/node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_polyfills();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i3 = 0; i3 < boundary.length; i3++) {
          ui8a[i3] = boundary.charCodeAt(i3);
          this.boundaryChars[ui8a[i3]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i3 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index: index17, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i3;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i3, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i3 = 0; i3 < length_; i3++) {
          c = data[i3];
          switch (state) {
            case S.START_BOUNDARY:
              if (index17 === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index17++;
                break;
              } else if (index17 - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index17 = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index17 + 2]) {
                index17 = -2;
              }
              if (c === boundary[index17 + 2]) {
                index17++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index17 = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index17++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index17 === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index17;
              if (index17 === 0) {
                i3 += boundaryEnd;
                while (i3 < bufferLength && !(data[i3] in boundaryChars)) {
                  i3 += boundaryLength;
                }
                i3 -= boundaryEnd;
                c = data[i3];
              }
              if (index17 < boundary.length) {
                if (boundary[index17] === c) {
                  if (index17 === 0) {
                    dataCallback("onPartData", true);
                  }
                  index17++;
                } else {
                  index17 = 0;
                }
              } else if (index17 === boundary.length) {
                index17++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index17 = 0;
                }
              } else if (index17 - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index17 = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index17 = 0;
                  }
                } else {
                  index17 = 0;
                }
              }
              if (index17 > 0) {
                lookbehind[index17 - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i3--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index17;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.348_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node/polyfills.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base642 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i3 = 1; i3 < meta.length; i3++) {
    if (meta[i3] === "base64") {
      base642 = true;
    } else {
      typeFull += `;${meta[i3]}`;
      if (meta[i3].indexOf("charset=") === 0) {
        charset = meta[i3].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base642 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F3, B2 = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p2 = `--${b}\r
Content-Disposition: form-data; name="`;
  F3.forEach((v2, n2) => typeof v2 == "string" ? c.push(p2 + e(n2) + `"\r
\r
${v2.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p2 + e(n2) + `"; filename="${e(v2.name, 1)}"\r
Content-Type: ${v2.type || "application/octet-stream"}\r
\r
`, v2, "\r\n"));
  c.push(`--${b}--`);
  return new B2(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index17, array2) => {
    if (index17 % 2 === 0) {
      result.push(array2.slice(index17, index17 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url2, originOnly = false) {
  if (url2 == null) {
    return "no-referrer";
  }
  url2 = new URL(url2);
  if (/^(about|blob|data):$/.test(url2.protocol)) {
    return "no-referrer";
  }
  url2.username = "";
  url2.password = "";
  url2.hash = "";
  if (originOnly) {
    url2.pathname = "";
    url2.search = "";
  }
  return url2;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url2) {
  if (/^(http|ws)s:$/.test(url2.protocol)) {
    return true;
  }
  const hostIp = url2.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url2.host)) {
    return false;
  }
  if (url2.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url2) {
  if (/^about:(blank|srcdoc)$/.test(url2)) {
    return true;
  }
  if (url2.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url2.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url2);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url2, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url2, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url2}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s4) => {
        let endedWithEventsCount;
        s4.prependListener("end", () => {
          endedWithEventsCount = s4._eventsCount;
        });
        s4.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s4._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), (error2) => {
        if (error2) {
          reject(error2);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream.pipeline)(response_, new import_node_stream.PassThrough(), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflate(), (error2) => {
              if (error2) {
                reject(error2);
              }
            });
          } else {
            body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error2) => {
              if (error2) {
                reject(error2);
              }
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response2(body, responseOptions);
            resolve2(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error2) => {
          if (error2) {
            reject(error2);
          }
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = import_node_buffer.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function installPolyfills() {
  for (const name in globals) {
    Object.defineProperty(globalThis, name, {
      enumerable: true,
      configurable: true,
      value: globals[name]
    });
  }
}
var import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_buffer, import_node_util, import_node_url, import_node_net, import_crypto, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, pipeline, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, doBadDataWarn, Request2, getNodeRequestOptions, AbortError, supportedSchemas, globals;
var init_polyfills = __esm({
  "node_modules/.pnpm/@sveltejs+kit@1.0.0-next.348_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node/polyfills.js"() {
    import_node_http = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_buffer = require("node:buffer");
    import_node_util = require("node:util");
    import_node_url = require("node:url");
    import_node_net = require("node:net");
    import_crypto = require("crypto");
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop5() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals4 = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop5;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals4 && globals4.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F3, V, args) {
          if (typeof F3 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F3, V, args);
        }
        function promiseCall(F3, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F3, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i3 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i3 !== elements.length || node._next !== void 0) {
              if (i3 === elements.length) {
                node = node._next;
                elements = node._elements;
                i3 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i3]);
              ++i3;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v2) {
          return v2 < 0 ? Math.ceil(v2) : Math.floor(v2);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field2, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field2} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n2) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n2), destOffset);
        }
        function TransferArrayBuffer(O2) {
          return O2;
        }
        function IsDetachedBuffer(O2) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v2) {
          if (typeof v2 !== "number") {
            return false;
          }
          if (NumberIsNaN(v2)) {
            return false;
          }
          if (v2 < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O2) {
          const buffer = ArrayBufferSlice(O2.buffer, O2.byteOffset, O2.byteOffset + O2.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry17 = this._queue.shift();
              this._queueTotalSize -= entry17.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry17.buffer, entry17.byteOffset, entry17.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop5);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable4 = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable4, "readable", "ReadableWritablePair");
          assertReadableStream(readable4, `${context} has member 'readable' that`);
          const writable4 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable4, "writable", "ReadableWritablePair");
          assertWritableStream(writable4, `${context} has member 'writable' that`);
          return { readable: readable4, writable: writable4 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop5);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        try {
          Object.defineProperty(byteLengthSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        try {
          Object.defineProperty(countSizeFunction, "name", {
            value: "size",
            configurable: true
          });
        } catch (_a) {
        }
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush2 = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush2 === void 0 ? void 0 : convertTransformerFlushCallback(flush2, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable4 = stream._writable;
              const state = writable4._state;
              if (state === "erroring") {
                throw writable4._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable4 = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable4._state === "errored") {
              throw readable4._storedError;
            }
            ReadableStreamDefaultControllerClose(readable4._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable4._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder2 = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder2.encode(`${element}`);
          }
          const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (size) {
            this.#size += size;
            this.#parts.push(part);
          }
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof Blob$1 && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f4) => (f4 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n2, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n2}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m3) => typeof o[m3] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l2 = b.length, c = 0; c < l2; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d2] of this)
          a.call(b, d2, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d2) => {
          d2[0] === a[0] ? c && (c = !b.push(a)) : b.push(d2);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (import_node_buffer.Buffer.isBuffer(body))
          ;
        else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.arrayBuffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers2) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p2, receiver) {
            switch (p2) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p2].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p2].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p2, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key2) => {
          result[key2] = this.getAll(key2);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key2) => {
          const values = this.getAll(key2);
          if (key2 === "host") {
            result[key2] = values[0];
          } else {
            result[key2] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url2, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url2).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    doBadDataWarn = (0, import_node_util.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request2 = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init2.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if ("data" in init2) {
          doBadDataWarn();
        }
        if ((init2.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers2(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
    globals = {
      crypto: import_crypto.webcrypto,
      fetch: fetch2,
      Response: Response2,
      Request: Request2,
      Headers: Headers2
    };
  }
});

// .svelte-kit/output/server/chunks/index-2415d7ec.js
function noop2() {
}
function assign(tar, src) {
  for (const k2 in src)
    tar[k2] = src[k2];
  return tar;
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_2) => value = _2)();
  return value;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k2 in props)
    if (!keys.has(k2) && k2[0] !== "$")
      rest[k2] = props[k2];
  return rest;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function custom_event(type, detail, { bubbles = false, cancelable = false }) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, cancelable, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i3 = 0; i3 < render_callbacks.length; i3 += 1) {
      const callback = render_callbacks[i3];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(merge_ssr_styles(attributes.style, styles_to_add));
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match2) => escaped[match2]);
}
function escape_attribute_value(value) {
  return typeof value === "string" ? escape(value) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key2 in obj) {
    result[key2] = escape_attribute_value(obj[key2]);
  }
  return result;
}
function each(items, fn) {
  let str = "";
  for (let i3 = 0; i3 < items.length; i3 += 1) {
    str += fn(items[i3], i3);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css22) => css22.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape_attribute_value(value.toString())}"`;
  return ` ${name}${assignment}`;
}
function add_classes(classes) {
  return classes ? ` class="${classes}"` : "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key2) => style_object[key2]).map((key2) => `${key2}: ${style_object[key2]};`).join(" ");
}
var identity, is_client, now, raf, tasks, current_component, dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx, globals2, boolean_attributes, invalid_attribute_name_character, escaped, missing_component, on_destroy;
var init_index_2415d7ec = __esm({
  ".svelte-kit/output/server/chunks/index-2415d7ec.js"() {
    identity = (x2) => x2;
    is_client = typeof window !== "undefined";
    now = is_client ? () => window.performance.now() : () => Date.now();
    raf = is_client ? (cb) => requestAnimationFrame(cb) : noop2;
    tasks = /* @__PURE__ */ new Set();
    dirty_components = [];
    binding_callbacks = [];
    render_callbacks = [];
    flush_callbacks = [];
    resolved_promise = Promise.resolve();
    update_scheduled = false;
    seen_callbacks = /* @__PURE__ */ new Set();
    flushidx = 0;
    globals2 = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    boolean_attributes = /* @__PURE__ */ new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/hooks-1c45ba0b.js
var hooks_1c45ba0b_exports = {};
var init_hooks_1c45ba0b = __esm({
  ".svelte-kit/output/server/chunks/hooks-1c45ba0b.js"() {
  }
});

// .svelte-kit/output/server/chunks/index-b173f350.js
function readable2(value, start) {
  return {
    subscribe: writable2(value, start).subscribe
  };
}
function writable2(value, start = noop2) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i3 = 0; i3 < subscriber_queue2.length; i3 += 2) {
            subscriber_queue2[i3][0](subscriber_queue2[i3 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe22(run3, invalidate = noop2) {
    const subscriber = [run3, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run3(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe22 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable2(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop2;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop2;
      }
    };
    const unsubscribers = stores_array.map((store, i3) => subscribe(store, (value) => {
      values[i3] = value;
      pending &= ~(1 << i3);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i3;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
var subscriber_queue2;
var init_index_b173f350 = __esm({
  ".svelte-kit/output/server/chunks/index-b173f350.js"() {
    init_index_2415d7ec();
    subscriber_queue2 = [];
  }
});

// .svelte-kit/output/server/chunks/layout-b7cfa383.js
var layout_b7cfa383_exports = {};
__export(layout_b7cfa383_exports, {
  default: () => layout,
  footer: () => footer,
  navbar: () => navbar,
  sidebar: () => sidebar
});
var navbar, sidebar, footer, layout;
var init_layout_b7cfa383 = __esm({
  ".svelte-kit/output/server/chunks/layout-b7cfa383.js"() {
    navbar = {
      themePicker: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    };
    sidebar = {
      messagingProviders: "Messaging providers",
      applications: "Applications",
      chatbots: "Chatbots",
      messages: "Messages",
      templates: "Templates",
      channels: "Channels",
      webhooks: "Webhooks",
      documentation: "Documentation",
      help: "Help"
    };
    footer = {
      documentation: "Documentation",
      help: "Help"
    };
    layout = {
      navbar,
      sidebar,
      footer
    };
  }
});

// .svelte-kit/output/server/chunks/layout-cad52ea7.js
var layout_cad52ea7_exports = {};
__export(layout_cad52ea7_exports, {
  default: () => layout2,
  footer: () => footer2,
  navbar: () => navbar2,
  sidebar: () => sidebar2
});
var navbar2, sidebar2, footer2, layout2;
var init_layout_cad52ea7 = __esm({
  ".svelte-kit/output/server/chunks/layout-cad52ea7.js"() {
    navbar2 = {
      themePicker: {
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema"
      }
    };
    sidebar2 = {
      messagingProviders: "Proveedores de mensajer\xEDa",
      applications: "Aplicaciones",
      chatbots: "Chatbots",
      messages: "Mensajes",
      templates: "Plantillas",
      channels: "Canales",
      webhooks: "Webhooks",
      documentation: "Documentaci\xF3n",
      help: "Ayuda"
    };
    footer2 = {
      documentation: "Documentaci\xF3n",
      help: "Ayuda"
    };
    layout2 = {
      navbar: navbar2,
      sidebar: sidebar2,
      footer: footer2
    };
  }
});

// .svelte-kit/output/server/chunks/index-5fadd295.js
var q$1, B$1, G$1, S$1, N$1, A$1, j, n$1, d$2, m$1, R$1, F2, l$1, E$1, O$1, f$1, w$1, W$1, D$1, I, H$1, z$1, R, E, v$1, k, C, O, w, u$1, $, d$1, z, h2, T, p$1, B, U, q, G, H, J, Q, P$1, N, S2, W, X, Y, D, Z2, A2, _, rt, n, M, u, s3, f3, P, i2, p, d, l, m2, t$1, v, en, es, lang, config, t2, locale, locales, loading, loadTranslations;
var init_index_5fadd295 = __esm({
  ".svelte-kit/output/server/chunks/index-5fadd295.js"() {
    init_index_b173f350();
    init_index_2415d7ec();
    q$1 = Object.defineProperty;
    B$1 = Object.defineProperties;
    G$1 = Object.getOwnPropertyDescriptors;
    S$1 = Object.getOwnPropertySymbols;
    N$1 = Object.prototype.hasOwnProperty;
    A$1 = Object.prototype.propertyIsEnumerable;
    j = (s22, e2, t22) => e2 in s22 ? q$1(s22, e2, { enumerable: true, configurable: true, writable: true, value: t22 }) : s22[e2] = t22;
    n$1 = (s22, e2) => {
      for (var t22 in e2 || (e2 = {}))
        N$1.call(e2, t22) && j(s22, t22, e2[t22]);
      if (S$1)
        for (var t22 of S$1(e2))
          A$1.call(e2, t22) && j(s22, t22, e2[t22]);
      return s22;
    };
    d$2 = (s22, e2) => B$1(s22, G$1(e2));
    m$1 = (s22, e2) => {
      var t22 = {};
      for (var r2 in s22)
        N$1.call(s22, r2) && e2.indexOf(r2) < 0 && (t22[r2] = s22[r2]);
      if (s22 != null && S$1)
        for (var r2 of S$1(s22))
          e2.indexOf(r2) < 0 && A$1.call(s22, r2) && (t22[r2] = s22[r2]);
      return t22;
    };
    R$1 = ["error", "warn", "debug"];
    F2 = ({ logger: s22 = console, level: e2 = R$1[1], prefix: t22 = "[i18n]: " }) => R$1.reduce((r2, a, o) => d$2(n$1({}, r2), { [a]: (i22) => R$1.indexOf(e2) >= o && s22[a](`${t22}${i22}`) }), {});
    l$1 = F2({});
    E$1 = (s22) => {
      l$1 = s22;
    };
    O$1 = (g) => {
      var u2 = g, { parser: s22, key: e2, params: t22, translations: r2, locale: a, fallbackLocale: o } = u2, i22 = m$1(u2, ["parser", "key", "params", "translations", "locale", "fallbackLocale"]);
      if (!(e2 && a))
        return l$1.warn("No translation key or locale provided. Skipping translation..."), "";
      let p2 = (r2[a] || {})[e2];
      return o && p2 === void 0 && (p2 = (r2[o] || {})[e2]), i22.hasOwnProperty("fallbackValue") && p2 === void 0 ? i22.fallbackValue : s22.parse(p2, t22, a, e2);
    };
    f$1 = (...s22) => s22.length ? s22.filter((e2) => !!e2).map((e2) => {
      let t22 = `${e2}`.toLowerCase();
      try {
        let [r2] = Intl.Collator.supportedLocalesOf(e2);
        if (!r2)
          throw new Error(`'${e2}' is non-standard.`);
        t22 = r2;
      } catch {
        l$1.warn(`Non-standard locale provided: '${e2}'. Check your 'translations' and 'loaders' in i18n config...`);
      }
      return t22;
    }) : [];
    w$1 = (s22, e2) => Object.keys(s22 || {}).reduce((t22, r2) => {
      let a = s22[r2], o = e2 ? `${e2}.${r2}` : `${r2}`;
      return a && typeof a == "object" ? n$1(n$1({}, t22), w$1(a, o)) : d$2(n$1({}, t22), { [o]: a });
    }, {});
    W$1 = async (s22) => {
      try {
        return (await Promise.all(s22.map((a) => {
          var o = a, { loader: t22 } = o, r2 = m$1(o, ["loader"]);
          return new Promise(async (i22) => {
            let g;
            try {
              g = await t22();
            } catch (u2) {
              l$1.error(`Failed to load translation. Verify your '${r2.locale}' > '${r2.key}' Loader.`), l$1.error(u2);
            }
            i22(d$2(n$1({ loader: t22 }, r2), { data: g }));
          });
        }))).reduce((t22, { key: r2, data: a, locale: o }) => {
          if (!a)
            return t22;
          let [i22] = f$1(o);
          return d$2(n$1({}, t22), { [i22]: w$1(d$2(n$1({}, t22[i22] || {}), { [r2]: a })) });
        }, {});
      } catch (e2) {
        l$1.error(e2);
      }
      return {};
    };
    D$1 = (s22) => (e2) => {
      try {
        if (typeof e2 == "string")
          return e2 === s22;
        if (typeof e2 == "object")
          return e2.test(s22);
      } catch {
        l$1.error("Invalid route config!");
      }
      return false;
    };
    I = (s22, e2) => {
      let t22 = true;
      try {
        t22 = Object.keys(s22).filter((r2) => s22[r2] !== void 0).every((r2) => s22[r2] === e2[r2]);
      } catch {
      }
      return t22;
    };
    H$1 = 1e3 * 60 * 60 * 24;
    z$1 = class {
      constructor(e2) {
        this.cachedAt = 0;
        this.loadedKeys = {};
        this.currentRoute = writable2();
        this.config = writable2();
        this.isLoading = writable2(false);
        this.promises = /* @__PURE__ */ new Set();
        this.loading = { subscribe: this.isLoading.subscribe, toPromise: (e22, t22) => {
          let r2 = Array.from(this.promises).filter((a) => I({ locale: f$1(e22)[0], route: t22 }, a)).map(({ promise: a }) => a);
          return Promise.all(r2);
        }, get: () => get_store_value(this.isLoading) };
        this.privateTranslations = writable2({});
        this.translations = { subscribe: this.privateTranslations.subscribe, get: () => get_store_value(this.translations) };
        this.locales = d$2(n$1({}, derived([this.config, this.privateTranslations], ([e22, t22]) => {
          if (!e22)
            return [];
          let { loaders: r2 = [] } = e22, a = r2.map(({ locale: i22 }) => i22), o = Object.keys(t22).map((i22) => i22);
          return Array.from(/* @__PURE__ */ new Set([...f$1(...a), ...f$1(...o)]));
        }, [])), { get: () => get_store_value(this.locales) });
        this.internalLocale = writable2();
        this.loaderTrigger = derived([this.internalLocale, this.currentRoute], ([e22, t22], r2) => {
          var a, o;
          e22 !== void 0 && t22 !== void 0 && !(e22 === ((a = get_store_value(this.loaderTrigger)) == null ? void 0 : a[0]) && t22 === ((o = get_store_value(this.loaderTrigger)) == null ? void 0 : o[1])) && (l$1.debug("Triggering translation load..."), r2([e22, t22]));
        }, []);
        this.localeHelper = writable2();
        this.locale = { subscribe: this.localeHelper.subscribe, forceSet: this.localeHelper.set, set: this.internalLocale.set, update: this.internalLocale.update, get: () => get_store_value(this.locale) };
        this.initialized = derived([this.locale, this.currentRoute, this.privateTranslations], ([e22, t22, r2], a) => {
          get_store_value(this.initialized) || a(e22 !== void 0 && t22 !== void 0 && !!Object.keys(r2).length);
        });
        this.translation = derived([this.privateTranslations, this.locale, this.isLoading], ([e22, t22, r2], a) => {
          let o = e22[t22];
          o && Object.keys(o).length && !r2 && a(o);
        }, {});
        this.t = d$2(n$1({}, derived([this.config, this.translation], (a) => {
          var [o] = a, i22 = o, { parser: e22, fallbackLocale: t22 } = i22, r2 = m$1(i22, ["parser", "fallbackLocale"]);
          return (g, ...u2) => O$1(n$1({ parser: e22, key: g, params: u2, translations: this.translations.get(), locale: this.locale.get(), fallbackLocale: t22 }, r2.hasOwnProperty("fallbackValue") ? { fallbackValue: r2.fallbackValue } : {}));
        })), { get: (e22, ...t22) => get_store_value(this.t)(e22, ...t22) });
        this.l = d$2(n$1({}, derived([this.config, this.translations], (o) => {
          var [i22, ...g] = o, u2 = i22, { parser: e22, fallbackLocale: t22 } = u2, r2 = m$1(u2, ["parser", "fallbackLocale"]), [a] = g;
          return (p2, v2, ...k2) => O$1(n$1({ parser: e22, key: v2, params: k2, translations: a, locale: p2, fallbackLocale: t22 }, r2.hasOwnProperty("fallbackValue") ? { fallbackValue: r2.fallbackValue } : {}));
        })), { get: (e22, t22, ...r2) => get_store_value(this.l)(e22, t22, ...r2) });
        this.getLocale = (e22) => {
          let { fallbackLocale: t22 = "" } = get_store_value(this.config) || {}, r2 = e22 || t22;
          if (!r2)
            return "";
          let a = this.locales.get();
          return a.find((i22) => f$1(r2).includes(i22)) || a.find((i22) => f$1(t22).includes(i22)) || "";
        };
        this.setLocale = (e22) => {
          if (!!e22 && e22 !== get_store_value(this.internalLocale))
            return l$1.debug(`Setting '${e22}' locale.`), this.internalLocale.set(e22), this.loading.toPromise(e22, get_store_value(this.currentRoute));
        };
        this.setRoute = (e22) => {
          if (e22 !== get_store_value(this.currentRoute)) {
            l$1.debug(`Setting '${e22}' route.`), this.currentRoute.set(e22);
            let t22 = get_store_value(this.internalLocale);
            return this.loading.toPromise(t22, e22);
          }
        };
        this.loadConfig = async (e22) => {
          await this.configLoader(e22);
        };
        this.getTranslationProps = async (e22 = this.locale.get(), t22 = get_store_value(this.currentRoute)) => {
          let r2 = get_store_value(this.config);
          if (!r2 || !e22)
            return [];
          let a = this.translations.get(), { loaders: o, fallbackLocale: i22 = "", cache: g = H$1 } = r2 || {}, u2 = Number.isNaN(+g) ? H$1 : +g;
          this.cachedAt ? Date.now() > u2 + this.cachedAt && (l$1.debug("Refreshing cache."), this.loadedKeys = {}, this.cachedAt = 0) : (l$1.debug("Setting cache timestamp."), this.cachedAt = Date.now());
          let [p2, v2] = f$1(e22, i22), k2 = a[p2], M2 = a[v2], C2 = (o || []).map((K) => {
            var L = K, { locale: h22 } = L, b = m$1(L, ["locale"]);
            return d$2(n$1({}, b), { locale: f$1(h22)[0] });
          }).filter(({ routes: h22 }) => !h22 || (h22 || []).some(D$1(t22))).filter(({ key: h22, locale: b }) => b === p2 && (!k2 || !(this.loadedKeys[p2] || []).includes(h22)) || i22 && b === v2 && (!M2 || !(this.loadedKeys[v2] || []).includes(h22)));
          if (C2.length) {
            this.isLoading.set(true), l$1.debug("Fetching translations...");
            let h22 = await W$1(C2);
            this.isLoading.set(false);
            let b = Object.keys(h22).reduce((L, y) => d$2(n$1({}, L), { [y]: Object.keys(h22[y]) }), {}), K = C2.filter(({ key: L, locale: y }) => (b[y] || []).some((x2) => `${x2}`.startsWith(L))).reduce((L, { key: y, locale: x2 }) => d$2(n$1({}, L), { [x2]: [...L[x2] || [], y] }), {});
            return [h22, K];
          }
          return [];
        };
        this.addTranslations = (e22, t22) => {
          if (!e22)
            return;
          l$1.debug("Adding translations...");
          let r2 = Object.keys(e22 || {});
          this.privateTranslations.update((a) => r2.reduce((o, i22) => d$2(n$1({}, o), { [i22]: n$1(n$1({}, o[i22] || {}), w$1(e22[i22])) }), a)), r2.forEach((a) => {
            let o = Object.keys(e22[a]).map((i22) => `${i22}`.split(".")[0]);
            t22 && (o = t22[a]), this.loadedKeys[a] = Array.from(/* @__PURE__ */ new Set([...this.loadedKeys[a] || [], ...o || []]));
          });
        };
        this.loader = async ([e22, t22]) => {
          let r2 = this.getLocale(e22);
          l$1.debug(`Adding loader promise for '${r2}' locale and '${t22}' route.`);
          let a = (async () => {
            let o = await this.getTranslationProps(r2, t22);
            o.length && this.addTranslations(...o);
          })();
          this.promises.add({ locale: r2, route: t22, promise: a }), a.then(() => {
            r2 && this.locale.get() !== r2 && this.locale.forceSet(r2);
          });
        };
        this.loadTranslations = (e22, t22 = get_store_value(this.currentRoute) || "") => {
          let r2 = this.getLocale(e22);
          if (!!r2)
            return this.setRoute(t22), this.setLocale(r2), this.loading.toPromise(r2, t22);
        };
        this.loaderTrigger.subscribe(this.loader), this.isLoading.subscribe(async (t22) => {
          t22 && this.promises.size && (await this.loading.toPromise(), this.promises.clear(), l$1.debug("Loader promises have been purged."));
        }), e2 && this.loadConfig(e2);
      }
      async configLoader(e2) {
        if (!e2)
          return l$1.error("No config provided!");
        let g = e2, { initLocale: t22, fallbackLocale: r2, translations: a, log: o } = g, i22 = m$1(g, ["initLocale", "fallbackLocale", "translations", "log"]);
        o && E$1(F2(o)), [t22] = f$1(t22), [r2] = f$1(r2), l$1.debug("Setting config."), this.config.set(n$1({ initLocale: t22, fallbackLocale: r2, translations: a }, i22)), a && this.addTranslations(a), await this.loadTranslations(t22);
      }
    };
    R = Object.defineProperty;
    E = Object.defineProperties;
    v$1 = Object.getOwnPropertyDescriptors;
    k = Object.getOwnPropertySymbols;
    C = Object.prototype.hasOwnProperty;
    O = Object.prototype.propertyIsEnumerable;
    w = (t22, e2, r2) => e2 in t22 ? R(t22, e2, { enumerable: true, configurable: true, writable: true, value: r2 }) : t22[e2] = r2;
    u$1 = (t22, e2) => {
      for (var r2 in e2 || (e2 = {}))
        C.call(e2, r2) && w(t22, r2, e2[r2]);
      if (k)
        for (var r2 of k(e2))
          O.call(e2, r2) && w(t22, r2, e2[r2]);
      return t22;
    };
    $ = (t22, e2) => E(t22, v$1(e2));
    d$1 = (t22, e2) => {
      var r2 = {};
      for (var i22 in t22)
        C.call(t22, i22) && e2.indexOf(i22) < 0 && (r2[i22] = t22[i22]);
      if (t22 != null && k)
        for (var i22 of k(t22))
          e2.indexOf(i22) < 0 && O.call(t22, i22) && (r2[i22] = t22[i22]);
      return r2;
    };
    z = (t22, e2) => {
      for (var r2 in e2)
        R(t22, r2, { get: e2[r2], enumerable: true });
    };
    h2 = {};
    z(h2, { ago: () => X, date: () => Q, eq: () => p$1, gt: () => q, gte: () => H, lt: () => U, lte: () => G, ne: () => B, number: () => J });
    T = (t22, e2) => {
      let { modifierDefaults: r2 } = e2 || {}, { [t22]: i22 } = r2 || {};
      return i22 || {};
    };
    p$1 = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => (e2.find(({ key: i22 }) => `${i22}`.toLowerCase() === `${t22}`.toLowerCase()) || {}).value || r2;
    B = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => (e2.find(({ key: i22 }) => `${i22}`.toLowerCase() !== `${t22}`.toLowerCase()) || {}).value || r2;
    U = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => (e2.sort((o, n2) => +o.key - +n2.key).find(({ key: o }) => +t22 < +o) || {}).value || r2;
    q = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => (e2.sort((o, n2) => +n2.key - +o.key).find(({ key: o }) => +t22 > +o) || {}).value || r2;
    G = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => p$1({ value: t22, options: e2, defaultValue: U({ value: t22, options: e2, defaultValue: r2 }) });
    H = ({ value: t22, options: e2 = [], defaultValue: r2 = "" }) => p$1({ value: t22, options: e2, defaultValue: q({ value: t22, options: e2, defaultValue: r2 }) });
    J = ({ value: t22, props: e2, defaultValue: r2 = "", locale: i22 = "", parserOptions: o }) => {
      if (!i22)
        return "";
      let s22 = T("number", o), { maximumFractionDigits: n2 } = s22, m22 = d$1(s22, ["maximumFractionDigits"]), c = (e2 == null ? void 0 : e2.number) || {}, { maximumFractionDigits: f22 = n2 || 2 } = c, a = d$1(c, ["maximumFractionDigits"]);
      return new Intl.NumberFormat(i22, u$1($(u$1({}, m22), { maximumFractionDigits: f22 }), a)).format(+t22 || +r2);
    };
    Q = ({ value: t22, props: e2, defaultValue: r2 = "", locale: i22 = "", parserOptions: o }) => {
      if (!i22)
        return "";
      let n2 = d$1(T("date", o), []), m22 = d$1((e2 == null ? void 0 : e2.date) || {}, []);
      return new Intl.DateTimeFormat(i22, u$1(u$1({}, n2), m22)).format(+t22 || +r2);
    };
    P$1 = [{ key: "second", multiplier: 1e3 }, { key: "minute", multiplier: 60 }, { key: "hour", multiplier: 60 }, { key: "day", multiplier: 24 }, { key: "week", multiplier: 7 }, { key: "month", multiplier: 13 / 3 }, { key: "year", multiplier: 12 }];
    N = (t22 = "", e2 = "") => new RegExp(`^${t22}s?$`).test(e2);
    S2 = (t22) => P$1.indexOf(P$1.find(({ key: e2 }) => N(e2, t22)));
    W = (t22, e2) => P$1.reduce(([r2, i22], { key: o, multiplier: n2 }, m22) => {
      if (N(i22, e2))
        return [r2, i22];
      if (!i22 || m22 === S2(i22) + 1) {
        let f22 = Math.round(r2 / n2);
        if (!i22 || Math.abs(f22) >= 1 || e2 !== "auto")
          return [f22, o];
      }
      return [r2, i22];
    }, [t22, ""]);
    X = ({ value: t22, defaultValue: e2 = "", locale: r2 = "", props: i22, parserOptions: o }) => {
      if (!r2)
        return "";
      let g = T("ago", o), { format: n2, numeric: m22 } = g, f22 = d$1(g, ["format", "numeric"]), l2 = (i22 == null ? void 0 : i22.ago) || {}, { format: a = n2 || "auto", numeric: s22 = m22 || "auto" } = l2, c = d$1(l2, ["format", "numeric"]), x2 = +t22 || +e2, M2 = W(x2, a);
      return new Intl.RelativeTimeFormat(r2, u$1($(u$1({}, f22), { numeric: s22 }), c)).format(...M2);
    };
    Y = (t22) => typeof t22 == "string" && /{{(?:(?!{{|}}).)+}}/.test(t22);
    D = (t22) => typeof t22 == "string" ? t22.replace(/\\(?=:|;|{|})/g, "") : t22;
    Z2 = ({ value: t22, props: e2, payload: r2, parserOptions: i22, locale: o }) => `${t22}`.replace(/{{\s*(?:(?!{{|}}).)+\s*}}/g, (n2) => {
      let m22 = D(`${n2.match(/(?!{|\s).+?(?!\\[:;]).(?=\s*(?:[:;]|}}$))/)}`), f22 = r2 == null ? void 0 : r2[m22], [, a = ""] = n2.match(/.+?(?!\\;).;\s*default\s*:\s*([^\s:;].+?(?:\\[:;]|[^;\s}])*)(?=\s*(?:;|}}$))/i) || [];
      a = a || (r2 == null ? void 0 : r2.default) || "";
      let [, s22 = ""] = n2.match(/{{\s*(?:[^;]|(?:\\;))+\s*(?:(?!\\:).[:])\s*(?!\s)((?:\\;|[^;])+?)(?=\s*(?:[;]|}}$))/i) || [];
      if (f22 === void 0 && s22 !== "ne")
        return a;
      let c = !!s22, { customModifiers: x2 } = i22 || {}, M2 = u$1(u$1({}, h2), x2 || {});
      s22 = Object.keys(M2).includes(s22) ? s22 : "eq";
      let g = M2[s22], l2 = (n2.match(/[^\s:;{](?:[^;]|\\[;])+[^\s:;}]/gi) || []).reduce((F22, b, j2) => {
        if (j2 > 0) {
          let y = D(`${b.match(/(?:(?:\\:)|[^:])+/)}`.trim()), I2 = `${b.match(/(?:(?:\\:)|[^:])+$/)}`.trim();
          if (y && y !== "default" && I2)
            return [...F22, { key: y, value: I2 }];
        }
        return F22;
      }, []);
      return !c && !l2.length ? f22 : g({ value: f22, options: l2, props: e2, defaultValue: a, locale: o, parserOptions: i22 });
    });
    A2 = ({ value: t22, props: e2, payload: r2, parserOptions: i22, locale: o }) => {
      if (Y(t22)) {
        let n2 = Z2({ value: t22, payload: r2, props: e2, parserOptions: i22, locale: o });
        return A2({ value: n2, payload: r2, props: e2, parserOptions: i22, locale: o });
      } else
        return D(t22);
    };
    _ = (t22) => ({ parse: (e2, [r2, i22], o, n2) => ((r2 == null ? void 0 : r2.default) && e2 === void 0 && (e2 = `${r2.default}`), e2 === void 0 && (e2 = `${n2}`), A2({ value: e2, payload: r2, props: i22, parserOptions: t22, locale: o })) });
    rt = _;
    n = Object.defineProperty;
    M = Object.defineProperties;
    u = Object.getOwnPropertyDescriptors;
    s3 = Object.getOwnPropertySymbols;
    f3 = Object.prototype.hasOwnProperty;
    P = Object.prototype.propertyIsEnumerable;
    i2 = (r2, o, e2) => o in r2 ? n(r2, o, { enumerable: true, configurable: true, writable: true, value: e2 }) : r2[o] = e2;
    p = (r2, o) => {
      for (var e2 in o || (o = {}))
        f3.call(o, e2) && i2(r2, e2, o[e2]);
      if (s3)
        for (var e2 of s3(o))
          P.call(o, e2) && i2(r2, e2, o[e2]);
      return r2;
    };
    d = (r2, o) => M(r2, u(o));
    l = (r2, o) => {
      var e2 = {};
      for (var a in r2)
        f3.call(r2, a) && o.indexOf(a) < 0 && (e2[a] = r2[a]);
      if (r2 != null && s3)
        for (var a of s3(r2))
          o.indexOf(a) < 0 && P.call(r2, a) && (e2[a] = r2[a]);
      return e2;
    };
    m2 = (e2) => {
      var a = e2, { parserOptions: r2 = {} } = a, o = l(a, ["parserOptions"]);
      return d(p({}, o), { parser: rt(r2) });
    };
    t$1 = class extends z$1 {
      constructor(e2) {
        super(e2 && m2(e2));
        this.loadConfig = (e22) => super.configLoader(m2(e22));
      }
    };
    v = t$1;
    en = "English";
    es = "Espa\xF1ol";
    lang = {
      en,
      es
    };
    config = {
      fallbackLocale: "en",
      translations: {
        en: { lang },
        es: { lang }
      },
      loaders: [
        {
          locale: "en",
          key: "layout",
          loader: async () => await Promise.resolve().then(() => (init_layout_b7cfa383(), layout_b7cfa383_exports))
        },
        {
          locale: "es",
          key: "layout",
          loader: async () => await Promise.resolve().then(() => (init_layout_cad52ea7(), layout_cad52ea7_exports))
        }
      ]
    };
    ({ t: t2, locale, locales, loading, loadTranslations } = new v(config));
  }
});

// .svelte-kit/output/server/chunks/TransitionRoot-95dacb6b.js
function hasOpenClosed() {
  return useOpenClosed() !== void 0;
}
function useOpenClosed() {
  return getContext(OPEN_CLOSED_CONTEXT_NAME);
}
function useOpenClosedProvider(value) {
  setContext(OPEN_CLOSED_CONTEXT_NAME, value);
}
function match(value, lookup, ...args) {
  if (value in lookup) {
    let returnValue = lookup[value];
    return typeof returnValue === "function" ? returnValue(...args) : returnValue;
  }
  let error2 = new Error(`Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(lookup).map((key2) => `"${key2}"`).join(", ")}.`);
  if (Error.captureStackTrace)
    Error.captureStackTrace(error2, match);
  throw error2;
}
function generateId() {
  return ++id;
}
function useId() {
  return generateId();
}
function inert(element) {
  element.setAttribute("aria-hidden", "true");
  element.inert = true;
}
function restore(element) {
  let original = originals.get(element);
  if (!original)
    return;
  if (original["aria-hidden"] === null)
    element.removeAttribute("aria-hidden");
  else
    element.setAttribute("aria-hidden", original["aria-hidden"]);
  element.inert = original.inert;
}
function useInertOthers(container, enabled = true) {
  if (!enabled)
    return;
  if (!container)
    return;
  let element = container;
  interactables.add(element);
  for (let original of originals.keys()) {
    if (original.contains(element)) {
      restore(original);
      originals.delete(original);
    }
  }
  document.querySelectorAll("body > *").forEach((child) => {
    if (!(child instanceof HTMLElement))
      return;
    for (let interactable of interactables) {
      if (child.contains(interactable))
        return;
    }
    if (interactables.size === 1) {
      originals.set(child, {
        "aria-hidden": child.getAttribute("aria-hidden"),
        inert: child.inert
      });
      inert(child);
    }
  });
  return () => {
    interactables.delete(element);
    if (interactables.size > 0) {
      document.querySelectorAll("body > *").forEach((child) => {
        if (!(child instanceof HTMLElement))
          return;
        if (originals.has(child))
          return;
        for (let interactable of interactables) {
          if (child.contains(interactable))
            return;
        }
        originals.set(child, {
          "aria-hidden": child.getAttribute("aria-hidden"),
          inert: child.inert
        });
        inert(child);
      });
    } else {
      for (let element2 of originals.keys()) {
        restore(element2);
        originals.delete(element2);
      }
    }
  };
}
function contains(containers, element) {
  for (let container of containers) {
    if (container.contains(element))
      return true;
  }
  return false;
}
function getFocusableElements(container = document.body) {
  if (container == null)
    return [];
  return Array.from(container.querySelectorAll(focusableSelector));
}
function focusElement(element) {
  element == null ? void 0 : element.focus({ preventScroll: true });
}
function focusIn(container, focus) {
  let elements = Array.isArray(container) ? container : getFocusableElements(container);
  let active = document.activeElement;
  let direction = (() => {
    if (focus & (Focus$1.First | Focus$1.Next))
      return Direction.Next;
    if (focus & (Focus$1.Previous | Focus$1.Last))
      return Direction.Previous;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let startIndex = (() => {
    if (focus & Focus$1.First)
      return 0;
    if (focus & Focus$1.Previous)
      return Math.max(0, elements.indexOf(active)) - 1;
    if (focus & Focus$1.Next)
      return Math.max(0, elements.indexOf(active)) + 1;
    if (focus & Focus$1.Last)
      return elements.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })();
  let focusOptions = focus & Focus$1.NoScroll ? { preventScroll: true } : {};
  let offset = 0;
  let total = elements.length;
  let next = void 0;
  do {
    if (offset >= total || offset + total <= 0)
      return FocusResult.Error;
    let nextIdx = startIndex + offset;
    if (focus & Focus$1.WrapAround) {
      nextIdx = (nextIdx + total) % total;
    } else {
      if (nextIdx < 0)
        return FocusResult.Underflow;
      if (nextIdx >= total)
        return FocusResult.Overflow;
    }
    next = elements[nextIdx];
    next == null ? void 0 : next.focus(focusOptions);
    offset += direction;
  } while (next !== document.activeElement);
  if (!next.hasAttribute("tabindex"))
    next.setAttribute("tabindex", "0");
  return FocusResult.Success;
}
function useDescriptionContext() {
  return getContext(DESCRIPTION_CONTEXT_NAME);
}
function usePortalRoot() {
  return getContext(FORCE_PORTAL_ROOT_CONTEXT_NAME);
}
function usePortalGroupContext() {
  return getContext(PORTAL_GROUP_CONTEXT_NAME);
}
function forwardEventsBuilder(component, except = []) {
  let $on;
  let events = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    for (let exception of except) {
      if (typeof exception === "string" && exception === eventType) {
        const callbacks = component.$$.callbacks[eventType] || (component.$$.callbacks[eventType] = []);
        callbacks.push(callback);
        return () => {
          const index17 = callbacks.indexOf(callback);
          if (index17 !== -1)
            callbacks.splice(index17, 1);
        };
      }
      if (typeof exception === "object" && exception["name"] === eventType) {
        let oldCallback = callback;
        callback = (...props) => {
          if (!(typeof exception === "object" && exception["shouldExclude"]())) {
            oldCallback(...props);
          }
        };
      }
    }
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    return () => {
      destructor();
    };
  };
  function forward(e2) {
    bubble(component, e2);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const modifierMatch = eventType.match(modifierRegex);
      if (modifierMatch) {
        const parts = eventType.split(MODIFIER_DIVIDER);
        eventType = parts[0];
        const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i3 = 0; i3 < events.length; i3++) {
      $on(events[i3][0], events[i3][1]);
    }
    return {
      destroy: () => {
        for (let i3 = 0; i3 < destructors.length; i3++) {
          destructors[i3]();
        }
        for (let entry17 of Object.entries(forwardDestructors)) {
          entry17[1]();
        }
      }
    };
  };
}
function isValidElement(element) {
  return !(typeof element === "string" && !components.includes(element));
}
function useDialogContext(component) {
  let context = getContext(DIALOG_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(`<${component} /> is missing a parent <Dialog /> component.`);
  }
  return context;
}
function assertNever(x2) {
  throw new Error("Unexpected object: " + x2);
}
function calculateActiveIndex(action, resolvers) {
  let items = resolvers.resolveItems();
  if (items.length <= 0)
    return null;
  let currentActiveIndex = resolvers.resolveActiveIndex();
  let activeIndex = currentActiveIndex ?? -1;
  let nextActiveIndex = (() => {
    switch (action.focus) {
      case Focus.First:
        return items.findIndex((item) => !resolvers.resolveDisabled(item));
      case Focus.Previous: {
        let idx = items.slice().reverse().findIndex((item, idx2, all) => {
          if (activeIndex !== -1 && all.length - idx2 - 1 >= activeIndex)
            return false;
          return !resolvers.resolveDisabled(item);
        });
        if (idx === -1)
          return idx;
        return items.length - 1 - idx;
      }
      case Focus.Next:
        return items.findIndex((item, idx) => {
          if (idx <= activeIndex)
            return false;
          return !resolvers.resolveDisabled(item);
        });
      case Focus.Last: {
        let idx = items.slice().reverse().findIndex((item) => !resolvers.resolveDisabled(item));
        if (idx === -1)
          return idx;
        return items.length - 1 - idx;
      }
      case Focus.Specific:
        return items.findIndex((item) => resolvers.resolveId(item) === action.id);
      case Focus.Nothing:
        return null;
      default:
        assertNever(action);
    }
  })();
  return nextActiveIndex === -1 ? currentActiveIndex : nextActiveIndex;
}
function useListboxContext(component) {
  let context = getContext(LISTBOX_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error(`<${component} /> is missing a parent <Listbox /> component.`);
  }
  return context;
}
function hasTransitionContext() {
  return getContext(TRANSITION_CONTEXT_NAME) !== void 0;
}
function useTransitionContext() {
  let context = getContext(TRANSITION_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
function useParentNesting() {
  let context = getContext(NESTING_CONTEXT_NAME);
  if (context === void 0) {
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  }
  return context;
}
function hasChildren(bag) {
  if ("children" in bag)
    return hasChildren(bag.children);
  return bag.filter(({ state }) => state === TreeStates.Visible).length > 0;
}
function useNesting(done) {
  let transitionableChildren = [];
  function unregister(childId, strategy = RenderStrategy.Hidden) {
    let idx = transitionableChildren.findIndex(({ id: id2 }) => id2 === childId);
    if (idx === -1)
      return;
    let hadChildren = hasChildren(transitionableChildren);
    match(strategy, {
      [RenderStrategy.Unmount]() {
        transitionableChildren.splice(idx, 1);
      },
      [RenderStrategy.Hidden]() {
        transitionableChildren[idx].state = TreeStates.Hidden;
      }
    });
    if (hadChildren && !hasChildren(transitionableChildren)) {
      done == null ? void 0 : done();
    }
  }
  function register(childId) {
    let child = transitionableChildren.find(({ id: id2 }) => id2 === childId);
    if (!child) {
      transitionableChildren.push({ id: childId, state: TreeStates.Visible });
    } else if (child.state !== TreeStates.Visible) {
      child.state = TreeStates.Visible;
    }
    return () => unregister(childId, RenderStrategy.Unmount);
  }
  return {
    children: transitionableChildren,
    register,
    unregister
  };
}
var __defProp3, __defProps3, __getOwnPropDescs3, __getOwnPropSymbols3, __hasOwnProp3, __propIsEnum3, __defNormalProp3, __spreadValues3, __spreadProps3, State, OPEN_CLOSED_CONTEXT_NAME, id, interactables, originals, Keys, focusableSelector, Focus$1, FocusResult, Direction, FocusableMode, FocusTrap, StackMessage, STACK_CONTEXT_NAME, StackContextProvider, DESCRIPTION_CONTEXT_NAME, DescriptionProvider, FORCE_PORTAL_ROOT_CONTEXT_NAME, ForcePortalRootContext, PORTAL_GROUP_CONTEXT_NAME, PortalGroup, Portal, MODIFIER_DIVIDER, modifierRegex, components, Features, RenderStrategy, Render, DialogStates, DIALOG_CONTEXT_NAME, Dialog, DisclosureStates, Focus, Object_1, ListboxStates, LISTBOX_CONTEXT_NAME, Listbox, MenuStates, PopoverStates, Reason, TreeStates, TRANSITION_CONTEXT_NAME, NESTING_CONTEXT_NAME, TransitionChild, TransitionRoot;
var init_TransitionRoot_95dacb6b = __esm({
  ".svelte-kit/output/server/chunks/TransitionRoot-95dacb6b.js"() {
    init_index_2415d7ec();
    init_index_b173f350();
    __defProp3 = Object.defineProperty;
    __defProps3 = Object.defineProperties;
    __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
    __hasOwnProp3 = Object.prototype.hasOwnProperty;
    __propIsEnum3 = Object.prototype.propertyIsEnumerable;
    __defNormalProp3 = (obj, key2, value) => key2 in obj ? __defProp3(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues3 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp3.call(b, prop))
          __defNormalProp3(a, prop, b[prop]);
      if (__getOwnPropSymbols3)
        for (var prop of __getOwnPropSymbols3(b)) {
          if (__propIsEnum3.call(b, prop))
            __defNormalProp3(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
    (function(State2) {
      State2[State2["Open"] = 0] = "Open";
      State2[State2["Closed"] = 1] = "Closed";
    })(State || (State = {}));
    OPEN_CLOSED_CONTEXT_NAME = "headlessui-open-closed-context";
    id = 0;
    interactables = /* @__PURE__ */ new Set();
    originals = /* @__PURE__ */ new Map();
    (function(Keys2) {
      Keys2["Space"] = " ";
      Keys2["Enter"] = "Enter";
      Keys2["Escape"] = "Escape";
      Keys2["Backspace"] = "Backspace";
      Keys2["ArrowLeft"] = "ArrowLeft";
      Keys2["ArrowUp"] = "ArrowUp";
      Keys2["ArrowRight"] = "ArrowRight";
      Keys2["ArrowDown"] = "ArrowDown";
      Keys2["Home"] = "Home";
      Keys2["End"] = "End";
      Keys2["PageUp"] = "PageUp";
      Keys2["PageDown"] = "PageDown";
      Keys2["Tab"] = "Tab";
    })(Keys || (Keys = {}));
    focusableSelector = [
      "[contentEditable=true]",
      "[tabindex]",
      "a[href]",
      "area[href]",
      "button:not([disabled])",
      "iframe",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])"
    ].map((selector) => `${selector}:not([tabindex='-1'])`).join(",");
    (function(Focus2) {
      Focus2[Focus2["First"] = 1] = "First";
      Focus2[Focus2["Previous"] = 2] = "Previous";
      Focus2[Focus2["Next"] = 4] = "Next";
      Focus2[Focus2["Last"] = 8] = "Last";
      Focus2[Focus2["WrapAround"] = 16] = "WrapAround";
      Focus2[Focus2["NoScroll"] = 32] = "NoScroll";
    })(Focus$1 || (Focus$1 = {}));
    (function(FocusResult2) {
      FocusResult2[FocusResult2["Error"] = 0] = "Error";
      FocusResult2[FocusResult2["Overflow"] = 1] = "Overflow";
      FocusResult2[FocusResult2["Success"] = 2] = "Success";
      FocusResult2[FocusResult2["Underflow"] = 3] = "Underflow";
    })(FocusResult || (FocusResult = {}));
    (function(Direction2) {
      Direction2[Direction2["Previous"] = -1] = "Previous";
      Direction2[Direction2["Next"] = 1] = "Next";
    })(Direction || (Direction = {}));
    (function(FocusableMode2) {
      FocusableMode2[FocusableMode2["Strict"] = 0] = "Strict";
      FocusableMode2[FocusableMode2["Loose"] = 1] = "Loose";
    })(FocusableMode || (FocusableMode = {}));
    FocusTrap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { containers } = $$props;
      let { enabled = true } = $$props;
      let { options = {} } = $$props;
      let restoreElement = typeof window !== "undefined" ? document.activeElement : null;
      async function handleFocus() {
        if (!enabled)
          return;
        if (containers.size !== 1)
          return;
        let { initialFocus } = options;
        await tick();
        let activeElement = document.activeElement;
        if (initialFocus) {
          if (initialFocus === activeElement) {
            return;
          }
        } else if (contains(containers, activeElement)) {
          return;
        }
        restoreElement = activeElement;
        if (initialFocus) {
          focusElement(initialFocus);
        } else {
          let couldFocus = false;
          for (let container of containers) {
            let result = focusIn(container, Focus$1.First);
            if (result === FocusResult.Success) {
              couldFocus = true;
              break;
            }
          }
          if (!couldFocus)
            console.warn("There are no focusable elements inside the <FocusTrap />");
        }
      }
      function restore2() {
        focusElement(restoreElement);
        restoreElement = null;
      }
      onDestroy(() => {
        restore2();
      });
      if ($$props.containers === void 0 && $$bindings.containers && containers !== void 0)
        $$bindings.containers(containers);
      if ($$props.enabled === void 0 && $$bindings.enabled && enabled !== void 0)
        $$bindings.enabled(enabled);
      if ($$props.options === void 0 && $$bindings.options && options !== void 0)
        $$bindings.options(options);
      {
        enabled && containers ? handleFocus() : restore2();
      }
      return ``;
    });
    (function(StackMessage2) {
      StackMessage2[StackMessage2["Add"] = 0] = "Add";
      StackMessage2[StackMessage2["Remove"] = 1] = "Remove";
    })(StackMessage || (StackMessage = {}));
    STACK_CONTEXT_NAME = "headlessui-stack-context";
    StackContextProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let _cleanup;
      let { onUpdate } = $$props;
      let { element } = $$props;
      function notify(...args) {
        onUpdate == null ? void 0 : onUpdate(...args);
        parentUpdate == null ? void 0 : parentUpdate(...args);
      }
      let parentUpdate = getContext(STACK_CONTEXT_NAME);
      setContext(STACK_CONTEXT_NAME, notify);
      onDestroy(() => {
        if (_cleanup) {
          _cleanup();
        }
      });
      if ($$props.onUpdate === void 0 && $$bindings.onUpdate && onUpdate !== void 0)
        $$bindings.onUpdate(onUpdate);
      if ($$props.element === void 0 && $$bindings.element && element !== void 0)
        $$bindings.element(element);
      _cleanup = (() => {
        if (_cleanup) {
          _cleanup();
        }
        if (!element)
          return null;
        let savedElement = element;
        notify(StackMessage.Add, savedElement);
        return () => notify(StackMessage.Remove, savedElement);
      })();
      return `${slots.default ? slots.default({}) : ``}`;
    });
    DESCRIPTION_CONTEXT_NAME = "headlessui-description-context";
    DescriptionProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["name", "slotProps"]);
      let $contextStore, $$unsubscribe_contextStore;
      let { name } = $$props;
      let { slotProps = {} } = $$props;
      let descriptionIds = [];
      let contextStore = writable2({
        name,
        slotProps,
        props: $$restProps,
        register
      });
      $$unsubscribe_contextStore = subscribe(contextStore, (value) => $contextStore = value);
      setContext(DESCRIPTION_CONTEXT_NAME, contextStore);
      function register(value) {
        descriptionIds = [...descriptionIds, value];
        return () => {
          descriptionIds = descriptionIds.filter((descriptionId) => descriptionId !== value);
        };
      }
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.slotProps === void 0 && $$bindings.slotProps && slotProps !== void 0)
        $$bindings.slotProps(slotProps);
      {
        contextStore.set({
          name,
          slotProps,
          props: $$restProps,
          register,
          descriptionIds: descriptionIds.length > 0 ? descriptionIds.join(" ") : void 0
        });
      }
      $$unsubscribe_contextStore();
      return `${slots.default ? slots.default({
        describedby: $contextStore.descriptionIds
      }) : ``}`;
    });
    FORCE_PORTAL_ROOT_CONTEXT_NAME = "headlessui-force-portal-root-context";
    ForcePortalRootContext = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { force } = $$props;
      setContext(FORCE_PORTAL_ROOT_CONTEXT_NAME, writable2(force));
      if ($$props.force === void 0 && $$bindings.force && force !== void 0)
        $$bindings.force(force);
      return `${slots.default ? slots.default({}) : ``}`;
    });
    PORTAL_GROUP_CONTEXT_NAME = "headlessui-portal-group-context";
    PortalGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { target } = $$props;
      let targetStore = writable2(target);
      setContext(PORTAL_GROUP_CONTEXT_NAME, targetStore);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      {
        targetStore.set(target);
      }
      return `${slots.default ? slots.default({}) : ``}`;
    });
    Portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $groupTarget, $$unsubscribe_groupTarget;
      let $forceInRoot, $$unsubscribe_forceInRoot;
      let forceInRoot = usePortalRoot();
      $$unsubscribe_forceInRoot = subscribe(forceInRoot, (value) => $forceInRoot = value);
      let groupTarget = usePortalGroupContext();
      $$unsubscribe_groupTarget = subscribe(groupTarget, (value) => $groupTarget = value);
      (() => {
        if (!(forceInRoot && $forceInRoot) && groupTarget !== void 0 && $groupTarget !== null)
          return $groupTarget;
        if (typeof window === "undefined")
          return null;
        let existingRoot = document.getElementById("headlessui-portal-root");
        if (existingRoot)
          return existingRoot;
        let root = document.createElement("div");
        root.setAttribute("id", "headlessui-portal-root");
        tick().then(() => {
          if (root !== document.body.lastChild) {
            document.body.appendChild(root);
          }
        });
        return document.body.appendChild(root);
      })();
      $$unsubscribe_groupTarget();
      $$unsubscribe_forceInRoot();
      return `<div>${slots.default ? slots.default({}) : ``}</div>`;
    });
    MODIFIER_DIVIDER = "!";
    modifierRegex = new RegExp(`^[^${MODIFIER_DIVIDER}]+(?:${MODIFIER_DIVIDER}(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$`);
    components = [
      "a",
      "address",
      "article",
      "aside",
      "b",
      "bdi",
      "bdo",
      "blockquote",
      "button",
      "cite",
      "code",
      "data",
      "datalist",
      "dd",
      "dl",
      "dt",
      "div",
      "em",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "i",
      "input",
      "label",
      "li",
      "main",
      "nav",
      "ol",
      "p",
      "section",
      "span",
      "strong",
      "ul"
    ];
    (function(Features2) {
      Features2[Features2["None"] = 0] = "None";
      Features2[Features2["RenderStrategy"] = 1] = "RenderStrategy";
      Features2[Features2["Static"] = 2] = "Static";
    })(Features || (Features = {}));
    (function(RenderStrategy2) {
      RenderStrategy2[RenderStrategy2["Unmount"] = 0] = "Unmount";
      RenderStrategy2[RenderStrategy2["Hidden"] = 1] = "Hidden";
    })(RenderStrategy || (RenderStrategy = {}));
    Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let computedClass;
      let computedStyle;
      let show;
      let hidden;
      let propsWeControl;
      let $$restProps = compute_rest_props($$props, [
        "name",
        "as",
        "slotProps",
        "el",
        "use",
        "visible",
        "features",
        "unmount",
        "static",
        "class",
        "style"
      ]);
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let { name } = $$props;
      let { as } = $$props;
      let { slotProps } = $$props;
      let { el = null } = $$props;
      let { use = [] } = $$props;
      let { visible = true } = $$props;
      let { features = Features.None } = $$props;
      let { unmount = true } = $$props;
      let { static: static_ = false } = $$props;
      let { class: classProp = void 0 } = $$props;
      let { style: style2 = void 0 } = $$props;
      if (!as) {
        throw new Error(`<${name}> did not provide an \`as\` value to <Render>`);
      }
      if (!isValidElement(as)) {
        throw new Error(`<${name}> has an invalid or unsupported \`as\` prop: ${as}`);
      }
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.slotProps === void 0 && $$bindings.slotProps && slotProps !== void 0)
        $$bindings.slotProps(slotProps);
      if ($$props.el === void 0 && $$bindings.el && el !== void 0)
        $$bindings.el(el);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
        $$bindings.visible(visible);
      if ($$props.features === void 0 && $$bindings.features && features !== void 0)
        $$bindings.features(features);
      if ($$props.unmount === void 0 && $$bindings.unmount && unmount !== void 0)
        $$bindings.unmount(unmount);
      if ($$props.static === void 0 && $$bindings.static && static_ !== void 0)
        $$bindings.static(static_);
      if ($$props.class === void 0 && $$bindings.class && classProp !== void 0)
        $$bindings.class(classProp);
      if ($$props.style === void 0 && $$bindings.style && style2 !== void 0)
        $$bindings.style(style2);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        computedClass = typeof classProp === "function" ? classProp(slotProps) : classProp;
        computedStyle = typeof style2 === "function" ? style2(slotProps) : style2;
        show = visible || features & Features.Static && static_ || !(features & Features.RenderStrategy && unmount);
        hidden = !visible && !(features & Features.Static && static_) && features & Features.RenderStrategy && !unmount;
        propsWeControl = {
          class: computedClass,
          style: `${computedStyle ?? ""}${hidden ? " display: none" : ""}` || void 0
        };
        {
          if (propsWeControl.style === void 0) {
            delete propsWeControl.style;
          }
        }
        $$rendered = `${show ? `
  ${as === "a" ? `
    <a${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${as === "address" ? `<address${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</address>` : `${as === "article" ? `<article${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</article>` : `${as === "aside" ? `<aside${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</aside>` : `${as === "b" ? `<b${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</b>` : `${as === "bdi" ? `<bdi${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</bdi>` : `${as === "bdo" ? `<bdo${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</bdo>` : `${as === "blockquote" ? `<blockquote${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</blockquote>` : `${as === "button" ? `<button${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</button>` : `${as === "cite" ? `<cite${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</cite>` : `${as === "code" ? `<code${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</code>` : `${as === "data" ? `<data${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</data>` : `${as === "datalist" ? `<datalist${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</datalist>` : `${as === "dd" ? `<dd${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dd>` : `${as === "dl" ? `<dl${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dl>` : `${as === "dt" ? `<dt${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</dt>` : `${as === "div" ? `<div${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${as === "em" ? `<em${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</em>` : `${as === "footer" ? `<footer${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</footer>` : `${as === "form" ? `<form${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</form>` : `${as === "h1" ? `<h1${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h1>` : `${as === "h2" ? `<h2${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h2>` : `${as === "h3" ? `<h3${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h3>` : `${as === "h4" ? `<h4${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h4>` : `${as === "h5" ? `<h5${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h5>` : `${as === "h6" ? `<h6${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</h6>` : `${as === "header" ? `<header${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</header>` : `${as === "i" ? `<i${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</i>` : `${as === "input" ? `<input${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>` : `${as === "label" ? `
    <label${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</label>` : `${as === "li" ? `<li${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</li>` : `${as === "main" ? `<main${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</main>` : `${as === "nav" ? `<nav${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</nav>` : `${as === "ol" ? `<ol${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</ol>` : `${as === "p" ? `<p${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</p>` : `${as === "section" ? `<section${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</section>` : `${as === "span" ? `<span${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</span>` : `${as === "strong" ? `<strong${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</strong>` : `${as === "ul" ? `<ul${spread([
          escape_object($$restProps),
          escape_object(propsWeControl),
          { hidden: hidden || void 0 || null }
        ], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</ul>` : `${validate_component(as || missing_component, "svelte:component").$$render($$result, Object.assign({
          use: [
            ...use,
            forwardEvents
          ]
        }, $$restProps, propsWeControl, { hidden: hidden || void 0 }, { el }), {
          el: ($$value) => {
            el = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        })}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}` : ``}`;
      } while (!$$settled);
      return $$rendered;
    });
    (function(DialogStates2) {
      DialogStates2[DialogStates2["Open"] = 0] = "Open";
      DialogStates2[DialogStates2["Closed"] = 1] = "Closed";
    })(DialogStates || (DialogStates = {}));
    DIALOG_CONTEXT_NAME = "headlessui-dialog-context";
    Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let dialogState;
      let visible;
      let enabled;
      let _cleanup;
      let _cleanupScrollLock;
      let _cleanupClose;
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use", "open", "initialFocus"]);
      let $api, $$unsubscribe_api;
      let $openClosedState, $$unsubscribe_openClosedState;
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      let { open = void 0 } = $$props;
      let { initialFocus = null } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["close"]);
      const dispatch = createEventDispatcher();
      let containers = /* @__PURE__ */ new Set();
      let openClosedState = useOpenClosed();
      $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
      let internalDialogRef = null;
      const id2 = `headlessui-dialog-${useId()}`;
      onDestroy(() => {
        if (_cleanup) {
          _cleanup();
        }
      });
      let titleId;
      let api = writable2({
        titleId,
        dialogState,
        setTitleId(id3) {
          if (titleId === id3)
            return;
          titleId = id3;
        },
        close() {
          dispatch("close", false);
        }
      });
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      setContext(DIALOG_CONTEXT_NAME, api);
      onDestroy(() => {
        if (_cleanupScrollLock) {
          _cleanupScrollLock();
        }
      });
      onDestroy(() => {
        if (_cleanupClose) {
          _cleanupClose();
        }
      });
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
      if ($$props.initialFocus === void 0 && $$bindings.initialFocus && initialFocus !== void 0)
        $$bindings.initialFocus(initialFocus);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        {
          {
            open = open === void 0 && openClosedState !== void 0 ? match($openClosedState, {
              [State.Open]: true,
              [State.Closed]: false
            }) : open;
            let hasOpen = open !== void 0 || openClosedState !== void 0;
            if (!hasOpen) {
              throw new Error(`You forgot to provide an \`open\` prop to the \`Dialog\` component.`);
            }
            if (typeof open !== "boolean") {
              throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${open}`);
            }
          }
        }
        dialogState = open ? DialogStates.Open : DialogStates.Closed;
        visible = openClosedState !== void 0 ? $openClosedState === State.Open : dialogState === DialogStates.Open;
        enabled = dialogState === DialogStates.Open;
        _cleanup = (() => {
          if (_cleanup) {
            _cleanup();
          }
          return useInertOthers(internalDialogRef, enabled);
        })();
        {
          api.update((obj) => {
            return __spreadProps3(__spreadValues3({}, obj), { titleId, dialogState });
          });
        }
        _cleanupScrollLock = (() => {
          if (_cleanupScrollLock) {
            _cleanupScrollLock();
          }
          if (dialogState !== DialogStates.Open)
            return;
          return;
        })();
        _cleanupClose = (() => {
          if (_cleanupClose) {
            _cleanupClose();
          }
          if (dialogState !== DialogStates.Open)
            return;
          let container = internalDialogRef;
          if (!container)
            return;
          let observer = new IntersectionObserver((entries) => {
            for (let entry17 of entries) {
              if (entry17.boundingClientRect.x === 0 && entry17.boundingClientRect.y === 0 && entry17.boundingClientRect.width === 0 && entry17.boundingClientRect.height === 0) {
                $api.close();
              }
            }
          });
          observer.observe(container);
          return () => observer.disconnect();
        })();
        propsWeControl = {
          id: id2,
          role: "dialog",
          "aria-modal": dialogState === DialogStates.Open ? true : void 0,
          "aria-labelledby": titleId
        };
        slotProps = { open };
        $$rendered = `
${validate_component(FocusTrap, "FocusTrap").$$render($$result, {
          containers,
          enabled,
          options: { initialFocus }
        }, {}, {})}
${validate_component(StackContextProvider, "StackContextProvider").$$render($$result, {
          element: internalDialogRef,
          onUpdate: (message, element) => {
            return match(message, {
              [StackMessage.Add]() {
                containers = /* @__PURE__ */ new Set([...containers, element]);
              },
              [StackMessage.Remove]() {
                containers.delete(element);
                containers = /* @__PURE__ */ new Set([...containers]);
              }
            });
          }
        }, {}, {
          default: () => {
            return `${validate_component(ForcePortalRootContext, "ForcePortalRootContext").$$render($$result, { force: true }, {}, {
              default: () => {
                return `${validate_component(Portal, "Portal").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(PortalGroup, "PortalGroup").$$render($$result, { target: internalDialogRef }, {}, {
                      default: () => {
                        return `${validate_component(ForcePortalRootContext, "ForcePortalRootContext").$$render($$result, { force: false }, {}, {
                          default: () => {
                            return `${validate_component(DescriptionProvider, "DescriptionProvider").$$render($$result, { name: "DialogDescription", slotProps }, {}, {
                              default: ({ describedby }) => {
                                return `${validate_component(Render, "Render").$$render($$result, Object.assign(__spreadValues3(__spreadValues3({}, $$restProps), propsWeControl), { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Dialog" }, { "aria-describedby": describedby }, { visible }, {
                                  features: Features.RenderStrategy | Features.Static
                                }, { el: internalDialogRef }), {
                                  el: ($$value) => {
                                    internalDialogRef = $$value;
                                    $$settled = false;
                                  }
                                }, {
                                  default: () => {
                                    return `${slots.default ? slots.default(__spreadValues3({}, slotProps)) : ``}`;
                                  }
                                })}`;
                              }
                            })}`;
                          }
                        })}`;
                      }
                    })}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_api();
      $$unsubscribe_openClosedState();
      return $$rendered;
    });
    (function(DisclosureStates2) {
      DisclosureStates2[DisclosureStates2["Open"] = 0] = "Open";
      DisclosureStates2[DisclosureStates2["Closed"] = 1] = "Closed";
    })(DisclosureStates || (DisclosureStates = {}));
    (function(Focus2) {
      Focus2[Focus2["First"] = 0] = "First";
      Focus2[Focus2["Previous"] = 1] = "Previous";
      Focus2[Focus2["Next"] = 2] = "Next";
      Focus2[Focus2["Last"] = 3] = "Last";
      Focus2[Focus2["Specific"] = 4] = "Specific";
      Focus2[Focus2["Nothing"] = 5] = "Nothing";
    })(Focus || (Focus = {}));
    ({ Object: Object_1 } = globals2);
    (function(ListboxStates2) {
      ListboxStates2[ListboxStates2["Open"] = 0] = "Open";
      ListboxStates2[ListboxStates2["Closed"] = 1] = "Closed";
    })(ListboxStates || (ListboxStates = {}));
    LISTBOX_CONTEXT_NAME = "headlessui-listbox-context";
    Listbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let orientation;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use", "disabled", "horizontal", "value"]);
      let $$unsubscribe_buttonRef;
      let $$unsubscribe_api;
      let $optionsRef, $$unsubscribe_optionsRef;
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      let { disabled = false } = $$props;
      let { horizontal = false } = $$props;
      let { value } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["change"]);
      const dispatch = createEventDispatcher();
      let listboxState = ListboxStates.Closed;
      let labelRef = writable2(null);
      let buttonRef = writable2(null);
      $$unsubscribe_buttonRef = subscribe(buttonRef, (value2) => value2);
      let optionsRef = writable2(null);
      $$unsubscribe_optionsRef = subscribe(optionsRef, (value2) => $optionsRef = value2);
      let options = [];
      let searchQuery = "";
      let activeOptionIndex = null;
      let api = writable2({
        listboxState,
        value,
        labelRef,
        buttonRef,
        optionsRef,
        options,
        searchQuery,
        activeOptionIndex,
        disabled,
        orientation,
        closeListbox() {
          if (disabled)
            return;
          if (listboxState === ListboxStates.Closed)
            return;
          listboxState = ListboxStates.Closed;
          activeOptionIndex = null;
        },
        openListbox() {
          if (disabled)
            return;
          if (listboxState === ListboxStates.Open)
            return;
          listboxState = ListboxStates.Open;
        },
        goToOption(focus, id2) {
          if (disabled)
            return;
          if (listboxState === ListboxStates.Closed)
            return;
          let nextActiveOptionIndex = calculateActiveIndex(focus === Focus.Specific ? { focus: Focus.Specific, id: id2 } : { focus }, {
            resolveItems: () => options,
            resolveActiveIndex: () => activeOptionIndex,
            resolveId: (option) => option.id,
            resolveDisabled: (option) => option.dataRef.disabled
          });
          if (searchQuery === "" && activeOptionIndex === nextActiveOptionIndex)
            return;
          activeOptionIndex = nextActiveOptionIndex;
          searchQuery = "";
        },
        search(value2) {
          if (disabled)
            return;
          if (listboxState === ListboxStates.Closed)
            return;
          searchQuery += value2.toLowerCase();
          let reorderedOptions = activeOptionIndex !== null ? options.slice(activeOptionIndex + 1).concat(options.slice(0, activeOptionIndex + 1)) : options;
          let matchingOption = reorderedOptions.find((option) => !option.dataRef.disabled && option.dataRef.textValue.startsWith(searchQuery));
          let matchIdx = matchingOption ? options.indexOf(matchingOption) : -1;
          if (matchIdx === -1 || matchIdx === activeOptionIndex)
            return;
          activeOptionIndex = matchIdx;
        },
        clearSearch() {
          if (disabled)
            return;
          if (listboxState === ListboxStates.Closed)
            return;
          if (searchQuery === "")
            return;
          searchQuery = "";
        },
        registerOption(id2, dataRef) {
          if (!$optionsRef) {
            options = [...options, { id: id2, dataRef }];
            return;
          }
          let currentActiveOption = activeOptionIndex !== null ? options[activeOptionIndex] : null;
          let orderMap = Array.from($optionsRef.querySelectorAll('[id^="headlessui-listbox-option-"]')).reduce((lookup, element, index17) => Object.assign(lookup, { [element.id]: index17 }), {});
          let nextOptions = [...options, { id: id2, dataRef }];
          nextOptions.sort((a, z2) => orderMap[a.id] - orderMap[z2.id]);
          options = nextOptions;
          activeOptionIndex = (() => {
            if (currentActiveOption === null)
              return null;
            return options.indexOf(currentActiveOption);
          })();
        },
        unregisterOption(id2) {
          let nextOptions = options.slice();
          let currentActiveOption = activeOptionIndex !== null ? nextOptions[activeOptionIndex] : null;
          let idx = nextOptions.findIndex((a) => a.id === id2);
          if (idx !== -1)
            nextOptions.splice(idx, 1);
          options = nextOptions;
          activeOptionIndex = (() => {
            if (idx === activeOptionIndex)
              return null;
            if (currentActiveOption === null)
              return null;
            return nextOptions.indexOf(currentActiveOption);
          })();
        },
        select(value2) {
          if (disabled)
            return;
          dispatch("change", value2);
        }
      });
      $$unsubscribe_api = subscribe(api, (value2) => value2);
      setContext(LISTBOX_CONTEXT_NAME, api);
      let openClosedState = writable2(State.Closed);
      useOpenClosedProvider(openClosedState);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
        $$bindings.horizontal(horizontal);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      orientation = horizontal ? "horizontal" : "vertical";
      {
        openClosedState.set(match(listboxState, {
          [ListboxStates.Open]: State.Open,
          [ListboxStates.Closed]: State.Closed
        }));
      }
      {
        api.update((obj) => {
          return __spreadProps3(__spreadValues3({}, obj), {
            listboxState,
            value,
            options,
            searchQuery,
            activeOptionIndex,
            disabled,
            orientation
          });
        });
      }
      slotProps = {
        open: listboxState === ListboxStates.Open
      };
      $$unsubscribe_buttonRef();
      $$unsubscribe_api();
      $$unsubscribe_optionsRef();
      return `
${validate_component(Render, "Render").$$render($$result, Object_1.assign($$restProps, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Listbox" }), {}, {
        default: () => {
          return `${slots.default ? slots.default(__spreadValues3({}, slotProps)) : ``}`;
        }
      })}`;
    });
    (function(MenuStates2) {
      MenuStates2[MenuStates2["Open"] = 0] = "Open";
      MenuStates2[MenuStates2["Closed"] = 1] = "Closed";
    })(MenuStates || (MenuStates = {}));
    (function(PopoverStates2) {
      PopoverStates2[PopoverStates2["Open"] = 0] = "Open";
      PopoverStates2[PopoverStates2["Closed"] = 1] = "Closed";
    })(PopoverStates || (PopoverStates = {}));
    (function(Reason2) {
      Reason2["Finished"] = "finished";
      Reason2["Cancelled"] = "cancelled";
    })(Reason || (Reason = {}));
    (function(TreeStates2) {
      TreeStates2["Visible"] = "visible";
      TreeStates2["Hidden"] = "hidden";
    })(TreeStates || (TreeStates = {}));
    TRANSITION_CONTEXT_NAME = "headlessui-transition-context";
    NESTING_CONTEXT_NAME = "headlessui-nesting-context";
    TransitionChild = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let strategy;
      let classes;
      let $$restProps = compute_rest_props($$props, [
        "as",
        "use",
        "enter",
        "enterFrom",
        "enterTo",
        "entered",
        "leave",
        "leaveFrom",
        "leaveTo"
      ]);
      let $transitionContext, $$unsubscribe_transitionContext;
      let $nestingContext, $$unsubscribe_nestingContext;
      let $$unsubscribe_nesting;
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      let { enter = "" } = $$props;
      let { enterFrom = "" } = $$props;
      let { enterTo = "" } = $$props;
      let { entered = "" } = $$props;
      let { leave = "" } = $$props;
      let { leaveFrom = "" } = $$props;
      let { leaveTo = "" } = $$props;
      const dispatch = createEventDispatcher();
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
      let container = null;
      let transitionContext = useTransitionContext();
      $$unsubscribe_transitionContext = subscribe(transitionContext, (value) => $transitionContext = value);
      let nestingContext = useParentNesting();
      $$unsubscribe_nestingContext = subscribe(nestingContext, (value) => $nestingContext = value);
      let state = $transitionContext.initialShow || $$props.unmount !== false ? TreeStates.Visible : TreeStates.Hidden;
      let id2 = useId();
      let nesting = writable2(useNesting(() => {
        {
          state = TreeStates.Hidden;
          $nestingContext.unregister(id2);
          dispatch("afterLeave");
        }
      }));
      $$unsubscribe_nesting = subscribe(nesting, (value) => value);
      function splitClasses(classes2 = "") {
        return classes2.split(" ").filter((className) => className.trim().length > 1);
      }
      setContext(NESTING_CONTEXT_NAME, nesting);
      let openClosedState = writable2(State.Closed);
      useOpenClosedProvider(openClosedState);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.enter === void 0 && $$bindings.enter && enter !== void 0)
        $$bindings.enter(enter);
      if ($$props.enterFrom === void 0 && $$bindings.enterFrom && enterFrom !== void 0)
        $$bindings.enterFrom(enterFrom);
      if ($$props.enterTo === void 0 && $$bindings.enterTo && enterTo !== void 0)
        $$bindings.enterTo(enterTo);
      if ($$props.entered === void 0 && $$bindings.entered && entered !== void 0)
        $$bindings.entered(entered);
      if ($$props.leave === void 0 && $$bindings.leave && leave !== void 0)
        $$bindings.leave(leave);
      if ($$props.leaveFrom === void 0 && $$bindings.leaveFrom && leaveFrom !== void 0)
        $$bindings.leaveFrom(leaveFrom);
      if ($$props.leaveTo === void 0 && $$bindings.leaveTo && leaveTo !== void 0)
        $$bindings.leaveTo(leaveTo);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        strategy = $$props.unmount === false ? RenderStrategy.Hidden : RenderStrategy.Unmount;
        {
          {
            (() => {
              if (strategy !== RenderStrategy.Hidden)
                return;
              if (!id2)
                return;
              if ($transitionContext.show && state !== TreeStates.Visible) {
                state = TreeStates.Visible;
                return;
              }
              match(state, {
                [TreeStates.Hidden]: () => $nestingContext.unregister(id2),
                [TreeStates.Visible]: () => $nestingContext.register(id2)
              });
            })();
          }
        }
        splitClasses(enter);
        splitClasses(enterFrom);
        splitClasses(enterTo);
        splitClasses(entered);
        splitClasses(leave);
        splitClasses(leaveFrom);
        splitClasses(leaveTo);
        {
          openClosedState.set(match(state, {
            [TreeStates.Visible]: State.Open,
            [TreeStates.Hidden]: State.Closed
          }));
        }
        classes = `${$$props.class || ""} ${entered}`;
        $$rendered = `${validate_component(Render, "Render").$$render($$result, Object.assign($$restProps, { as }, { use: [...use, forwardEvents] }, { slotProps: {} }, { name: "TransitionChild" }, { class: classes }, { visible: state === TreeStates.Visible }, { features: Features.RenderStrategy }, { el: container }), {
          el: ($$value) => {
            container = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_transitionContext();
      $$unsubscribe_nestingContext();
      $$unsubscribe_nesting();
      return $$rendered;
    });
    TransitionRoot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$restProps = compute_rest_props($$props, ["as", "use", "show", "appear"]);
      let $$unsubscribe_nestingBag;
      let $openClosedState, $$unsubscribe_openClosedState;
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      let { show = void 0 } = $$props;
      let { appear = false } = $$props;
      let openClosedState = useOpenClosed();
      $$unsubscribe_openClosedState = subscribe(openClosedState, (value) => $openClosedState = value);
      function computeShow(show2, openClosedState2) {
        if (show2 === void 0 && openClosedState2 !== void 0) {
          return match(openClosedState2, {
            [State.Open]: true,
            [State.Closed]: false
          });
        }
        return show2;
      }
      let shouldShow = computeShow(show, openClosedState !== void 0 ? $openClosedState : void 0);
      let initialShow = shouldShow;
      let state = shouldShow ? TreeStates.Visible : TreeStates.Hidden;
      let nestingBag = writable2(useNesting(() => {
        state = TreeStates.Hidden;
      }));
      $$unsubscribe_nestingBag = subscribe(nestingBag, (value) => value);
      let initial = true;
      let transitionBag = writable2();
      setContext(NESTING_CONTEXT_NAME, nestingBag);
      setContext(TRANSITION_CONTEXT_NAME, transitionBag);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.show === void 0 && $$bindings.show && show !== void 0)
        $$bindings.show(show);
      if ($$props.appear === void 0 && $$bindings.appear && appear !== void 0)
        $$bindings.appear(appear);
      {
        {
          shouldShow = computeShow(show, openClosedState !== void 0 ? $openClosedState : void 0);
          if (shouldShow !== true && shouldShow !== false) {
            throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
          }
        }
      }
      {
        transitionBag.set({
          show: !!shouldShow,
          appear: appear || !initial,
          initialShow: !!initialShow
        });
      }
      $$unsubscribe_nestingBag();
      $$unsubscribe_openClosedState();
      return `${state === TreeStates.Visible || $$props.unmount === false ? `${validate_component(TransitionChild, "TransitionChild").$$render($$result, Object.assign($$restProps, { as }, { use: [...use, forwardEvents] }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}` : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/resolve-button-type-552c0ea1.js
function resolveButtonType(props, ref) {
  if (props.type)
    return props.type;
  let tag = props.as ?? "button";
  if (typeof tag === "string" && tag.toLowerCase() === "button")
    return "button";
  if (ref && ref instanceof HTMLButtonElement)
    return "button";
  return void 0;
}
var init_resolve_button_type_552c0ea1 = __esm({
  ".svelte-kit/output/server/chunks/resolve-button-type-552c0ea1.js"() {
  }
});

// .svelte-kit/output/server/chunks/Breadcrumb-c828c026.js
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i3) => {
      return get_interpolator(a[i3], bi);
    });
    return (t22) => arr.map((fn) => fn(t22));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t22) => new Date(a + t22 * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key2) => {
      interpolators[key2] = get_interpolator(a[key2], b[key2]);
    });
    return (t22) => {
      const result = {};
      keys.forEach((key2) => {
        result[key2] = interpolators[key2](t22);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t22) => a + t22 * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults2) {
  const store = writable2(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults2), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
async function setupTranslations(pathname) {
  const defaultLocale = "en";
  const initLocale = locale.get() || defaultLocale;
  await loadTranslations(initLocale, pathname);
  return {};
}
function getTheme() {
  return null;
}
function setupTheming() {
  appTheme.subscribe((theme) => {
    return;
  });
}
function createSidebarStore() {
  const { subscribe: subscribe22, set, update: update2 } = writable2({
    isOpen: true,
    menus: []
  });
  return {
    subscribe: subscribe22,
    set,
    update: update2
  };
}
var __defProp4, __defProps4, __getOwnPropDescs4, __getOwnPropSymbols4, __hasOwnProp4, __propIsEnum4, __defNormalProp4, __spreadValues4, __spreadProps4, defaults, createToast, toast, css$4, ToastItem, css$3, SvelteToast, Theme, initialValue, appTheme, sidebarStore, Logo, ListboxButton, ListboxOptions, ListboxOption, LangToggle, ThemeToggle, css$2, Navbar, css$1, Footer, Breakpoints, css, Breadcrumb;
var init_Breadcrumb_c828c026 = __esm({
  ".svelte-kit/output/server/chunks/Breadcrumb-c828c026.js"() {
    init_index_2415d7ec();
    init_index_b173f350();
    init_index_5fadd295();
    init_TransitionRoot_95dacb6b();
    init_resolve_button_type_552c0ea1();
    __defProp4 = Object.defineProperty;
    __defProps4 = Object.defineProperties;
    __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
    __hasOwnProp4 = Object.prototype.hasOwnProperty;
    __propIsEnum4 = Object.prototype.propertyIsEnumerable;
    __defNormalProp4 = (obj, key2, value) => key2 in obj ? __defProp4(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues4 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp4.call(b, prop))
          __defNormalProp4(a, prop, b[prop]);
      if (__getOwnPropSymbols4)
        for (var prop of __getOwnPropSymbols4(b)) {
          if (__propIsEnum4.call(b, prop))
            __defNormalProp4(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps4 = (a, b) => __defProps4(a, __getOwnPropDescs4(b));
    defaults = {
      duration: 4e3,
      initial: 1,
      next: 0,
      pausable: false,
      dismissable: true,
      reversed: false,
      intro: { x: 256 }
    };
    createToast = () => {
      const { subscribe: subscribe22, update: update2 } = writable2([]);
      let count = 0;
      const options = {};
      const _obj = (obj) => obj instanceof Object;
      const push = (msg, opts = {}) => {
        const param = __spreadValues4({ target: "default" }, _obj(msg) ? msg : __spreadProps4(__spreadValues4({}, opts), { msg }));
        const conf = options[param.target] || {};
        const entry17 = __spreadProps4(__spreadValues4(__spreadValues4(__spreadValues4({}, defaults), conf), param), {
          theme: __spreadValues4(__spreadValues4({}, conf.theme), param.theme),
          classes: [...conf.classes || [], ...param.classes || []],
          id: ++count
        });
        update2((n2) => entry17.reversed ? [...n2, entry17] : [entry17, ...n2]);
        return count;
      };
      const pop = (id2) => {
        update2((n2) => {
          if (!n2.length || id2 === 0)
            return [];
          if (_obj(id2))
            return n2.filter((i3) => id2(i3));
          const target = id2 || Math.max(...n2.map((i3) => i3.id));
          return n2.filter((i3) => i3.id !== target);
        });
      };
      const set = (id2, opts = {}) => {
        const param = _obj(id2) ? __spreadValues4({}, id2) : __spreadProps4(__spreadValues4({}, opts), { id: id2 });
        update2((n2) => {
          const idx = n2.findIndex((i3) => i3.id === param.id);
          if (idx > -1) {
            n2[idx] = __spreadValues4(__spreadValues4({}, n2[idx]), param);
          }
          return n2;
        });
      };
      const _init = (target = "default", opts = {}) => {
        options[target] = opts;
        return options;
      };
      return { subscribe: subscribe22, push, pop, set, _init };
    };
    toast = createToast();
    css$4 = {
      code: "._toastItem.svelte-5er0t9{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-5er0t9{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-5er0t9,._toastMsg.svelte-5er0t9 a{pointer-events:auto}._toastBtn.svelte-5er0t9{width:2rem;height:100%;font:1rem sans-serif;display:flex;align-items:center;justify-content:center;cursor:pointer;outline:none}._toastBar.svelte-5er0t9{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-5er0t9::-webkit-progress-bar{background:transparent}._toastBar.svelte-5er0t9::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-5er0t9::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
      map: null
    };
    ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $progress, $$unsubscribe_progress;
      let { item } = $$props;
      const progress = tweened(item.initial, { duration: item.duration, easing: identity });
      $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
      const close = () => toast.pop(item.id);
      const autoclose = () => {
        if ($progress === 1 || $progress === 0) {
          close();
        }
      };
      let next = item.initial;
      const getProps = () => {
        const { props = {}, sendIdTo } = item.component;
        if (sendIdTo) {
          props[sendIdTo] = item.id;
        }
        return props;
      };
      onDestroy(() => {
        if (typeof item.onpop === "function") {
          item.onpop(item.id);
        }
      });
      if ($$props.item === void 0 && $$bindings.item && item !== void 0)
        $$bindings.item(item);
      $$result.css.add(css$4);
      {
        if (typeof item.progress !== "undefined") {
          item.next = item.progress;
        }
      }
      {
        if (next !== item.next) {
          next = item.next;
          progress.set(next).then(autoclose);
        }
      }
      $$unsubscribe_progress();
      return `<div class="${["_toastItem svelte-5er0t9", item.pausable ? "pe" : ""].join(" ").trim()}"><div role="${"status"}" class="${["_toastMsg svelte-5er0t9", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign(getProps()), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div>
  ${item.dismissable ? `<div class="${"_toastBtn pe svelte-5er0t9"}" role="${"button"}" tabindex="${"-1"}">\u2715</div>` : ``}
  <progress class="${"_toastBar svelte-5er0t9"}"${add_attribute("value", $progress, 0)}></progress>
</div>`;
    });
    css$3 = {
      code: "._toastContainer.svelte-yh90az{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
      map: null
    };
    SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $toast, $$unsubscribe_toast;
      $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
      let { options = {} } = $$props;
      let { target = "default" } = $$props;
      let items;
      const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "");
      if ($$props.options === void 0 && $$bindings.options && options !== void 0)
        $$bindings.options(options);
      if ($$props.target === void 0 && $$bindings.target && target !== void 0)
        $$bindings.target(target);
      $$result.css.add(css$3);
      {
        toast._init(target, options);
      }
      items = $toast.filter((i3) => i3.target === target);
      $$unsubscribe_toast();
      return `<ul class="${"_toastContainer svelte-yh90az"}">${each(items, (item) => {
        return `<li class="${escape(null_to_empty(item.classes.join(" "))) + " svelte-yh90az"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})}
    </li>`;
      })}
</ul>`;
    });
    Theme = /* @__PURE__ */ ((Theme2) => {
      Theme2["System"] = "system";
      Theme2["Light"] = "light";
      Theme2["Dark"] = "dark";
      return Theme2;
    })(Theme || {});
    initialValue = Theme.System;
    appTheme = writable2(initialValue);
    sidebarStore = createSidebarStore();
    Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { redirectTo = "/" } = $$props;
      if ($$props.redirectTo === void 0 && $$bindings.redirectTo && redirectTo !== void 0)
        $$bindings.redirectTo(redirectTo);
      return `<a${add_attribute("href", redirectTo, 0)} class="${"flex items-center"}"><div class="${"i-logos:nodebots text-2xl"}"></div>
  <span class="${"ml-1.5 self-center whitespace-nowrap font-retro text-lg font-semibold dark:text-white"}">Kibot
  </span></a>`;
    });
    ListboxButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use"]);
      let $api, $$unsubscribe_api;
      let $labelRef, $$unsubscribe_labelRef;
      let $optionsRef, $$unsubscribe_optionsRef;
      let $buttonRef, $$unsubscribe_buttonRef;
      let { as = "button" } = $$props;
      let { use = [] } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let api = useListboxContext("ListboxButton");
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      let id2 = `headlessui-listbox-button-${useId()}`;
      let buttonRef = $api.buttonRef;
      $$unsubscribe_buttonRef = subscribe(buttonRef, (value) => $buttonRef = value);
      let optionsRef = $api.optionsRef;
      $$unsubscribe_optionsRef = subscribe(optionsRef, (value) => $optionsRef = value);
      let labelRef = $api.labelRef;
      $$unsubscribe_labelRef = subscribe(labelRef, (value) => $labelRef = value);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        propsWeControl = {
          id: id2,
          type: resolveButtonType({ type: $$props.type, as }, $buttonRef),
          "aria-haspopup": true,
          "aria-controls": $optionsRef == null ? void 0 : $optionsRef.id,
          "aria-expanded": $api.disabled ? void 0 : $api.listboxState === ListboxStates.Open,
          "aria-labelledby": $labelRef ? [$labelRef == null ? void 0 : $labelRef.id, id2].join(" ") : void 0,
          disabled: $api.disabled === true ? true : void 0
        };
        slotProps = {
          open: $api.listboxState === ListboxStates.Open,
          disabled: $api.disabled
        };
        $$rendered = `${validate_component(Render, "Render").$$render($$result, Object.assign($$restProps, propsWeControl, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "ListboxButton" }, { el: $buttonRef }), {
          el: ($$value) => {
            $buttonRef = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.default ? slots.default(__spreadValues4({}, slotProps)) : ``}`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_api();
      $$unsubscribe_labelRef();
      $$unsubscribe_optionsRef();
      $$unsubscribe_buttonRef();
      return $$rendered;
    });
    ListboxOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a;
      let propsWeControl;
      let visible;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use"]);
      let $api, $$unsubscribe_api;
      let $usesOpenClosedState, $$unsubscribe_usesOpenClosedState;
      let $buttonRef, $$unsubscribe_buttonRef;
      let $labelRef, $$unsubscribe_labelRef;
      let $optionsRef, $$unsubscribe_optionsRef;
      let { as = "ul" } = $$props;
      let { use = [] } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let api = useListboxContext("ListboxOptions");
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      let id2 = `headlessui-listbox-options-${useId()}`;
      let optionsRef = $api.optionsRef;
      $$unsubscribe_optionsRef = subscribe(optionsRef, (value) => $optionsRef = value);
      let buttonRef = $api.buttonRef;
      $$unsubscribe_buttonRef = subscribe(buttonRef, (value) => $buttonRef = value);
      let labelRef = $api.labelRef;
      $$unsubscribe_labelRef = subscribe(labelRef, (value) => $labelRef = value);
      let usesOpenClosedState = useOpenClosed();
      $$unsubscribe_usesOpenClosedState = subscribe(usesOpenClosedState, (value) => $usesOpenClosedState = value);
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        propsWeControl = {
          "aria-activedescendant": $api.activeOptionIndex === null ? void 0 : (_a = $api.options[$api.activeOptionIndex]) == null ? void 0 : _a.id,
          "aria-labelledby": ($labelRef == null ? void 0 : $labelRef.id) ?? ($buttonRef == null ? void 0 : $buttonRef.id),
          "aria-orientation": $api.orientation,
          id: id2,
          role: "listbox",
          tabIndex: 0
        };
        visible = usesOpenClosedState !== void 0 ? $usesOpenClosedState === State.Open : $api.listboxState === ListboxStates.Open;
        slotProps = {
          open: $api.listboxState === ListboxStates.Open
        };
        $$rendered = `${validate_component(Render, "Render").$$render($$result, Object.assign($$restProps, propsWeControl, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "ListboxOptions" }, { visible }, {
          features: Features.RenderStrategy | Features.Static
        }, { el: $optionsRef }), {
          el: ($$value) => {
            $optionsRef = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.default ? slots.default(__spreadValues4({}, slotProps)) : ``}`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_api();
      $$unsubscribe_usesOpenClosedState();
      $$unsubscribe_buttonRef();
      $$unsubscribe_labelRef();
      $$unsubscribe_optionsRef();
      return $$rendered;
    });
    ListboxOption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let active;
      let selected;
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use", "value", "disabled"]);
      let $api, $$unsubscribe_api;
      let $$unsubscribe_buttonRef;
      let { as = "li" } = $$props;
      let { use = [] } = $$props;
      let { value } = $$props;
      let { disabled = false } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let api = useListboxContext("ListboxOption");
      $$unsubscribe_api = subscribe(api, (value2) => $api = value2);
      let id2 = `headlessui-listbox-option-${useId()}`;
      let buttonRef = $api.buttonRef;
      $$unsubscribe_buttonRef = subscribe(buttonRef, (value2) => value2);
      onDestroy(() => $api.unregisterOption(id2));
      let oldState = $api.listboxState;
      let oldSelected = selected;
      let oldActive = active;
      async function updateFocus(newState, newSelected, newActive) {
        var _a, _b;
        await tick();
        if (newState !== oldState || newSelected !== oldSelected) {
          if (newState === ListboxStates.Open && newSelected) {
            $api.goToOption(Focus.Specific, id2);
          }
        }
        if (newState !== oldState || newActive !== oldActive) {
          if (newState === ListboxStates.Open && newActive) {
            (_b = (_a = document.getElementById(id2)) == null ? void 0 : _a.scrollIntoView) == null ? void 0 : _b.call(_a, { block: "nearest" });
          }
        }
        oldState = newState;
        oldSelected = newSelected;
        oldActive = newActive;
      }
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.value === void 0 && $$bindings.value && value !== void 0)
        $$bindings.value(value);
      if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
        $$bindings.disabled(disabled);
      active = $api.activeOptionIndex !== null ? $api.options[$api.activeOptionIndex].id === id2 : false;
      selected = $api.value === value;
      {
        updateFocus($api.listboxState, selected, active);
      }
      propsWeControl = {
        id: id2,
        role: "option",
        tabIndex: disabled === true ? void 0 : -1,
        "aria-disabled": disabled === true ? true : void 0,
        "aria-selected": selected === true ? selected : void 0
      };
      slotProps = { active, selected, disabled };
      $$unsubscribe_api();
      $$unsubscribe_buttonRef();
      return `${validate_component(Render, "Render").$$render($$result, Object.assign($$restProps, propsWeControl, { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "ListboxOption" }), {}, {
        default: () => {
          return `${slots.default ? slots.default(__spreadValues4({}, slotProps)) : ``}`;
        }
      })}`;
    });
    LangToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { showCountryFlag = true } = $$props;
      let { showLanguage = true } = $$props;
      const languages = [
        {
          value: "en",
          text: "English",
          icon: "i-emojione:flag-for-united-kingdom text-xl"
        },
        {
          value: "es",
          text: "Espa\xF1ol",
          icon: "i-emojione:flag-for-colombia text-xl"
        }
      ];
      let selectedLanguage = languages.find((l2) => l2.value === locale.get()) || languages[0];
      if ($$props.showCountryFlag === void 0 && $$bindings.showCountryFlag && showCountryFlag !== void 0)
        $$bindings.showCountryFlag(showCountryFlag);
      if ($$props.showLanguage === void 0 && $$bindings.showLanguage && showLanguage !== void 0)
        $$bindings.showLanguage(showLanguage);
      return `${validate_component(Listbox, "Listbox").$$render($$result, {
        value: selectedLanguage,
        class: "relative"
      }, {}, {
        default: ({ open }) => {
          return `
  ${validate_component(ListboxButton, "ListboxButton").$$render($$result, {
            class: "btn btn-secondary btn-fit space-x-2"
          }, {}, {
            default: () => {
              return `${showCountryFlag ? `<div${add_attribute("class", selectedLanguage.icon, 0)}></div>` : ``}

    ${showLanguage ? `<span>${escape(selectedLanguage.text)}</span>` : ``}`;
            }
          })}

  
  ${validate_component(ListboxOptions, "ListboxOptions").$$render($$result, { class: "dropdown dropdown-bottom-left" }, {}, {
            default: () => {
              return `${each(languages, (lang2) => {
                return `${validate_component(ListboxOption, "ListboxOption").$$render($$result, { value: lang2 }, {}, {
                  default: ({ active, selected }) => {
                    return `<div class="${[
                      "dropdown-item whitespace-nowrap",
                      (active ? "dropdown-item-active" : "") + " " + (selected ? "dropdown-item-selected" : "")
                    ].join(" ").trim()}"><div${add_attribute("class", lang2.icon, 0)}></div>
          <span class="${"ml-3 text-sm font-semibold"}">${escape(lang2.text)}</span></div>
      `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      })}`;
    });
    ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $t, $$unsubscribe_t;
      $$unsubscribe_t = subscribe(t2, (value) => $t = value);
      let { showThemeIcon = true } = $$props;
      let { showThemeName = true } = $$props;
      const themes = [
        {
          value: Theme.Light,
          text: $t("layout.navbar.themePicker.light"),
          icon: "i-carbon:light text-xl"
        },
        {
          value: Theme.Dark,
          text: $t("layout.navbar.themePicker.dark"),
          icon: "i-carbon:moon text-xl"
        },
        {
          value: Theme.System,
          text: $t("layout.navbar.themePicker.system"),
          icon: "i-carbon:screen text-xl"
        }
      ];
      let selectedTheme = themes.find((t22) => t22.value === getTheme()) || themes[0];
      if ($$props.showThemeIcon === void 0 && $$bindings.showThemeIcon && showThemeIcon !== void 0)
        $$bindings.showThemeIcon(showThemeIcon);
      if ($$props.showThemeName === void 0 && $$bindings.showThemeName && showThemeName !== void 0)
        $$bindings.showThemeName(showThemeName);
      $$unsubscribe_t();
      return `${validate_component(Listbox, "Listbox").$$render($$result, { value: selectedTheme, class: "relative" }, {}, {
        default: ({ open }) => {
          return `
  ${validate_component(ListboxButton, "ListboxButton").$$render($$result, { class: "btn btn-secondary space-x-2" }, {}, {
            default: () => {
              return `${showThemeIcon ? `<div${add_attribute("class", selectedTheme.icon, 0)}></div>` : ``}

    ${showThemeName ? `<span>${escape(selectedTheme.text)}</span>` : ``}`;
            }
          })}

  
  ${validate_component(TransitionRoot, "Transition").$$render($$result, {
            show: open,
            enter: "transition duration-100 ease-out",
            enterFrom: "transform scale-95 opacity-0",
            enterTo: "transform scale-100 opacity-100",
            leave: "transition duration-75 ease-out",
            leaveFrom: "transform scale-100 opacity-100",
            leaveTo: "transform scale-95 opacity-0"
          }, {}, {
            default: () => {
              return `
    ${validate_component(ListboxOptions, "ListboxOptions").$$render($$result, {
                class: "dropdown dropdown-bottom-left w-40"
              }, {}, {
                default: () => {
                  return `${each(themes, (theme) => {
                    return `${validate_component(ListboxOption, "ListboxOption").$$render($$result, { value: theme }, {}, {
                      default: ({ active, selected }) => {
                        return `<div class="${[
                          "dropdown-item whitespace-nowrap",
                          (active ? "dropdown-item-active" : "") + " " + (selected ? "dropdown-item-selected" : "")
                        ].join(" ").trim()}"><div${add_attribute("class", theme.icon, 0)}></div>
            <span class="${"ml-3 text-sm font-semibold"}">${escape(theme.text)}</span></div>
        `;
                      }
                    })}`;
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    });
    css$2 = {
      code: "nav.svelte-onypgh{grid-area:navbar;height:var(--size-navbar-height)}",
      map: null
    };
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $sidebarStore, $$unsubscribe_sidebarStore;
      $$unsubscribe_sidebarStore = subscribe(sidebarStore, (value) => $sidebarStore = value);
      $$result.css.add(css$2);
      $$unsubscribe_sidebarStore();
      return `<nav class="${"ui-navbar svelte-onypgh"}">
  <div class="${"flex items-center space-x-5"}"><button type="${"button"}" class="${"btn btn-secondary btn-fit"}">${$sidebarStore.isOpen ? `<div class="${"i-fxemoji:ballottscriptx text-xl"}"></div>` : `<div class="${"i-fxemoji:hamburger text-xl"}"></div>`}</button>

    ${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div>

  
  <div class="${"flex items-center space-x-3"}"><a href="${"/applications"}" class="${"btn btn-secondary btn-fit space-x-2"}"><div class="${"i-ph:arrow-circle-left-duotone text-xl text-blue-400"}"></div>
      <span class="${"hidden md:inline"}">Referencias</span></a>
    ${validate_component(LangToggle, "LangToggle").$$render($$result, { showLanguage: false }, {}, {})}
    ${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</div>
</nav>`;
    });
    css$1 = {
      code: "footer.svelte-1k9o04u{grid-area:footer}",
      map: null
    };
    Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $t, $$unsubscribe_t;
      $$unsubscribe_t = subscribe(t2, (value) => $t = value);
      const currentYear = new Date().getFullYear();
      $$result.css.add(css$1);
      $$unsubscribe_t();
      return `<footer class="${"ui-footer w-full svelte-1k9o04u"}">
  <div class="${"bg-white dark:bg-zinc-800 flex items-center px-6 py-4 rounded-lg shadow justify-between"}">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}

    <ul class="${"flex flex-wrap items-center space-x-3"}"><li><a href="${"documentation"}" class="${"text-sm hover:underline"}">${escape($t("layout.footer.documentation"))}</a></li>
      <li><a href="${"help"}" class="${"text-sm hover:underline"}">${escape($t("layout.footer.help"))}</a></li></ul></div>

  
  <span class="${"block pt-6 text-sm text-gray-500 text-center"}">\xA9 ${escape(currentYear)}

    <a href="${"https://github.com/Ekisa-Team/chatbots-web-client"}" class="${"hover:underline"}">Kibot </a>

    . All rights reserved.
  </span>
</footer>`;
    });
    Breakpoints = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div id="${"breakpoint-xs"}" class="${"hidden h-0 w-0 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden"}"></div>
<div id="${"breakpoint-sm"}" class="${"hidden h-0 w-0 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"}"></div>
<div id="${"breakpoint-md"}" class="${"hidden h-0 w-0 sm:hidden md:block lg:hidden xl:hidden 2xl:hidden"}"></div>
<div id="${"breakpoint-lg"}" class="${"hidden h-0 w-0 sm:hidden md:hidden lg:block xl:hidden 2xl:hidden"}"></div>
<div id="${"breakpoint-xl"}" class="${"hidden h-0 w-0 sm:hidden md:hidden lg:hidden xl:block 2xl:hidden"}"></div>
<div id="${"breakpoint-2xl"}" class="${"hidden h-0 w-0 sm:hidden md:hidden lg:hidden xl:hidden 2xl:block"}"></div>`;
    });
    css = {
      code: "nav.svelte-1ayop51{@apply flex;;@apply mb-6;}ol.svelte-1ayop51{@apply inline-flex items-center;;@apply space-x-1;}li.svelte-1ayop51{@apply inline-flex items-center;}a.svelte-1ayop51,span.svelte-1ayop51{@apply inline-flex items-center;;@apply text-sm;;@apply space-x-1;}a.svelte-1ayop51:hover{@apply underline;}",
      map: null
    };
    Breadcrumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { items = [] } = $$props;
      if ($$props.items === void 0 && $$bindings.items && items !== void 0)
        $$bindings.items(items);
      $$result.css.add(css);
      return `<nav aria-label="${"Breadcrumb"}" class="${"bg-gradient-to-r from-yellow-200 px-2 dark:from-yellow-800/90 svelte-1ayop51"}"><ol class="${"svelte-1ayop51"}">${each(items, ({ path, icon, text }, i3) => {
        return `<li class="${"svelte-1ayop51"}">${i3 < items.length - 1 ? `<a${add_attribute("href", path, 0)} class="${"font-semibold svelte-1ayop51"}">${i3 > 0 ? `<div class="${"i-mdi:slash-forward"}"></div>` : ``}

            ${icon ? `<div${add_attribute("class", icon, 0)}></div>` : ``}

            ${text ? `<span class="${"svelte-1ayop51"}">${escape(text)}</span>` : ``}
          </a>` : `<span class="${"svelte-1ayop51"}"><div class="${"i-mdi:slash-forward"}"></div>

            ${icon ? `<div${add_attribute("class", icon, 0)}></div>` : ``}

            ${text ? `<span class="${"font-thin svelte-1ayop51"}">${escape(text)}</span>` : ``}
          </span>`}
      </li>`;
      })}</ol>
</nav>`;
    });
  }
});

// .svelte-kit/output/server/chunks/http-90371e68.js
async function get(url2, httpHeaders) {
  const response = await fetch(url2, { headers: __spreadValues5({}, httpHeaders) });
  return handleResponse(response);
}
async function post(url2, body, httpHeaders) {
  const response = await fetch(url2, {
    body: JSON.stringify(body),
    method: "POST",
    headers: __spreadProps5(__spreadValues5({}, httpHeaders), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  });
  return handleResponse(response);
}
async function put(url2, body, httpHeaders) {
  const response = await fetch(url2, {
    body: JSON.stringify(body),
    method: "PUT",
    headers: __spreadProps5(__spreadValues5({}, httpHeaders), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  });
  return handleResponse(response);
}
async function patch(url2, body, httpHeaders) {
  const response = await fetch(url2, {
    body: JSON.stringify(body),
    method: "PATCH",
    headers: __spreadProps5(__spreadValues5({}, httpHeaders), {
      Accept: "application/json",
      "Content-Type": "application/json"
    })
  });
  return handleResponse(response);
}
async function del(url2, httpHeaders) {
  const response = await fetch(url2, { method: "DELETE", headers: __spreadValues5({}, httpHeaders) });
  return handleResponse(response);
}
var __defProp5, __defProps5, __getOwnPropDescs5, __getOwnPropSymbols5, __hasOwnProp5, __propIsEnum5, __defNormalProp5, __spreadValues5, __spreadProps5, handleResponse, http2;
var init_http_90371e68 = __esm({
  ".svelte-kit/output/server/chunks/http-90371e68.js"() {
    __defProp5 = Object.defineProperty;
    __defProps5 = Object.defineProperties;
    __getOwnPropDescs5 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
    __hasOwnProp5 = Object.prototype.hasOwnProperty;
    __propIsEnum5 = Object.prototype.propertyIsEnumerable;
    __defNormalProp5 = (obj, key2, value) => key2 in obj ? __defProp5(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues5 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp5.call(b, prop))
          __defNormalProp5(a, prop, b[prop]);
      if (__getOwnPropSymbols5)
        for (var prop of __getOwnPropSymbols5(b)) {
          if (__propIsEnum5.call(b, prop))
            __defNormalProp5(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps5 = (a, b) => __defProps5(a, __getOwnPropDescs5(b));
    handleResponse = async (response) => {
      const serviceResponse = await response.json();
      if (!response.ok) {
        const { exceptionMessage } = serviceResponse.exception || {};
        let message = "Some error ocurred.";
        if (typeof exceptionMessage === "object") {
          const listOfErrors = [];
          Object.keys(exceptionMessage.errors).forEach((key2) => {
            listOfErrors.push(`${key2}: ${exceptionMessage.errors[key2].join("\n")}`);
          });
          message = `${exceptionMessage.title}

${listOfErrors.join("\n\n")}`;
        } else {
          message = exceptionMessage || response.statusText;
        }
        throw new Error(message);
      }
      return serviceResponse;
    };
    http2 = { get, post, put, patch, del };
  }
});

// .svelte-kit/output/server/chunks/chatbot-febec0ab.js
function createChatbotStore() {
  const { subscribe: subscribe3, set, update: update2 } = writable2({
    chatbots: [],
    selectedChatbot: null
  });
  return {
    subscribe: subscribe3,
    set,
    update: update2,
    fetch: async () => {
      const API_URL = "https://localhost:5001/api/v1/client_applications/1/chatbots";
      const response = await http2.get(API_URL);
      update2((state) => __spreadProps6(__spreadValues6({}, state), { chatbots: response.data }));
    },
    select(chatbot) {
      update2((state) => __spreadProps6(__spreadValues6({}, state), { selectedChatbot: chatbot }));
    }
  };
}
var __defProp6, __defProps6, __getOwnPropDescs6, __getOwnPropSymbols6, __hasOwnProp6, __propIsEnum6, __defNormalProp6, __spreadValues6, __spreadProps6, chatbotStore;
var init_chatbot_febec0ab = __esm({
  ".svelte-kit/output/server/chunks/chatbot-febec0ab.js"() {
    init_http_90371e68();
    init_index_b173f350();
    __defProp6 = Object.defineProperty;
    __defProps6 = Object.defineProperties;
    __getOwnPropDescs6 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols6 = Object.getOwnPropertySymbols;
    __hasOwnProp6 = Object.prototype.hasOwnProperty;
    __propIsEnum6 = Object.prototype.propertyIsEnumerable;
    __defNormalProp6 = (obj, key2, value) => key2 in obj ? __defProp6(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues6 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp6.call(b, prop))
          __defNormalProp6(a, prop, b[prop]);
      if (__getOwnPropSymbols6)
        for (var prop of __getOwnPropSymbols6(b)) {
          if (__propIsEnum6.call(b, prop))
            __defNormalProp6(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps6 = (a, b) => __defProps6(a, __getOwnPropDescs6(b));
    chatbotStore = createChatbotStore();
  }
});

// .svelte-kit/output/server/chunks/client-application-770f28e1.js
function createApplicationStore() {
  const { subscribe: subscribe3, set, update: update2 } = writable2({
    clients: [],
    selectedClient: null
  });
  return {
    subscribe: subscribe3,
    set,
    update: update2,
    fetch: async () => {
      const API_URL = "https://localhost:5001/api/v1/client_applications";
      const response = await http2.get(API_URL);
      update2((state) => __spreadProps7(__spreadValues7({}, state), { clients: response.data }));
    },
    select(client) {
      update2((state) => __spreadProps7(__spreadValues7({}, state), { selectedClient: client }));
    }
  };
}
var __defProp7, __defProps7, __getOwnPropDescs7, __getOwnPropSymbols7, __hasOwnProp7, __propIsEnum7, __defNormalProp7, __spreadValues7, __spreadProps7, clientApplicationStore;
var init_client_application_770f28e1 = __esm({
  ".svelte-kit/output/server/chunks/client-application-770f28e1.js"() {
    init_http_90371e68();
    init_index_b173f350();
    __defProp7 = Object.defineProperty;
    __defProps7 = Object.defineProperties;
    __getOwnPropDescs7 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols7 = Object.getOwnPropertySymbols;
    __hasOwnProp7 = Object.prototype.hasOwnProperty;
    __propIsEnum7 = Object.prototype.propertyIsEnumerable;
    __defNormalProp7 = (obj, key2, value) => key2 in obj ? __defProp7(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues7 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp7.call(b, prop))
          __defNormalProp7(a, prop, b[prop]);
      if (__getOwnPropSymbols7)
        for (var prop of __getOwnPropSymbols7(b)) {
          if (__propIsEnum7.call(b, prop))
            __defNormalProp7(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps7 = (a, b) => __defProps7(a, __getOwnPropDescs7(b));
    clientApplicationStore = createApplicationStore();
  }
});

// .svelte-kit/output/server/chunks/Alert-ae69748a.js
var Alert;
var init_Alert_ae69748a = __esm({
  ".svelte-kit/output/server/chunks/Alert-ae69748a.js"() {
    init_index_2415d7ec();
    Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { type = "info" } = $$props;
      const iconMap = /* @__PURE__ */ new Map([
        ["info", "i-mdi:robot-happy"],
        ["success", "i-ph:smiley-fill"],
        ["warning", "i-clarity:neutral-face-solid"],
        ["danger", "i-raphael:skull"]
      ]);
      const bgMap = /* @__PURE__ */ new Map([
        ["info", "from-indigo-100 dark:from-indigo-800 to-transparent"],
        ["success", "from-green-100 dark:from-green-800 to-transparent"],
        ["warning", "from-yellow-100 dark:from-yellow-800 to-transparent"],
        ["danger", "from-red-100 dark:from-red-800 to-transparent"]
      ]);
      const bgAccentMap = /* @__PURE__ */ new Map([
        ["info", "bg-indigo-500"],
        ["success", "bg-green-500"],
        ["warning", "bg-yellow-500"],
        ["danger", "bg-red-500"]
      ]);
      const textMap = /* @__PURE__ */ new Map([
        ["info", "text-indigo-800 dark:text-indigo-100"],
        ["success", "text-green-800 dark:text-green-100"],
        ["warning", "text-yellow-800 dark:text-yellow-100"],
        ["danger", "text-red-800 dark:text-red-100"]
      ]);
      const icon = iconMap.get(type);
      const bg = bgMap.get(type);
      const bgAccent = bgAccentMap.get(type);
      const text = textMap.get(type);
      if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
      return `<div role="${"alert"}" class="${"flex w-full items-center rounded-full bg-gradient-to-r p-2 leading-none " + escape(bg)}">
  <span class="${"mr-3 flex rounded-full px-2 py-1 text-3xl font-bold uppercase text-white " + escape(bgAccent)}">${slots.icon ? slots.icon({}) : `
      <div${add_attribute("class", icon, 0)}></div>
    `}</span>

  
  <span class="${"mr-2 flex-auto text-left text-sm " + escape(text)}">${slots.default ? slots.default({}) : ``}</span></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/stores-56dab1b2.js
var getStores, page;
var init_stores_56dab1b2 = __esm({
  ".svelte-kit/output/server/chunks/stores-56dab1b2.js"() {
    init_index_2415d7ec();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session,
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout,
  load: () => load
});
var __defProp8, __defProps8, __getOwnPropDescs8, __getOwnPropSymbols8, __hasOwnProp8, __propIsEnum8, __defNormalProp8, __spreadValues8, __spreadProps8, SidebarItem, css$32, SidebarItemMenu, css$22, SidebarMenu, css$12, Sidebar, css2, load, breadcrumbItems, _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_2415d7ec();
    init_Breadcrumb_c828c026();
    init_chatbot_febec0ab();
    init_client_application_770f28e1();
    init_index_5fadd295();
    init_Alert_ae69748a();
    init_stores_56dab1b2();
    init_index_b173f350();
    init_TransitionRoot_95dacb6b();
    init_resolve_button_type_552c0ea1();
    init_http_90371e68();
    __defProp8 = Object.defineProperty;
    __defProps8 = Object.defineProperties;
    __getOwnPropDescs8 = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols8 = Object.getOwnPropertySymbols;
    __hasOwnProp8 = Object.prototype.hasOwnProperty;
    __propIsEnum8 = Object.prototype.propertyIsEnumerable;
    __defNormalProp8 = (obj, key2, value) => key2 in obj ? __defProp8(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues8 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp8.call(b, prop))
          __defNormalProp8(a, prop, b[prop]);
      if (__getOwnPropSymbols8)
        for (var prop of __getOwnPropSymbols8(b)) {
          if (__propIsEnum8.call(b, prop))
            __defNormalProp8(a, prop, b[prop]);
        }
      return a;
    };
    __spreadProps8 = (a, b) => __defProps8(a, __getOwnPropDescs8(b));
    SidebarItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let isActive;
      let $$unsubscribe_sidebarStore;
      let $page, $$unsubscribe_page;
      $$unsubscribe_sidebarStore = subscribe(sidebarStore, (value) => value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { item } = $$props;
      let { showIcon = true } = $$props;
      let { isParent = false } = $$props;
      let { isParentOpen = false } = $$props;
      if ($$props.item === void 0 && $$bindings.item && item !== void 0)
        $$bindings.item(item);
      if ($$props.showIcon === void 0 && $$bindings.showIcon && showIcon !== void 0)
        $$bindings.showIcon(showIcon);
      if ($$props.isParent === void 0 && $$bindings.isParent && isParent !== void 0)
        $$bindings.isParent(isParent);
      if ($$props.isParentOpen === void 0 && $$bindings.isParentOpen && isParentOpen !== void 0)
        $$bindings.isParentOpen(isParentOpen);
      isActive = item.path && $page.url.pathname.includes(item.path);
      $$unsubscribe_sidebarStore();
      $$unsubscribe_page();
      return `${isParent ? `<div class="${[
        "ui-menu-item group",
        (isActive || isParentOpen ? "bg-zinc-300" : "") + " " + (isActive || isParentOpen ? "dark:bg-zinc-700" : "")
      ].join(" ").trim()}"><div class="${"flex items-center"}">
      <div class="${[
        escape(item.icon) + " min-w-[25px] text-2xl text-zinc-700 dark:text-zinc-400 transform transition-transform duration-200 ease group-hover:text-red-600 group-hover:rotate-20 group-hover:scale-110 dark:group-hover:text-red-300",
        " " + (isActive || isParentOpen ? "text-red-600" : "") + " " + (isActive || isParentOpen ? "dark:text-red-300" : "")
      ].join(" ").trim()}"></div>

      
      <span class="${["ml-[1.1rem] text-sm", isParentOpen ? "font-semibold" : ""].join(" ").trim()}">${escape(item.name)}</span>

      
      ${item.badge ? `<span class="${"badge badge-" + escape(item.badge.color) + " ml-3"}">${escape(item.badge.text)}</span>` : ``}</div>

    
    ${isParent ? `<div class="${[
        "i-ic:round-keyboard-arrow-right transition-transform duration-100 ease-in-out",
        isParentOpen ? "rotate-90" : ""
      ].join(" ").trim()}"></div>` : ``}</div>` : `<a${add_attribute("href", item.path, 0)} class="${[
        "ui-menu-item group",
        (isActive ? "bg-zinc-300" : "") + " " + (isActive ? "dark:bg-zinc-700" : "")
      ].join(" ").trim()}"><div class="${"flex items-center"}">
      <div class="${[
        escape(item.icon) + " min-w-[25px] text-2xl text-zinc-700 dark:text-zinc-400 transform transition-transform duration-200 ease group-hover:text-red-600 group-hover:rotate-20 group-hover:scale-110 dark:group-hover:text-red-300",
        " " + (isActive || isParentOpen ? "text-red-600" : "") + " " + (isActive || isParentOpen ? "dark:text-red-300" : "")
      ].join(" ").trim()}"></div>

      
      <span class="${["ml-[1.1rem] text-sm", isParentOpen ? "font-semibold" : ""].join(" ").trim()}">${escape(item.name)}</span>

      
      ${item.badge ? `<span class="${"badge badge-" + escape(item.badge.color) + " ml-3"}">${escape(item.badge.text)}</span>` : ``}</div>

    
    ${isParent ? `<div class="${[
        "i-ic:round-keyboard-arrow-right transition-transform duration-100 ease-in-out",
        isParentOpen ? "rotate-90" : ""
      ].join(" ").trim()}"></div>` : ``}</a>`}`;
    });
    css$32 = {
      code: "details[open].svelte-1cpfhfe summary.svelte-1cpfhfe+div.svelte-1cpfhfe{animation-name:svelte-1cpfhfe-sweep;animation-duration:200ms;animation-timing-function:ease;animation-fill-mode:forwards}@keyframes svelte-1cpfhfe-sweep{0%{opacity:0;transform:translateY(-20px)}100%{opacity:1;transform:translateY(0)}}",
      map: null
    };
    SidebarItemMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { item } = $$props;
      if ($$props.item === void 0 && $$bindings.item && item !== void 0)
        $$bindings.item(item);
      $$result.css.add(css$32);
      return `<details class="${"svelte-1cpfhfe"}"${add_attribute("open", item.isDisclosed, 1)}><summary class="${"cursor-pointer list-none svelte-1cpfhfe"}">${validate_component(SidebarItem, "SidebarItem").$$render($$result, {
        item,
        isParent: true,
        isParentOpen: item.isDisclosed
      }, {}, {})}</summary>

  <div class="${"overflow-hidden rounded border-l-2 border-dashed border-yellow-500 bg-zinc-200 dark:border-yellow-700 dark:bg-zinc-800 svelte-1cpfhfe"}">${validate_component(SidebarMenu, "SidebarMenu").$$render($$result, {
        menu: item.children || [],
        isNested: true
      }, {}, {})}</div>
</details>`;
    });
    css$22 = {
      code: "ul.separator.svelte-1wgxaxi{@apply border-t ui-border-base;;@apply mt-4 pt-4;}",
      map: null
    };
    SidebarMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { menu } = $$props;
      let { showSeparator = false } = $$props;
      let { isNested = false } = $$props;
      if ($$props.menu === void 0 && $$bindings.menu && menu !== void 0)
        $$bindings.menu(menu);
      if ($$props.showSeparator === void 0 && $$bindings.showSeparator && showSeparator !== void 0)
        $$bindings.showSeparator(showSeparator);
      if ($$props.isNested === void 0 && $$bindings.isNested && isNested !== void 0)
        $$bindings.isNested(isNested);
      $$result.css.add(css$22);
      return `<ul class="${["space-y-1 svelte-1wgxaxi", showSeparator ? "separator" : ""].join(" ").trim()}">${each(menu, (item) => {
        return `<li>${item.children ? `${validate_component(SidebarItemMenu, "SidebarItemMenu").$$render($$result, { item }, {}, {})}` : `${validate_component(SidebarItem, "SidebarItem").$$render($$result, { item, showIcon: !isNested }, {}, {})}`}
    </li>`;
      })}
</ul>`;
    });
    css$12 = {
      code: "html.sidebar-collapsed aside.svelte-1iv969e{--size-sidebar-width:0;transition:width 100ms ease}html.sidebar-opened aside.svelte-1iv969e{--size-sidebar-width:17rem;transition:width 100ms ease}aside.svelte-1iv969e{grid-area:sidebar;width:var(--size-sidebar-width);will-change:width}.wrapper.svelte-1iv969e{@apply overflow-y-auto overflow-x-hidden;;@apply rounded;;@apply py-4 px-3;;@apply sticky;;@apply flex flex-col;;top:var(--size-navbar-height);height:calc(100vh - var(--size-navbar-height))}nav.svelte-1iv969e{@apply overflow-x-hidden;}.ui-overlay.svelte-1iv969e{left:var(--size-sidebar-width)}.bottom-options.svelte-1iv969e{@apply mt-auto;;@apply w-full;;@apply relative;}",
      map: null
    };
    Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $t, $$unsubscribe_t;
      let $sidebarStore, $$unsubscribe_sidebarStore;
      let $clientApplicationStore, $$unsubscribe_clientApplicationStore;
      let $chatbotStore, $$unsubscribe_chatbotStore;
      $$unsubscribe_t = subscribe(t2, (value) => $t = value);
      $$unsubscribe_sidebarStore = subscribe(sidebarStore, (value) => $sidebarStore = value);
      $$unsubscribe_clientApplicationStore = subscribe(clientApplicationStore, (value) => $clientApplicationStore = value);
      $$unsubscribe_chatbotStore = subscribe(chatbotStore, (value) => $chatbotStore = value);
      const menus = [
        [
          {
            name: $t("layout.sidebar.channels"),
            icon: "i-ph:line-segments-thin",
            isDisclosed: false,
            children: [
              {
                path: "/channels/whatsapp",
                name: "WhatsApp",
                icon: "i-ph:whatsapp-logo-thin"
              },
              {
                path: "/channels/messenger",
                name: "Messenger",
                icon: "i-ph:messenger-logo-thin"
              },
              {
                path: "/channels/instagram",
                name: "Instagram",
                icon: "i-ph:instagram-logo-thin"
              }
            ]
          },
          {
            path: "/sandbox",
            name: "Sandbox",
            icon: "i-ph:codepen-logo-thin"
          },
          {
            path: "/templates",
            name: $t("layout.sidebar.templates"),
            icon: "i-ph:stack-thin"
          },
          {
            name: "Integrations",
            icon: "i-ph:plugs-connected-thin",
            badge: { color: "green", text: "New" },
            isDisclosed: false,
            children: [
              {
                path: "/integrations/quiron",
                name: "Quiron",
                icon: "i-ph:fire-duotone"
              },
              {
                path: "/integrations/tempus",
                name: "Tempus",
                icon: "i-ph:fire-duotone"
              }
            ]
          }
        ],
        [
          {
            path: "/documentation",
            name: $t("layout.sidebar.documentation"),
            icon: "i-ph:scroll-thin"
          },
          {
            path: "/help",
            name: $t("layout.sidebar.help"),
            icon: "i-ph:lifebuoy-thin"
          }
        ]
      ];
      sidebarStore.update((state) => __spreadProps8(__spreadValues8({}, state), { menus }));
      sidebarStore.subscribe((state) => {
        return;
      });
      $$result.css.add(css$12);
      $$unsubscribe_t();
      $$unsubscribe_sidebarStore();
      $$unsubscribe_clientApplicationStore();
      $$unsubscribe_chatbotStore();
      return `<aside aria-label="${"Sidebar"}" class="${"ui-sidebar svelte-1iv969e"}">
  ${$sidebarStore.isOpen ? `<button class="${"ui-overlay md:hidden svelte-1iv969e"}"></button>` : ``}

  
  <div class="${"wrapper svelte-1iv969e"}">
    <nav class="${"svelte-1iv969e"}">
      ${each($sidebarStore.menus, (menu, index17) => {
        return `${validate_component(SidebarMenu, "SidebarMenu").$$render($$result, { menu, showSeparator: index17 > 0 }, {}, {})}`;
      })}</nav>

    
    <div class="${"bottom-options svelte-1iv969e"}"><span class="${"badge badge-yellow mb-6 inline-block"}">Referencias
        <div class="${"i-ph:arrow-elbow-right-down"}"></div></span>

      <div class="${"flex flex-col space-y-2"}">${validate_component(Alert, "Alert").$$render($$result, { type: "success" }, {}, {
        icon: () => {
          return `<div slot="${"icon"}" class="${"i-ph:terminal-window-duotone"}"></div>`;
        },
        default: () => {
          var _a;
          return `<span class="${"block max-w-[150px] truncate"}">${escape((_a = $clientApplicationStore.selectedClient) == null ? void 0 : _a.name)}</span>`;
        }
      })}
        ${validate_component(Alert, "Alert").$$render($$result, { type: "warning" }, {}, {
        icon: () => {
          return `<div slot="${"icon"}" class="${"i-ph:robot-fill"}"></div>`;
        },
        default: () => {
          var _a;
          return `<span class="${"block max-w-[150px] truncate"}">${escape((_a = $chatbotStore == null ? void 0 : $chatbotStore.selectedChatbot) == null ? void 0 : _a.accessKey)}</span>`;
        }
      })}</div></div></div>
</aside>`;
    });
    css2 = {
      code: ".layout.svelte-1r6k2zn{display:grid;grid-template-columns:1fr;grid-template-rows:var(--size-navbar-height) 1fr var(--size-footer-height);gap:0;grid-template-areas:'navbar'\r\n      'main'\r\n      'footer';height:100vh}@media only screen and (min-width: 768px){.layout.svelte-1r6k2zn{grid-template-columns:min-content 1fr;grid-template-areas:'navbar navbar'\r\n        'sidebar main'\r\n        'sidebar footer'}}main.svelte-1r6k2zn{grid-area:main;@apply p-4;}",
      map: null
    };
    load = async ({ url: url2 }) => {
      return setupTranslations(url2.pathname);
    };
    setupTheming();
    breadcrumbItems = [
      {
        icon: "i-fa-solid:terminal",
        text: "Applications",
        path: "/applications"
      },
      { text: "Chatbots", path: "/chatbots" },
      { text: "Messages" }
    ];
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `${validate_component(SvelteToast, "SvelteToast").$$render($$result, {
        options: {
          duration: 6e3,
          pausable: true,
          dismissable: true
        }
      }, {}, {})}

<div class="${"layout svelte-1r6k2zn"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  ${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}
  <main class="${"container mx-auto w-full svelte-1r6k2zn"}">${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, { items: breadcrumbItems }, {}, {})}
    ${slots.default ? slots.default({}) : ``}</main>
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>

${validate_component(Breakpoints, "Breakpoints").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css3,
  entry: () => entry,
  index: () => index,
  js: () => js,
  module: () => layout_svelte_exports
});
var index, entry, js, css3;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    index = 0;
    entry = "pages/__layout.svelte-07ba4e67.js";
    js = ["pages/__layout.svelte-07ba4e67.js", "chunks/index-5927094f.js", "chunks/Breadcrumb-32c4586a.js", "chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js", "chunks/index-f4e83c97.js", "chunks/index-b70f7eff.js", "chunks/preload-helper-60cab3ee.js", "chunks/local-storage-4242d675.js", "chunks/TransitionRoot-0d350f17.js", "chunks/resolve-button-type-552c0ea1.js", "chunks/chatbot-bca22043.js", "chunks/http-90371e68.js", "chunks/client-application-9724d533.js", "chunks/Alert-351cf93d.js", "chunks/stores-71a8886b.js"];
    css3 = ["assets/pages/__layout.svelte-f17301b9.css", "assets/Breadcrumb-56e3f8d6.css", "assets/SvelteToast.svelte_svelte_type_style_lang-6697d3be.css"];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load2
});
function load2({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index_2415d7ec();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css4,
  entry: () => entry2,
  index: () => index2,
  js: () => js2,
  module: () => error_svelte_exports
});
var index2, entry2, js2, css4;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    index2 = 1;
    entry2 = "error.svelte-e2c554d4.js";
    js2 = ["error.svelte-e2c554d4.js", "chunks/index-5927094f.js"];
    css4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes,
  load: () => load3
});
async function load3() {
  return { redirect: "/applications", status: 301 };
}
var Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_2415d7ec();
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return ``;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports3 = {};
__export(__exports3, {
  css: () => css5,
  entry: () => entry3,
  index: () => index3,
  js: () => js3,
  module: () => index_svelte_exports
});
var index3, entry3, js3, css5;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_index_svelte();
    index3 = 9;
    entry3 = "pages/index.svelte-a4182e37.js";
    js3 = ["pages/index.svelte-a4182e37.js", "chunks/index-5927094f.js"];
    css5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/__layout-setup.svelte.js
var layout_setup_svelte_exports = {};
__export(layout_setup_svelte_exports, {
  default: () => _layout_setup,
  load: () => load4
});
var css6, load4, breadcrumbItems2, _layout_setup;
var init_layout_setup_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout-setup.svelte.js"() {
    init_index_2415d7ec();
    init_Breadcrumb_c828c026();
    init_index_b173f350();
    init_index_5fadd295();
    init_TransitionRoot_95dacb6b();
    init_resolve_button_type_552c0ea1();
    css6 = {
      code: ".layout.svelte-1yk8ctf{display:grid;grid-template-columns:1fr;grid-template-rows:var(--size-navbar-height) 1fr var(--size-footer-height);gap:0;grid-template-areas:'navbar'\r\n      'main'\r\n      'footer';height:100vh}main.svelte-1yk8ctf{grid-area:main;@apply p-4;}",
      map: null
    };
    load4 = async ({ url: url2 }) => {
      return setupTranslations(url2.pathname);
    };
    setupTheming();
    breadcrumbItems2 = [
      {
        icon: "i-fa-solid:terminal",
        text: "Applications",
        path: "/applications"
      },
      { text: "Chatbots", path: "/chatbots" }
    ];
    _layout_setup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `${validate_component(SvelteToast, "SvelteToast").$$render($$result, {
        options: { duration: 6e3, intro: { y: -64 } }
      }, {}, {})}

<div class="${"layout svelte-1yk8ctf"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
  <main class="${"container mx-auto w-full svelte-1yk8ctf"}">${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, { items: breadcrumbItems2 }, {}, {})}
    ${slots.default ? slots.default({}) : ``}</main>
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>

${validate_component(Breakpoints, "Breakpoints").$$render($$result, {}, {}, {})}`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports4 = {};
__export(__exports4, {
  css: () => css7,
  entry: () => entry4,
  index: () => index4,
  js: () => js4,
  module: () => layout_setup_svelte_exports
});
var index4, entry4, js4, css7;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_layout_setup_svelte();
    index4 = 2;
    entry4 = "pages/__layout-setup.svelte-a2d8acdf.js";
    js4 = ["pages/__layout-setup.svelte-a2d8acdf.js", "chunks/index-5927094f.js", "chunks/Breadcrumb-32c4586a.js", "chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js", "chunks/index-f4e83c97.js", "chunks/index-b70f7eff.js", "chunks/preload-helper-60cab3ee.js", "chunks/local-storage-4242d675.js", "chunks/TransitionRoot-0d350f17.js", "chunks/resolve-button-type-552c0ea1.js"];
    css7 = ["assets/pages/__layout-setup.svelte-7786ea8a.css", "assets/Breadcrumb-56e3f8d6.css", "assets/SvelteToast.svelte_svelte_type_style_lang-6697d3be.css"];
  }
});

// .svelte-kit/output/server/entries/pages/applications/index@setup.svelte.js
var index_setup_svelte_exports = {};
__export(index_setup_svelte_exports, {
  default: () => Index_setup
});
var Index_setup;
var init_index_setup_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/applications/index@setup.svelte.js"() {
    init_index_2415d7ec();
    init_index_5fadd295();
    init_client_application_770f28e1();
    init_index_b173f350();
    init_http_90371e68();
    Index_setup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $t, $$unsubscribe_t;
      let $clientApplicationStore, $$unsubscribe_clientApplicationStore;
      $$unsubscribe_t = subscribe(t2, (value) => $t = value);
      $$unsubscribe_clientApplicationStore = subscribe(clientApplicationStore, (value) => $clientApplicationStore = value);
      $$unsubscribe_t();
      $$unsubscribe_clientApplicationStore();
      return `${$$result.head += `${$$result.title = `<title>Applications</title>`, ""}`, ""}

<h1 class="${"h3"}">${escape($t("layout.sidebar.applications"))}</h1>

${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop2);
          return `
  <p>Waiting...</p>
`;
        }
        return function() {
          return `
  <div class="${"grid grid-cols-1 md:grid-cols-3"}">${each($clientApplicationStore.clients, (client) => {
            return `<div><pre>${escape(JSON.stringify(client, null, 2))}</pre>

        <div class="${"flex items-center mt-4 space-x-2"}"><a href="${"applications/" + escape(client.id) + "/chatbots"}" class="${"btn btn-blue truncate"}">Edit
          </a>

          <button class="${"btn btn-secondary"}" disabled>Delete</button></div>
      </div>`;
          })}</div>
`;
        }();
      }(clientApplicationStore.fetch())}`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css8,
  entry: () => entry5,
  index: () => index5,
  js: () => js5,
  module: () => index_setup_svelte_exports
});
var index5, entry5, js5, css8;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_setup_svelte();
    index5 = 4;
    entry5 = "pages/applications/index@setup.svelte-c17597c0.js";
    js5 = ["pages/applications/index@setup.svelte-c17597c0.js", "chunks/index-5927094f.js", "chunks/index-b70f7eff.js", "chunks/preload-helper-60cab3ee.js", "chunks/index-f4e83c97.js", "chunks/client-application-9724d533.js", "chunks/http-90371e68.js", "chunks/local-storage-4242d675.js"];
    css8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/documentation/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => Documentation
});
var Documentation;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/documentation/index.svelte.js"() {
    init_index_2415d7ec();
    Documentation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>documentation</h1>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports6 = {};
__export(__exports6, {
  css: () => css9,
  entry: () => entry6,
  index: () => index6,
  js: () => js6,
  module: () => index_svelte_exports2
});
var index6, entry6, js6, css9;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_index_svelte2();
    index6 = 7;
    entry6 = "pages/documentation/index.svelte-e711c665.js";
    js6 = ["pages/documentation/index.svelte-e711c665.js", "chunks/index-5927094f.js"];
    css9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/help/index.svelte.js
var index_svelte_exports3 = {};
__export(index_svelte_exports3, {
  default: () => Help
});
var Help;
var init_index_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/help/index.svelte.js"() {
    init_index_2415d7ec();
    Help = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<h1>help</h1>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports7 = {};
__export(__exports7, {
  css: () => css10,
  entry: () => entry7,
  index: () => index7,
  js: () => js7,
  module: () => index_svelte_exports3
});
var index7, entry7, js7, css10;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_index_svelte3();
    index7 = 8;
    entry7 = "pages/help/index.svelte-72a34bad.js";
    js7 = ["pages/help/index.svelte-72a34bad.js", "chunks/index-5927094f.js"];
    css10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/integrations/index.svelte.js
var index_svelte_exports4 = {};
__export(index_svelte_exports4, {
  default: () => Integrations
});
var Integrations;
var init_index_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/integrations/index.svelte.js"() {
    init_index_2415d7ec();
    Integrations = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Integrations</title>`, ""}`, ""}

<h1 class="${"h3"}">Integrations</h1>

Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint possimus aperiam, corrupti obcaecati nemo similique expedita, id
voluptatem consequatur assumenda rerum? Repellendus nisi, delectus dicta unde iusto ipsum quae culpa beatae non possimus eligendi
molestias fuga illo consequatur! Optio in fugiat, libero quae id ullam voluptatibus vitae reprehenderit quod animi minima, iusto
eligendi alias accusantium asperiores eum vel labore quasi excepturi iure! Tempore itaque temporibus rerum hic error iusto,
incidunt odio eos omnis exercitationem enim fugiat, quas ipsum totam rem eum praesentium eveniet impedit odit quae consequatur
ducimus voluptas. Odit quibusdam placeat maiores repudiandae optio quas sapiente ipsa porro iste exercitationem aspernatur
delectus reiciendis, nobis quae alias facere pariatur! Totam assumenda itaque alias eius voluptas tempore quasi tenetur, modi
culpa repellendus, minus adipisci quae eaque inventore libero dolorum. Quas atque fuga, explicabo temporibus eveniet facere
repudiandae expedita odio itaque voluptates nesciunt, nisi quibusdam minima? Expedita, perspiciatis in, perferendis quam magni
sequi iusto aut quos asperiores dolorum temporibus sunt reiciendis molestias nemo. Vero, atque? Culpa corporis corrupti sapiente
laboriosam dolorum assumenda quis esse minus facilis quaerat? Saepe commodi tenetur debitis sed soluta dolores aut laborum. Dicta
maxime incidunt libero assumenda dolor distinctio nesciunt, autem laborum suscipit quia delectus deleniti perspiciatis recusandae
officiis mollitia culpa quos nobis vero ullam facilis? Est ipsam quo esse modi rerum atque sint natus nemo aut id aliquid culpa
excepturi fugit nulla accusantium maiores ratione voluptatem similique molestiae deleniti non sapiente, dolore hic! Expedita
laborum inventore enim vitae totam, corporis temporibus, odit, nulla laboriosam quisquam at reiciendis repudiandae distinctio
minus? Nobis assumenda suscipit, autem accusantium tempora vitae blanditiis consequatur dolorum hic inventore tempore, nam
voluptate facilis voluptatibus perferendis dolorem quibusdam? Commodi voluptates eveniet odio perspiciatis cum sunt suscipit et
doloribus eum similique qui enim odit dignissimos deleniti, quod quaerat nam. Animi, voluptates maiores praesentium ut numquam
officiis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint possimus aperiam, corrupti obcaecati nemo similique
expedita, id voluptatem consequatur assumenda rerum? Repellendus nisi, delectus dicta unde iusto ipsum quae culpa beatae non
possimus eligendi molestias fuga illo consequatur! Optio in fugiat, libero quae id ullam voluptatibus vitae reprehenderit quod
animi minima, iusto eligendi alias accusantium asperiores eum vel labore quasi excepturi iure! Tempore itaque temporibus rerum hic
error iusto, incidunt odio eos omnis exercitationem enim fugiat, quas ipsum totam rem eum praesentium eveniet impedit odit quae
consequatur ducimus voluptas. Odit quibusdam placeat maiores repudiandae optio quas sapiente ipsa porro iste exercitationem
aspernatur delectus reiciendis, nobis quae alias facere pariatur! Totam assumenda itaque alias eius voluptas tempore quasi
tenetur, modi culpa repellendus, minus adipisci quae eaque inventore libero dolorum. Quas atque fuga, explicabo temporibus eveniet
facere repudiandae expedita odio itaque voluptates nesciunt, nisi quibusdam minima? Expedita, perspiciatis in, perferendis quam
magni sequi iusto aut quos asperiores dolorum temporibus sunt reiciendis molestias nemo. Vero, atque? Culpa corporis corrupti
sapiente laboriosam dolorum assumenda quis esse minus facilis quaerat? Saepe commodi tenetur debitis sed soluta dolores aut
laborum. Dicta maxime incidunt libero assumenda dolor distinctio nesciunt, autem laborum suscipit quia delectus deleniti
perspiciatis recusandae officiis mollitia culpa quos nobis vero ullam facilis? Est ipsam quo esse modi rerum atque sint natus nemo
aut id aliquid culpa excepturi fugit nulla accusantium maiores ratione voluptatem similique molestiae deleniti non sapiente,
dolore hic! Expedita laborum inventore enim vitae totam, corporis temporibus, odit, nulla laboriosam quisquam at reiciendis
repudiandae distinctio minus? Nobis assumenda suscipit, autem accusantium tempora vitae blanditiis consequatur dolorum hic
inventore tempore, nam voluptate facilis voluptatibus perferendis dolorem quibusdam? Commodi voluptates eveniet odio perspiciatis
cum sunt suscipit et doloribus eum similique qui enim odit dignissimos deleniti, quod quaerat nam. Animi, voluptates maiores
praesentium ut numquam officiis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint possimus aperiam, corrupti
obcaecati nemo similique expedita, id voluptatem consequatur assumenda rerum? Repellendus nisi, delectus dicta unde iusto ipsum
quae culpa beatae non possimus eligendi molestias fuga illo consequatur! Optio in fugiat, libero quae id ullam voluptatibus vitae
reprehenderit quod animi minima, iusto eligendi alias accusantium asperiores eum vel labore quasi excepturi iure! Tempore itaque
temporibus rerum hic error iusto, incidunt odio eos omnis exercitationem enim fugiat, quas ipsum totam rem eum praesentium eveniet
impedit odit quae consequatur ducimus voluptas. Odit quibusdam placeat maiores repudiandae optio quas sapiente ipsa porro iste
exercitationem aspernatur delectus reiciendis, nobis quae alias facere pariatur! Totam assumenda itaque alias eius voluptas
tempore quasi tenetur, modi culpa repellendus, minus adipisci quae eaque inventore libero dolorum. Quas atque fuga, explicabo
temporibus eveniet facere repudiandae expedita odio itaque voluptates nesciunt, nisi quibusdam minima? Expedita, perspiciatis in,
perferendis quam magni sequi iusto aut quos asperiores dolorum temporibus sunt reiciendis molestias nemo. Vero, atque? Culpa
corporis corrupti sapiente laboriosam dolorum assumenda quis esse minus facilis quaerat? Saepe commodi tenetur debitis sed soluta
dolores aut laborum. Dicta maxime incidunt libero assumenda dolor distinctio nesciunt, autem laborum suscipit quia delectus
deleniti perspiciatis recusandae officiis mollitia culpa quos nobis vero ullam facilis? Est ipsam quo esse modi rerum atque sint
natus nemo aut id aliquid culpa excepturi fugit nulla accusantium maiores ratione voluptatem similique molestiae deleniti non
sapiente, dolore hic! Expedita laborum inventore enim vitae totam, corporis temporibus, odit, nulla laboriosam quisquam at
reiciendis repudiandae distinctio minus? Nobis assumenda suscipit, autem accusantium tempora vitae blanditiis consequatur dolorum
hic inventore tempore, nam voluptate facilis voluptatibus perferendis dolorem quibusdam? Commodi voluptates eveniet odio
perspiciatis cum sunt suscipit et doloribus eum similique qui enim odit dignissimos deleniti, quod quaerat nam. Animi, voluptates
maiores praesentium ut numquam officiis?`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports8 = {};
__export(__exports8, {
  css: () => css11,
  entry: () => entry8,
  index: () => index8,
  js: () => js8,
  module: () => index_svelte_exports4
});
var index8, entry8, js8, css11;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_index_svelte4();
    index8 = 10;
    entry8 = "pages/integrations/index.svelte-986a860d.js";
    js8 = ["pages/integrations/index.svelte-986a860d.js", "chunks/index-5927094f.js"];
    css11 = [];
  }
});

// .svelte-kit/output/server/chunks/messaging-provider-d583c396.js
function createMessagingProviderStore() {
  const { subscribe: subscribe3, set } = writable2([]);
  return {
    subscribe: subscribe3,
    fetch: async () => {
      const API_URL = "https://localhost:5001/api/v1/messaging_providers";
      const response = await http2.get(API_URL);
      set(response.data);
    }
  };
}
var messagingProviderStore;
var init_messaging_provider_d583c396 = __esm({
  ".svelte-kit/output/server/chunks/messaging-provider-d583c396.js"() {
    init_http_90371e68();
    init_index_b173f350();
    messagingProviderStore = createMessagingProviderStore();
  }
});

// .svelte-kit/output/server/entries/pages/messaging-providers/index@setup.svelte.js
var index_setup_svelte_exports2 = {};
__export(index_setup_svelte_exports2, {
  default: () => Index_setup2
});
var Index_setup2;
var init_index_setup_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/messaging-providers/index@setup.svelte.js"() {
    init_index_2415d7ec();
    init_messaging_provider_d583c396();
    init_http_90371e68();
    init_index_b173f350();
    Index_setup2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $messagingProviderStore, $$unsubscribe_messagingProviderStore;
      $$unsubscribe_messagingProviderStore = subscribe(messagingProviderStore, (value) => $messagingProviderStore = value);
      $$unsubscribe_messagingProviderStore();
      return `${$$result.head += `${$$result.title = `<title>Messaging providers</title>`, ""}`, ""}

<h1 class="${"h3"}">Messaging providers</h1>

${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop2);
          return `
  <p>Waiting...</p>
`;
        }
        return function() {
          return `
  <div class="${"grid grid-cols-1 md:grid-cols-3"}">${each($messagingProviderStore, (provider) => {
            return `<div><pre>${escape(JSON.stringify(provider, null, 2))}</pre>

        <div class="${"flex items-center mt-4 space-x-2"}"><button class="${"btn btn-secondary"}" disabled>Delete</button></div>
      </div>`;
          })}</div>
`;
        }();
      }(messagingProviderStore.fetch())}`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports9 = {};
__export(__exports9, {
  css: () => css12,
  entry: () => entry9,
  index: () => index9,
  js: () => js9,
  module: () => index_setup_svelte_exports2
});
var index9, entry9, js9, css12;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_index_setup_svelte2();
    index9 = 13;
    entry9 = "pages/messaging-providers/index@setup.svelte-731b013a.js";
    js9 = ["pages/messaging-providers/index@setup.svelte-731b013a.js", "chunks/index-5927094f.js", "chunks/messaging-provider-72ae54b2.js", "chunks/http-90371e68.js", "chunks/index-f4e83c97.js"];
    css12 = [];
  }
});

// .svelte-kit/output/server/chunks/nameof-58b406ce.js
var ValidatorContainer, nameof;
var init_nameof_58b406ce = __esm({
  ".svelte-kit/output/server/chunks/nameof-58b406ce.js"() {
    init_index_2415d7ec();
    ValidatorContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { field: field2 } = $$props;
      const messages = /* @__PURE__ */ new Map([
        ["required", "El campo es requerido."],
        ["pattern", "El valor actual no coincide con la expresi\xF3n regular."],
        ["between", "El valor ingresado no est\xE1 dentro del rango."],
        ["email", "El correo electr\xF3nico es inv\xE1lido."],
        ["url", "El valor ingresado NO es una URL v\xE1lida."],
        ["min", "La longitud del valor ingresado es inferior al m\xEDnimo permitido."],
        ["max", "La longitud del valor ingresado es mayor al m\xE1ximo permitido."]
      ]);
      if ($$props.field === void 0 && $$bindings.field && field2 !== void 0)
        $$bindings.field(field2);
      return `<div>${each(field2.errors, (error2) => {
        return `<p class="${"text-sm text-red-500 dark:text-red-400"}">${escape(messages.get(error2))}</p>`;
      })}</div>`;
    });
    nameof = (name) => name;
  }
});

// node_modules/.pnpm/svelte@3.48.0/node_modules/svelte/internal/index.mjs
function noop4() {
}
function run2(fn) {
  return fn();
}
function run_all2(fns) {
  fns.forEach(run2);
}
function is_function2(thing) {
  return typeof thing === "function";
}
function safe_not_equal3(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe2(store, ...callbacks) {
  if (store == null) {
    return noop4;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value2(store) {
  let value;
  subscribe2(store, (_2) => value = _2)();
  return value;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all2($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var resolved_promise2, globals3, SvelteElement;
var init_internal = __esm({
  "node_modules/.pnpm/svelte@3.48.0/node_modules/svelte/internal/index.mjs"() {
    resolved_promise2 = Promise.resolve();
    globals3 = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    if (typeof HTMLElement === "function") {
      SvelteElement = class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }
        connectedCallback() {
          const { on_mount } = this.$$;
          this.$$.on_disconnect = on_mount.map(run2).filter(is_function2);
          for (const key2 in this.$$.slotted) {
            this.appendChild(this.$$.slotted[key2]);
          }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
          this[attr] = newValue;
        }
        disconnectedCallback() {
          run_all2(this.$$.on_disconnect);
        }
        $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop4;
        }
        $on(type, callback) {
          const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
          callbacks.push(callback);
          return () => {
            const index17 = callbacks.indexOf(callback);
            if (index17 !== -1)
              callbacks.splice(index17, 1);
          };
        }
        $set($$props) {
          if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
          }
        }
      };
    }
  }
});

// node_modules/.pnpm/svelte@3.48.0/node_modules/svelte/store/index.mjs
function readable3(value, start) {
  return {
    subscribe: writable3(value, start).subscribe
  };
}
function writable3(value, start = noop4) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal3(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue3.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue3.push(subscriber, value);
        }
        if (run_queue) {
          for (let i3 = 0; i3 < subscriber_queue3.length; i3 += 2) {
            subscriber_queue3[i3][0](subscriber_queue3[i3 + 1]);
          }
          subscriber_queue3.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe3(run3, invalidate = noop4) {
    const subscriber = [run3, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop4;
    }
    run3(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe3 };
}
function derived2(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable3(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop4;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function2(result) ? result : noop4;
      }
    };
    const unsubscribers = stores_array.map((store, i3) => subscribe2(store, (value) => {
      values[i3] = value;
      pending &= ~(1 << i3);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i3;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all2(unsubscribers);
      cleanup();
    };
  });
}
var subscriber_queue3;
var init_store = __esm({
  "node_modules/.pnpm/svelte@3.48.0/node_modules/svelte/store/index.mjs"() {
    init_internal();
    init_internal();
    subscriber_queue3 = [];
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/form.js
function form(...fields) {
  let names = [];
  let doubles = [];
  fields.forEach((field2) => {
    const obj = get_store_value2(field2);
    if (names.includes(obj.name)) {
      doubles = doubles.includes(obj.name) ? doubles : [...doubles, obj.name];
    } else {
      names = [...names, obj.name];
    }
  });
  if (doubles.length) {
    throw new Error(`Cannot have the fields with the same name: ${doubles.join(", ")}`);
  }
  const store = derived2(fields, (values) => {
    return {
      valid: values.every((value) => value.valid),
      dirty: values.some((value) => value.dirty),
      get summary() {
        return values.reduce((carry, f4) => {
          carry[f4.name] = f4.value;
          return carry;
        }, {});
      },
      errors: values.map((value) => {
        return value.errors.map((e2) => {
          if (e2.includes(".")) {
            return e2;
          }
          return `${value.name}.${e2}`;
        });
      }).flat().filter((value, index17, self2) => self2.indexOf(value) === index17),
      hasError(name) {
        return this.errors.findIndex((e2) => e2 === name) !== -1;
      }
    };
  });
  const { subscribe: subscribe3 } = store;
  function reset() {
    fields.forEach((field2) => field2.reset && field2.reset());
  }
  function clear() {
    fields.forEach((field2) => field2.clear && field2.clear());
  }
  async function validate() {
    for (const field2 of fields) {
      if (field2.validate)
        await field2.validate();
    }
  }
  function getField(name) {
    return fields.find((f4) => get_store_value2(f4).name === name);
  }
  function summary() {
    return get_store_value2(store).summary;
  }
  return { subscribe: subscribe3, reset, validate, getField, summary, clear };
}
var init_form = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/form.js"() {
    init_store();
  }
});

// node_modules/.pnpm/is-promise@4.0.0/node_modules/is-promise/index.mjs
function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
var init_is_promise = __esm({
  "node_modules/.pnpm/is-promise@4.0.0/node_modules/is-promise/index.mjs"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/types.js
function isField(field2) {
  const keys = Object.keys(field2);
  return ["name", "value", "valid", "invalid", "errors"].every((key2) => keys.includes(key2));
}
var defaultFieldOptions;
var init_types = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/types.js"() {
    defaultFieldOptions = {
      valid: true,
      checkOnInit: false,
      validateOnChange: true,
      stopAtFirstError: false
    };
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/createFieldStore.js
function getValue(value) {
  const isStore = function(v2) {
    return value.subscribe !== void 0;
  };
  const isField2 = function(v2) {
    return !!value.name && value.valid !== void 0;
  };
  if (isStore(value)) {
    return get_store_value2(value).value;
  } else if (isField2(value)) {
    return value.value;
  }
  return value;
}
async function getErrors(value, validators, stopAtFirstError = false) {
  const v2 = getValue(value);
  let errors = [];
  for (const validator of validators) {
    let result = validator(v2);
    if (isPromise(result)) {
      result = await result;
    }
    if (stopAtFirstError && !result.valid) {
      errors = [result];
      break;
    }
    errors = [...errors, result];
  }
  return errors;
}
function processField(field2, validations, partialField = {}) {
  if (validations) {
    const errors = validations.filter((v2) => !v2.valid).map((v2) => v2.name);
    const valid = !errors.length;
    return __spreadValues(__spreadProps(__spreadValues({}, field2), { valid, invalid: !valid, errors }), partialField);
  }
  return field2;
}
function createFieldStore(name, v2, validators = [], options) {
  const value = {
    name,
    value: v2,
    valid: options.valid,
    invalid: !options.valid,
    dirty: false,
    errors: []
  };
  const store = writable3(value);
  const { subscribe: subscribe3, update: update2, set: _set } = store;
  async function set(field2, forceValidation = false) {
    if (!isField(field2)) {
      field2 = processField(get_store_value2(store), [], { value: field2 });
    }
    if (forceValidation || options.validateOnChange) {
      let validations = await getErrors(field2, validators, options.stopAtFirstError);
      _set(processField(field2, validations, { dirty: true }));
    } else {
      _set(processField(field2, null, { dirty: true }));
    }
  }
  async function validate() {
    const errors = await getErrors(store, validators, options.stopAtFirstError);
    let obj;
    update2((field2) => {
      obj = processField(field2, errors, { dirty: false });
      return obj;
    });
    return obj;
  }
  function reset() {
    _set(processField({
      dirty: false,
      errors: [],
      name,
      valid: options.valid,
      invalid: !options.valid,
      value: v2
    }));
  }
  if (options.checkOnInit) {
    set(value);
  }
  function clear() {
    _set(processField({
      dirty: false,
      errors: [],
      name,
      valid: options.valid,
      invalid: !options.valid,
      value: null
    }));
  }
  return { subscribe: subscribe3, update: update2, set, validate, reset, clear };
}
var init_createFieldStore = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/createFieldStore.js"() {
    init_is_promise();
    init_store();
    init_types();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/field.js
function field(name, value, validators = [], options = {}) {
  return createFieldStore(name, value, validators, __spreadValues(__spreadValues({}, defaultFieldOptions), options));
}
var init_field = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/field.js"() {
    init_createFieldStore();
    init_types();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/use.style.js
var init_use_style = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/use.style.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/combined.js
var init_combined = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/combined.js"() {
    init_store();
    init_store();
    init_createFieldStore();
    init_types();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/index.js
var init_svelte_forms = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/index.js"() {
    init_form();
    init_field();
    init_use_style();
    init_combined();
    init_types();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/between.js
var init_between = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/between.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/email.js
var init_email = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/email.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/max.js
function max(n2) {
  return (value) => {
    const val = typeof value === "string" ? value.length : isNaN(value) ? 0 : parseFloat(value);
    return { valid: val <= n2, name: "max" };
  };
}
var init_max = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/max.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/min.js
var init_min = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/min.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/required.js
function required() {
  return (val) => {
    let valid = true;
    if (val === void 0 || val === null)
      valid = false;
    if (typeof val === "string") {
      const tmp = val.replace(/\s/g, "");
      valid = tmp.length > 0;
    }
    return { valid, name: "required" };
  };
}
var init_required = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/required.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/url.js
function url() {
  const regex = /(https?|ftp|git|svn):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  return (value) => ({ valid: regex.test(value), name: "url" });
}
var init_url = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/url.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/matchField.js
var init_matchField = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/matchField.js"() {
    init_store();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/not.js
var init_not = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/not.js"() {
    init_is_promise();
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/pattern.js
function pattern(pattern2) {
  return (value) => {
    if (value === null || value === void 0) {
      return { valid: false, name: "pattern" };
    }
    return { valid: pattern2.test(value), name: "pattern" };
  };
}
var init_pattern = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/pattern.js"() {
  }
});

// node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/index.js
var init_validators = __esm({
  "node_modules/.pnpm/svelte-forms@2.3.1/node_modules/svelte-forms/validators/index.js"() {
    init_between();
    init_email();
    init_max();
    init_min();
    init_required();
    init_url();
    init_matchField();
    init_not();
    init_pattern();
  }
});

// .svelte-kit/output/server/entries/pages/sandbox/index.svelte.js
var index_svelte_exports5 = {};
__export(index_svelte_exports5, {
  default: () => Sandbox
});
var Sandbox;
var init_index_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/sandbox/index.svelte.js"() {
    init_index_2415d7ec();
    init_nameof_58b406ce();
    init_chatbot_febec0ab();
    init_svelte_forms();
    init_validators();
    init_http_90371e68();
    init_index_b173f350();
    Sandbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a;
      let $to, $$unsubscribe_to;
      let $formData, $$unsubscribe_formData;
      let $chatbotStore, $$unsubscribe_chatbotStore;
      let $message, $$unsubscribe_message;
      $$unsubscribe_chatbotStore = subscribe(chatbotStore, (value) => $chatbotStore = value);
      const to = field(nameof("to"), "", [required()]);
      $$unsubscribe_to = subscribe(to, (value) => $to = value);
      const message = field(nameof("message"), "", [required(), max(200)]);
      $$unsubscribe_message = subscribe(message, (value) => $message = value);
      const formData = form(to, message);
      $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
      let canSend;
      ((_a = $chatbotStore.selectedChatbot) == null ? void 0 : _a.id) || 0;
      canSend = $formData.valid;
      $$unsubscribe_to();
      $$unsubscribe_formData();
      $$unsubscribe_chatbotStore();
      $$unsubscribe_message();
      return `${$$result.head += `${$$result.title = `<title>Sandbox</title>`, ""}`, ""}

<h1 class="${"h3"}">Sandbox</h1>

<form class="${"form"}"><div class="${"form-group"}"><div class="${"form-item"}"><label for="${"to"}">To</label>
      <input type="${"text"}" id="${"to"}" class="${"field"}"${add_attribute("value", $to.value, 0)}>
      ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $to }, {}, {})}</div>

    <div class="${"form-item"}"><label for="${"message"}">Message</label>
      <textarea id="${"message"}" class="${"field max-h-[200px]"}">${$message.value || ""}</textarea>
      <div class="${"flex py-2 text-sm"}"><span${add_classes(($message.value.length > 200 ? "text-red-400" : "").trim())}>${escape($message.value.length)}</span>
        <span>/200</span></div>
      ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $message }, {}, {})}</div></div>

  <div class="${"actions-group"}"><button class="${"btn btn-secondary"}"><div class="${"i-fluent:broom-16-regular mr-2 text-2xl"}"></div>
      Clear
    </button>
    <button type="${"submit"}" class="${"btn btn-blue"}" ${!canSend ? "disabled" : ""}><div class="${"i-carbon:send-alt mr-2 text-2xl"}"></div>
      Send
    </button></div></form>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports10 = {};
__export(__exports10, {
  css: () => css13,
  entry: () => entry10,
  index: () => index10,
  js: () => js10,
  module: () => index_svelte_exports5
});
var index10, entry10, js10, css13;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_index_svelte5();
    index10 = 14;
    entry10 = "pages/sandbox/index.svelte-dcd13d76.js";
    js10 = ["pages/sandbox/index.svelte-dcd13d76.js", "chunks/index-5927094f.js", "chunks/required-1e16da63.js", "chunks/index-f4e83c97.js", "chunks/chatbot-bca22043.js", "chunks/http-90371e68.js", "chunks/local-storage-4242d675.js", "chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js"];
    css13 = ["assets/SvelteToast.svelte_svelte_type_style_lang-6697d3be.css"];
  }
});

// .svelte-kit/output/server/entries/endpoints/templates/store.ts.js
var store_ts_exports = {};
__export(store_ts_exports, {
  templatesStore: () => templatesStore
});
function createTemplatesStore() {
  const { subscribe: subscribe3, set } = writable2([]);
  return {
    subscribe: subscribe3,
    fetch: async (chatbotId) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/templates`;
      const response = await http2.get(API_URL);
      set(response.data);
    }
  };
}
var templatesStore;
var init_store_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/templates/store.ts.js"() {
    init_http_90371e68();
    init_index_b173f350();
    init_index_2415d7ec();
    templatesStore = createTemplatesStore();
  }
});

// .svelte-kit/output/server/entries/pages/templates/index.svelte.js
var index_svelte_exports6 = {};
__export(index_svelte_exports6, {
  default: () => Templates
});
var Templates;
var init_index_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/templates/index.svelte.js"() {
    init_index_2415d7ec();
    init_stores_56dab1b2();
    init_store_ts();
    init_http_90371e68();
    init_index_b173f350();
    Templates = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      let $templatesStore, $$unsubscribe_templatesStore;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_templatesStore = subscribe(templatesStore, (value) => $templatesStore = value);
      const chatbotId = Number($page.params["slug"]);
      $$unsubscribe_page();
      $$unsubscribe_templatesStore();
      return `${$$result.head += `${$$result.title = `<title>Templates</title>`, ""}`, ""}

<h1 class="${"h3"}">Templates</h1>

${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop2);
          return `
  <p>Waiting...</p>
`;
        }
        return function() {
          return `
  <div class="${"grid grid-cols-1 gap-y-12"}">${each($templatesStore, (template2) => {
            return `<div><pre>${escape(JSON.stringify(template2, null, 2))}</pre>

        <div class="${"flex items-center mt-4 space-x-2"}"><button class="${"btn btn-secondary"}" disabled>Delete</button></div>
      </div>`;
          })}</div>
`;
        }();
      }(templatesStore.fetch(chatbotId))}`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports11 = {};
__export(__exports11, {
  css: () => css14,
  entry: () => entry11,
  index: () => index11,
  js: () => js11,
  module: () => index_svelte_exports6
});
var index11, entry11, js11, css14;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_index_svelte6();
    index11 = 15;
    entry11 = "pages/templates/index.svelte-10956884.js";
    js11 = ["pages/templates/index.svelte-10956884.js", "chunks/index-5927094f.js", "chunks/stores-71a8886b.js", "chunks/http-90371e68.js", "chunks/index-f4e83c97.js"];
    css14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/channels/whatsapp/Form.svelte.js
var Form_svelte_exports = {};
__export(Form_svelte_exports, {
  default: () => Form
});
var __defProp9, __getOwnPropSymbols9, __hasOwnProp9, __propIsEnum9, __defNormalProp9, __spreadValues9, DialogTitle, DialogOverlay, Description, TransitionChildWrapper, Clipboard, css15, HighlightBox, Modal, Form;
var init_Form_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/channels/whatsapp/Form.svelte.js"() {
    init_index_2415d7ec();
    init_Alert_ae69748a();
    init_TransitionRoot_95dacb6b();
    init_nameof_58b406ce();
    init_svelte_forms();
    init_validators();
    init_index_b173f350();
    __defProp9 = Object.defineProperty;
    __getOwnPropSymbols9 = Object.getOwnPropertySymbols;
    __hasOwnProp9 = Object.prototype.hasOwnProperty;
    __propIsEnum9 = Object.prototype.propertyIsEnumerable;
    __defNormalProp9 = (obj, key2, value) => key2 in obj ? __defProp9(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues9 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp9.call(b, prop))
          __defNormalProp9(a, prop, b[prop]);
      if (__getOwnPropSymbols9)
        for (var prop of __getOwnPropSymbols9(b)) {
          if (__propIsEnum9.call(b, prop))
            __defNormalProp9(a, prop, b[prop]);
        }
      return a;
    };
    DialogTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use"]);
      let $api, $$unsubscribe_api;
      let { as = "h2" } = $$props;
      let { use = [] } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let api = useDialogContext("DialogTitle");
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      let id2 = `headlessui-dialog-title-${useId()}`;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      propsWeControl = { id: id2 };
      slotProps = {
        open: $api.dialogState === DialogStates.Open
      };
      $$unsubscribe_api();
      return `${validate_component(Render, "Render").$$render($$result, Object.assign(__spreadValues9(__spreadValues9({}, $$restProps), propsWeControl), { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "DialogTitle" }), {}, {
        default: () => {
          return `${slots.default ? slots.default(__spreadValues9({}, slotProps)) : ``}`;
        }
      })}`;
    });
    DialogOverlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use"]);
      let $api, $$unsubscribe_api;
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let api = useDialogContext("DialogOverlay");
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      let id2 = `headlessui-dialog-overlay-${useId()}`;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      propsWeControl = { id: id2, "aria-hidden": true };
      slotProps = {
        open: $api.dialogState === DialogStates.Open
      };
      $$unsubscribe_api();
      return `${validate_component(Render, "Render").$$render($$result, Object.assign(__spreadValues9(__spreadValues9({}, $$restProps), propsWeControl), { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "DialogOverlay" }), {}, {
        default: () => {
          return `${slots.default ? slots.default(__spreadValues9({}, slotProps)) : ``}`;
        }
      })}`;
    });
    Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use"]);
      let $contextStore, $$unsubscribe_contextStore;
      const forwardEvents = forwardEventsBuilder(get_current_component());
      let { as = "p" } = $$props;
      let { use = [] } = $$props;
      const id2 = `headlessui-description-${useId()}`;
      let contextStore = useDescriptionContext();
      $$unsubscribe_contextStore = subscribe(contextStore, (value) => $contextStore = value);
      if (!contextStore) {
        throw new Error("You used a <Description /> component, but it is not inside a relevant parent.");
      }
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      slotProps = $contextStore.slotProps || {};
      $$unsubscribe_contextStore();
      return `${validate_component(Render, "Render").$$render($$result, Object.assign({ name: "Description" }, $$restProps, { as }, { slotProps }, $contextStore == null ? void 0 : $contextStore.props, { id: id2 }, { use: [...use, forwardEvents] }), {}, {
        default: () => {
          return `${slots.default ? slots.default(__spreadValues9({}, slotProps)) : ``}`;
        }
      })}`;
    });
    TransitionChildWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["beforeEnter", "beforeLeave", "afterEnter", "afterLeave"]);
      let { as = "div" } = $$props;
      let { use = [] } = $$props;
      let hasTransition = hasTransitionContext();
      let hasOpen = hasOpenClosed();
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      return `${!hasTransition && hasOpen ? `${validate_component(TransitionRoot, "TransitionRoot").$$render($$result, Object.assign($$props, { as }, { use: [...use, forwardEvents] }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}` : `${validate_component(TransitionChild, "TransitionChild").$$render($$result, Object.assign($$props, { as }, { use: [...use, forwardEvents] }), {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}`}`;
    });
    Clipboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { text } = $$props;
      const dispatch = createEventDispatcher();
      async function copy() {
        navigator.clipboard.writeText(text).then(() => dispatch("copy"));
      }
      if ($$props.text === void 0 && $$bindings.text && text !== void 0)
        $$bindings.text(text);
      return `${slots.default ? slots.default({ copy }) : ``}`;
    });
    css15 = {
      code: ".highlighted-box.svelte-1ug9hol{@apply relative;;@apply block;;@apply p-1;;@apply rounded-2xl;}.highlighted-box.highlighted-box-blue.svelte-1ug9hol{@apply shadow-2xl;;@apply bg-gradient-to-br from-blue-700 to-blue-50;;@apply shadow-blue-900;}.highlighted-box.highlighted-box-green.svelte-1ug9hol{@apply shadow-2xl;;@apply bg-gradient-to-br from-green-700 to-green-50;;@apply shadow-green-900;}.highlighted-box.highlighted-box-red.svelte-1ug9hol{@apply shadow-2xl;;@apply bg-gradient-to-br from-red-700 to-red-50;;@apply shadow-red-900;}.highlighted-box.highlighted-box-pink.svelte-1ug9hol{@apply shadow-2xl;;@apply bg-gradient-to-br from-pink-700 to-pink-50;;@apply shadow-pink-900;}.highlighted-box.highlighted-box-yellow.svelte-1ug9hol{@apply shadow-2xl;;@apply bg-gradient-to-br from-yellow-700 to-yellow-50;;@apply shadow-yellow-900;}",
      map: null
    };
    HighlightBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isActive } = $$props;
      let { color = "blue" } = $$props;
      if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
        $$bindings.isActive(isActive);
      if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
      $$result.css.add(css15);
      return `<div class="${"highlighted-box " + escape(isActive ? "highlighted-box-" + color : "") + " svelte-1ug9hol"}">${slots.default ? slots.default({}) : ``}
</div>`;
    });
    Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { isOpen = false } = $$props;
      let { size = null } = $$props;
      if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
        $$bindings.isOpen(isOpen);
      if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
      return `${validate_component(TransitionRoot, "Transition").$$render($$result, { appear: true, show: isOpen }, {}, {
        default: () => {
          return `
  ${validate_component(Dialog, "Dialog").$$render($$result, {
            as: "div",
            class: "fixed inset-0 z-20",
            open: isOpen
          }, {}, {
            default: () => {
              return `
    ${validate_component(TransitionChildWrapper, "TransitionChild").$$render($$result, {
                enter: "ease-out duration-300",
                enterFrom: "opacity-0",
                enterTo: "opacity-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100",
                leaveTo: "opacity-0"
              }, {}, {
                default: () => {
                  return `${validate_component(DialogOverlay, "DialogOverlay").$$render($$result, {
                    class: "fixed inset-0 bg-black/30 backdrop-blur-md  dark:bg-black/80"
                  }, {}, {})}`;
                }
              })}

    
    ${validate_component(TransitionChildWrapper, "TransitionChild").$$render($$result, {
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 scale-95",
                enterTo: "opacity-100 scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 scale-100",
                leaveTo: "opacity-0 scale-95",
                class: "grid h-full place-items-center"
              }, {}, {
                default: () => {
                  return `
      <div class="${[
                    "my-8 inline-block transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl transition-all dark:bg-zinc-800",
                    (size === "xs" ? "max-w-xs" : "") + " " + (size === "sm" ? "max-w-sm" : "") + " " + (size === "md" ? "max-w-md" : "") + " " + (size === "lg" ? "max-w-lg" : "") + " " + (size === "xl" ? "max-w-xl" : "") + " " + (size === "2xl" ? "max-w-2xl" : "") + " " + (size === "3xl" ? "max-w-3xl" : "") + " " + (size === "4xl" ? "max-w-4xl" : "") + " " + (size === "5xl" ? "max-w-5xl" : "") + " " + (size === "6xl" ? "max-w-6xl" : "") + " " + (size === "7xl" ? "max-w-7xl" : "") + " " + (size === "full" ? "max-w-full" : "")
                  ].join(" ").trim()}">
        ${validate_component(DialogTitle, "DialogTitle").$$render($$result, {
                    as: "h3",
                    class: "text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-400"
                  }, {}, {
                    default: () => {
                      return `${slots.title ? slots.title({}) : ``}`;
                    }
                  })}

        
        ${validate_component(Description, "DialogDescription").$$render($$result, {}, {}, {
                    default: () => {
                      return `${slots.description ? slots.description({}) : ``}`;
                    }
                  })}

        
        ${slots.content ? slots.content({}) : ``}</div>`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    });
    Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $formData, $$unsubscribe_formData;
      let $platformPhoneNumber, $$unsubscribe_platformPhoneNumber;
      let $platformAccountSid, $$unsubscribe_platformAccountSid;
      let $platformAuthToken, $$unsubscribe_platformAuthToken;
      let $httpMethodCode, $$unsubscribe_httpMethodCode;
      let $callbackUrl, $$unsubscribe_callbackUrl;
      let $messagingProviderId, $$unsubscribe_messagingProviderId;
      let { channel } = $$props;
      let { messagingProviders } = $$props;
      let { devModeEnabled } = $$props;
      createEventDispatcher();
      const httpMethods = [{ value: 0, text: "POST" }, { value: 1, text: "PUT" }];
      const platformPhoneNumber = field(nameof("platformPhoneNumber"), channel.platformPhoneNumber, [required(), pattern(/^([0-9]{1,2})([0-9]{10,12})$/g)], { checkOnInit: true });
      $$unsubscribe_platformPhoneNumber = subscribe(platformPhoneNumber, (value) => $platformPhoneNumber = value);
      const platformAccountSid = field(nameof("platformAccountSid"), channel.platformAccountSid, [required()]);
      $$unsubscribe_platformAccountSid = subscribe(platformAccountSid, (value) => $platformAccountSid = value);
      const platformAuthToken = field(nameof("platformAuthToken"), channel.platformAuthToken, [required()]);
      $$unsubscribe_platformAuthToken = subscribe(platformAuthToken, (value) => $platformAuthToken = value);
      const httpMethodCode = field(nameof("httpMethodCode"), channel.httpMethodCode, [required()]);
      $$unsubscribe_httpMethodCode = subscribe(httpMethodCode, (value) => $httpMethodCode = value);
      const callbackUrl = field(nameof("callbackUrl"), channel.callbackUrl, [required(), url()], { checkOnInit: false });
      $$unsubscribe_callbackUrl = subscribe(callbackUrl, (value) => $callbackUrl = value);
      const messagingProviderId = field(nameof("messagingProviderId"), channel.messagingProviderId, [required()]);
      $$unsubscribe_messagingProviderId = subscribe(messagingProviderId, (value) => $messagingProviderId = value);
      const formData = form(platformPhoneNumber, platformAccountSid, platformAuthToken, httpMethodCode, callbackUrl, messagingProviderId);
      $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
      let canSave;
      let isViewSourceOpen = false;
      if ($$props.channel === void 0 && $$bindings.channel && channel !== void 0)
        $$bindings.channel(channel);
      if ($$props.messagingProviders === void 0 && $$bindings.messagingProviders && messagingProviders !== void 0)
        $$bindings.messagingProviders(messagingProviders);
      if ($$props.devModeEnabled === void 0 && $$bindings.devModeEnabled && devModeEnabled !== void 0)
        $$bindings.devModeEnabled(devModeEnabled);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        canSave = $formData.valid;
        $$rendered = `${validate_component(HighlightBox, "HighlightBox").$$render($$result, {
          isActive: devModeEnabled,
          color: "yellow"
        }, {}, {
          default: () => {
            return `<form class="${["form", devModeEnabled ? "highlighted-box" : ""].join(" ").trim()}"><div class="${"form-group form-cols-2 mb-8"}"><div class="${"form-item"}"><label for="${"platformPhoneNumber"}">Platform phone number</label>
        <input type="${"text"}" id="${"platformPhoneNumber"}"${add_attribute("placeholder", `^([0-9]{1,2})([0-9]{10,12})$/g`, 0)} class="${"field"}"${add_attribute("value", $platformPhoneNumber.value, 0)}>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $platformPhoneNumber }, {}, {})}</div>

      <div class="${"form-item"}"><label for="${"platformAccountSid"}">Platform account SID</label>
        <input type="${"text"}" id="${"platformAccountSid"}" class="${"field"}"${add_attribute("value", $platformAccountSid.value, 0)}>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $platformAccountSid }, {}, {})}</div>

      <div class="${"form-item"}"><label for="${"platformAuthToken"}">Platform auth token</label>
        <input type="${"text"}" id="${"platformAuthToken"}" class="${"field"}"${add_attribute("value", $platformAuthToken.value, 0)}>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $platformAuthToken }, {}, {})}</div></div>

    ${validate_component(Alert, "Alert").$$render($$result, {}, {}, {
              default: () => {
                return `La siguiente configuraci\xF3n le permitir\xE1 establecer un Endpoint para realizar una petici\xF3n HTTP <strong class="${"font-semibold"}">POST</strong>
      o <strong class="${"font-semibold"}">PUT</strong> y recibir las respuestas del usuario.
    `;
              }
            })}
    <div class="${"form-group mt-4 mb-8"}"><div class="${"form-item"}"><label for="${"httpMethodCode"}">HTTP method</label>
        <select id="${"httpMethodCode"}" class="${"field"}">${each(httpMethods, (method) => {
              return `<option${add_attribute("value", method.value, 0)}>${escape(method.text)}</option>`;
            })}</select>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $httpMethodCode }, {}, {})}</div>

      <div class="${"form-item"}"><label for="${"callbackUrl"}">Callback URL</label>
        <input type="${"text"}" id="${"callbackUrl"}" class="${"field"}"${add_attribute("value", $callbackUrl.value, 0)}>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $callbackUrl }, {}, {})}</div></div>

    <div class="${"form-group mt-4"}"><div class="${"form-item"}"><label for="${"messagingProviderId"}">Messaging provider</label>
        <select id="${"messagingProviderId"}" class="${"field"}">${each(messagingProviders, (provider) => {
              return `<option${add_attribute("value", provider.id, 0)}>${escape(provider.name)}</option>`;
            })}</select>
        ${validate_component(ValidatorContainer, "ValidatorContainer").$$render($$result, { field: $messagingProviderId }, {}, {})}</div></div>

    <div class="${"mt-12 actions-group"}"><button type="${"button"}" class="${"btn btn-secondary"}"><div class="${"i-ph:code mr-2 text-2xl"}"></div>
        View source
      </button>
      <button type="${"button"}" class="${"btn btn-secondary"}"><div class="${"i-fluent:broom-16-regular mr-2 text-2xl"}"></div>
        Clear
      </button>
      <button type="${"button"}" class="${"btn btn-secondary"}"><div class="${"i-ion:arrow-undo-outline mr-2 text-2xl"}"></div>
        Reset
      </button>
      <button type="${"button"}" class="${"btn btn-red"}"><div class="${"i-codicon:debug-disconnect mr-2 text-2xl"}"></div>
        Disconnect
      </button>
      <button type="${"submit"}" class="${"btn btn-green"}" ${!canSave ? "disabled" : ""}><div class="${"i-iconoir:save-floppy-disk mr-2 text-2xl"}"></div>
        Save
      </button></div></form>`;
          }
        })}

${validate_component(Modal, "Modal").$$render($$result, { isOpen: isViewSourceOpen }, {
          isOpen: ($$value) => {
            isViewSourceOpen = $$value;
            $$settled = false;
          }
        }, {
          content: () => {
            return `<div slot="${"content"}"><pre>      ${escape(JSON.stringify($formData.summary, null, 2))}
    </pre>

    <div class="${"actions-group"}"><button class="${"btn btn-secondary"}"><div class="${"i-carbon:close mr-2 lg"}"></div>
        Close
      </button>

      ${validate_component(Clipboard, "Clipboard").$$render($$result, {
              text: JSON.stringify($formData.summary, null, 2)
            }, {}, {
              default: ({ copy }) => {
                return `<button class="${"btn btn-blue"}"><div class="${"i-carbon:copy mr-2 text-lg"}"></div>
          Copy
        </button>`;
              }
            })}</div></div>`;
          },
          title: () => {
            return `<span slot="${"title"}">Source</span>`;
          }
        })}`;
      } while (!$$settled);
      $$unsubscribe_formData();
      $$unsubscribe_platformPhoneNumber();
      $$unsubscribe_platformAccountSid();
      $$unsubscribe_platformAuthToken();
      $$unsubscribe_httpMethodCode();
      $$unsubscribe_callbackUrl();
      $$unsubscribe_messagingProviderId();
      return $$rendered;
    });
  }
});

// .svelte-kit/output/server/entries/endpoints/channels/whatsapp/store.ts.js
var store_ts_exports2 = {};
__export(store_ts_exports2, {
  channelsStore: () => channelsStore
});
function createChannelsStore() {
  const { subscribe: subscribe3, set } = writable2();
  return {
    subscribe: subscribe3,
    fetch: async (chatbotId) => {
      console.log(chatbotId);
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      const response = await http2.get(API_URL);
      set(response.data);
    },
    create: async (chatbotId, channel) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels`;
      return await http2.post(API_URL, channel);
    },
    update: async (chatbotId, channelId, channel) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      return await http2.put(API_URL, channel);
    },
    delete: async (chatbotId, channelId) => {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/channels/${channelId}`;
      return await http2.del(API_URL);
    }
  };
}
var channelsStore;
var init_store_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/channels/whatsapp/store.ts.js"() {
    init_http_90371e68();
    init_index_b173f350();
    init_index_2415d7ec();
    channelsStore = createChannelsStore();
  }
});

// .svelte-kit/output/server/entries/pages/channels/whatsapp/index.svelte.js
var index_svelte_exports7 = {};
__export(index_svelte_exports7, {
  default: () => Whatsapp
});
function useLabelContext() {
  return getContext(LABEL_CONTEXT_NAME);
}
function useSwitchContext() {
  return getContext(SWITCH_CONTEXT_NAME);
}
var __defProp10, __getOwnPropSymbols10, __hasOwnProp10, __propIsEnum10, __defNormalProp10, __spreadValues10, LABEL_CONTEXT_NAME, SWITCH_CONTEXT_NAME, Switch, css16, Tooltip, Whatsapp;
var init_index_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/channels/whatsapp/index.svelte.js"() {
    init_index_2415d7ec();
    init_chatbot_febec0ab();
    init_messaging_provider_d583c396();
    init_TransitionRoot_95dacb6b();
    init_resolve_button_type_552c0ea1();
    init_Form_svelte();
    init_store_ts2();
    init_http_90371e68();
    init_index_b173f350();
    init_Alert_ae69748a();
    init_nameof_58b406ce();
    init_svelte_forms();
    init_validators();
    __defProp10 = Object.defineProperty;
    __getOwnPropSymbols10 = Object.getOwnPropertySymbols;
    __hasOwnProp10 = Object.prototype.hasOwnProperty;
    __propIsEnum10 = Object.prototype.propertyIsEnumerable;
    __defNormalProp10 = (obj, key2, value) => key2 in obj ? __defProp10(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
    __spreadValues10 = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp10.call(b, prop))
          __defNormalProp10(a, prop, b[prop]);
      if (__getOwnPropSymbols10)
        for (var prop of __getOwnPropSymbols10(b)) {
          if (__propIsEnum10.call(b, prop))
            __defNormalProp10(a, prop, b[prop]);
        }
      return a;
    };
    LABEL_CONTEXT_NAME = "headlessui-label-context";
    SWITCH_CONTEXT_NAME = "headlessui-switch-context";
    Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let switchStore;
      let propsWeControl;
      let slotProps;
      let $$restProps = compute_rest_props($$props, ["as", "use", "checked"]);
      let $descriptionContext, $$unsubscribe_descriptionContext;
      let $labelContext, $$unsubscribe_labelContext;
      let $switchStore, $$unsubscribe_switchStore = noop2, $$subscribe_switchStore = () => ($$unsubscribe_switchStore(), $$unsubscribe_switchStore = subscribe(switchStore, ($$value) => $switchStore = $$value), switchStore);
      let $api, $$unsubscribe_api;
      let { as = "button" } = $$props;
      let { use = [] } = $$props;
      let { checked = false } = $$props;
      const forwardEvents = forwardEventsBuilder(get_current_component(), ["change"]);
      createEventDispatcher();
      let api = useSwitchContext();
      $$unsubscribe_api = subscribe(api, (value) => $api = value);
      let labelContext = useLabelContext();
      $$unsubscribe_labelContext = subscribe(labelContext, (value) => $labelContext = value);
      let descriptionContext = useDescriptionContext();
      $$unsubscribe_descriptionContext = subscribe(descriptionContext, (value) => $descriptionContext = value);
      let id2 = `headlessui-switch-${useId()}`;
      if ($$props.as === void 0 && $$bindings.as && as !== void 0)
        $$bindings.as(as);
      if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
      if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
      let $$settled;
      let $$rendered;
      do {
        $$settled = true;
        $$subscribe_switchStore(switchStore = $api == null ? void 0 : $api.switchStore);
        propsWeControl = {
          id: id2,
          role: "switch",
          type: resolveButtonType({ type: $$props.type, as }, $switchStore),
          tabIndex: 0,
          "aria-checked": checked,
          "aria-labelledby": $labelContext == null ? void 0 : $labelContext.labelIds,
          "aria-describedby": $descriptionContext == null ? void 0 : $descriptionContext.descriptionIds
        };
        slotProps = { checked };
        $$rendered = `
${switchStore ? `${validate_component(Render, "Render").$$render($$result, Object.assign(__spreadValues10(__spreadValues10({}, $$restProps), propsWeControl), { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Switch" }, { el: $switchStore }), {
          el: ($$value) => {
            $switchStore = $$value;
            $$settled = false;
          }
        }, {
          default: () => {
            return `${slots.default ? slots.default(__spreadValues10({}, slotProps)) : ``}`;
          }
        })}` : `${validate_component(Render, "Render").$$render($$result, Object.assign(__spreadValues10(__spreadValues10({}, $$restProps), propsWeControl), { as }, { slotProps }, { use: [...use, forwardEvents] }, { name: "Switch" }), {}, {
          default: () => {
            return `${slots.default ? slots.default(__spreadValues10({}, slotProps)) : ``}`;
          }
        })}`}`;
      } while (!$$settled);
      $$unsubscribe_descriptionContext();
      $$unsubscribe_labelContext();
      $$unsubscribe_switchStore();
      $$unsubscribe_api();
      return $$rendered;
    });
    css16 = {
      code: ".tooltip.svelte-1lh5oje{@apply absolute;;@apply p-2 py-1;;@apply border border-zinc-500;;@apply rounded-lg;;@apply shadow-2xl;;@apply z-10;}",
      map: null
    };
    Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { title = "" } = $$props;
      let { offset = [5, 5] } = $$props;
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
        $$bindings.offset(offset);
      $$result.css.add(css16);
      return `<div>${slots.target ? slots.target({}) : ``}</div>

${``}`;
    });
    Whatsapp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      var _a;
      let chatbotId;
      let $chatbotStore, $$unsubscribe_chatbotStore;
      let $channelsStore, $$unsubscribe_channelsStore;
      let $messagingProviderStore, $$unsubscribe_messagingProviderStore;
      $$unsubscribe_chatbotStore = subscribe(chatbotStore, (value) => $chatbotStore = value);
      $$unsubscribe_channelsStore = subscribe(channelsStore, (value) => $channelsStore = value);
      $$unsubscribe_messagingProviderStore = subscribe(messagingProviderStore, (value) => $messagingProviderStore = value);
      let isDevModeEnabled = false;
      const fetchData = (chatbotId2) => {
        return Promise.all([channelsStore.fetch(chatbotId2), messagingProviderStore.fetch()]);
      };
      chatbotId = ((_a = $chatbotStore.selectedChatbot) == null ? void 0 : _a.id) || 0;
      $$unsubscribe_chatbotStore();
      $$unsubscribe_channelsStore();
      $$unsubscribe_messagingProviderStore();
      return `${$$result.head += `${$$result.title = `<title>WhatsApp Channel</title>`, ""}`, ""}

<div class="${"mb-6 flex flex-col items-start justify-between md:flex-row"}"><h1 class="${"h3"}">WhatsApp Channel</h1>

  <div class="${"flex items-center space-x-3"}">${validate_component(Tooltip, "Tooltip").$$render($$result, { offset: [20, -200] }, {}, {
        content: () => {
          return `<div slot="${"content"}" class="${"w-64"}"><span>El modo desarrollo se saltar\xE1 las validaciones de URL y le permitir\xE1 configurar el <strong class="${"font-semibold"}">localhost</strong> como URL de retorno.
        </span></div>`;
        },
        target: () => {
          return `<label slot="${"target"}" for="${"isDevModeEnabled"}">Enable dev mode
        <div class="${"i-ph:question-duotone"}"></div></label>`;
        }
      })}

    ${validate_component(Switch, "Switch").$$render($$result, {
        id: "isDevModeEnabled",
        checked: isDevModeEnabled,
        class: "switch switch-unchecked"
      }, {}, {
        default: () => {
          return `<span class="${"sr-only"}">Enable dev mode</span>
      <span class="${[
            "toggle",
            " toggle-off"
          ].join(" ").trim()}"></span>`;
        }
      })}</div></div>

${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop2);
          return `
  <p>Waiting...</p>
`;
        }
        return function() {
          return `
  ${validate_component(Form, "Form").$$render($$result, {
            channel: $channelsStore,
            messagingProviders: $messagingProviderStore,
            devModeEnabled: isDevModeEnabled
          }, {}, {})}
`;
        }();
      }(fetchData(chatbotId))}`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports12 = {};
__export(__exports12, {
  css: () => css17,
  entry: () => entry12,
  index: () => index12,
  js: () => js12,
  module: () => index_svelte_exports7
});
var index12, entry12, js12, css17;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_index_svelte7();
    index12 = 6;
    entry12 = "pages/channels/whatsapp/index.svelte-48734eea.js";
    js12 = ["pages/channels/whatsapp/index.svelte-48734eea.js", "chunks/index-5927094f.js", "chunks/Form-d3f19899.js", "chunks/Alert-351cf93d.js", "chunks/TransitionRoot-0d350f17.js", "chunks/index-f4e83c97.js", "chunks/required-1e16da63.js", "chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js", "chunks/chatbot-bca22043.js", "chunks/http-90371e68.js", "chunks/local-storage-4242d675.js", "chunks/messaging-provider-72ae54b2.js", "chunks/resolve-button-type-552c0ea1.js"];
    css17 = ["assets/pages/channels/whatsapp/index.svelte-1ee3fa87.css", "assets/Form-b3b17161.css", "assets/SvelteToast.svelte_svelte_type_style_lang-6697d3be.css"];
  }
});

// .svelte-kit/output/server/entries/pages/integrations/quiron/index.svelte.js
var index_svelte_exports8 = {};
__export(index_svelte_exports8, {
  default: () => Quiron
});
var Quiron;
var init_index_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/integrations/quiron/index.svelte.js"() {
    init_index_2415d7ec();
    Quiron = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Quiron</title>`, ""}`, ""}

<h1 class="${"h3"}">Quiron</h1>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports13 = {};
__export(__exports13, {
  css: () => css18,
  entry: () => entry13,
  index: () => index13,
  js: () => js13,
  module: () => index_svelte_exports8
});
var index13, entry13, js13, css18;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_index_svelte8();
    index13 = 11;
    entry13 = "pages/integrations/quiron/index.svelte-d73ac6b8.js";
    js13 = ["pages/integrations/quiron/index.svelte-d73ac6b8.js", "chunks/index-5927094f.js"];
    css18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/integrations/tempus/index.svelte.js
var index_svelte_exports9 = {};
__export(index_svelte_exports9, {
  default: () => Tempus
});
var Tempus;
var init_index_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/integrations/tempus/index.svelte.js"() {
    init_index_2415d7ec();
    Tempus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `${$$result.title = `<title>Tempus</title>`, ""}`, ""}

<h1 class="${"h3"}">Tempus</h1>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports14 = {};
__export(__exports14, {
  css: () => css19,
  entry: () => entry14,
  index: () => index14,
  js: () => js14,
  module: () => index_svelte_exports9
});
var index14, entry14, js14, css19;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_index_svelte9();
    index14 = 12;
    entry14 = "pages/integrations/tempus/index.svelte-8a95ffa9.js";
    js14 = ["pages/integrations/tempus/index.svelte-8a95ffa9.js", "chunks/index-5927094f.js"];
    css19 = [];
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports15 = {};
__export(__exports15, {
  css: () => css20,
  entry: () => entry15,
  index: () => index15,
  js: () => js15,
  module: () => Form_svelte_exports
});
var index15, entry15, js15, css20;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_Form_svelte();
    index15 = 5;
    entry15 = "pages/channels/whatsapp/Form.svelte-8d5f5d87.js";
    js15 = ["pages/channels/whatsapp/Form.svelte-8d5f5d87.js", "chunks/index-5927094f.js", "chunks/Alert-351cf93d.js", "chunks/Form-d3f19899.js", "chunks/TransitionRoot-0d350f17.js", "chunks/index-f4e83c97.js", "chunks/required-1e16da63.js", "chunks/SvelteToast.svelte_svelte_type_style_lang-9d6e0cc5.js"];
    css20 = ["assets/Form-b3b17161.css", "assets/SvelteToast.svelte_svelte_type_style_lang-6697d3be.css"];
  }
});

// .svelte-kit/output/server/entries/pages/applications/_slug_/chatbots/index@setup.svelte.js
var index_setup_svelte_exports3 = {};
__export(index_setup_svelte_exports3, {
  default: () => Index_setup3
});
var Index_setup3;
var init_index_setup_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/applications/_slug_/chatbots/index@setup.svelte.js"() {
    init_index_2415d7ec();
    init_chatbot_febec0ab();
    init_http_90371e68();
    init_index_b173f350();
    Index_setup3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $chatbotStore, $$unsubscribe_chatbotStore;
      $$unsubscribe_chatbotStore = subscribe(chatbotStore, (value) => $chatbotStore = value);
      $$unsubscribe_chatbotStore();
      return `${$$result.head += `${$$result.title = `<title>Chatbots</title>`, ""}`, ""}

<h1 class="${"h3"}">Chatbots</h1>

${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop2);
          return `
  <p>Waiting...</p>
`;
        }
        return function() {
          return `
  <div class="${"grid grid-cols-1 md:grid-cols-3"}">${each($chatbotStore.chatbots, (chatbot) => {
            return `<div><pre>${escape(JSON.stringify(chatbot, null, 2))}</pre>

        <div class="${"flex items-center mt-4 space-x-2"}"><a href="${"/channels/whatsapp"}" class="${"btn btn-blue"}">Edit </a>

          <button class="${"btn btn-secondary"}" disabled>Delete</button></div>
      </div>`;
          })}</div>
`;
        }();
      }(chatbotStore.fetch())}`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports16 = {};
__export(__exports16, {
  css: () => css21,
  entry: () => entry16,
  index: () => index16,
  js: () => js16,
  module: () => index_setup_svelte_exports3
});
var index16, entry16, js16, css21;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_index_setup_svelte3();
    index16 = 3;
    entry16 = "pages/applications/_slug_/chatbots/index@setup.svelte-780d2e00.js";
    js16 = ["pages/applications/_slug_/chatbots/index@setup.svelte-780d2e00.js", "chunks/index-5927094f.js", "chunks/chatbot-bca22043.js", "chunks/http-90371e68.js", "chunks/local-storage-4242d675.js", "chunks/index-f4e83c97.js"];
    css21 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/sandbox/store.ts.js
var store_ts_exports3 = {};
__export(store_ts_exports3, {
  messagesStore: () => messagesStore
});
function createMessagesStore() {
  const { subscribe: subscribe3, set } = writable2();
  return {
    subscribe: subscribe3,
    async sendMessage(chatbotId, payload) {
      const API_URL = `https://localhost:5001/api/v1/chatbots/${chatbotId}/messages`;
      const response = await http2.post(API_URL, payload);
      set(response.data);
      return response;
    }
  };
}
var messagesStore;
var init_store_ts3 = __esm({
  ".svelte-kit/output/server/entries/endpoints/sandbox/store.ts.js"() {
    init_http_90371e68();
    init_index_b173f350();
    init_index_2415d7ec();
    messagesStore = createMessagesStore();
  }
});

// .svelte-kit/vercel-tmp/serverless.js
var serverless_exports = {};
__export(serverless_exports, {
  default: () => serverless_default
});
module.exports = __toCommonJS(serverless_exports);
init_polyfills();

// node_modules/.pnpm/@sveltejs+kit@1.0.0-next.348_svelte@3.48.0/node_modules/@sveltejs/kit/dist/node.js
var import_stream = require("stream");
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function get_raw_body(req) {
  return new Promise((fulfil, reject) => {
    const h3 = req.headers;
    if (!h3["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h3["content-length"]);
    if (isNaN(length) && h3["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}
async function getRequest(base2, req) {
  let headers = req.headers;
  if (req.httpVersionMajor === 2) {
    headers = Object.assign({}, headers);
    delete headers[":method"];
    delete headers[":path"];
    delete headers[":authority"];
    delete headers[":scheme"];
  }
  return new Request(base2 + req.url, {
    method: req.method,
    headers,
    body: await get_raw_body(req)
  });
}
async function setResponse(res, response) {
  const headers = Object.fromEntries(response.headers);
  if (response.headers.has("set-cookie")) {
    const header = response.headers.get("set-cookie");
    const split = splitCookiesString_1(header);
    headers["set-cookie"] = split;
  }
  res.writeHead(response.status, headers);
  if (response.body instanceof import_stream.Readable) {
    response.body.pipe(res);
  } else {
    if (response.body) {
      res.write(new Uint8Array(await response.arrayBuffer()));
    }
    res.end();
  }
}

// .svelte-kit/output/server/index.js
init_index_2415d7ec();
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key2, value) => key2 in obj ? __defProp2(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components: components2 } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components2 !== void 0)
    $$bindings.components(components2);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  {
    stores.page.set(page2);
  }
  return `


${components2[1] ? `${validate_component(components2[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => {
      return `${components2[2] ? `${validate_component(components2[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => {
          return `${validate_component(components2[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`;
        }
      })}` : `${validate_component(components2[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`;
    }
  })}` : `${validate_component(components2[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
function to_headers(object) {
  const headers = new Headers();
  if (object) {
    for (const key2 in object) {
      const value = object[key2];
      if (!value)
        continue;
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          headers.append(key2, value2);
        });
      } else {
        headers.set(key2, value);
      }
    }
  }
  return headers;
}
function hash(value) {
  let hash2 = 5381;
  let i3 = value.length;
  if (typeof value === "string") {
    while (i3)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i3);
  } else {
    while (i3)
      hash2 = hash2 * 33 ^ value[--i3];
  }
  return (hash2 >>> 0).toString(36);
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key2 in obj) {
    clone2[key2.toLowerCase()] = obj[key2];
  }
  return clone2;
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = params[key2].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function is_pojo(body) {
  if (typeof body !== "object")
    return false;
  if (body) {
    if (body instanceof Uint8Array)
      return false;
    if (body._readableState && typeof body.pipe === "function")
      return false;
    if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream)
      return false;
  }
  return true;
}
function normalize_request_method(event) {
  const method = event.request.method.toLowerCase();
  return method === "delete" ? "del" : method;
}
function error(body) {
  return new Response(body, {
    status: 500
  });
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = /* @__PURE__ */ new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(event, mod) {
  const method = normalize_request_method(event);
  let handler = mod[method];
  if (!handler && method === "head") {
    handler = mod.get;
  }
  if (!handler) {
    const allowed = [];
    for (const method2 in ["get", "post", "put", "patch"]) {
      if (mod[method2])
        allowed.push(method2.toUpperCase());
    }
    if (mod.del)
      allowed.push("DELETE");
    if (mod.get || mod.head)
      allowed.push("HEAD");
    return event.request.headers.get("x-sveltekit-load") ? new Response(void 0, {
      status: 204
    }) : new Response(`${event.request.method} method not allowed`, {
      status: 405,
      headers: {
        allow: allowed.join(", ")
      }
    });
  }
  const response = await handler(event);
  const preface = `Invalid response from route ${event.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  const { status = 200, body = {} } = response;
  const headers = response.headers instanceof Headers ? new Headers(response.headers) : to_headers(response.headers);
  const type = headers.get("content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if (is_pojo(body) && (!type || type.startsWith("application/json"))) {
    headers.set("content-type", "application/json; charset=utf-8");
    normalized_body = JSON.stringify(body);
  } else {
    normalized_body = body;
  }
  if ((typeof normalized_body === "string" || normalized_body instanceof Uint8Array) && !headers.has("etag")) {
    const cache_control = headers.get("cache-control");
    if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
      headers.set("etag", `"${hash(normalized_body)}"`);
    }
  }
  return new Response(method !== "head" ? normalized_body : void 0, {
    status,
    headers
  });
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key2) {
            return walk(thing[key2]);
          });
      }
    }
  }
  walk(value);
  var names = /* @__PURE__ */ new Map();
  Array.from(counts).filter(function(entry17) {
    return entry17[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry17, i3) {
    names.set(entry17[0], getName(i3));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v2, i3) {
          return i3 in thing ? stringify(v2) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key2) {
          return safeKey(key2) + ":" + stringify(thing[key2]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v2, i3) {
            statements_1.push(name + "[" + i3 + "]=" + stringify(v2));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v2) {
            return "add(" + stringify(v2) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k2 = _a[0], v2 = _a[1];
            return "set(" + stringify(k2) + ", " + stringify(v2) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key2) {
            statements_1.push("" + name + safeProp(key2) + "=" + stringify(thing[key2]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escapeUnsafeChars(JSON.stringify(key2));
}
function safeProp(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? "." + key2 : "[" + escapeUnsafeChars(JSON.stringify(key2)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i3 = 0; i3 < str.length; i3 += 1) {
    var char = str.charAt(i3);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i3 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i3];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop3) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i3 = 0; i3 < subscriber_queue.length; i3 += 2) {
            subscriber_queue[i3][0](subscriber_queue[i3 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe3(run3, invalidate = noop3) {
    const subscriber = [run3, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run3(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe3 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var render_json_payload_script_dict = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var render_json_payload_script_regex = new RegExp(`[${Object.keys(render_json_payload_script_dict).join("")}]`, "g");
function render_json_payload_script(attrs, payload) {
  const safe_payload = JSON.stringify(payload).replace(render_json_payload_script_regex, (match2) => render_json_payload_script_dict[match2]);
  let safe_attrs = "";
  for (const [key2, value] of Object.entries(attrs)) {
    if (value === void 0)
      continue;
    safe_attrs += ` sveltekit:data-${key2}=${escape_html_attr(value)}`;
  }
  return `<script type="application/json"${safe_attrs}>${safe_payload}<\/script>`;
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(`[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`, "g");
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match2) => {
    if (match2.length === 2) {
      return match2;
    }
    return escape_html_attr_dict[match2] ?? `&#${match2.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var s2 = JSON.stringify;
function create_prerendering_url_proxy(url2) {
  return new Proxy(url2, {
    get: (target, prop, receiver) => {
      if (prop === "search" || prop === "searchParams") {
        throw new Error(`Cannot access url.${prop} on a page with prerendering enabled`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i3 = 0; i3 < array2.length; i3 += 16) {
    const w2 = array2.subarray(i3, i3 + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w2[i22];
      } else {
        a = w2[i22 + 1 & 15];
        b = w2[i22 + 14 & 15];
        tmp = w2[i22 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w2[i22 & 15] + w2[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i3 = 0; i3 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i3 < 8) {
        init[i3] = frac(prime ** (1 / 2));
      }
      key[i3] = frac(prime ** (1 / 3));
      i3++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i3 = 0; i3 < bytes.length; i3 += 4) {
    const a = bytes[i3 + 0];
    const b = bytes[i3 + 1];
    const c = bytes[i3 + 2];
    const d2 = bytes[i3 + 3];
    bytes[i3 + 0] = d2;
    bytes[i3 + 1] = c;
    bytes[i3 + 2] = b;
    bytes[i3 + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i3;
  for (i3 = 2; i3 < l2; i3 += 3) {
    result += chars[bytes[i3 - 2] >> 2];
    result += chars[(bytes[i3 - 2] & 3) << 4 | bytes[i3 - 1] >> 4];
    result += chars[(bytes[i3 - 1] & 15) << 2 | bytes[i3] >> 6];
    result += chars[bytes[i3] & 63];
  }
  if (i3 === l2 + 1) {
    result += chars[bytes[i3 - 2] >> 2];
    result += chars[(bytes[i3 - 2] & 3) << 4];
    result += "==";
  }
  if (i3 === l2) {
    result += chars[bytes[i3 - 2] >> 2];
    result += chars[(bytes[i3 - 2] & 3) << 4 | bytes[i3 - 1] >> 4];
    result += chars[(bytes[i3 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var csp_ready;
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var Csp = class {
  #use_hashes;
  #dev;
  #script_needs_csp;
  #style_needs_csp;
  #directives;
  #script_src;
  #style_src;
  constructor({ mode, directives }, { dev, prerender, needs_nonce }) {
    this.#use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.#directives = dev ? __spreadValues2({}, directives) : directives;
    this.#dev = dev;
    const d2 = this.#directives;
    if (dev) {
      const effective_style_src2 = d2["style-src"] || d2["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d2["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d2["script-src"] || d2["default-src"];
    const effective_style_src = d2["style-src"] || d2["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    if (this.script_needs_nonce || this.style_needs_nonce || needs_nonce) {
      this.nonce = generate_nonce();
    }
  }
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.nonce}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = __spreadValues2({}, this.#directives);
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var updated = __spreadProps2(__spreadValues2({}, readable(false)), {
  check: () => false
});
async function render_response({
  branch,
  options,
  state,
  $session,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  stuff
}) {
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const stylesheets = new Set(options.manifest._.entry.css);
  const modulepreloads = new Set(options.manifest._.entry.js);
  const styles = /* @__PURE__ */ new Map();
  const serialized_data = [];
  let shadow_props;
  let rendered;
  let is_private = false;
  let cache;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (resolve_opts.ssr) {
    branch.forEach(({ node, props: props2, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => stylesheets.add(url2));
      if (node.js)
        node.js.forEach((url2) => modulepreloads.add(url2));
      if (node.styles)
        Object.entries(node.styles).forEach(([k2, v2]) => styles.set(k2, v2));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (props2)
        shadow_props = props2;
      cache = loaded == null ? void 0 : loaded.cache;
      is_private = (cache == null ? void 0 : cache.private) ?? uses_credentials;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: __spreadProps2(__spreadValues2({}, session), {
          subscribe: (fn) => {
            is_private = (cache == null ? void 0 : cache.private) ?? true;
            return session.subscribe(fn);
          }
        }),
        updated
      },
      page: {
        error: error2,
        params: event.params,
        routeId: event.routeId,
        status,
        stuff,
        url: state.prerendering ? create_prerendering_url_proxy(event.url) : event.url
      },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i3 = 0; i3 < branch.length; i3 += 1) {
      props[`props_${i3}`] = await branch[i3].loaded.props;
    }
    rendered = options.root.render(props);
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let { head, html: body } = rendered;
  const inlined_style = Array.from(styles.values()).join("\n");
  await csp_ready;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering,
    needs_nonce: options.template_contains_nonce
  });
  const target = hash(body);
  const init_app = `
		import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
		start({
			target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode,
			paths: ${s2(options.paths)},
			session: ${try_serialize($session, (error3) => {
    throw new Error(`Failed to serialize session data: ${error3.message}`);
  })},
			route: ${!!page_config.router},
			spa: ${!resolve_opts.ssr},
			trailing_slash: ${s2(options.trailing_slash)},
			hydrate: ${resolve_opts.ssr && page_config.hydrate ? `{
				status: ${status},
				error: ${serialize_error(error2)},
				nodes: [${branch.map(({ node }) => node.index).join(", ")}],
				params: ${devalue(event.params)},
				routeId: ${s2(event.routeId)}
			}` : "null"}
		});
	`;
  const init_service_worker = `
		if ('serviceWorker' in navigator) {
			addEventListener('load', () => {
				navigator.serviceWorker.register('${options.service_worker}');
			});
		}
	`;
  if (inlined_style) {
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(inlined_style);
    head += `
	<style${attributes.join("")}>${inlined_style}</style>`;
  }
  head += Array.from(stylesheets).map((dep) => {
    const attributes = [
      'rel="stylesheet"',
      `href="${options.prefix + dep}"`
    ];
    if (csp.style_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    if (styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    }
    return `
	<link ${attributes.join(" ")}>`;
  }).join("");
  if (page_config.router || page_config.hydrate) {
    head += Array.from(modulepreloads).map((dep) => `
	<link rel="modulepreload" href="${options.prefix + dep}">`).join("");
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
    body += serialized_data.map(({ url: url2, body: body2, response }) => render_json_payload_script({ type: "data", url: url2, body: typeof body2 === "string" ? hash(body2) : void 0 }, response)).join("\n	");
    if (shadow_props) {
      body += render_json_payload_script({ type: "props" }, shadow_props);
    }
  }
  if (options.service_worker) {
    csp.add_script(init_service_worker);
    head += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="max-age=${cache.maxage}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  const html = await resolve_opts.transformPage({
    html: options.template({ head, body, assets: assets2, nonce: csp.nonce })
  });
  const headers = new Headers({
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (cache) {
    headers.set("cache-control", `${is_private ? "private" : "public"}, max-age=${cache.maxage}`);
  }
  if (!options.floc) {
    headers.set("permissions-policy", "interest-cohort=()");
  }
  if (!state.prerendering) {
    const csp_header = csp.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps2(__spreadValues2({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index17 = 0;
  while (index17 < str.length) {
    var eqIdx = str.indexOf("=", index17);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index17);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index17 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index17, eqIdx).trim();
    if (obj[key2] === void 0) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index17 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e2) {
    return str;
  }
}
var setCookie2 = { exports: {} };
var defaultParseOptions2 = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString2(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString2(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString2);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e2) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e2);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parse2(input, options) {
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions2, options) : defaultParseOptions2;
  if (!options.map) {
    return input.filter(isNonEmptyString2).map(function(str) {
      return parseString2(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString2).reduce(function(cookies2, str) {
      var cookie = parseString2(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString2(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie2.exports = parse2;
setCookie2.exports.parse = parse2;
var parseString_1 = setCookie2.exports.parseString = parseString2;
var splitCookiesString_12 = setCookie2.exports.splitCookiesString = splitCookiesString2;
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      throw new Error('"redirect" property returned from load() must be accompanied by a 3xx status code');
    }
    if (typeof loaded.redirect !== "string") {
      throw new Error('"redirect" property returned from load() must be a string');
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      throw new Error('"dependencies" property returned from load() must be of type string[]');
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i3 = 0; i3 < pathparts.length; i3 += 1) {
    const part = pathparts[i3];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
async function load_node({
  event,
  options,
  state,
  route,
  node,
  $session,
  stuff,
  is_error,
  is_leaf,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  const cookies = parse_1(event.request.headers.get("cookie") || "");
  const new_cookies = [];
  let loaded;
  const should_prerender = node.module.prerender ?? options.prerender.default;
  const shadow = is_leaf ? await load_shadow_data(route, event, options, should_prerender) : {};
  if (shadow.cookies) {
    shadow.cookies.forEach((header) => {
      new_cookies.push(parseString_1(header));
    });
  }
  if (shadow.error) {
    loaded = {
      status: shadow.status,
      error: shadow.error
    };
  } else if (shadow.redirect) {
    loaded = {
      status: shadow.status,
      redirect: shadow.redirect
    };
  } else if (module2.load) {
    const load_input = {
      url: state.prerendering ? create_prerendering_url_proxy(event.url) : event.url,
      params: event.params,
      props: shadow.body || {},
      routeId: event.routeId,
      get session() {
        if (node.module.prerender ?? options.prerender.default) {
          throw Error("Attempted to access session from a prerendered page. Session would never be populated.");
        }
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues2({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        for (const [key2, value] of event.request.headers) {
          if (key2 !== "authorization" && key2 !== "cookie" && key2 !== "host" && key2 !== "if-none-match" && !opts.headers.has(key2)) {
            opts.headers.set(key2, value);
          }
        }
        const resolved = resolve(event.url.pathname, requested.split("?")[0]);
        let response;
        let dependency;
        const prefix = options.paths.assets || options.paths.base;
        const filename = decodeURIComponent(resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${event.url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            const authorization = event.request.headers.get("authorization");
            const combined_cookies = __spreadValues2({}, cookies);
            for (const cookie2 of new_cookies) {
              if (!domain_matches(event.url.hostname, cookie2.domain))
                continue;
              if (!path_matches(resolved, cookie2.path))
                continue;
              combined_cookies[cookie2.name] = cookie2.value;
            }
            const cookie = Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
            if (cookie) {
              opts.headers.set("cookie", cookie);
            }
            if (authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          response = await respond(new Request(new URL(requested, event.url).href, __spreadValues2({}, opts)), options, __spreadProps2(__spreadValues2({}, state), {
            initiator: route
          }));
          if (state.prerendering) {
            dependency = { response, body: null };
            state.prerendering.dependencies.set(resolved, dependency);
          }
        } else {
          if (resolved.startsWith("//")) {
            requested = event.url.protocol + requested;
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${event.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            const cookie = event.request.headers.get("cookie");
            if (cookie)
              opts.headers.set("cookie", cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          new_cookies.push(...splitCookiesString_12(set_cookie).map((str) => parseString_1(str)));
        }
        const proxy = new Proxy(response, {
          get(response2, key2, _receiver) {
            async function text() {
              const body = await response2.text();
              const headers = {};
              for (const [key3, value] of response2.headers) {
                if (key3 !== "set-cookie" && key3 !== "etag") {
                  headers[key3] = value;
                }
              }
              if (!opts.body || typeof opts.body === "string") {
                const status_number = Number(response2.status);
                if (isNaN(status_number)) {
                  throw new Error(`response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`);
                }
                fetched.push({
                  url: requested,
                  body: opts.body,
                  response: {
                    status: status_number,
                    statusText: response2.statusText,
                    headers,
                    body
                  }
                });
              }
              if (dependency) {
                dependency.body = body;
              }
              return body;
            }
            if (key2 === "arrayBuffer") {
              return async () => {
                const buffer = await response2.arrayBuffer();
                if (dependency) {
                  dependency.body = new Uint8Array(buffer);
                }
                return buffer;
              };
            }
            if (key2 === "text") {
              return text;
            }
            if (key2 === "json") {
              return async () => {
                return JSON.parse(await text());
              };
            }
            return Reflect.get(response2, key2, response2);
          }
        });
        return proxy;
      },
      stuff: __spreadValues2({}, stuff),
      status: is_error ? status ?? null : null,
      error: is_error ? error2 ?? null : null
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else if (shadow.body) {
    loaded = {
      props: shadow.body
    };
  } else {
    loaded = {};
  }
  if (shadow.body && state.prerendering) {
    const pathname = `${event.url.pathname.replace(/\/$/, "")}/__data.json`;
    const dependency = {
      response: new Response(void 0),
      body: JSON.stringify(shadow.body)
    };
    state.prerendering.dependencies.set(pathname, dependency);
  }
  return {
    node,
    props: shadow.body,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers: new_cookies.map((new_cookie) => {
      const _a = new_cookie, { name, value } = _a, options2 = __objRest(_a, ["name", "value"]);
      return serialize_1(name, value, options2);
    }),
    uses_credentials
  };
}
async function load_shadow_data(route, event, options, prerender) {
  if (!route.shadow)
    return {};
  try {
    const mod = await route.shadow();
    if (prerender && (mod.post || mod.put || mod.del || mod.patch)) {
      throw new Error("Cannot prerender pages that have endpoints with mutative methods");
    }
    const method = normalize_request_method(event);
    const is_get = method === "head" || method === "get";
    const handler = method === "head" ? mod.head || mod.get : mod[method];
    if (!handler && !is_get) {
      return {
        status: 405,
        error: new Error(`${method} method not allowed`)
      };
    }
    const data = {
      status: 200,
      cookies: [],
      body: {}
    };
    if (!is_get) {
      const result = await handler(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      data.status = status;
      add_cookies(data.cookies, headers);
      if (status >= 300 && status < 400) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = body;
    }
    const get2 = method === "head" && mod.head || mod.get;
    if (get2) {
      const result = await get2(event);
      if (result.fallthrough) {
        throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
      }
      const { status, headers, body } = validate_shadow_output(result);
      add_cookies(data.cookies, headers);
      data.status = status;
      if (status >= 400) {
        data.error = new Error("Failed to load data");
        return data;
      }
      if (status >= 300) {
        data.redirect = headers instanceof Headers ? headers.get("location") : headers.location;
        return data;
      }
      data.body = __spreadValues2(__spreadValues2({}, body), data.body);
    }
    return data;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    return {
      status: 500,
      error: error2
    };
  }
}
function add_cookies(target, headers) {
  const cookies = headers["set-cookie"];
  if (cookies) {
    if (Array.isArray(cookies)) {
      target.push(...cookies);
    } else {
      target.push(cookies);
    }
  }
}
function validate_shadow_output(result) {
  const { status = 200, body = {} } = result;
  let headers = result.headers || {};
  if (headers instanceof Headers) {
    if (headers.has("set-cookie")) {
      throw new Error("Endpoint request handler cannot use Headers interface with Set-Cookie headers");
    }
  } else {
    headers = lowercase_keys(headers);
  }
  if (!is_pojo(body)) {
    throw new Error("Body returned from endpoint request handler must be a plain object");
  }
  return { status, headers, body };
}
async function respond_with_error({
  event,
  options,
  state,
  $session,
  status,
  error: error2,
  resolve_opts
}) {
  try {
    const branch = [];
    let stuff = {};
    if (resolve_opts.ssr) {
      const default_layout = await options.manifest._.nodes[0]();
      const default_error = await options.manifest._.nodes[1]();
      const layout_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_layout,
        $session,
        stuff: {},
        is_error: false,
        is_leaf: false
      });
      const error_loaded = await load_node({
        event,
        options,
        state,
        route: null,
        node: default_error,
        $session,
        stuff: layout_loaded ? layout_loaded.stuff : {},
        is_error: true,
        is_leaf: false,
        status,
        error: error2
      });
      branch.push(layout_loaded, error_loaded);
      stuff = error_loaded.stuff;
    }
    return await render_response({
      options,
      state,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff,
      status,
      error: error2,
      branch,
      event,
      resolve_opts
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return new Response(error3.stack, {
      status: 500
    });
  }
}
async function respond$1(opts) {
  const { event, options, state, $session, route, resolve_opts } = opts;
  let nodes;
  if (!resolve_opts.ssr) {
    return await render_response(__spreadProps2(__spreadValues2({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      error: null,
      event,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n2) => n2 == void 0 ? n2 : options.manifest._.nodes[n2]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return await respond_with_error({
      event,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      resolve_opts
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (state.prerendering) {
    const should_prerender = leaf.prerender ?? options.prerender.default;
    if (!should_prerender) {
      return new Response(void 0, {
        status: 204
      });
    }
  }
  let branch = [];
  let status = 200;
  let error2 = null;
  let set_cookie_headers = [];
  let stuff = {};
  ssr: {
    for (let i3 = 0; i3 < nodes.length; i3 += 1) {
      const node = nodes[i3];
      let loaded;
      if (node) {
        try {
          loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
            node,
            stuff,
            is_error: false,
            is_leaf: i3 === nodes.length - 1
          }));
          set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
          if (loaded.loaded.redirect) {
            return with_cookies(new Response(void 0, {
              status: loaded.loaded.status,
              headers: {
                location: loaded.loaded.redirect
              }
            }), set_cookie_headers);
          }
          if (loaded.loaded.error) {
            ({ status, error: error2 } = loaded.loaded);
          }
        } catch (err) {
          const e2 = coalesce_to_error(err);
          options.handle_error(e2, event);
          status = 500;
          error2 = e2;
        }
        if (loaded && !error2) {
          branch.push(loaded);
        }
        if (error2) {
          while (i3--) {
            if (route.b[i3]) {
              const index17 = route.b[i3];
              const error_node = await options.manifest._.nodes[index17]();
              let node_loaded;
              let j2 = i3;
              while (!(node_loaded = branch[j2])) {
                j2 -= 1;
              }
              try {
                const error_loaded = await load_node(__spreadProps2(__spreadValues2({}, opts), {
                  node: error_node,
                  stuff: node_loaded.stuff,
                  is_error: true,
                  is_leaf: false,
                  status,
                  error: error2
                }));
                if (error_loaded.loaded.error) {
                  continue;
                }
                page_config = get_page_config(error_node.module, options);
                branch = branch.slice(0, j2 + 1).concat(error_loaded);
                stuff = __spreadValues2(__spreadValues2({}, node_loaded.stuff), error_loaded.stuff);
                break ssr;
              } catch (err) {
                const e2 = coalesce_to_error(err);
                options.handle_error(e2, event);
                continue;
              }
            }
          }
          return with_cookies(await respond_with_error({
            event,
            options,
            state,
            $session,
            status,
            error: error2,
            resolve_opts
          }), set_cookie_headers);
        }
      }
      if (loaded && loaded.loaded.stuff) {
        stuff = __spreadValues2(__spreadValues2({}, stuff), loaded.loaded.stuff);
      }
    }
  }
  try {
    return with_cookies(await render_response(__spreadProps2(__spreadValues2({}, opts), {
      stuff,
      event,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, event);
    return with_cookies(await respond_with_error(__spreadProps2(__spreadValues2({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs/hooks#handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    set_cookie_headers.forEach((value) => {
      response.headers.append("set-cookie", value);
    });
  }
  return response;
}
async function render_page(event, route, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  if (route.shadow) {
    const type = negotiate(event.request.headers.get("accept") || "text/html", [
      "text/html",
      "application/json"
    ]);
    if (type === "application/json") {
      return render_endpoint(event, await route.shadow());
    }
  }
  const $session = await options.hooks.getSession(event);
  return respond$1({
    event,
    options,
    state,
    $session,
    resolve_opts,
    route
  });
}
function negotiate(accept, types2) {
  const parts = accept.split(",").map((str, i3) => {
    const match2 = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match2) {
      const [, type, subtype, q2 = "1"] = match2;
      return { type, subtype, q: +q2, i: i3 };
    }
    throw new Error(`Invalid Accept header: ${accept}`);
  }).sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types2) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex((part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*"));
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function exec(match2, names, types2, matchers) {
  const params = {};
  for (let i3 = 0; i3 < names.length; i3 += 1) {
    const name = names[i3];
    const type = types2[i3];
    const value = match2[i3 + 1] || "";
    if (type) {
      const matcher = matchers[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
var DATA_SUFFIX = "/__data.json";
var default_transform = ({ html }) => html;
async function respond(request, options, state) {
  var _a, _b, _c, _d;
  let url2 = new URL(request.url);
  const { parameter, allowed } = options.method_override;
  const method_override = (_a = url2.searchParams.get(parameter)) == null ? void 0 : _a.toUpperCase();
  if (method_override) {
    if (request.method === "POST") {
      if (allowed.includes(method_override)) {
        request = new Proxy(request, {
          get: (target, property, _receiver) => {
            if (property === "method")
              return method_override;
            return Reflect.get(target, property, target);
          }
        });
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs/configuration#methodoverride`;
        return new Response(body, {
          status: 400
        });
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  let decoded = decodeURI(url2.pathname);
  let route = null;
  let params = {};
  if (options.paths.base && !((_b = state.prerendering) == null ? void 0 : _b.fallback)) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response(void 0, { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = decoded.endsWith(DATA_SUFFIX);
  if (is_data_request) {
    const data_suffix_length = DATA_SUFFIX.length - (options.trailing_slash === "always" ? 1 : 0);
    decoded = decoded.slice(0, -data_suffix_length) || "/";
    url2 = new URL(url2.origin + url2.pathname.slice(0, -data_suffix_length) + url2.search);
  }
  if (!((_c = state.prerendering) == null ? void 0 : _c.fallback)) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match2 = candidate.pattern.exec(decoded);
      if (!match2)
        continue;
      const matched = exec(match2, candidate.names, candidate.types, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  if (route) {
    if (route.type === "page") {
      const normalized = normalize_path(url2.pathname, options.trailing_slash);
      if (normalized !== url2.pathname && !((_d = state.prerendering) == null ? void 0 : _d.fallback)) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url2.origin + normalized : normalized) + (url2.search === "?" ? "" : url2.search)
          }
        });
      }
    } else if (is_data_request) {
      return new Response(void 0, {
        status: 404
      });
    }
  }
  const event = {
    get clientAddress() {
      if (!state.getClientAddress) {
        throw new Error(`${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`);
      }
      Object.defineProperty(event, "clientAddress", {
        value: state.getClientAddress()
      });
      return event.clientAddress;
    },
    locals: {},
    params,
    platform: state.platform,
    request,
    routeId: route && route.id,
    url: url2
  };
  const removed = (property, replacement, suffix = "") => ({
    get: () => {
      throw new Error(`event.${property} has been replaced by event.${replacement}` + suffix);
    }
  });
  const details = ". See https://github.com/sveltejs/kit/pull/3384 for details";
  const body_getter = {
    get: () => {
      throw new Error("To access the request body use the text/json/arrayBuffer/formData methods, e.g. `body = await request.json()`" + details);
    }
  };
  Object.defineProperties(event, {
    method: removed("method", "request.method", details),
    headers: removed("headers", "request.headers", details),
    origin: removed("origin", "url.origin"),
    path: removed("path", "url.pathname"),
    query: removed("query", "url.searchParams"),
    body: body_getter,
    rawBody: body_getter
  });
  let resolve_opts = {
    ssr: true,
    transformPage: default_transform
  };
  try {
    const response = await options.hooks.handle({
      event,
      resolve: async (event2, opts) => {
        var _a2;
        if (opts) {
          resolve_opts = {
            ssr: opts.ssr !== false,
            transformPage: opts.transformPage || default_transform
          };
        }
        if ((_a2 = state.prerendering) == null ? void 0 : _a2.fallback) {
          return await render_response({
            event: event2,
            options,
            state,
            $session: await options.hooks.getSession(event2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            error: null,
            branch: [],
            resolve_opts: __spreadProps2(__spreadValues2({}, resolve_opts), {
              ssr: false
            })
          });
        }
        if (route) {
          let response2;
          if (is_data_request && route.type === "page" && route.shadow) {
            response2 = await render_endpoint(event2, await route.shadow());
            if (request.headers.has("x-sveltekit-load")) {
              if (response2.status >= 300 && response2.status < 400) {
                const location = response2.headers.get("location");
                if (location) {
                  const headers = new Headers(response2.headers);
                  headers.set("x-sveltekit-location", location);
                  response2 = new Response(void 0, {
                    status: 204,
                    headers
                  });
                }
              }
            }
          } else {
            response2 = route.type === "endpoint" ? await render_endpoint(event2, await route.load()) : await render_page(event2, route, options, state, resolve_opts);
          }
          if (response2) {
            if (response2.status === 200 && response2.headers.has("etag")) {
              let if_none_match_value = request.headers.get("if-none-match");
              if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                if_none_match_value = if_none_match_value.substring(2);
              }
              const etag = response2.headers.get("etag");
              if (if_none_match_value === etag) {
                const headers = new Headers({ etag });
                for (const key2 of [
                  "cache-control",
                  "content-location",
                  "date",
                  "expires",
                  "vary"
                ]) {
                  const value = response2.headers.get(key2);
                  if (value)
                    headers.set(key2, value);
                }
                return new Response(void 0, {
                  status: 304,
                  headers
                });
              }
            }
            return response2;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(event2);
          return await respond_with_error({
            event: event2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${event2.url.pathname}`),
            resolve_opts
          });
        }
        if (state.prerendering) {
          return new Response("not found", { status: 404 });
        }
        return await fetch(request);
      },
      get request() {
        throw new Error("request in handle has been replaced with event" + details);
      }
    });
    if (response && !(response instanceof Response)) {
      throw new Error("handle must return a Response object" + details);
    }
    return response;
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, event);
    try {
      const $session = await options.hooks.getSession(event);
      return await respond_with_error({
        event,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        resolve_opts
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return new Response(options.dev ? error3.stack : error3.message, {
        status: 500
      });
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="utf-8" />\r\n    <meta name="description" content="Kibot configuration" />\r\n    <link rel="icon" href="' + assets2 + '/favicon.png" />\r\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\r\n    ' + head + "\r\n  </head>\r\n  <body>\r\n    " + body + "\r\n  </body>\r\n</html>\r\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, event) => {
        this.options.hooks.handleError({
          error: error2,
          event,
          get request() {
            throw new Error("request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details");
          }
        });
        error2.stack = this.options.get_stack(error2);
      },
      hooks: null,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/immutable/",
      prerender: {
        default: false,
        enabled: true
      },
      read,
      root: Root,
      service_worker: null,
      router: true,
      template,
      template_contains_nonce: false,
      trailing_slash: "never"
    };
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    if (!this.options.hooks) {
      const module2 = await Promise.resolve().then(() => (init_hooks_1c45ba0b(), hooks_1c45ba0b_exports));
      this.options.hooks = {
        getSession: module2.getSession || (() => ({})),
        handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
        handleError: module2.handleError || (({ error: error2 }) => console.error(error2.stack)),
        externalFetch: module2.externalFetch || fetch
      };
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "robots.txt"]),
  mimeTypes: { ".png": "image/png", ".txt": "text/plain" },
  _: {
    entry: { "file": "start-3066ddc3.js", "js": ["start-3066ddc3.js", "chunks/index-5927094f.js", "chunks/index-f4e83c97.js", "chunks/preload-helper-60cab3ee.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13)),
      () => Promise.resolve().then(() => (init__14(), __exports14)),
      () => Promise.resolve().then(() => (init__15(), __exports15)),
      () => Promise.resolve().then(() => (init__16(), __exports16))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "applications@setup",
        pattern: /^\/applications\/?$/,
        names: [],
        types: [],
        path: "/applications",
        shadow: null,
        a: [3, 4],
        b: [1]
      },
      {
        type: "page",
        id: "documentation",
        pattern: /^\/documentation\/?$/,
        names: [],
        types: [],
        path: "/documentation",
        shadow: null,
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        id: "help",
        pattern: /^\/help\/?$/,
        names: [],
        types: [],
        path: "/help",
        shadow: null,
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        id: "integrations",
        pattern: /^\/integrations\/?$/,
        names: [],
        types: [],
        path: "/integrations",
        shadow: null,
        a: [0, 7],
        b: [1]
      },
      {
        type: "page",
        id: "messaging-providers@setup",
        pattern: /^\/messaging-providers\/?$/,
        names: [],
        types: [],
        path: "/messaging-providers",
        shadow: null,
        a: [3, 8],
        b: [1]
      },
      {
        type: "page",
        id: "sandbox",
        pattern: /^\/sandbox\/?$/,
        names: [],
        types: [],
        path: "/sandbox",
        shadow: null,
        a: [0, 9],
        b: [1]
      },
      {
        type: "page",
        id: "templates",
        pattern: /^\/templates\/?$/,
        names: [],
        types: [],
        path: "/templates",
        shadow: null,
        a: [0, 10],
        b: [1]
      },
      {
        type: "endpoint",
        id: "templates/store",
        pattern: /^\/templates\/store\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_store_ts(), store_ts_exports))
      },
      {
        type: "endpoint",
        id: "sandbox/store",
        pattern: /^\/sandbox\/store\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_store_ts3(), store_ts_exports3))
      },
      {
        type: "page",
        id: "channels/whatsapp",
        pattern: /^\/channels\/whatsapp\/?$/,
        names: [],
        types: [],
        path: "/channels/whatsapp",
        shadow: null,
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        id: "integrations/quiron",
        pattern: /^\/integrations\/quiron\/?$/,
        names: [],
        types: [],
        path: "/integrations/quiron",
        shadow: null,
        a: [0, 12],
        b: [1]
      },
      {
        type: "page",
        id: "integrations/tempus",
        pattern: /^\/integrations\/tempus\/?$/,
        names: [],
        types: [],
        path: "/integrations/tempus",
        shadow: null,
        a: [0, 13],
        b: [1]
      },
      {
        type: "endpoint",
        id: "channels/whatsapp/store",
        pattern: /^\/channels\/whatsapp\/store\/?$/,
        names: [],
        types: [],
        load: () => Promise.resolve().then(() => (init_store_ts2(), store_ts_exports2))
      },
      {
        type: "page",
        id: "channels/whatsapp/Form",
        pattern: /^\/channels\/whatsapp\/Form\/?$/,
        names: [],
        types: [],
        path: "/channels/whatsapp/Form",
        shadow: null,
        a: [0, 14],
        b: [1]
      },
      {
        type: "page",
        id: "applications/[slug]/chatbots@setup",
        pattern: /^\/applications\/([^/]+?)\/chatbots\/?$/,
        names: ["slug"],
        types: [null],
        path: null,
        shadow: null,
        a: [3, 15],
        b: [1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/serverless.js
installPolyfills();
var server = new Server(manifest);
var serverless_default = async (req, res) => {
  let request;
  try {
    request = await getRequest(`https://${req.headers.host}`, req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  setResponse(res, await server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
