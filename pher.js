var mouseX, mouseY;

var sqr = function(x) {
    return x*x;
};

var s = $(".shark");

var together = new Date();
        together.setFullYear(2012, 5, 8);
        together.setHours(15);
        together.setMinutes(0);
        together.setSeconds(0);
        together.setMilliseconds(0);

$(document).ready(function() {
    var size = {
        width: $(window).width(),
        height: $(window).height()
    };

    $("canvas").attr({width:size.width, height:size.height});

    $(window).resize(function(event){
        size.width = $(window).width();
        size.height = $(window).height();
        $("canvas").attr({width:size.width, height:size.height});
    });

    document.onmousemove = function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    };

    var bubbles = (function() {
        var results = [];
        for (var i = 0; i < 100; i++) {
            results.push({
            x: Math.random() * size.width,
            y: Math.random() * size.height,
            r: Math.random() * 20 + 2,
            dx: 0,
            dy: 0
            });
        }
        return results;
    })(); //IIFE

    var update = function() {
        for (var i = 0; i < bubbles.length; i++) {
            var b = bubbles[i];
            b.x += b.dx;
            b.y -=b.dy;
            if (b.y < -b.r) {
                b.y = size.height + b.r;
            }
            if (b.x < -b.r) {
                b.x = size.width + b.r;
            }
            if (b.x > size.width + b.r) {
             b.x = -b.r;
            }
            b.dx *= 0.8;
            var c = Math.random() + 0.2;
            b.dy = (b.dy - c) * 0.8 + c;

            var lsq = sqr(b.x - mouseX) + sqr(b.y - mouseY);
            if (lsq < 50*50) {
                var l = Math.sqrt(lsq);
                var xr = (b.x - mouseX) / l;
                var yr = (b.y - mouseY) / l;
                b.dx += (50 - l) * xr / 20;
                b.dy -= (50 - l) * yr / 20;
            }
        }
    };

    var paint = function() {
        var ctx = $("canvas")[0].getContext("2d");

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgb(175, 238, 238)';
        ctx.fillRect(0, 0, size.width, size.height);

        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(224, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        for (var i=0; i < bubbles.length; i++) {
            var b = bubbles[i];
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
            ctx.stroke();
        }
    };

    setInterval((function(){update(); paint();}), 20);
    function t() {
        $(".fish1").delay(100).animate({top: "-35%",left: "20%"}, 5e3, "linear", function() {
            $(".fish1").removeAttr("style"), setTimeout(function() {
                t()
            }, 100)
        }),
        $(".fish2").delay(400).animate({left: "-10%"}, 14e3, "linear", function() {
            $(".fish2").removeAttr("style"), setTimeout(function() {
                t()
            }, 100)
        }),
        $(".fish3").delay(800).animate({left: "110%"}, 14e3, "linear", function () {
            $(".fish3").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        }),
        $(".fish4").delay(100).animate({top: "110%", left: "60%"}, 14e3, "linear", function () {
            $(".fish4").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        }),
        $(".dolphin").delay(800).animate({top: "110%", left: "10%"}, 10e3, "linear", function () {
            $(".dolphin").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        }),
        $(".crab").delay(1200).animate({top: "-10%", left: "60%"}, 8e3, "linear", function () {
            $(".crab").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        }),
        $(".octopus").delay(400).animate({top: "110%", left: "110%"}, 16e3, "linear", function () {
            $(".octopus").removeAttr("style"), setTimeout(function() {
                t()
            } ,200)
        }),
        $(".starfish").delay(800).animate({top: "110%", left: "-10%"}, 14e3, "linear", function () {
            $(".starfish").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        }),
        $(".turtle").delay(100).animate({top: "20%", left: "110%"}, 14e3, "linear", function () {
            $(".turtle").removeAttr("style"), setTimeout(function() {
                t()
            } ,100)
        })
    }
    t();
    timeElapse(together);
    setInterval(function () {
        timeElapse(together);
        }, 500);

    $(".lilheart").click(function() {
        $(this).fadeOut();
        $(".heart").fadeIn("slow");
    });

    $(".heart").click(function() {
        $(this).fadeOut("slow");
        $(".lilheart").fadeIn("slow");
    });

});

function getDaysInMonth(month) {
    var data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return data[month];
}

function timeElapse(date, mode) {
    var current = new Date();
    var years = NaN;
    var months = NaN;
    var days = NaN;
    var hours = NaN;
    var minutes = NaN;
    var seconds = NaN;
    seconds = current.getSeconds() - date.getSeconds();
    if (seconds < 0) {
        seconds += 60;
        current.setMinutes(current.getMinutes() - 1);
    }
    minutes = current.getMinutes() - date.getMinutes();
    if (minutes < 0) {
        minutes += 60;
        current.setHours(current.getHours() - 1);
    }
    hours = current.getHours() - date.getHours();
    if (hours < 0) {
        hours += 24;
        current.setDate(current.getDate() - 1);
    }
    if (mode == 1) {
        days = current.getDate() - date.getDate();
        if (days < 0) {
            days += getDaysInMonth(current.getMonth());
            current.setDate(current.getDate() - 1);
        }
        months = current.getMonth() - date.getMonth();
        if (months < 0) {
            months += 12;
            current.setYear(current.getFullYear() - 1);
        }
        years = current.getFullYear() - date.getFullYear();
    } else {
        days = Math.floor((current.getTime() - date.getTime()) / (1000 * 3600 * 24));
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = (years > 0 ? "<span class=\"digit\">" + years + "</span> year ":"")
    result += (months >= 0 ? "<span class=\"digit\">" + months + "</span> month ":"");
    result += "<span class=\"digit\">" + days + "</span> day ";
    result += "<span class=\"digit\">" + hours + "</span> hr "
    result += "<span class=\"digit\">" + minutes + "</span> min "
    result += "<span class=\"digit\">" + seconds + "</span> sec";

    $("#elapseClock").html(result);
}

