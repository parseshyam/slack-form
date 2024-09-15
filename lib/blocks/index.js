const { HelperBlocks } = require("./helper.blocks");
const { SlackInputBlocks } = require("./input.blocks");
const { SlackSectionBlocks } = require("./section.blocks");

class SlackBlocks {

  constructor(data) {
    this.formBlock = data.formBlock;
    this.sectionBlocks = new SlackSectionBlocks(data);
    this.inputBlocks = new SlackInputBlocks(data);
    this.blockType = this.formBlock.section ? this.sectionBlocks : this.inputBlocks;
  }

  // type section
  buttonBlock() {
    return this.sectionBlocks.buttonBlock();
  }

  // type input
  textInputBlock() {
    return this.inputBlocks.textInputBlock();
  }

  // type context | header | section
  textBlock() {
    return this.sectionBlocks.textBlock();
  }

  // type input | section
  selectBlock({ optionValues }) {
    return this.blockType.selectBlock({ optionValues });
  }

  // type input | section
  userSelectBlock() {
    return this.blockType.userSelectBlock();
  }

  // type input | section
  channelSelectBlock() {
    return this.blockType.channelSelectBlock();
  }

  // type input | section
  radioBlock({ optionValues }) {
    return this.blockType.radioBlock({ optionValues });
  }

  // type input | section
  checkboxBlock({ optionValues }) {
    return this.blockType.checkboxBlock({ optionValues });
  }

  // type input | section
  timePickerBlock() {
    return this.blockType.timePickerBlock();
  }

  // type input | section
  datePickerBlock() {
    return this.blockType.datePickerBlock();
  }

  // type input
  dateTimePickerBlock() {
    return this.inputBlocks.dateTimePickerBlock();
  }


  static create(data) {
    return new SlackBlocks(data);
  }

}

module.exports = {
  HelperBlocks,
  SlackBlocks
};