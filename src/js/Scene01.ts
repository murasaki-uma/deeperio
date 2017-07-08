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
                console.log(object);
                this.scene.add( object );
                let materials = object.children[0].material.materials;
                for(let i = 0; i < materials.length; i++)
                {
                    materials[i].wireframe = true;
                }
            }, onProgress, onError );
        });



        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.camera.position.z = 100;


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

        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.1;

    }



}
