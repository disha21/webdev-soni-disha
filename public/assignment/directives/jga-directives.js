/**
 * Created by dishasoni on 11/5/16.
 */

(function () {
    angular
        .module("Directives",[])
        .directive("sortable",sortable );

    function sortable () {
        console.log("hello from sortable");

        function linker(scope,element,attributes) {
            var start = -1;
            var end = -1;

            element
                .sortable({
                    start:function (event,ui) {
                     start = ($(ui.item).index());
                    },
                    stop:function (event,ui) {
                     end = ($(ui.item).index());
                        scope.SortableController.sort(start,end);
                    }

            });
        }
        return{
            scope:{},
            link:linker,
            controller: SortableController,
            controllerAs:'SortableController'
        }

    }

    function SortableController(WidgetService) {
       var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            console.log([start,end]);
            WidgetService.sort(start,end);

        }
    }
})();
