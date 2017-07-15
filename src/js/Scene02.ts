/**
 * Created by uma92 on 2017/07/16.
 */
import GUI from "./GUI";
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
export default class SceneTemplate{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private geometry:THREE.BoxGeometry;
    private material:THREE.MeshBasicMaterial;
    private cube:THREE.Mesh;
    private pariking_materials:THREE.Material;
    private clickCount = 0;
    private uniforms:any;


    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer,gui:GUI) {
        this.renderer = renderer;
        this.createScene();

        console.log("scene created!")
    }

    // ******************************************************
    private createScene()
    {

        this.uniforms ={
            time: {value: 1.0},
            texture: {value: null},
            transparent: {value: 0},
            threshold: {value: 0},
            texturePosition: {value:null}
          };
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
            console.log(object);
            // object.position.y = -1;
            // object.position.x = 0;

            object.rotation.y = Math.PI;
            // this.pal_objects.push(object);
            console.log("parking");
            console.log(object);
            this.pariking_materials = object.children[0].children[0].material;
            console.log(this.pariking_materials);
            // this.pariking_materials.side = THREE.DoubleSide;

            this.scene.add( object );
        });
        // }





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


    // ******************************************************
    public click()
    {
        console.log(this.pariking_materials);
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
            this.pariking_materials.wireframe = !this.pariking_materials.wireframe;


    }

    // ******************************************************
    public keyUp(e:KeyboardEvent)
    {

    }

    // ******************************************************
    public mouseMove(e:MouseEvent)
    {

    }

    // ******************************************************
    public keyDown(e:KeyboardEvent)
    {

    }

    // ******************************************************
    public onMouseDown(e:MouseEvent)
    {


    }

    // ******************************************************
    public update(time)
    {

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

        this.uniforms.time.value += 0.01;

        this.scene.rotateY(0.01);
        this.scene.rotateX(0.005);

    }



}
