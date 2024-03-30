const { md, pt } = require('../helper');
const { LIMITS } = require("../limits");

class HelperBlocks {

  static paginateBlocks(formId, blocks, config = {}) {

    let {
      paginate = false,
      currPage = 1,
      maxItems = 90
    } = config;

    if (!paginate) {
      return blocks.slice(0, 90)
    }

    (!currPage || typeof currPage !== "number") && (currPage = 1);
    (!maxItems || typeof maxItems !== "number") && (maxItems = 90);

    if (maxItems && (maxItems >= 100 || maxItems <= 1)) {
      maxItems = 90
    }

    let totalPages = Math.ceil(blocks.length / maxItems);
    let overflow = (blocks.length > maxItems);

    blocks = blocks.slice((currPage - 1) * maxItems, (maxItems * currPage));

    // const paginationBlocks = { type: "actions", elements: [] };
    const paginationBlocks = [];


    if (overflow) {

      if (currPage !== 1 && totalPages > currPage) {
        paginationBlocks.push({
          type: "button",
          text: pt("< Previous"),
          value: JSON.stringify({ totalPages, overflow, currPage, maxItems }),
          action_id: `${formId}::previous-page::actionId`
        })
      }

      paginationBlocks.push({
        type: "button",
        text: pt("Next >"),
        value: JSON.stringify({ totalPages, overflow, currPage, maxItems }),
        action_id: `${formId}::next-page::actionId`
      });

    }

    if (paginationBlocks.length) {
      blocks.push({
        type: "actions",
        elements: paginationBlocks
      })
    }

    return blocks;
  }

}

module.exports = { HelperBlocks };
