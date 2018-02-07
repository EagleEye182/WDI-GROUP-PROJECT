angular
  .module('cocktailApp')
  .directive('uploadImage', uploadImage);

uploadImage.$inject = ['filepickerService'];
function uploadImage(filepickerService) {
  return {
    restric: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.bind('click', (e) => {
        e.preventDefault();

        filepickerService
          .pick({ mimetype: 'image/*' }, data => { //type of file you want to upload (this one is only for images)
            model.$setViewValue(data.url);
          });
      });
    }
  };
}
