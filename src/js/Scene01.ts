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

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader() );
        let mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( 'models/pal/' );



        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.camera.position.z = 5;


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
