/**
 * table的一些公共方法
 */
const tableMixin = {
  data() {
    return {};
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return 'color-row';
      }
      return '';
    },
    getRowClass({ rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:rgb(0, 0, 0)';
      }
    },
  },
};
export default tableMixin;
