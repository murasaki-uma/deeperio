"use strict"
declare function require(x: string): any;
import * as $ from "jquery";
import Template from "./template";
import Scene01 from "./Scene01";
import Scene02 from "./Scene02";
import Scene03 from "./Scene03";
import Scene04 from "./Scene04";
import Scene05 from "./Scene05";
import VThree from "./VThree";
import GUI from "./GUI";
import "./loaders/MTLLoader.js";
import "./loaders/DDSLoader.js";
import "./loaders/OBJLoader.js";
import "./loaders/FBXLoader.js";
import "./loaders/ColladaLoader.js";
import "./GPUComputationRenderer.js";
import Scene = THREE.Scene;

class Main
{
    public vthree:VThree;
    public test:Template;
    public scene01:Scene01;
    public scene02:Scene02;
    public scene03:Scene03;
    public scene04:Scene04;
    public scene05:Scene05;
    public socket:any;

    public gui:GUI = new GUI();



    constructor(num:number) {




        // URLのアンカー（#以降の部分）を取得

        $.getJSON("json/vthree.config.json" , (config) => {
            $.getJSON("json/guisetting.json" , (data) => {
                this.vthree = new VThree(1.0, false,config);
                this.scene01 = new Scene01(this.vthree.renderer,this.gui);
                // this.scene02 = new Scene02(this.vthree.renderer,this.gui);
                // this.scene03 = new Scene03(this.vthree.renderer,this.gui);
                // this.scene04 = new Scene04(this.vthree.renderer,this.gui);
                // this.scene05 = new Scene05(this.vthree.renderer,this.gui);

                // this.vthree.addScene(this.scene02);
                // this.vthree.addScene(this.scene04);
                // this.vthree.addScene(this.scene05);
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
