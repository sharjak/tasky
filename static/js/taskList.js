$(document).ready(function () {
    /*
    //Date input configuration
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("taskStartDate").setAttribute("min", today);
    document.getElementById("taskEndDate").setAttribute("min", today);

    //Times configuration
    for (var i = 1; i <= 1000; i++) {
        $('#times').append("<option value='" + i + "'>" + i + "</option>")
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
            var taskStartDate = $('#taskStartDate').val() !== "" ? $('#taskStartDate').val() : "(not selected)";
            var taskEndDate = $('#taskEndDate').val() !== "" ? $('#taskEndDate').val() : "(not selected)";
            var repeat = $('#repeat').val !== "Repeat" ? $('#repeat').val() : "(not selected)";
            var times = $('#times').val !== "Times" ? $('#times').val() : "(not selected)";
            var taskItem = "&emsp;" + "&emsp;" + taskMessage + "<br>" +
                "&emsp;" + "&emsp;" + "Start date: " + taskStartDate + "&emsp;" + "&emsp;" + "End date: " + taskEndDate +
                "&emsp;" + "&emsp;" + "Repeat: " + repeat + "&emsp;" + "&emsp;" + "Times: " + times;
            localStorage.setItem(taskID, taskItem);
            $('#taskList').append("<li class='task' id='" + taskID + "'>" + taskItem + "</li>");
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
        if (form.style.display == 'block') {
            form.style.display = 'none';
        } else {
            form.style.display = 'block';
        }
    });

    $('#repeat').on("change", function () {
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
        if (filter.style.display == 'block') {
            filter.style.display = 'none';
        } else {
            filter.style.display = 'block';
        }
    });

    $('.dropdown-menu label').click(function (e) {
        e.stopPropagation();
    });
    */
    $(function () {
        $("#sortable").sortable({
            placeholder: "ui-sortable-placeholder"
        });
    });

    // Overall Calendar functions

    !function () {

        var today = moment();

        function Calendar(selector, events) {
            this.el = document.querySelector(selector);
            this.events = events;
            this.current = moment().date(1);
            this.draw();
            var current = document.querySelector('.today');
            if (current) {
                var self = this;
                window.setTimeout(function () {
                    self.openDay(current);
                }, 500);
            }
        }

        Calendar.prototype.draw = function () {
            //Create Header
            this.drawHeader();

            //Draw Month
            this.drawMonth();

            this.drawLegend();
        }

        Calendar.prototype.drawHeader = function () {
            var self = this;
            if (!this.header) {
                //Create the header elements
                this.header = createElement('div', 'header');
                this.header.className = 'header';

                this.title = createElement('h1');

                var right = createElement('div', 'right');
                right.addEventListener('click', function () {
                    self.nextMonth();
                });

                var left = createElement('div', 'left');
                left.addEventListener('click', function () {
                    self.prevMonth();
                });

                //Append the Elements
                this.header.appendChild(this.title);
                this.header.appendChild(right);
                this.header.appendChild(left);
                this.el.appendChild(this.header);
            }

            this.title.innerHTML = this.current.format('MMMM YYYY');
        }

        Calendar.prototype.drawMonth = function () {
            var self = this;

            this.events.forEach(function (ev) {
                ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
            });


            if (this.month) {
                this.oldMonth = this.month;
                this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
                this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                    self.oldMonth.parentNode.removeChild(self.oldMonth);
                    self.month = createElement('div', 'month');
                    self.backFill();
                    self.currentMonth();
                    self.fowardFill();
                    self.el.appendChild(self.month);
                    window.setTimeout(function () {
                        self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                    }, 16);
                });
            } else {
                this.month = createElement('div', 'month');
                this.el.appendChild(this.month);
                this.backFill();
                this.currentMonth();
                this.fowardFill();
                this.month.className = 'month new';
            }
        }

        Calendar.prototype.backFill = function () {
            var clone = this.current.clone();
            var dayOfWeek = clone.day();

            if (!dayOfWeek) {
                return;
            }

            clone.subtract('days', dayOfWeek + 1);

            for (var i = dayOfWeek; i > 0; i--) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.fowardFill = function () {
            var clone = this.current.clone().add('months', 1).subtract('days', 1);
            var dayOfWeek = clone.day();

            if (dayOfWeek === 6) {
                return;
            }

            for (var i = dayOfWeek; i < 6; i++) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.currentMonth = function () {
            var clone = this.current.clone();

            while (clone.month() === this.current.month()) {
                this.drawDay(clone);
                clone.add('days', 1);
            }
        }

        Calendar.prototype.getWeek = function (day) {
            if (!this.week || day.day() === 0) {
                this.week = createElement('div', 'week');
                this.month.appendChild(this.week);
            }
        }

        Calendar.prototype.drawDay = function (day) {
            var self = this;
            this.getWeek(day);

            //Outer Day
            var outer = createElement('div', this.getDayClass(day));
            outer.addEventListener('click', function () {
                self.openDay(this);
            });

            //Day Name
            var name = createElement('div', 'day-name', day.format('ddd'));

            //Day Number
            var number = createElement('div', 'day-number', day.format('DD'));


            //Events
            var events = createElement('div', 'day-events');
            this.drawEvents(day, events);

            outer.appendChild(name);
            outer.appendChild(number);
            outer.appendChild(events);
            this.week.appendChild(outer);
        }

        Calendar.prototype.drawEvents = function (day, element) {
            if (day.month() === this.current.month()) {
                var todaysEvents = this.events.reduce(function (memo, ev) {
                    if (ev.date.isSame(day, 'day')) {
                        memo.push(ev);
                    }
                    return memo;
                }, []);

                todaysEvents.forEach(function (ev) {
                    var evSpan = createElement('span', ev.color);
                    element.appendChild(evSpan);
                });
            }
        }

        Calendar.prototype.getDayClass = function (day) {
            classes = ['day'];
            if (day.month() !== this.current.month()) {
                classes.push('other');
            } else if (today.isSame(day, 'day')) {
                classes.push('today');
            }
            return classes.join(' ');
        }

        Calendar.prototype.openDay = function (el) {
            var details, arrow;
            var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
            var day = this.current.clone().date(dayNumber);

            var currentOpened = document.querySelector('.details');

            //Check to see if there is an open detais box on the current row
            if (currentOpened && currentOpened.parentNode === el.parentNode) {
                details = currentOpened;
                arrow = document.querySelector('.arrow');
            } else {
                //Close the open events on differnt week row
                //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
                if (currentOpened) {
                    currentOpened.addEventListener('webkitAnimationEnd', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('oanimationend', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('msAnimationEnd', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('animationend', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.className = 'details out';
                }

                //Create the Details Container
                details = createElement('div', 'details in');

                //Create the arrow
                var arrow = createElement('div', 'arrow');

                //Create the event wrapper

                details.appendChild(arrow);
                el.parentNode.appendChild(details);
            }

            var todaysEvents = this.events.reduce(function (memo, ev) {
                if (ev.date.isSame(day, 'day')) {
                    memo.push(ev);
                }
                return memo;
            }, []);

            this.renderEvents(todaysEvents, details);

            arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
        }

        Calendar.prototype.renderEvents = function (events, ele) {
            //Remove any events in the current details element
            var currentWrapper = ele.querySelector('.events');
            var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

            events.forEach(function (ev) {
                var div = createElement('div', 'event');
                var square = createElement('div', 'event-category ' + ev.color);
                var span = createElement('span', '', ev.eventName);

                div.appendChild(square);
                div.appendChild(span);
                wrapper.appendChild(div);
            });

            if (!events.length) {
                var div = createElement('div', 'event empty');
                var span = createElement('span', '', 'No Events');

                div.appendChild(span);
                wrapper.appendChild(div);
            }

            if (currentWrapper) {
                currentWrapper.className = 'events out';
                currentWrapper.addEventListener('webkitAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('oanimationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('msAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('animationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
            } else {
                ele.appendChild(wrapper);
            }
            wrapper.appendChild(createElement('input', 'taskInput form-control', 'Create an event')).addEventListener('keypress', function (e) {
                var key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                    console.log(this.value);
                    $.ajax({
                        url: "task/",
                        type: "POST",
                        data: {
                            task: this.value
                        },
                        success: function (result) {
                            $("#sortable li:last-child").after(result);
                        }
                    })
                }
            })
        }

        Calendar.prototype.drawLegend = function () {
            var legend = createElement('div', 'legend');
            var calendars = this.events.map(function (e) {
                return e.calendar + '|' + e.color;
            }).reduce(function (memo, e) {
                if (memo.indexOf(e) === -1) {
                    memo.push(e);
                }
                return memo;
            }, []).forEach(function (e) {
                var parts = e.split('|');
                var entry = createElement('span', 'entry ' + parts[1], parts[0]);
                legend.appendChild(entry);
            });
            this.el.appendChild(legend);
        }

        Calendar.prototype.nextMonth = function () {
            this.current.add('months', 1);
            this.next = true;
            this.draw();
        }

        Calendar.prototype.prevMonth = function () {
            this.current.subtract('months', 1);
            this.next = false;
            this.draw();
        }

        window.Calendar = Calendar;

        function createElement(tagName, className, innerText) {
            var ele = document.createElement(tagName);
            if (className) {
                ele.className = className;
            }
            if (innerText) {
                ele.innderText = ele.textContent = innerText;
            }
            return ele;
        }
    }();

    !function () {
        var data = [
            {eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange'},
            {eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange'},
            {eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange'},
            {eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange'},

            {eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue'},

            {eventName: 'School Play', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow'},

            {eventName: 'Free Tamale Night', calendar: 'Other', color: 'green'},
            {eventName: 'Bowling Team', calendar: 'Other', color: 'green'},
            {eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green'},
            {eventName: 'Startup Weekend', calendar: 'Other', color: 'green'}
        ];


        function addDate(ev) {

        }

        var calendar = new Calendar('#calendar', data);

    }();
    // end of calendar js
});