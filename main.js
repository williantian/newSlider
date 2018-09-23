let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()

$slides.css({transform:'translateX(-400px)'}).css({transition:'none'})
//transition:'none' 解决打开页面的瞬间会有最后一张到第一张的BUG

bindEvents()

$(next).on('click',function(){
    goToSlide(current+1)
})
$(previous).on('click',function(){
    goToSlide(current-1)
})

//设置自动轮播
let timer = setInterval(function(){
    goToSlide(current+1)
},2000)

//设置鼠标悬停离走
$('.container').on('mouseenter', function(){
    window.clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){
        goToSlide(current+1)
    },2000)
})

////下方为函数
function bindEvents(){
    $('#buttonWrapper').on('click', 'button', function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()//index是所处第几个
        goToSlide(index)
    })
}
function makeFakeSlides(){
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}
//重要函数
function goToSlide(index){
    if(index > $buttons.length-1){
        index = 0
    }else if(index < 0){
        index = $buttons.length - 1
    }    
    if(current === $buttons.length-1 && index === 0){
        $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`})
          .one('transitionend', function(){
            $slides.hide().offset()//加上offsethide不会被show覆盖掉
            $slides.css({transform:`translateX(${- (index+1) *400}px`}).show()
          })
    }else if(current === 0 && index === $buttons.length-1){
        $slides.css({transform:'translateX(0px)'})
          .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${- (index+1) *400}px)`}).show()
          })
    }else{
        $slides.css({transform:`translateX(${- (index+1) *400}px)`})
    }
    current = index
}