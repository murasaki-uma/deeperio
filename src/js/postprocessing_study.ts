
// *********** ひとつめのシーン *********** //
import GUI from "./GUI";
export default class PostProcessingTest{

    public scene: THREE.Scene;
    public camera: THREE.Camera;
    private renderer:THREE.WebGLRenderer;

    private width = window.innerWidth || 2;
    private height = window.innerHeight || 2;
    private gui:GUI;
    private composer:any;
    private object:THREE.Object3D;
    private light:THREE.DirectionalLight;
    private glitchPass:any;
    public isPostProcessing:boolean = true;


    // ******************************************************
    constructor(renderer:THREE.WebGLRenderer, gui:GUI) {
        this.gui = gui;
        this.renderer = renderer;
        this.createScene();

        console.log("scene created!")
    }
    private updateOptions() {
        // var wildGlitch = document.getElementById('wildGlitch');
        // this.glitchPass.goWild=wildGlitch.checked;
    }
    // ******************************************************
    private createScene()
    {

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 400;
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0x000000, 1, 1000 );
        this.object = new THREE.Object3D();
        this.scene.add( this.object );
        var geometry = new THREE.SphereGeometry( 1, 4, 4 );
        for ( var i = 0; i < 100; i ++ ) {
            var material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), shading: THREE.FlatShading } );
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
            mesh.position.multiplyScalar( Math.random() * 400 );
            mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
            this.object.add( mesh );
        }
        this.scene.add( new THREE.AmbientLight( 0x222222 ) );
        this.light = new THREE.DirectionalLight( 0xffffff );
        this.light.position.set( 1, 1, 1 );
        this.scene.add( this.light );


        this.composer = new THREE.EffectComposer( this.renderer );
        this.composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );
        this.glitchPass = new THREE.GlitchPass();
        this.glitchPass.renderToScreen = true;
        this.composer.addPass( this.glitchPass );


        // this.updateOptions();





    }


    // ******************************************************
    public click()
    {

        this.isPostProcessing = !this.isPostProcessing;
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
        this.object.rotation.x += 0.005;
        this.object.rotation.y += 0.01;
        this.composer.render();

    }



}
