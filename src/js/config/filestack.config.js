angular
  .module('cocktailApp')
  .config(FileStack);

FileStack.$inject = ['filepickerProvider'];
function FileStack(filepickerProvider) {
  filepickerProvider.setKey('AhMrsMrvWRAiwxuYHUWxBz');
}
