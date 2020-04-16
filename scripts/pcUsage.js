const coordinate = [
    [1, 20, 35],
    [1, 20,145],
    [1, 20,255],
    [1, 20,365],
    [0,220,165],
    [0,335,165],
    [0,220,255],
    [0,335,255],
    [0,550,165],
    [0,550,255],
    [0,665,165],
    [0,665,255],
    [0,775,165],
    [0,775,255],
    [1,880,140],
    [1,880,255]
];//rotate,x,y

var sen1 = document.createElement('p');
var sen2 = document.createElement('p');
var sen3 = document.createElement('p');

var imgDeskFlame = new Image();
imgDeskFlame.src = "images/deskFlame.png";

var imgMonitor0 = new Image();
imgMonitor0.src = "images/pcVacantSeat.png";
var imgMonitor1 = new Image();
imgMonitor1.src = "images/pcInUse.png";
var imgMonitor2 = new Image();
imgMonitor2.src = "images/pcUsageProhibited.png";

var imgRotMonitor0 = new Image();
imgRotMonitor0.src = "images/pcVacantSeatRot.png";
var imgRotMonitor1 = new Image();
imgRotMonitor1.src = "images/pcInUseRot.png";
var imgRotMonitor2 = new Image();
imgRotMonitor2.src = "images/pcUsageProhibitedRot.png";

function monitorDraw(context, num, status){
    if(coordinate[num][0] == 0){
        if(status == 0){
            context.drawImage(imgMonitor0, coordinate[num][1], coordinate[num][2], 76, 59);
        }else if(status == 1){
            context.drawImage(imgMonitor1, coordinate[num][1], coordinate[num][2], 76, 59);
        }else{
            context.drawImage(imgMonitor2, coordinate[num][1], coordinate[num][2], 76, 59);
        }
    }else{
        if(status == 0){
            context.drawImage(imgRotMonitor0, coordinate[num][1], coordinate[num][2], 59, 76);
        }else if(status == 1){
            context.drawImage(imgRotMonitor1, coordinate[num][1], coordinate[num][2], 59, 76);
        }else{
            context.drawImage(imgRotMonitor2, coordinate[num][1], coordinate[num][2], 59, 76);
        }
    }
}

function draw(json,success) {
    //描画コンテキストの取得
    var canvas = document.getElementById('pcUsage');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.drawImage(imgDeskFlame, 0, 0, 960, 480);
        var status=json.status;
        for(let i=0; i<16; i++){
            if(status[i] == 0){
                monitorDraw(context,i,0);
            }else if(status[i] == 1){
                monitorDraw(context,i,1);
            }else{
                monitorDraw(context,i,2);
          }
        }
    }
}

function showLibraryUsage(json, success){
    if(success == 1){
        sen1.textContent = "現在の図書館使用人数：" + json['current'] + "人" ;
        document.querySelector('#libraryUsage').appendChild(sen1);
        
        sen2.textContent = "今日の図書館使用人数：" + json['today'] + "人";
        document.querySelector('#libraryUsage').appendChild(sen2);
        
        if(json.current > 60){
            sen3.textContent = "現在、かなり混雑しています。";
            document.querySelector('#libraryUsage').appendChild(sen3);
        }else if(json.current <= 60 && json.current > 30){
            sen3.textContent = "現在、比較的混雑しています";
            document.querySelector('#libraryUsage').appendChild(sen3);
        }else{
            sen3.textContent = "現在、比較的空いています";
            document.querySelector('#libraryUsage').appendChild(sen3);    
        }

    }else{
        sen1.textContent = "現在の図書館使用人数：" + "データが取得できません" ;
        document.querySelector('#libraryUsage').appendChild(sen1);
        
        sen2.textContent = "今日の図書館使用人数：" + "データが取得できません";
        document.querySelector('#libraryUsage').appendChild(sen2);
    }
}

window.onload = function() {
    setInterval(function() {
        $.ajax({ // json読み込み開始
            type: 'GET',
            url: 'https://yueni1024.github.io/data/json/libraryUsage.json',
            dataType: 'json'
        })
        .then(
            function(json) { //jsonの読み込みに成功した時
                showLibraryUsage(json,1);
                draw(json,1);
            },
            function() { //jsonの読み込みに失敗した時
                
            }
        );
    }, 1000);
}
