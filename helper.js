const fetch = require("node-fetch");

const rdapikeys = [
  "7PMDT55R5PSXPH6DGJZOXPUZ7GFZF7V4DONSTDBC7BTKN7DBPEPQ",
  "EGOIKBLZNMJMTUU45DNM3MVYGMYWHSHVR6UM3ZXPGJ5VHG2SK34A",
  "3KZU5DA2SP22HSQUZRVI57KPJHYPEXEGJTDVPLVQH5LL4ZWKV3KQ",
  "VNP66JOS4BBAPKUFX5PIWFGTT3H5YYNECBMM6K2C6GCASPA5PPZA"
];
const rdapikey = rdapikeys[Math.floor(Math.random() * rdapikeys.length)];
// const rdapikey = "7GOGYHM4CD2BO4IHZAVGNPEDHE6NAMUIJXU7XHLFHEUM7W6TIDOQ";

let headers = {
  Authorization: `Bearer ${rdapikey}`,
};

let checkTorrentFileinRD = async (hash = "") => {
  let url = `https://api.real-debrid.com/rest/1.0/torrents/instantAvailability/${hash}`;
  try {
    let res = await fetch(url, { method: "GET", headers });
    if (res.statusText != "OK") return null;
    let resJson = await res.json();
    return resJson;
  } catch (error) {
    return null;
  }
};

let addTorrentFileinRD = async (magnet = "") => {
  let url = `https://api.real-debrid.com/rest/1.0/torrents/addMagnet`;
  let form = new URLSearchParams();
  form.append("magnet", magnet);
  try {
    let res = await fetch(url, { method: "POST", headers, body: form });
    let resJson = await res.json();
    return resJson;
  } catch (error) {
    return {};
  }
};

let getTorrentInfofromRD = async (id = "") => {
  if (!id) return null;

  let url = `https://api.real-debrid.com/rest/1.0/torrents/info/${id}`;
  try {
    let res = await fetch(url, { method: "GET", headers });
    if (res.statusText != "OK") return null;
    let resJson = await res.json();
    return resJson;
  } catch (error) {
    return null;
  }
};

let selectFilefromRD = async (id = "", files = "all") => {
  if (!id) return false;
  let url = `https://api.real-debrid.com/rest/1.0/torrents/selectFiles/${id}`;
  try {
    let form = new URLSearchParams();
    form.append("files", files);
    let res = await fetch(url, { method: "POST", headers, body: form });
    if (res.status < 400) return true;
    return false;
  } catch (error) {
    console.log({ add: error });
    return false;
  }
};

let unrestrictLinkfromRD = async (link = "") => {
  if (!link) return {};
  let url = `https://api.real-debrid.com/rest/1.0/unrestrict/link`;
  try {
    let form = new URLSearchParams();
    form.append("link", link);
    let res = await fetch(url, { method: "POST", headers, body: form });
    if (res.statusText == "OK") return await res.json();
    return {};
  } catch (error) {
    return {};
  }
};

let removeDuplicate = (data = [], key = "name") => {
  let response = [];
  data.forEach((one, i) => {
    let index_ = response.findIndex((el) => el[key] == one[key]);
    index_ == -1 ? response.push(one) : null;
  });
  return response;
};

module.exports = {
  rdapikey,
  checkTorrentFileinRD,
  addTorrentFileinRD,
  getTorrentInfofromRD,
  selectFilefromRD,
  unrestrictLinkfromRD,
  removeDuplicate,
};
