/**
 * Created by uma92 on 2017/07/16.
 */
import GUI from "./GUI";
import white = THREE.ColorKeywords.white;
import VThree from "./VThree";
// *********** ひとつめのシーン *********** //
class WireBox{
    constructor()
    {
        let material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors });

        let geometery = new THREE.Geometry();

        geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,0.5));
        geometery.vertices.push(new THREE.Vector3(0.5,-0.5,0.5));
        geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,-0.5));
        geometery.vertices.push(new THREE.Vector3(0.5,-0.5,-0.5));

        let line = new THREE.Line(geometery);




    }
}
export default class Scene02{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private geometry:THREE.BoxGeometry;
    private material:THREE.MeshBasicMaterial;
    private cube:THREE.Mesh;
    private pariking_materials:THREE.Material[] = [];
    private clickCount = 0;
    private uniforms:any[] = [];
    private parking:any;
    private gui:GUI;
    private vthree;
    private vglitchValue:number = 0.6;
    private sceneZ:number = 0.0;

    private isGlitch01:boolean = false;
    private isGlitch02:boolean = false;

    private isAnimationStart:boolean = false;

    private isDebug68:boolean = false;
    private isDebug69:boolean = false;
    private isDebug70:boolean = false;
    private isDebug71:boolean = false;


    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer,gui:GUI, vthree:VThree) {
        this.renderer = renderer;
        this.gui = gui;
        this.vthree = vthree;
        this.createScene();

        console.log("scene created!")
    }

    // ******************************************************
    private createScene()
    {

        let x,y,z;
        let _r = Math.random();
        if(_r < 1.0)
        {
            x = 1.0;
            y = 0;
            z = 0;

            if(_r < 0.5)
            {
                x = -1.0;
                y = 0.0;
                z = 0;

            }
        }

        for(let i = 0; i < 2; i++)
        {
            this.uniforms.push(  {
                time: {value: 1.0},
                texture: {value: null},
                isDisplay:{value:true},
                glitchVec:{value: new THREE.Vector3(x,y,z).normalize()},
                glitchDist:{value: 0.0},
                vGlitchArea:{value: 0.0},
                animationNum:{value:1}
            });
        }

        // console.log(this.uniforms);
        this.scene = new THREE.Scene();

        // 立方体のジオメトリーを作成
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // 緑のマテリアルを作成
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        this.cube = new THREE.Mesh( this.geometry, this.material );
        // メッシュをシーンに追加
        // this.scene.add( this.cube );

        this.scene.add(new THREE.AmbientLight(0xffffff,0.5));

        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.camera.position.z = 5;



        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        // for(let i = 0; i < 2; i++)
        // {
        loader.load( './models/parking/parking.dae', ( collada )=> {
            var object = collada.scene;

            object.rotation.y = Math.PI;
            console.log(object);
            this.parking = object;
//

            // console.log(this.pariking_materials);


            this.scene.add( object );
        });

        this.createWireBox();



    }


    public createWireBox()
    {

        let object = new THREE.Object3D();
        let line_geometery = new THREE.Geometry();
        let line_material = new THREE.LineBasicMaterial({color:0xffffff});
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,-0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,-0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,0.5));
        object.add(new THREE.Line(line_geometery,line_material));


        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,0.5));
        object.add(new THREE.Line(line_geometery,line_material));


        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,0.5));
        object.add(new THREE.Line(line_geometery,line_material));

        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(0.5,-0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,0.5,0.5));
        object.add(new THREE.Line(line_geometery,line_material));

        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(0.5,-0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(0.5,0.5,-0.5));
        object.add(new THREE.Line(line_geometery,line_material));

        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,-0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,-0.5));
        object.add(new THREE.Line(line_geometery,line_material));

        line_geometery = new THREE.Geometry();
        line_geometery.vertices.push(new THREE.Vector3(-0.5,-0.5,0.5));
        line_geometery.vertices.push(new THREE.Vector3(-0.5,0.5,0.5));
        object.add(new THREE.Line(line_geometery,line_material));

        let scale = 8;
        object.scale.set(scale*1.1,scale,scale*1.1);
        object.position.y = 2.6;
        object.position.z = 0.7;

        this.scene.add(object);
    }

    public replaceShader()
    {
        console.log(this.parking.children[0].children[0].material);

        this.pariking_materials.push(this.parking.children[0].children[0].material);
        // this.pariking_materials.push(this.parking.parent.children);
        // console.log(this.pariking_materials[.map.image.src);
        let img = this.pariking_materials[0].map.image.src;
        let _imgs:string[] = [];
        _imgs.push(img);
        // img = this.parking[1].map.src;
        // _imgs.push(img);


        // for(let i = 0; i < this.pariking_materials.length; i++)
        // {
        this.uniforms[0].texture.value = new THREE.TextureLoader().load(_imgs[0]);
        this.parking.children[0].children[0].material = new THREE.ShaderMaterial({
            uniforms: this.uniforms[0],
            vertexShader: document.getElementById("vertex_parking").textContent,
            fragmentShader: document.getElementById("fragment_parking").textContent,
            wireframe: false,
            transparent:true,
            side:THREE.DoubleSide,
            linewidth:4
            // drawBuffer:true
        });

    }


    // ******************************************************
    public click()
    {
        // console.log(this.pariking_materials);
        // if(this.clickCount == 0)
        // {
        //
        //     let img = this.pariking_materials.map.image.currentSrc;
        //
        //     this.uniforms.texture.value = new THREE.TextureLoader().load(img);
        //
        //     this.pariking_materials = new THREE.ShaderMaterial({
        //         uniforms: this.uniforms,
        //         vertexShader: document.getElementById("vertex_pal").textContent,
        //         fragmentShader: document.getElementById("fragment_pal").textContent,
        //         wireframe: true,
        //         transparent:true,
        //         side:THREE.DoubleSide
        //         // drawBuffer:true
        //     });
        //     this.clickCount++;
        // }




        // this.parking.children[0].children[0].material.wireframe = true;





        // this.parking.children[0].children[0].material = new THREE.MeshBasicMaterial({color:0xffffff});



        //     this.pariking_materials.wireframe = !this.pariking_materials.wireframe;


    }

    // ******************************************************
    public keyUp(e:KeyboardEvent)
    {

        // if(e.key == "w")
        // {
        //     this.parking.children[0].children[0].material.wireframe = !this.parking.children[0].children[0].material.wireframe;
        // }




        // if(e.key == "d")
        // {
        //     for(let i = 0; i < this.uniforms.length; i++)
        //     {
        //
        //         let num = this.uniforms[i].animationNum.value;
        //         console.log(num);
        //         this.uniforms[i].animationNum.value = (num+1)%4;
        //     }
        // }

    }

    // ******************************************************
    public mouseMove(e:MouseEvent)
    {

    }

    // ******************************************************
    public keyDown(e:KeyboardEvent)
    {

        if(e.key == "R")
        {
            this.replaceShader();
        }

        if(e.key == "s")
        {
            this.isAnimationStart = true;
        }

        if(e.key == "r")
        {
            this.reset();
        }


        if(e.key == "z")
        {
            this.isDebug68 = true;
            this.isDebug69 = false;
            this.isDebug70 = false;
            this.isDebug71 = false;
        }

        if(e.key == "x")
        {
            this.isDebug68 = false;
            this.isDebug69 = true;
            this.isDebug70 = false
            this.isDebug71 = false;

        }
        if(e.key == "c")
        {
            this.isDebug68 = false;
            this.isDebug69 = false;
            this.isDebug70 = true;
            this.isDebug71 = false;
        }

        if(e.key == "v")
        {
            this.isDebug68 = false;
            this.isDebug69 = false;
            this.isDebug70 = false;
            this.isDebug71 = true;
        }


    }

    // ******************************************************
    public onMouseDown(e:MouseEvent)
    {


    }

    public reset()
    {
        this.sceneZ = 0.0;
        this.scene.position.set(0,-2,this.sceneZ);
        this.uniforms[0].time.value =0;
        this.uniforms[0].vGlitchArea.value = 0;
        this.parking.children[0].children[0].material.wireframe = false;
        this.vglitchValue = 0.6;
        this.isGlitch01 = false;
        this.isGlitch02 = false;
        this.isAnimationStart = false;
        this.scene.rotation.setFromVector3(new THREE.Vector3(0,0,0));
        this.isDebug68 = false;
        this.isDebug69 = false;
        this.isDebug70 = false;
        this.isDebug71 = false;
    }

    // ******************************************************


    public update(time)
    {


        // let _t = this.uniforms[0].time.value % (Math.PI/2.0);
        // let p = this.scene.position;
        // p.z = -_t * 5.0;
        // this.scene.position.set(p.x,p.y,p.z);

        for(let i =0; i < this.uniforms.length; i++)
        {
            this.uniforms[i].time.value += 0.01;
            // this.uniforms[i].vGlitchArea.value = this.gui.parameters.parking_vGlitchArea;// * (Math.PI/2.0-_t);
        }


        if(this.isAnimationStart)
        {
            this.sceneZ += (-8.0 - this.sceneZ) * 0.15;
            this.scene.position.set(0,-2,this.sceneZ);
        }






        if(this.vthree.oscValue[1] == 68 || this.isDebug68)
        {
            // for(let i =0; i < this.uniforms.length; i++)
            // {
                this.uniforms[0].vGlitchArea.value = 0.3;
            // }
            // this.scene.position.set(0,-0.5,-4.0);
        }

        if(this.vthree.oscValue[1] == 69 || this.isDebug69)
        {
            // for(let i =0; i < this.uniforms.length; i++)
            // {
                this.uniforms[0].vGlitchArea.value = this.vglitchValue;

                // this.scene.position.set(0,-1,-9.0);
            // }
            this.parking.children[0].children[0].material.wireframe = true;
        }

        if(this.vthree.oscValue[1] == 70 || this.isDebug70)
        {
            // for(let i =0; i < this.uniforms.length; i++)
            // {
           this.isGlitch01 = true;
        }


        if(this.isGlitch01)
        {
            if(this.vglitchValue > 0.01)
            {
                this.vglitchValue -= 0.003;
            }
            this.uniforms[0].vGlitchArea.value = this.vglitchValue;

            // this.scene.position.set(0,-1,-9.0);
            // }
            this.parking.children[0].children[0].material.wireframe = true;
        }

        if(this.vthree.oscValue[1] == 71 || this.isDebug71)
        {
            this.isGlitch01 = false;
            this.isGlitch02 = true;
        }

        if(this.isGlitch02)
        {
            this.vglitchValue *= 1.022;
            console.log(this.vglitchValue);
            this.uniforms[0].vGlitchArea.value = this.vglitchValue;
            // this.scene.position.set(0,-1,-9.0);
            this.parking.children[0].children[0].material.wireframe = true;
        }

        this.scene.rotateY(0.01);
        this.scene.rotateX(0.005);


    }



}
