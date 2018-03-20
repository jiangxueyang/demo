function ForbidScroll(option) {
    option = option || {};
    var forbidScrollWrap = option.forbidScrollWrap || '.forbid-scroll-wrap',
        canScrollWrap = option.canScrollWrap || '.can-scroll-wrap';
    this.canScrollWrap = canScrollWrap;
    this.node1 = document.querySelector(canScrollWrap);
    this.node2 = document.querySelector(forbidScrollWrap);

}
//初始化禁止穿透事件
ForbidScroll.prototype.initForbid = function () {
    var node1 = this.node1,
        node2 = this.node2;
    if(!node1  || !node2 ) return;
    var startY = 0,canScrollWrap = this.canScrollWrap;
    node1.scrollTop = 0;
    var offsetHeight = node1.offsetHeight,
        scrollHeight = node1.scrollHeight;

    node2.addEventListener('touchmove', function (e) {
        var target = e.target;
        if ($(target).parents(canScrollWrap).length === 0 && $(target) != node1) {
            e.preventDefault();
        }
    }, false);
    node1.addEventListener('touchmove', function (e) {
        var changedTouches = e.changedTouches, canMove = false;
        var scrollTop = this.scrollTop;
        if (changedTouches.length > 0) {
            var touch = changedTouches[0] || {};
            var moveY = touch.clientY;
            if (moveY > startY && scrollTop <= 0) {
                canMove = false;
            } else if (moveY < startY && scrollTop + offsetHeight >= scrollHeight) {
                canMove = false;
            }else{
                canMove = true;
            }
            if (!canMove) {
                e.preventDefault();
            }
        }

    }, false);
    node1.addEventListener('touchstart', function (e) {
        var targetTouches = e.targetTouches || [];
        if (targetTouches.length > 0) {
            var touch = targetTouches[0] || {};
            startY = touch.clientY;
        }
    }, false)
}

//

ForbidScroll.prototype.relieveForbid = function () {
    var node1 = this.node1,
        node2 = this.node2;
    if(!node1  || !node2 ) return;
    node1.scrollTop = 0;
    node1.addEventListener('touchstart',null,false);
    node1.addEventListener('touchmove',null,false);
    node2.addEventListener('touchmove',null,false);

}