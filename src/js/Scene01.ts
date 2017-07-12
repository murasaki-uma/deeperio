import "./loaders/MTLLoader.js";
import "./loaders/DDSLoader.js";
import "./loaders/OBJLoader.js";
import "./loaders/FBXLoader.js";
import "./loaders/ColladaLoader.js";
import GUI from "./GUI";
// *********** ひとつめのシーン *********** //
export default class SceneTemplatetransparent{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private geometry:THREE.BoxGeometry;
    private material:THREE.MeshBasicMaterial;
    private cube:THREE.Mesh;
    private uniforms:any[] = [];
    private gui:GUI;
    private pal:any;
    private pal_objects:any[] = [];

    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer,gui:GUI) {
        this.renderer = renderer;
        this.createScene();
        this.gui = gui;

        console.log("scene created!")
    }

    // ******************************************************
    private createScene() {

        this.scene = new THREE.Scene();

        // 立方体のジオメトリーを作成
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        // 緑のマテリアルを作成
        this.material = new THREE.MeshStandardMaterial({
            roughness: 0.7,
            color: 0xffffff,
            bumpScale: 0.002,
            metalness: 0.2
        });
        // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        this.cube = new THREE.Mesh(this.geometry, this.material);
        // メッシュをシーンに追加
        this.scene.add(this.cube);

        let ambient = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambient);

        let dLight = new THREE.DirectionalLight(0xffffff, 0.2);
        dLight.position.set(0, 1, 0).normalize();
        this.scene.add(dLight);

        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0, 0, 1).normalize();
        this.scene.add(directionalLight);


        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function (xhr) {
        };
        // THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
        // var mtlLoader = new THREE.MTLLoader();


        //
        // mtlLoader.setPath('models/pal/');
        // mtlLoader.load('pal_transformed_decimated.mtl', (materials) => {
        //     materials.preload();
        //     var objLoader = new THREE.OBJLoader();
        //     objLoader.setMaterials(materials);
        //     objLoader.setPath('models/pal/');
        //     objLoader.load('pal_transformed_decimated.obj', (object) => {
        //
        //         console.log(object);
        //         this.scene.add(object);
        //
        //     }, onProgress, onError);
        // });

        var loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        for(let i = 0; i < 2; i++)
        {
            loader.load( './models/pal/pal.dae', ( collada )=> {
                var object = collada.scene;
                console.log(object);
                object.position.y = -1;
                object.position.x = 0;

                //object.rotation.y = 0.08 + Math.PI;
                this.pal_objects.push(object);
                this.scene.add( object );
            },onProgress, onError );
        }




        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 1000);
        // カメラ位置を設定
        this.scene.scale.set(1.2, 1, 1);
        this.camera.position.z = 30
    }
    public replaceShader_WireWave=(object:any,isTransparent:number, isWire:Boolean)=>
    {

        // let materials = object.children[0].material.materials;
        let materials = object.children[0].children[0].material.materials;
        console.log(materials);
        for (let i = 0; i < materials.length; i++) {

            //let img = materials[i].map.image.src;//.attributes.currentSrc;
            console.log(materials[i]);
            console.log(materials[i].map);



                console.log(materials[i].map.image);
                let img = materials[i].map.image.currentSrc;
                let _uniforms: any = {
                    time: {value: 1.0},
                    texture: {value: new THREE.TextureLoader().load(img)},
                    transparent: {value: isTransparent},
                    threshold: {value: 0}
                };

                this.uniforms.push(_uniforms);


                // materials[i].wireframe = true;
                materials[i] = new THREE.ShaderMaterial({
                    uniforms: _uniforms,
                    vertexShader: document.getElementById("vertex_pal").textContent,
                    fragmentShader: document.getElementById("fragment_pal").textContent,
                    wireframe: isWire,
                    transparent:true
                });
            }

        return object;
    }


    // ******************************************************
    public keyUp(e:KeyboardEvent)
    {

    }

    public click()
    {
        // for(let i = 0; i < this.pal_objects.length; i++)
        // {
        this.replaceShader_WireWave(this.pal_objects[0],0,true);
        this.replaceShader_WireWave(this.pal_objects[1],1,false);
        // }

    }


    // ******************************************************
    public keyDown(e:KeyboardEvent)
    {

    }


    // ******************************************************
    public mouseMove(e:MouseEvent)
    {

    }

    // ******************************************************
    public onMouseDown(e:MouseEvent)
    {


    }

    // ******************************************************
    public update(time)
    {



        this.cube.position.z = this.gui.parameters.threshold;
        let timerStep:number = 0.01;
        for(let i = 0; i < this.uniforms.length; i++)
        {
            //console.log(this.uniforms[i]);
            this.uniforms[i].time.value += timerStep;
            this.uniforms[i].threshold.value = this.gui.parameters.threshold;

        }


            //this.scene.position.z += 0.1;

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

    }



}
