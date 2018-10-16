$(document).ready(function () {
    //Date input configuration
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("taskStartDate").setAttribute("min", today);
    document.getElementById("taskEndDate").setAttribute("min", today);

    //Times configuration
    for(var i = 1; i <= 1000; i++) {
        $('#times').append("<option value='"+i+"'>"+i+"</option>")
    }

    //Add tasks on refresh
    var i = 0;
    for (i = 0; i < localStorage.length; i++) {
        var taskID = "task-" + i;
        $('#taskList').append("<li class='task' id='" + taskID + "'>" + localStorage.getItem(taskID) + "</li>");
    }

    //Add task on submit
    $('#taskEntryForm').submit(function () {
        if ($('#taskInput').val() !== "") {
            var taskID = "task-" + i;
            var taskMessage = $('#taskInput').val();
            var taskStartDate = $('#taskStartDate').val() !== "" ? $('#taskStartDate').val(): "(not selected)";
            var taskEndDate = $('#taskEndDate').val() !== "" ? $('#taskEndDate').val(): "(not selected)";
            var repeat = $('#repeat').val !== "Repeat" ? $('#repeat').val(): "(not selected)";
            var times = $('#times').val !== "Times" ? $('#times').val(): "(not selected)";
            var taskItem = "&emsp;" + "&emsp;" + taskMessage + "<br>" +
            "&emsp;" +"&emsp;" + "Start date: " + taskStartDate + "&emsp;" +"&emsp;" + "End date: " + taskEndDate +
            "&emsp;" + "&emsp;" + "Repeat: " + repeat + "&emsp;" + "&emsp;" + "Times: " + times;
            localStorage.setItem(taskID, taskItem);
            $('#taskList').append("<li class='task' id='" + taskID + "'>"+ taskItem + "</li>");
            var task = $('#' + taskID);
            task.hide()
            task.slideDown();
            $('#taskInput').val("");
            i++;
        }
        return false;
    });

    //Remove task
    $('#taskList').on("click", "li", function (event) {
        self = $(this);
        taskID = self.attr('id');
        localStorage.removeItem(taskID);
        self.slideUp('slow', function () {
            self.remove();
        });
    });


    //Action button listeners
    $('#addTask').on("click", function (event) {
       var form = document.getElementById('formContainer');
       var filter = document.getElementById('filterContainer');
       filter.style.display = 'none'
       if(form.style.display == 'block') {
          form.style.display = 'none';
       } else {
          form.style.display = 'block';
       }
    });

    $('#repeat').on("change", function() {
        var repeat = $('#repeat').val();
        var times = $('#times');
        console.log("tere");
        if (repeat === 'one time') {
            times.val("1");
            times.attr("disabled", true);
        } else {
            times.val("Times");
            times.attr("disabled", false);
        }
    });

    $('#filterTasks').on("click", function (event) {
       var form = document.getElementById('formContainer');
       var filter = document.getElementById('filterContainer');
       form.style.display = 'none'
       if(filter.style.display == 'block') {
          filter.style.display = 'none';
       } else {
          filter.style.display = 'block';
       }
    });

    $('.dropdown-menu label').click(function(e) {
	e.stopPropagation();
});


});