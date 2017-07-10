"use strict"
declare function require(x: string): any;
import * as $ from "jquery";
import Template from "./template";
import Scene01 from "./Scene01";
import VThree from "./VThree";
import GUI from "./GUI";
// const io = require('socket.io');

class Main
{
    public vthree:VThree;
    public test:Template;
    public scene01:Scene01;
    public socket:any;

    public gui:GUI = new GUI();



    constructor(num:number) {




        // URLのアンカー（#以降の部分）を取得

        $.getJSON("json/vthree.config.json" , (config) => {
            $.getJSON("json/guisetting.json" , (data) => {
                this.vthree = new VThree(1.0, false,config);
                this.scene01 = new Scene01(this.vthree.renderer,this.gui);
                this.vthree.addScene(this.scene01);
                this.vthree.draw();

                this.vthree.isUpdate = true;

                // this.socket = io.connect(); // C02. ソケットへの接続
                // // this.socket.emit("client_to_server", {value : time});
                // // C04. server_to_clientイベント・データを受信する
                // this.socket.on("server_to_client", (data)=>{this.log(data.value)});
                //
                //
                // // this.socket.on("psx", (data)=>{this.log(data.value)});
                //
                // // this.update();
            });
        });
    }



    public  update(time) {
        requestAnimationFrame(this.update.bind(this));
    }

}


window.onload = function() {
//     var urlHash = location.hash;
//
// // URLにアンカーが存在する場合
//     if(urlHash){
//         // アンカーが#osakaかどうかを判断する
//         console.log(urlHash.replace('#',''));
//         const num = Number(urlHash.replace('#',''));
//         const main = new Main(num);
//     }else {
//         location.href = location+'#300';
//     }
//
//     $(".particleNum a").click(function () {
//         location.reload();
//         console.log('click');
//     });



    const main = new Main();

}
