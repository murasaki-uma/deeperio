import GUIParameters from "./GUIParameters";
import * as dat from "dat-gui";
export default class GUI
{
    public gui:dat.GUI;
    public parameters:GUIParameters;
    public rendering:any;
    public particle:any;
    public scene03:any;
    public image:any;
    // public camera:any;
    constructor ()
    {


        // var fizzyText = new FizzyText();
        this.parameters = new GUIParameters;
        console.log(this.parameters);
        // this.gui = new dat.GUI({ load: data, width:400});
        this.gui = new dat.GUI(this.parameters);

        // this.gui.remember();
        this.gui.remember(this.parameters);


        this.rendering = this.gui.addFolder('animation');
        this.scene03 = this.gui.addFolder("scene03");
        this.particle = this.gui.addFolder("particle");
        this.image = this.gui.addFolder("image");

        // this.camera = this.gui.addFolder('camera');

        this.init();

    }

    public init()
    {
        this.rendering.add(this.parameters, 'threshold',-30.0,30.0);
        this.scene03.add(this.parameters,"drawArms01",true);
        this.scene03.add(this.parameters,"drawArms02",true);
        this.scene03.add(this.parameters,"drawArms03",true);

        this.particle.add(this.parameters,"particleStartX",-3.0,3.0);
        this.particle.add(this.parameters,"particleStartY",-5.0,5.0);
        this.particle.add(this.parameters,"particleStartZ",-1.0,1.0);
        this.image.add(this.parameters,"image_speed",0.0,0.1);
        this.image.add(this.parameters,"image_noiseScale",0.0,1.0);
        this.image.add(this.parameters,"image_noiseSeed",0.0,3.0);
    }




};