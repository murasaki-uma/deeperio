import "./loaders/MTLLoader.js";
import "./loaders/DDSLoader.js";
import "./loaders/OBJLoader.js";
// *********** ひとつめのシーン *********** //
export default class SceneTemplate{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private geometry:THREE.BoxGeometry;
    private material:THREE.MeshBasicMaterial;
    private cube:THREE.Mesh;
    private uniforms:any[] = [];

    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer) {
        this.renderer = renderer;
        this.createScene();

        console.log("scene created!")
    }

    // ******************************************************
    private createScene()
    {

        this.scene = new THREE.Scene();

        // // 立方体のジオメトリーを作成
        // this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // // 緑のマテリアルを作成
        // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        // this.cube = new THREE.Mesh( this.geometry, this.material );
        // // メッシュをシーンに追加
        // this.scene.add( this.cube );

        let ambient = new THREE.AmbientLight(0xffffff);
        this.scene.add(ambient);

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 0, 0, 1 ).normalize();
        this.scene.add( directionalLight );


        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };
        var onError = function ( xhr ) { };
        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( 'models/pal/' );
        mtlLoader.load( 'pal_transformed.mtl', ( materials )=> {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( 'models/pal/' );
            objLoader.load( 'pal_transformed.obj', ( object )=> {
                object.position.y = -1;
                object.position.x = 0;
                object.rotation.y = 0.08+Math.PI;
                console.log(object);
                this.scene.add( object );
                let materials = object.children[0].material.materials;
                for(let i = 0; i < materials.length; i++)
                {

                    let img = materials[i].map.image.src;//.attributes.currentSrc;
                    let _uniforms:any = {
                        time:       { value: 1.0 },
                        texture:    { value: new THREE.TextureLoader().load( img ) }
                    };
                    this.uniforms.push(_uniforms);
                    // console.log(img);
                    // console.log(materials[i]);

                    materials[i].wireframe = true;

                   materials[i] = new THREE.ShaderMaterial({
                       uniforms:_uniforms,
                       vertexShader: document.getElementById("vertex_pal").textContent,
                       fragmentShader: document.getElementById("fragment_pal").textContent,
                       //wireframe:true
                   });
                }
            }, onProgress, onError );
        });


        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 105, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.scene.scale.set(1.2,1,1);
        this.camera.position.z = 50;


    }


    // ******************************************************
    public click()
    {

    }

    // ******************************************************
    public keyUp(e:KeyboardEvent)
    {

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


            let timerStep:number = 0.01;
            for(let i = 0; i < this.uniforms.length; i++)
            {
                console.log(this.uniforms[i]);
                this.uniforms[i].time.value += timerStep;
            }


            this.scene.position.z += 0.1;

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

    }



}
