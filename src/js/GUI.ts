import GUIParameters from "./GUIParameters";
import * as dat from "dat-gui";
export default class GUI
{
    public gui:dat.GUI;
    public parameters:GUIParameters;
    public particle:any;
    public camera:any;
    constructor (data:JSON)
    {


        this.parameters = new GUIParameters;
        console.log(this.parameters);
        this.gui = new dat.GUI({ load: data, width:400});
        this.gui.remember(this.parameters);


        this.particle = this.gui.addFolder('particle');
        this.camera = this.gui.addFolder('camera');

        // this.init();

    }

    public init()
    {
        this.particle.add(this.parameters, 'fadeInSpeed',1.0,10.0);
        this.particle.add(this.parameters, 'particleSpeed',0.001,1.0);
        this.particle.add(this.parameters, 'radiusSpeed',0.001,0.1);
        this.particle.add(this.parameters, 'particleScaleUpSpeed', 0.01,0.99);
        this.particle.add(this.parameters, 'particleScaleDownSpeed', 0.01,0.99);
        this.particle.add(this.parameters, 'particleMaxRad', 1000.0,4000.0);
        this.particle.add(this.parameters, 'particleMinRad', 100.0,1000.0);
        this.particle.add(this.parameters, 'randomRange_radius', 0.1,5.0);
        this.particle.add(this.parameters, 'randomRange_speed', 0.1,5.0);

        this.camera.add(this.parameters, 'isCameraUpdate', false).onChange();
        this.camera.add(this.parameters, 'cameraSpeed',0.001,0.1);
        this.camera.add(this.parameters, 'cameraRotateX',0.01,1.0);
        this.camera.add(this.parameters, 'cameraRotateY',0.01,1.0);
        this.camera.add(this.parameters, 'cameraRotateZ',0.01,1.0);
        this.camera.add(this.parameters, 'delay_dropin',0.0,5.0);
        this.camera.add(this.parameters, 'delay_rotate',0.0,5.0);
        this.camera.add(this.parameters, 'position_z',0.0,70.0);
        this.camera.add(this.parameters, 'duration_dropin',0.0,10.0);
        this.camera.add(this.parameters, 'duration_rotate',0.0,10.0);


    }



};