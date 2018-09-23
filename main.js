let $buttons = $('#buttons > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq($images.length - 1).clone(true)


$slides.append($firstCopy)
$slides.prepend($lastCopy)

$slides.css({transform:'translateX(-400px)'})

let current = 0

$('#buttons').on('click', 'button', function(e){
    let $button = $(e.currentTarget)
    let index = $button.index()//index是所处第几个
    $slides.css({transform:`translateX(${- (index+1) *400}px)`})
    if(current === $buttons.length-1 && index === 0){
        $slides.css({transform:`translateX(${-($buttons.length+1)*400}px)`})
          .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${- (index+1) *400}px`}).show()
          })
    }else if(current === 0 && index === $buttons.length-1){
        $slides.css({transform:'translateX(0px)'})
          .one('transitionend', function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${- (index+1) *400}px)`}).show()
          })
    }
    current = index
})

//$buttons.eq(0).on('click', function(){
//    if(current === 2){
//       console.log('说明是最后一个到第一个')
//       $slides.css({transform:'translateX(-1600px)'})
//        .one('transitionend', function(){
//          $slides.hide().offset()
//          $slides.css({transform:'translateX(-400px)'}).show()
//        })
//  }else{
//      $slides.css({transform:'translateX(-400px)'})
//  }
//    current = 0
//})
//$buttons.eq(1).on('click', function(){
//   $slides.css({transform:'translateX(-800px)'})
//   current = 1
//})


//$buttons.eq(2).on('click', function(){
//  if(current === 0){
//      console.log('说明是第一个到最后一个')
//      $slides.css({transform:'translateX(0px)'})
//        .one('transitionend', function(){
//          $slides.hide().offset()
//          $slides.css({transform:'translateX(-1200px)'}).show()
//        })
//  }else{
//      $slides.css({transform:'translateX(-1200px)'})
//  }
//  current = 2
//})