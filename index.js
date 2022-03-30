// Docs: https://animechan.vercel.app/guide

module.exports = class AnimeChanService {
  filter = {
    title: "naruto",
    page: 0,
  };

  httpClient;

  constructor(axiosClient, filterOptions = {}) {
    this.httpClient = axiosClient;
    this.filter = { ...this.filter, ...filterOptions };
  }

  buildFilterParams(filterParams) {
    let params = { ...this.filter, filterParams };

    Object.keys(params).forEach((key) => {
      if (params[key] === null) {
        delete params[key];
      }
    });

    return new URLSearchParams(params).toString();
  }

  getQuotes(filterParams) {
    const filterParams = this.buildFilterParams(filterParams);

    return this.httpClient.get(
      `https://animechan.vercel.app/api/quotes/anime${
        filterParams ? "?" + filterParams : ""
      }`
    );
  }
};
