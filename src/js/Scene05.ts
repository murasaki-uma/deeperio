
// *********** ひとつめのシーン *********** //
import GUI from "./GUI";
export default class Scene05{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private plane_geometry:THREE.PlaneGeometry;
    private plane_material:THREE.ShaderMaterial;
    private plane:THREE.Mesh;
    private image_uniform:any;
    private gui:GUI;



    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer,gui:GUI) {
        this.renderer = renderer;
        this.gui = gui;
        this.createScene();

        console.log("scene created!")
    }

    // ******************************************************
    private createScene()
    {

        this.scene = new THREE.Scene();

        this.scene.add(new THREE.AmbientLight(0xffffff,1.0));


        this.image_uniform = {
            texture: { value: new THREE.TextureLoader().load("./Texture/pal01.png") },
            time: {value:0.0},
            noiseSeed:{value:0.1},
            noiseScale:{value:0.1},
            time_scale_vertex: {value:0.0},
            noiseSeed_vertex:{value:0.1},
            noiseScale_vertex:{value:0.1},
            distance_threshold:{value:0.3}
        };

        // 立方体のジオメトリーを作成
        this.plane_geometry = new THREE.PlaneGeometry( 1, window.innerHeight/window.innerWidth,100,100);
        // 緑のマテリアルを作成
        this.plane_material = new THREE.ShaderMaterial( {
            uniforms:       this.image_uniform,
            vertexShader:   document.getElementById( 'imageVertexShader' ).textContent,
            fragmentShader: document.getElementById( 'imageFragmentShader' ).textContent,
            side:THREE.DoubleSide
        });
        // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        this.plane = new THREE.Mesh( this.plane_geometry, this.plane_material );
        // メッシュをシーンに追加
        this.scene.add( this.plane );

        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.camera.position.z = 4.35;





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

        this.image_uniform.noiseScale.value = this.gui.parameters.image_noiseScale;
        this.image_uniform.noiseSeed.value = this.gui.parameters.image_noiseSeed;
        this.image_uniform.time.value += this.gui.parameters.image_speed;
        this.image_uniform.noiseScale_vertex.value = this.gui.parameters.image_noiseScale_vertex;
        this.image_uniform.noiseSeed_vertex.value = this.gui.parameters.image_noiseSeed_vertex;
        this.image_uniform.time_scale_vertex.value = this.gui.parameters.image_speed_scale__vertex;
        this.image_uniform.distance_threshold.value = this.gui.parameters.image_distance_threshold;

    }



}
