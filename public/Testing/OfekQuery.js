describe('Query selector', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('Should get all of the elements of the same tag', function () {
        var liAmount = $('li').count();

        expect(liAmount).toEqual(7);
    });

    it('should be able find nested elements', function () {
        var eleAmount = $('li #sign-in').count();

        expect(eleAmount).toEqual(1);
    });

    it('should be able find nested class', function () {
        var eleAmount = $('.navbar').count();

        expect(eleAmount).toEqual(1);
    });

    it('should be able find nested classes', function () {
        var eleAmount = $('.navbar .navbar-nav').count();
        expect(eleAmount).toEqual(2);
    });
});

describe('Query addClass', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('Should get all of the elements of the same tag', function () {
        $('#sign-in').addClass("new-class");
        var myElement = document.getElementById("sign-in");
        expect(myElement.getAttribute("class")).toEqual("new-class");
    });

    it('should be able find nested elements', function () {
        $('#sign-up').addClass("second-class");
        var myElement = document.getElementById("sign-up");
        expect(myElement.getAttribute("class")).toEqual("first-class second-class");
    });

    it('should be able find nested classes', function () {
        $(".nav .navbar-nav").addClass("new-class");
        var myTags = document.getElementsByClassName("new-class");
        for (var i = 0 ; i < myTags.length; myTags ++) {
            expect(myTags[i].getAttribute("class")).toEqual("nav navbar-nav new-class") ;
        }
    });
});

describe('Query removeClass', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('should be able find nested elements', function () {
        $('#sign-up').removeClass('first-class');
        var myElement = document.getElementById("sign-up");
        expect(myElement.getAttribute("class")).toEqual("");
    });

    it('should be able find nested classes', function () {
        $(".nav .navbar-nav").removeClass("navbar-nav");
        var myTags = document.getElementsByClassName("new-class");
        for (var i = 0 ; i < myTags.length; myTags ++) {
            expect(myTags[i].getAttribute("class")).toEqual("nav new-class") ;
        }
    });
});

describe('map', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });
    it('should be able find nested classes', function () {
        var map = $(".toMap").map(function (obj) {
            return obj.innerHTML;
        });
        expect(map.length).toBe(3);
        expect(map[0]).toEqual("1");
        expect(map[1]).toEqual("2");
        expect(map[2]).toEqual("3");
    });
});

describe('any', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('all elements passed', function () {
        var any = $(".toMap").any(function (obj) {
            return obj.innerHTML !== "";
        });
        expect(any).toBeTrue;
    });

    it('one element passes', function () {
        var any = $(".toMap").any(function (obj) {
            return obj.innerHTML === "1";
        });
        expect(any).toBeTrue;
    });

    it('multiplication function', function () {
        var any = $(".toMap").any(function (obj) {
            return obj.innerHTML === "1" || obj.innerHTML === "";
        });
        expect(any).toBeTrue;
    });

    it('no element passes', function () {
        var any = $(".toMap").any(function (obj) {
            return obj.innerHTML === "7";
        });
        expect(any).toBeFalse;
    });
});

describe('all', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('all element passes', function () {
        var all = $(".toMap").all(function (obj) {
            return obj.innerHTML === "1" || "2" || "3";
        });

        expect(all).toBeTrue;
    });

    it('some element passes', function () {
        var all = $(".toMap").all(function (obj) {
            return obj.innerHTML === "1";
        });

        expect(all).toBeFalse;
    });
});

describe('filtir', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('one  element passed', function () {
        var filtered = $(".toMap").filter(function (obj) {
            return obj.innerHTML === "1";
        }).count();
        expect(filtered).toEqual(1);
    });

    it('two  element passed', function () {
        var filtered = $(".toMap").filter(function (obj) {
           if (obj.innerHTML === "1" || obj.innerHTML === "2"){
               return true;
           } else {
               return false;
           }
        });
        expect(filtered.count()).toEqual(2);
    });

    it('no  element passed', function () {
        var filtered = $(".toMap").filter(function (obj) {
            return obj.innerHTML === "9";
        });
        expect(filtered.count()).toEqual(0);
    });
});

describe('css', function () {
    beforeEach(function () {
        document.body.innerHTML = __html__['ofeqQueryTestingHtml.html'];
    });

    it('adding style', function () {
        $('#for-css').css("color", "red");
        var result =  document.getElementById("for-css");
        expect(result.style["color"]).toEqual("red");
    });
});


