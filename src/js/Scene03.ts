
// *********** ひとつめのシーン *********** //
import GUI from "./GUI";
export default class Scene03{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;
    private geometry:THREE.BoxGeometry;
    private material:THREE.MeshBasicMaterial;
    private cube:THREE.Mesh;

    private arms01:THREE.Mesh;
    private arms02:THREE.Mesh;
    private arms03:THREE.Mesh;

    private arms_materials:any[] = [];

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

        // 立方体のジオメトリーを作成
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // 緑のマテリアルを作成
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
        this.cube = new THREE.Mesh( this.geometry, this.material );
        // メッシュをシーンに追加
        // this.scene.add( this.cube );

        // カメラを作成
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // カメラ位置を設定
        this.camera.position.z = 2;
        this.camera.position.y = 2;
        this.camera.lookAt( new THREE.Vector3(0,5,-5));
        this.scene.add(new THREE.AmbientLight(0xffffff));

        let gridhelper = new THREE.GridHelper(10,10,0xFF7F00 ,0x7F00FF );
        this.scene.add(gridhelper);

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        let dlight= new THREE.DirectionalLight(0xffffff,0.5);
        dlight.position.set(0,1,1);

        let spotLight1 = this.createSpotlight(0xffffff );
        let spotLight2 = this.createSpotlight(0xffffff );
        spotLight1.position.set( -15, -4, 0 );
        spotLight2.position.set( 15, -4,  0 );

        spotLight1.target.position.set(0,50,0);
        spotLight2.target.position.set(0,50,0);

        this.scene.add(spotLight1);
        this.scene.add(spotLight2);
        this.scene.add(dlight);

        let lightHelper1 = new THREE.SpotLightHelper( spotLight1 );
        let lightHelper2 = new THREE.SpotLightHelper( spotLight2 );

        this.scene.add(lightHelper1);
        this.scene.add(lightHelper2);

        var onError = function ( xhr ) { };
        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( 'models/Venus/' );
        mtlLoader.load( 'Venus_booled.mtl', ( materials )=> {
            materials.preload();
            var objLoader = new THREE.OBJLoader();

            objLoader.setMaterials( materials );
            objLoader.setPath( 'models/Venus/' );
            objLoader.load( 'Venus_booled.obj', ( object )=> {
                // object.position.y = - 95;
                // object.scale.set(0.3,0.3,0.3);
                this.scene.add( object );
            }, onProgress, onError );
        });


        mtlLoader.load( 'arms_zeus.mtl', ( materials )=> {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            this.arms_materials.push(materials);
            objLoader.setPath( 'models/Venus/' );
            objLoader.load( 'arms_zeus.obj', ( object )=> {

                // object.position.set(5,0,0);
                console.log(object);
                this.arms01 = object;
                this.scene.add( object );

                mtlLoader.load( 'arms_doryphoros.mtl', ( materials )=> {
                    materials.preload();
                    var objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials( materials );
                    this.arms_materials.push(materials);
                    objLoader.setPath( 'models/Venus/' );
                    objLoader.load( 'arms_doryphoros.obj', ( object )=> {
                        this.arms02 = object;
                        console.log(object);
                        this.scene.add( object );

                        mtlLoader.load( 'arms_mars.mtl', ( materials )=> {
                            materials.preload();
                            var objLoader = new THREE.OBJLoader();
                            objLoader.setMaterials( materials );
                            this.arms_materials.push(materials);
                            objLoader.setPath( 'models/Venus/' );
                            objLoader.load( 'arms_mars.obj', ( object )=> {
                                this.arms03 = object;
                                console.log(object);
                                this.scene.add( object );
                            }, onProgress, onError );
                        });
                    }, onProgress, onError );
                });

            }, onProgress, onError );
        });




    }


    public createSpotlight( color ) {
        var newObj = new THREE.SpotLight( color, 0.3 );
        newObj.castShadow = true;
        newObj.angle = 0.3;
        newObj.penumbra = 0.2;
        newObj.decay = 2;
        newObj.distance = 20;
        newObj.shadow.mapSize.width = 1024;
        newObj.shadow.mapSize.height = 1024;
        return newObj;
    }



    // ******************************************************
    public click()
    {

        console.log(this.arms_materials.length);
       for(let i = 0; i < this.arms_materials.length; i++)
       {
           let armmaterials = this.arms_materials[i];
           // this.arms_materials[i].materials[i].wireframe = true;
           console.log(armmaterials.materials);
           for(let j = 0; j < this.arms_materials[i].materials.length; j++)
           {

               let mat = this.arms_materials[i].materials[j];
               console.log(mat);
               mat.wireframe = !mat.wireframe;
           }
       }
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

        this.arms01 = this.gui.scene03.arms01;
        this.arms02 = this.gui.scene03.arms02;
        this.arms03 = this.gui.scene03.arms03;

        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

    }



}
